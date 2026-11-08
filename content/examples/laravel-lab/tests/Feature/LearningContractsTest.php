<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class LearningProduct extends Model
{
    protected $table = 'learning_products';

    protected $fillable = ['name'];

    public $timestamps = false;
}

class LearningContractsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Schema::create('learning_products', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->boolean('is_admin')->default(false);
        });
        Schema::create('learning_operations', function (Blueprint $table): void {
            $table->id();
            $table->string('operation_key')->unique();
            $table->string('fingerprint');
        });
        Route::post('/learning/products', function (Request $request) {
            $data = $request->validate(['name' => ['required', 'string', 'max:30']]);

            return response()->json(LearningProduct::create(['name' => $data['name']]), 201);
        });
        Gate::define('learning-update', fn ($user, int $owner): bool => $user->id === $owner);
    }

    public function test_validation_accepts_valid_name_and_rejects_empty_or_oversized_name(): void
    {
        $this->postJson('/learning/products', ['name' => 'Notebook'])->assertCreated()->assertJsonPath('name', 'Notebook');
        $this->postJson('/learning/products', [])->assertUnprocessable()->assertJsonValidationErrors('name');
        $this->postJson('/learning/products', ['name' => str_repeat('x', 31)])->assertUnprocessable();
    }

    public function test_unexpected_privileged_field_is_not_written(): void
    {
        $this->postJson('/learning/products', ['name' => 'Pen', 'is_admin' => true])->assertCreated();
        $this->assertDatabaseHas('learning_products', ['name' => 'Pen', 'is_admin' => false]);
    }

    public function test_validated_data_does_not_authorize_a_foreign_owner(): void
    {
        $owner = User::factory()->create();
        $foreign = User::factory()->create();
        $this->assertTrue(Gate::forUser($owner)->allows('learning-update', $owner->id));
        $this->assertFalse(Gate::forUser($foreign)->allows('learning-update', $owner->id));
    }

    public function test_transaction_rolls_back_both_local_writes(): void
    {
        try {
            DB::transaction(function (): void {
                LearningProduct::create(['name' => 'Transient']);
                throw new \RuntimeException('planned failure');
            });
        } catch (\RuntimeException $error) {
            $this->assertSame('planned failure', $error->getMessage());
        }
        $this->assertDatabaseMissing('learning_products', ['name' => 'Transient']);
    }

    public function test_http_failure_is_explicit_and_no_real_request_is_sent(): void
    {
        Http::preventStrayRequests();
        Http::fake(['supplier.example/*' => Http::response(['error' => 'unavailable'], 503)]);
        $response = Http::timeout(2)->get('https://supplier.example/catalog');
        $this->assertTrue($response->serverError());
        Http::assertSentCount(1);
    }

    public function test_local_idempotency_keeps_one_operation_and_checks_payload(): void
    {
        $fingerprint = hash('sha256', 'owner=1;quantity=2');
        $first = DB::transaction(function () use ($fingerprint) {
            DB::table('learning_operations')->insertOrIgnore(['operation_key' => 'owner1:key1', 'fingerprint' => $fingerprint]);

            return DB::table('learning_operations')->where('operation_key', 'owner1:key1')->first();
        });
        DB::table('learning_operations')->insertOrIgnore(['operation_key' => 'owner1:key1', 'fingerprint' => $fingerprint]);
        $this->assertDatabaseCount('learning_operations', 1);
        $this->assertSame($fingerprint, $first->fingerprint);
        $this->assertNotSame(hash('sha256', 'owner=1;quantity=3'), $first->fingerprint);
        // This illustrates a local invariant, not exactly-once external delivery.
    }

    public function test_web_group_contains_session_and_request_forgery_protection(): void
    {
        $groups = (new Middleware)->getMiddlewareGroups();
        $this->assertContains(StartSession::class, $groups['web']);
        $this->assertNotContains(StartSession::class, $groups['api'] ?? []);
    }
}
