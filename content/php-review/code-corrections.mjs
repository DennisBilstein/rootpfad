// Focused, syntactically complete project fragments. Dependencies are deliberate
// and are named in the lesson; syntax-valid is not claimed to mean runnable alone.
export const codeCorrections = {
  'm46-l4': String.raw`<?php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Bestellung;

// In AppServiceProvider::boot() aufrufen; kein separater globaler public-Block.
Model::preventLazyLoading(! app()->isProduction());

// Voraussetzung: Bestellung::kunde() und produkte() existieren.
$bestellungen = Bestellung::query()
    ->with('kunde:id,name')
    ->withCount('produkte')
    ->latest('id')
    ->limit(50)
    ->get();
// Zwei Abfragen sind hier ein erwartetes Muster, kein universelles Versprechen.
// Query-Zahl messen; Constraints und passende Indizes separat definieren.
`,
  'm47-l1': String.raw`<?php
namespace App\Http\Requests;

use App\Models\Produkt;
use Illuminate\Foundation\Http\FormRequest;

class ProduktSpeichernRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Produkt::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'preis_cent' => ['required', 'integer', 'between:0,100000000'],
        ];
    }
}
// Eigene Datei: app/Http/Requests/ProduktSpeichernRequest.php.
// Controller verwendet validated(), Policy und kleine fillable-Liste separat.
`,
  'm47-l2': String.raw`<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NurAdmins
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user()?->ist_admin === true, 403);
        return $next($request);
    }
}
// Voraussetzung: User::ist_admin hat einen bool-Cast.
// In bootstrap/app.php innerhalb withMiddleware registrieren:
// $middleware->alias(['admin' => NurAdmins::class]);
// Route: ->middleware(['auth', 'verified', 'admin']).
// Keine pauschale Request-Forgery-Ausnahme; Webhook separat absichern.
`,
  'm47-l3': String.raw`<?php
namespace App\Policies;

use App\Models\Bestellung;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BestellungPolicy
{
    public function view(User $user, Bestellung $bestellung): Response
    {
        return $user->id === $bestellung->kunde?->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
// Erwartet Kunde-Beziehung und passende ID-Typen im Schema.
// Controller: Gate::authorize('view', $bestellung) VOR der Ausgabe.
// Keine pauschale Admin-Umgehung ohne explizite Fachregel.
`,
  'm57-l1': String.raw`<?php
namespace App\Http\Controllers;

use App\Models\Bestellung;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RechnungDownloadController extends Controller
{
    public function __invoke(Bestellung $bestellung): StreamedResponse
    {
        Gate::authorize('view', $bestellung);
        abort_unless(is_string($bestellung->rechnung_pfad), 404);
        return Storage::disk('local')->download(
            $bestellung->rechnung_pfad,
            'invoice-'.$bestellung->id.'.pdf'
        );
    }
}
// Rechnungspfad nur serverseitig aus kontrollierter Speicherung setzen.
// Keine frei wählbaren Pfade aus der URL; Disk bleibt privat.
`,
  'm58-l2': String.raw`<?php
namespace App\Casts;

use App\Support\Geld;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

class GeldCast implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): ?Geld
    {
        return $value === null ? null : Geld::cent((int) $value);
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?int
    {
        if ($value === null) { return null; }
        if (! $value instanceof Geld) {
            throw new InvalidArgumentException('Expected Geld value.');
        }
        return $value->cent;
    }
}
// Geld ist ein selbst zu implementierendes unveränderliches Value Object.
// In der separaten Modelklasse: casts() gibt ['preis' => GeldCast::class] zurück.
// Kein Float-Konstruktor Geld::euro(19.99) als exakten Vertrag behaupten.
`,
  'm48-l3': String.raw`<?php
use Illuminate\Support\Facades\DB;

// Lehrfunktion; benötigt Tabelle api_operations mit UNIQUE(user_id, operation_key).
// Aufrufer autorisiert den Nutzer und normalisiert/validiert den Payload zuerst.
function claimOperation(int $userId, string $key, array $payload): object
{
    if (! preg_match('/\\A[a-zA-Z0-9-]{1,100}\\z/D', $key)) {
        throw new InvalidArgumentException('Invalid operation key.');
    }
    $fingerprint = hash('sha256', json_encode($payload, JSON_THROW_ON_ERROR));
    return DB::transaction(function () use ($userId, $key, $fingerprint): object {
        DB::table('api_operations')->insertOrIgnore([
            'user_id' => $userId, 'operation_key' => $key,
            'fingerprint' => $fingerprint, 'status' => 'pending',
        ]);
        $operation = DB::table('api_operations')->where('user_id', $userId)
            ->where('operation_key', $key)->lockForUpdate()->first();
        if (! $operation || ! hash_equals($operation->fingerprint, $fingerprint)) {
            throw new RuntimeException('Key conflict.'); // HTTP-Schicht übersetzt in 409.
        }
        return $operation;
    });
}
// Noch KEIN vollständiger Checkout: vorhandenen Status auswerten, lokale Mutation
// und gespeicherten Response atomar verbinden. Externe Effekte brauchen Outbox/
// Anbieter-Idempotenz. JSON-Feldreihenfolge vorher kanonisch normalisieren.
`,
  'm49-l1': String.raw`<?php
interface ShippingRate
{
    public function cents(): int;
}

final class FixedShippingRate implements ShippingRate
{
    public function __construct(private readonly int $amount) {}
    public function cents(): int { return $this->amount; }
}

final class Quote
{
    public function __construct(private readonly ShippingRate $shipping) {}
    public function total(int $subtotal): int
    {
        if ($subtotal < 0) { throw new InvalidArgumentException('Negative subtotal'); }
        return $subtotal + $this->shipping->cents();
    }
}

// Ohne Container als ausführbare Komposition verständlich:
echo (new Quote(new FixedShippingRate(490)))->total(1000); // 1490
// Im Laravel-Provider register(): ShippingRate an eine geprüfte Factory binden.
// Kein Request-/Benutzerzustand im Singleton.
`,
  'm49-l4': String.raw`<?php
namespace App\Actions;

use App\Models\Produkt;
use Illuminate\Support\Facades\DB;

final class ReserveStock
{
    public function execute(int $productId, int $quantity): void
    {
        if ($quantity < 1 || $quantity > 1000) {
            throw new \InvalidArgumentException('Invalid quantity.');
        }
        DB::transaction(function () use ($productId, $quantity): void {
            $product = Produkt::query()->lockForUpdate()->findOrFail($productId);
            if ($product->bestand < $quantity) {
                throw new \RuntimeException('Insufficient stock.');
            }
            $product->decrement('bestand', $quantity);
        });
    }
}
// Voraussetzung: Produkt-Schema, Policy und validierter Request im Aufrufer.
// Dies ist nur Reservierung, kein vollständiger idempotenter Bestellabschluss.
// Lock-Verhalten mit dem produktiven Datenbanksystem testen, nicht nur SQLite.
`,
  'm60-l2': String.raw`<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class RequestId
{
    public function handle(Request $request, Closure $next): Response
    {
        $candidate = $request->header('X-Request-Id', '');
        $id = preg_match('/\\A[a-zA-Z0-9-]{1,64}\\z/D', $candidate)
            ? $candidate : (string) Str::uuid();
        Log::withContext(['request_id' => $id]);
        $response = $next($request);
        $response->headers->set('X-Request-Id', $id);
        return $response;
    }
}
// Log-Konfiguration separat in config/logging.php, kein Arrayfragment in dieser Datei.
// Dashboards per Gate schützen; Aufbewahrung und Redaction explizit festlegen.
`,
  'm55-l1': String.raw`<?php
declare(strict_types=1);

function cents(iterable $lines): Generator
{
    foreach ($lines as $line) {
        if (! preg_match('/\\A[0-9]{1,6},[0-9]{2}\\z/D', $line)) {
            throw new InvalidArgumentException('Expected bounded decimal amount.');
        }
        [$euros, $fraction] = explode(',', $line);
        yield (int) $euros * 100 + (int) $fraction;
    }
}

$sum = 0;
foreach (cents(['12,50', '0,49', '1,01']) as $amount) {
    $sum += $amount;
}
echo $sum . PHP_EOL; // 1400; Generator wird nicht vollständig materialisiert.
// Dateistreams separat mit try/finally schließen; dieses Beispiel benötigt keine CSV.
`,
};
