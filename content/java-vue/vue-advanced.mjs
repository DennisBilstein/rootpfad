// Vue 3.5 für Fortgeschrittene: Router-Schutz, Anmeldung, moderne APIs, Reaktivitätsfallen, dynamische Formulare, Infinite Queries.
// Stichtag 12.11.2026. Eigene Texte; Code und Tests liegen unter content/examples/vue-lab/ (src/lessons/{router,auth,modern,reactivity,dynamic-forms,infinite}).
// Vue-Dokumentation: CC BY 4.0 (© Evan You und Mitwirkende). Vue Router, Zod und TanStack Query: MIT. Es wird kein fremder Code übernommen.
const lab = 'content/examples/vue-lab/';
const vueDocs = (title, url, note = 'Offizielle Vue-Dokumentation (CC BY 4.0, © Evan You und Mitwirkende); Inhalt hier eigenständig zusammengefasst.') => ({ title, url, note });
const mit = (title, url, who) => ({ title, url, note: `Offizielle Dokumentation (${who}, MIT-Lizenz); Inhalt hier eigenständig zusammengefasst.` });
const linkOnly = (title, url, note = 'Nur verlinkt und zusammengefasst; Rechte liegen bei den jeweiligen Herausgebern.') => ({ title, url, note });

export const module = {
  id: 'js-m4', course: 'javascript', part: 23, partTitle: 'JavaScript & Vue · Vollständiger Lernpfad',
  title: 'Vue für Fortgeschrittene · Router-Schutz, Anmeldung, Reaktivität und Datenmuster',
};

export const lessons = [
  // ───────────────────────────── 1: Router-Guards ─────────────────────────────
  {
    id: 'js-m4-l1', title: 'Router-Guards: Zugriffsschutz, Rollen und sicherer Rücksprung', minutes: 45,
    prerequisites: 'Vue Router, Navigation und Backendgrenzen (js-m1-l12); Promises und async/await (js-m1-l4).',
    objectives: [
      'Erklären, was ein Navigation Guard ist, wann er läuft und was er zurückgeben darf',
      'Route-Meta mit TypeScript typisieren und damit geschützte Seiten und Rollen beschreiben',
      'Eine Anmeldeumleitung mit Rücksprungziel bauen, ohne Endlosschleife und ohne Login-Flackern nach einem Reload',
      'Das Rücksprungziel als Fremdeingabe behandeln und Open Redirects verhindern; die Grenze von Guards als Sicherheitsmaßnahme benennen',
    ],
    simple: `Stell dir ein Bürogebäude mit Pförtner vor. Bevor jemand eine Tür öffnet, stellt der Pförtner drei Fragen: Wer bist du? Darfst du in diesen Raum? Und wenn nicht: Wohin schicke ich dich, und wie komme ich danach wieder hierher zurück?

Ein Navigation Guard im Vue Router ist genau dieser Pförtner. Er läuft bei jedem Seitenwechsel, bevor die neue Seite angezeigt wird. Er darf drei Dinge antworten: „Weiter“ (true oder nichts zurückgeben), „Stopp“ (false) oder „Geh stattdessen dorthin“ (eine andere Adresse zurückgeben). So schickst du Besucher ohne Anmeldung zur Anmeldeseite und merkst dir, wo sie eigentlich hinwollten.

Wichtig ist eine ehrliche Einordnung: Der Pförtner steht im Browser, und den kontrolliert der Besucher. Wer die Entwicklerwerkzeuge öffnet, kann jede Prüfung im Browser umgehen. Guards sind deshalb Bedienkomfort („zeige nichts Unbrauchbares“), keine Sicherheitsmaßnahme. Die eigentliche Zugriffsprüfung muss bei jedem Aufruf der Daten-API auf dem Server passieren.`,
    steps: [
      'Meta-Felder typisieren: Mit declare module "vue-router" { interface RouteMeta { requiresAuth?: boolean; roles?: readonly Role[]; title?: string } } kennt TypeScript die erlaubten Felder. Ein Tippfehler wie requireAuth fällt dann beim Bauen auf, nicht erst durch eine ungeschützte Seite im Betrieb. Die Datei muss ein Modul sein (mindestens ein export).',
      'Routen beschreiben, nicht programmieren: /account bekommt meta: { requiresAuth: true }, /admin zusätzlich roles: ["admin"]. Die Regeln stehen an der Route, der Guard liest sie nur. So bleibt der Guard klein, und neue Seiten brauchen keinen neuen Code.',
      'Die Anmeldung hinter eine Schnittstelle legen: AuthState hat ready (ein Promise), isLoggedIn() und roles(). Der Router kennt damit keine Tokens, Cookies oder Stores. Tests und die echte Sitzung (Lektion 2) liefern dieselbe Form.',
      'Der Guard läuft in fester Reihenfolge: (1) await auth.ready, (2) wer schon angemeldet ist und /login öffnet, wird zum Rücksprungziel geschickt, (3) öffentliche Seiten sind frei, (4) ohne Anmeldung geht es zu /login mit query.redirect = to.fullPath, (5) fehlt die Rolle, geht es zu /forbidden, (6) sonst true.',
      'Warum await auth.ready? Nach einem Reload ist der Browser leer: Die Sitzung muss erst wiederhergestellt werden. Ohne das Warten würde der Guard „nicht angemeldet“ sehen und die Anmeldeseite kurz zeigen, obwohl alles in Ordnung ist. Solange das Promise offen ist, bleibt die Navigation „pending“, der Test zeigt das.',
      'Endlosschleifen vermeiden: /login und /forbidden haben kein requiresAuth. Wären sie selbst geschützt, würde der Guard bei jedem Versuch erneut umleiten. Der Router bricht eine solche Kette nach vielen Umleitungen mit einer Fehlermeldung ab (Übung 3).',
      'Rückgabewerte im Detail: true oder undefined bestätigt die Navigation. false bricht sie ab; router.push() wirft dann nicht, sondern löst mit einem NavigationFailure auf (isNavigationFailure(result, NavigationFailureType.aborted)), die Anzeige bleibt auf der alten Seite. Eine Adresse (Objekt oder String) ersetzt die Navigation durch eine neue. Ein geworfener Fehler bricht ebenfalls ab und geht an router.onError.',
      'Das Rücksprungziel prüfen: safeRedirectTarget(raw) nimmt bei einem Array den ersten Eintrag, verlangt einen Text, der mit genau einem "/" beginnt (kein "//" und kein "/\\"), höchstens 2048 Zeichen hat und weder Leerraum, Steuerzeichen noch Backslash enthält. Alles andere ergibt den Fallback "/".',
      'router.afterEach setzt nach jeder Navigation den Dokumenttitel aus meta.title. Das hilft Screenreader-Nutzern, denn bei einer Seite ohne Neuladen ändert sich sonst nichts, was die Hilfstechnik ansagen könnte (Übung 4 ergänzt Fokus und Ansage).',
      'Die Tests decken acht Fälle ab: Umleitung mit Rücksprungziel, Rollenprüfung, Login-Seite für Angemeldete, Warten auf ready, Abbruch mit false, Titel und zwei Tests für die Rücksprungprüfung (gültig und eine Liste von Angriffswerten).',
    ],
    background: `Warum ist ein Guard keine Sicherheit? Der Code der Webanwendung wird vollständig an den Browser ausgeliefert. Wer ihn bedient, kann ihn lesen, verändern oder umgehen, und er kann die Daten-API auch ganz ohne Oberfläche aufrufen. Ein Guard verhindert deshalb nur, dass ehrliche Nutzer in eine Sackgasse laufen. Fehlerhafte Zugriffskontrolle („Broken Access Control“) stand in der OWASP-Top-10-Ausgabe 2021 auf Platz 1; die Prüfung gehört auf den Server, bei jeder Anfrage, mit der Identität aus dem Token oder der Sitzung, nie mit Rollen, die der Browser behauptet.

Warum das Rücksprungziel Fremdeingabe ist: Die Adresse /login?redirect=… kann jeder in einen Link schreiben, auch ein Angreifer in einer E-Mail. Mit router.push bleibt man innerhalb der Anwendung. Rücksprungziele wandern aber oft weiter, etwa in window.location, in eine serverseitige Weiterleitung oder in Nuxt/SSR-Code. Dort würde "//evil.example" als fremde Adresse gelten, und Nutzer landen nach dem Login auf einer nachgebauten Seite („Open Redirect“, ein klassischer Phishing-Baustein). Darum prüfst du das Ziel an der Stelle, wo du es liest, nicht erst an der Stelle, wo es gefährlich wird.

Warum Regeln an die Route und nicht in den Guard? Eine Routenliste mit meta lässt sich lesen wie eine Tabelle („wer darf wohin“) und prüfen. Ein Guard mit vielen if-Zweigen pro Pfad wird schnell unübersichtlich, und vergessene Pfade sind unsichtbar. Der Router führt die meta-Felder von Eltern- und Kindrouten zusammen (flach, nicht tief): Kindrouten sollten ihre Regeln deshalb vollständig angeben, wenn sie Werte der Eltern überschreiben.`,
    terms: [
      { term: 'Navigation Guard', text: 'Eine Funktion, die der Router vor (oder nach) einem Seitenwechsel aufruft und die den Wechsel erlauben, abbrechen oder umlenken darf.' },
      { term: 'Meta-Feld (route.meta)', text: 'Frei wählbare Zusatzangaben an einer Route, z. B. requiresAuth. Sie sind im Guard über to.meta lesbar.' },
      { term: 'Weiterleitung (Redirect)', text: 'Statt der gewünschten Seite wird eine andere Adresse geöffnet. Im Guard geschieht das durch Zurückgeben dieser Adresse.' },
      { term: 'Open Redirect', text: 'Eine Weiterleitung, deren Ziel von außen vorgegeben und nicht geprüft wird. Angreifer nutzen sie, um Nutzer auf fremde Seiten zu schicken.' },
      { term: 'NavigationFailure', text: 'Ergebnis eines abgebrochenen oder doppelten Seitenwechsels. router.push wirft dafür keinen Fehler, sondern gibt dieses Objekt zurück.' },
      { term: 'Pending (offen)', text: 'Solange ein Guard noch auf ein Promise wartet, ist die Navigation weder abgeschlossen noch abgebrochen.' },
    ],
    code: { file: lab + 'src/lessons/router/guards.ts', lang: 'TypeScript' },
    code2: { file: lab + 'tests/router-guards.spec.ts', lang: 'TypeScript', from: "describe('safeRedirectTarget'", to: "toBe('/');", plus: 1 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (tests/router-guards.spec.ts): 8 Tests grün
 - /account?tab=2 ohne Anmeldung -> Route "login", query.redirect = "/account?tab=2"
 - user: /account ok, /admin -> "forbidden"; admin: /admin ok
 - angemeldet: /login?redirect=/account -> "/account"; ?redirect=//evil.example -> "/"
 - ready offen -> Navigation pending; nach ready und Anmeldung -> "account"
 - Guard mit false -> push liefert NavigationFailure (aborted), Route bleibt "account"
 - Rücksprung: '/account?tab=2#top' ok; 'https://evil.example', '//evil.example', '/\\\\evil.example',
   'javascript:alert(1)', Zeilenumbruch, Leerraum, relative Pfade, leer, Zahl, null -> "/"`,
    mistakes: [
      { wrong: 'Den Admin-Bereich nur über einen Guard zu schützen und die Daten-API ungeschützt zu lassen.',
        why: 'Der Guard läuft im Browser und lässt sich umgehen. Wer die API direkt aufruft, sieht alle Daten.',
        fix: 'Jede API-Anfrage serverseitig prüfen (Identität und Rolle). Der Guard bleibt Komfort: Er blendet Seiten aus, die ohnehin scheitern würden.' },
      { wrong: 'Das Rücksprungziel aus der URL ungeprüft in router.push oder window.location zu übergeben.',
        why: 'Ein präparierter Link (?redirect=//evil.example) kann Nutzer nach der Anmeldung auf eine fremde Seite lenken.',
        fix: 'Nur Pfade der eigenen Anwendung erlauben (safeRedirectTarget) und alles andere durch einen festen Standardwert ersetzen.' },
      { wrong: 'Die Anmeldeseite selbst mit requiresAuth zu versehen oder /forbidden zu schützen.',
        why: 'Der Guard leitet bei jeder Navigation wieder auf sich selbst um: eine Endlosschleife, die der Router erst nach vielen Umleitungen abbricht.',
        fix: 'Ausweichseiten (login, forbidden, 404) bleiben öffentlich. Im Guard zusätzlich prüfen, dass das Ziel nicht schon die Ausweichseite ist, wenn die Regeln komplexer werden.' },
      { wrong: 'Nicht auf die Wiederherstellung der Sitzung zu warten.',
        why: 'Nach einem Reload ist der Zustand leer. Der Guard sieht „nicht angemeldet“, zeigt die Anmeldeseite und leitet erst danach um: sichtbares Flackern und falsche Rücksprungziele.',
        fix: 'In den Guard await auth.ready einbauen, damit die Navigation offen bleibt, bis der Zustand bekannt ist.' },
      { wrong: 'In Guards viele Zweige pro Pfad zu schreiben, statt Regeln an der Route zu beschreiben.',
        why: 'Neue Seiten werden vergessen, die Regeln sind verstreut und kaum prüfbar.',
        fix: 'meta-Felder typisieren, im Guard nur allgemeine Regeln auswerten und die Routentabelle als Quelle der Wahrheit nutzen.' },
    ],
    practice: 'Plane Zugriffsregeln in zwei Schichten: Server entscheidet verbindlich, die Oberfläche spiegelt das Ergebnis. Halte eine Liste aller Ausweichziele (login, forbidden, notfound) bereit und teste jede Regel mit einem Normalfall, einem Grenzfall (z. B. leere Rollenliste) und einem Fehlerfall. Ergänze nach dem Seitenwechsel für Screenreader eine Ansage oder verschiebe den Fokus auf die Hauptüberschrift; ein geänderter Dokumenttitel allein reicht nicht für alle Hilfstechniken.',
    exercises: [
      { task: 'Füge eine Route /reports hinzu, die für die Rollen "user" und "admin" erreichbar ist und Anmeldung verlangt. Schreibe Tests für Gast, user und admin.', acceptance: 'Gast wird mit redirect=/reports zur Anmeldung geleitet; user und admin erreichen die Seite; der Titel „Berichte · ROOTPFAD Lab“ steht nach der Navigation.' },
      { task: 'Grenzfall: Lege eine Route mit roles: [] an und sage vorher voraus, wer sie öffnen kann. Prüfe dein Ergebnis mit einem Test.', acceptance: 'Beobachtung: niemand erreicht die Seite (some() auf einer leeren Liste ist false, also /forbidden). Begründung und der Vorschlag, roles: [] als Konfigurationsfehler zu melden, sind notiert.' },
      { task: 'Fehlerfall: Setze requiresAuth: true auf die Route "login" und rufe router.push("/account") für einen Gast auf. Notiere Fehlermeldung und Verhalten, dann stelle den Code wieder her.', acceptance: 'Der Router bricht die Umleitungskette mit einer Meldung ab; die Ursache (Guard leitet auf eine selbst geschützte Seite um) ist erklärt.' },
    ],
    quiz: [
      { q: 'Nach einem Reload zeigt die Anwendung kurz die Anmeldeseite, obwohl die Sitzung noch gültig ist. Was fehlt im Guard am wahrscheinlichsten?',
        options: ['Ein await auf die Wiederherstellung der Sitzung, bevor die Anmeldung geprüft wird.', 'Ein zusätzliches meta-Feld an der Anmeldeseite, das sie als öffentlich kennzeichnet.', 'Ein router.afterEach-Hook, der nach dem Seitenwechsel die Anmeldung prüft.'],
        correct: 0,
        rationales: ['Ohne Warten sieht der Guard den leeren Anfangszustand und leitet fälschlich um; mit await bleibt die Navigation offen, bis der Zustand bekannt ist.', 'Die Anmeldeseite ist ohnehin öffentlich; das erklärt kein Flackern nach einem Reload.', 'afterEach läuft erst nach dem Wechsel und kann ihn nicht mehr verhindern oder umlenken.'],
        explain: 'Der Guard muss auf die Sitzungswiederherstellung warten (await auth.ready), sonst entscheidet er mit einem leeren Zustand.' },
      { q: 'Ein Guard schützt /admin mit roles: ["admin"]. Warum ist damit die Verwaltungs-API noch nicht geschützt?',
        options: ['Guards laufen im Browser und lassen sich umgehen; die API muss jede Anfrage selbst prüfen.', 'Guards prüfen nur Pfade, die mit /admin beginnen, und übersehen Unterseiten wie /admin/users.', 'Guards dürfen laut Router-Dokumentation keine Rollen auswerten, nur den Anmeldestatus.'],
        correct: 0,
        rationales: ['Wer die Oberfläche kontrolliert (der Nutzer), kann den Guard entfernen oder die API direkt aufrufen; verbindliche Prüfung gehört auf den Server.', 'Guards laufen für alle passenden Routen, auch für Unterseiten; das Problem liegt nicht in der Pfadabdeckung.', 'Guards dürfen beliebige Bedingungen prüfen; sie sind nur keine Sicherheitsgrenze.'],
        explain: 'Ein Guard ist Bedienkomfort im Browser. Autorisierung muss serverseitig bei jedem Aufruf erfolgen.' },
      { q: 'Welcher Wert für ?redirect muss safeRedirectTarget ablehnen, weil er die eigene Anwendung verlässt?',
        options: ['/account?tab=2', '/orders/42#top', '//evil.example'],
        correct: 2,
        rationales: ['Ein Pfad der eigenen Anwendung mit Query-Parameter ist ausdrücklich erlaubt.', 'Ein Pfad mit Fragment (#top) bleibt innerhalb der Anwendung und ist erlaubt.', 'Zwei Schrägstriche am Anfang bedeuten „gleiches Protokoll, andere Domain“ und sind damit ein Open Redirect.'],
        explain: 'Nur Werte mit genau einem führenden Schrägstrich sind eigene Pfade; "//host" zeigt auf eine fremde Origin.' },
    ],
    sources: [
      mit('Vue Router: Navigation Guards', 'https://router.vuejs.org/guide/advanced/navigation-guards.html', 'Vue Router'),
      mit('Vue Router: Route Meta Fields (inkl. TypeScript)', 'https://router.vuejs.org/guide/advanced/meta.html', 'Vue Router'),
      linkOnly('OWASP Top 10 2021: A01 Broken Access Control', 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/'),
      linkOnly('OWASP Cheat Sheet: Unvalidated Redirects and Forwards', 'https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html'),
    ],
    verification: 'Alle Tests im vue-lab (vue-router 5.4.0, Vitest 5.1.0, jsdom) grün; Rückgabewerte, NavigationFailure und Pending-Verhalten wurden beobachtet, nicht nur der Dokumentation entnommen. NICHT geprüft: Verhalten im echten Browser mit History-Modus und Server-Fallback, Fokus- und Screenreader-Ansage nach dem Seitenwechsel, serverseitige Autorisierung (das Lab hat kein Backend mit Rollen).',
  },

  // ───────────────────────────── 2: Anmeldung und Token-Erneuerung ─────────────────────────────
  {
    id: 'js-m4-l2', title: 'Anmeldung und Token-Erneuerung ohne Endlosschleifen', minutes: 55,
    prerequisites: 'Lektion „Router-Guards“; Fehlerzustände und Abbruch bei API-Aufrufen (js-m1-l11); Promises (js-m1-l4).',
    objectives: [
      'Access-Token und Refresh-Token unterscheiden und begründen, wo jedes gespeichert wird',
      'Einen Fetch-Wrapper bauen, der bei 401 genau einmal erneuert und genau einmal wiederholt („Single Flight“)',
      'Entscheiden, wann eine Sitzung wirklich beendet wird (401/403 bei der Erneuerung) und wann nicht (Netzwerkfehler)',
      'Das Token nur an die eigene Origin senden und die Sitzung beim Start still wiederherstellen',
    ],
    simple: `Wenn du dich anmeldest, bekommt dein Browser einen „Ausweis“: das Access-Token. Es ist absichtlich kurzlebig (wenige Minuten). Du hältst es bei jeder Anfrage hoch („Authorization: Bearer …“), und der Server weiß, wer du bist. Wird der Ausweis ungültig, antwortet der Server mit 401 („nicht angemeldet“).

Damit du dich nicht alle paar Minuten neu anmelden musst, gibt es einen zweiten, langlebigen Schlüssel: das Refresh-Token. Es liegt als Cookie beim Browser, aber mit dem Merkmal httpOnly: Dein JavaScript kann es weder lesen noch stehlen. Läuft der Ausweis ab, schickt die Anwendung das Cookie an den Server und bekommt einen frischen Ausweis zurück. Danach wiederholt sie die abgelehnte Anfrage, und der Nutzer merkt nichts.

Die Kunst liegt in den Randfällen: Was, wenn fünf Anfragen gleichzeitig scheitern? (Nur einmal erneuern!) Was, wenn auch die Erneuerung scheitert? (Dann ist die Sitzung wirklich vorbei.) Was, wenn nur das WLAN weg ist? (Dann nicht ausloggen!) Und: Der Ausweis darf niemals an fremde Server gehen.`,
    steps: [
      'Das Token lebt nur in einer Variable im Arbeitsspeicher (let accessToken). Es steht weder in localStorage noch in sessionStorage noch in der URL. Der Test prüft, dass nach dem Login kein Eintrag in localStorage steht.',
      'login(credentials) sendet die Zugangsdaten per POST und liest die Antwort nicht ungeprüft, sondern mit einem Zod-Schema (accessToken: nicht leerer Text). Eine kaputte Antwort wird so zum Fehler statt zu einem undefinierten Token.',
      'authFetch(url, init) hängt "Authorization: Bearer …" nur an, wenn die URL zur eigenen Origin gehört (isOwnOrigin). Der Test ruft eine fremde Adresse auf und prüft, dass kein Header gesendet wird.',
      'Kommt 401 zurück, ruft authFetch refresh() auf. refresh() merkt sich das laufende Promise (refreshing ??= …). Alle parallelen Anfragen teilen dieses eine Promise: „Single Flight“. Im Test lösen fünf gleichzeitige Anfragen genau einen Refresh aus.',
      'Danach folgt genau eine Wiederholung mit dem neuen Token. Bleibt es bei 401, gibt authFetch die Antwort an den Aufrufer zurück, es gibt keine zweite Erneuerung und keine Endlosschleife.',
      'Wiederholt wird nur, was sich wiederholen lässt: Ein String-Body kann erneut gesendet werden. Ein Stream (ReadableStream) wurde schon verbraucht; er wird nicht automatisch wiederholt, der Aufrufer bekommt die 401.',
      'Scheitert die Erneuerung mit 401 oder 403, ist das Refresh-Token ungültig: Das Token wird verworfen, onSessionExpired() läuft (z. B. Navigation zur Anmeldung) und ein SessionExpiredError wird geworfen.',
      'Scheitert sie dagegen mit einem Netzwerkfehler (TypeError aus fetch) oder 5xx, bleibt die Sitzung bestehen: Der Fehler geht an den Aufrufer. Wer im Tunnel kurz offline ist, wird nicht abgemeldet.',
      'restore() versucht beim Start still, ein Token zu erneuern. createSession nutzt es: Gelingt es, lädt die Sitzung /api/me (Name und Rollen vom Server); misslingt es, bleibt der Nutzer abgemeldet. ready ist ein Promise, das auch bei Fehlern erfüllt wird, damit der Router-Guard nie ewig wartet.',
      'Im Zusammenspiel mit Lektion 1 zeigen zwei Tests: Mit gültigem Cookie landet ein Reload direkt auf /account ohne Anmeldeseite; ohne Cookie geht es zu /login, und nach dem Login führt das Rücksprungziel zurück.',
    ],
    background: `Warum zwei Token? Ein einzelnes, langlebiges Token wäre bequem, aber gefährlich: Wer es einmal abgreift, hat tagelang Zugriff. Das kurzlebige Access-Token begrenzt den Schaden. Das langlebige Refresh-Token ist besser geschützt: Es liegt als httpOnly-Cookie, wird nur an den Erneuerungsendpunkt gesendet und kann vom Server widerrufen werden. Üblich ist außerdem, bei jeder Erneuerung ein neues Refresh-Token auszustellen und das alte zu entwerten („Rotation“). Genau deshalb ist Single Flight keine Schönheitsfrage: Würden fünf Anfragen fünfmal erneuern, könnte der Server die zweite Verwendung eines schon rotierten Tokens als Diebstahl werten und die ganze Sitzung beenden.

Warum nicht localStorage? Jedes Skript, das in deiner Seite läuft, kann localStorage lesen: eingeschleuster Code (XSS), eine kompromittierte Bibliothek, eine Browsererweiterung mit Seitenzugriff. Ein Wert im Arbeitsspeicher einer Variable ist nicht unangreifbar, aber schwerer abzugreifen und verschwindet beim Schließen des Tabs. Der Preis: Nach einem Reload muss die Sitzung per Refresh-Cookie wiederhergestellt werden (restore).

Warum braucht der Refresh-Aufruf Schutz gegen CSRF? Cookies sendet der Browser automatisch mit, auch wenn eine fremde Seite die Anfrage auslöst. Der Server muss deshalb den Erneuerungsendpunkt absichern (SameSite-Attribut am Cookie, Prüfung von Origin oder eines benutzerdefinierten Headers wie X-Requested-With, der von fremden Seiten ohne Erlaubnis nicht gesetzt werden kann). Das Lab sendet den Header, den Server dazu baut das Lab nicht: Es hat eine simulierte Gegenseite, keine echte Anmeldung. Eine Alternative für viele Anwendungen ist das „Backend for Frontend“-Muster: Das JavaScript erhält gar kein Token, sondern nur ein Sitzungs-Cookie, und ein eigener Server spricht mit den APIs.

Warum Rollen vom Server statt aus dem Token lesen? Ein Token lässt sich dekodieren, aber die Oberfläche kann nicht prüfen, ob es echt ist. Rollen aus einem selbst dekodierten Token wären eine ungeprüfte Behauptung. Der Server liefert sie über /api/me, und er setzt sie bei jedem Zugriff selbst durch.`,
    terms: [
      { term: 'Access-Token', text: 'Kurzlebiger Ausweis, der mit jeder API-Anfrage mitgeschickt wird. Läuft er ab, antwortet der Server mit 401.' },
      { term: 'Refresh-Token', text: 'Langlebiger Schlüssel, nur zum Holen neuer Access-Token. Hier als httpOnly-Cookie, also nicht per JavaScript lesbar.' },
      { term: 'httpOnly-Cookie', text: 'Cookie, das der Browser nur mitsendet und das Skripte der Seite nicht lesen können. Schützt vor dem Abgreifen durch XSS.' },
      { term: 'Bearer', text: 'Schema des Authorization-Headers (RFC 6750): „Wer dieses Token vorzeigt, wird bedient“. Deshalb darf es nie an Fremde gehen.' },
      { term: 'Single Flight', text: 'Mehrere gleichzeitige Anforderungen derselben Sache teilen sich einen einzigen laufenden Vorgang.' },
      { term: '401 und 403', text: '401: nicht (mehr) angemeldet bzw. Zugangsdaten ungültig. 403: angemeldet, aber nicht berechtigt. Nur 401 am Datenendpunkt löst eine Erneuerung aus.' },
      { term: 'CSRF', text: 'Cross-Site Request Forgery: Eine fremde Seite löst im Namen des Nutzers eine Anfrage aus, weil der Browser Cookies automatisch mitsendet.' },
    ],
    code: { file: lab + 'src/lessons/auth/authClient.ts', lang: 'TypeScript', from: 'export function createAuthClient', to: 'export type AuthClient' },
    code2: { file: lab + 'src/lessons/auth/session.ts', lang: 'TypeScript' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (tests/auth.spec.ts): 13 Tests grün
 - Login: Token im Speicher, "Authorization: Bearer access-1"; localStorage ohne Token; falsches Passwort -> HttpError 401
 - Ablauf bei Ablauf des Tokens: GET /api/me (401) -> POST /auth/refresh -> GET /api/me (200, "Bearer access-2")
 - 5 parallele Anfragen mit abgelaufenem Token -> genau 1 Refresh
 - Refresh 401 -> SessionExpiredError, onSessionExpired 1x, Token verworfen
 - Refresh Netzwerkfehler -> TypeError an den Aufrufer, Sitzung bleibt
 - dauerhaft 401 -> nur 1 Refresh, Antwort 401 an den Aufrufer (keine Schleife)
 - String-Body wird mit gleichem Inhalt wiederholt; Stream-Body nicht
 - fremde Origin -> kein Authorization-Header
 - Reload mit Cookie -> /account ohne Anmeldeseite, Nutzer "Ada"; ohne Cookie -> /login, nach Login Rücksprung`,
    mistakes: [
      { wrong: 'Das Access-Token in localStorage zu speichern, „damit es den Reload überlebt“.',
        why: 'Jedes Skript der Seite kann localStorage lesen. Ein einziger XSS-Fehler oder eine kompromittierte Bibliothek genügt, um das Token zu stehlen.',
        fix: 'Token im Arbeitsspeicher halten und die Sitzung beim Start über das httpOnly-Refresh-Cookie wiederherstellen (restore).' },
      { wrong: 'Bei jeder 401-Antwort einzeln zu erneuern.',
        why: 'Fünf parallele Anfragen lösen fünf Erneuerungen aus. Bei rotierenden Refresh-Token ist die zweite Verwendung ein Verdachtsfall, und der Server kann die Sitzung beenden.',
        fix: 'Ein laufendes Promise merken und teilen (Single Flight), danach jede Anfrage genau einmal wiederholen.' },
      { wrong: 'Nach der Wiederholung bei erneutem 401 wieder zu erneuern.',
        why: 'Es entsteht eine Endlosschleife (401 → Refresh → 401 → …), die den Server und die Anmeldeseite flutet.',
        fix: 'Genau eine Wiederholung; bleibt es bei 401, gibt der Aufrufer die Entscheidung (z. B. „keine Berechtigung“).' },
      { wrong: 'Jeden Fehler bei der Erneuerung als Abmeldung zu behandeln.',
        why: 'Ein kurzer Netzausfall oder ein 503 meldet den Nutzer ab, obwohl die Sitzung gültig ist. Das ist ärgerlich und kann Eingaben vernichten.',
        fix: 'Nur 401 und 403 beenden die Sitzung. Netzwerk- und Serverfehler gehen als Fehler weiter; die Oberfläche bietet „Erneut versuchen“ an.' },
      { wrong: 'Das Token an jede URL zu hängen, auch an fremde.',
        why: 'Ein Bearer-Token gilt für jeden, der es vorzeigt. Ein Drittanbieter, der es erhält, kann sich damit ausgeben.',
        fix: 'Vor dem Senden die Origin vergleichen (isOwnOrigin) und nur an eigene API-Adressen anhängen.' },
      { wrong: 'Rollen aus dem dekodierten Token zu lesen und der Oberfläche zu vertrauen.',
        why: 'Die Oberfläche kann ein Token nicht beglaubigen. Manipulierte Anzeigewerte führen zu falschen Menüs; schlimmer ist der Eindruck, damit sei etwas geschützt.',
        fix: 'Rollen vom Server per /api/me holen; Berechtigungen prüft der Server bei jedem Zugriff.' },
    ],
    practice: 'Lege dir für jede Anmeldelösung eine Liste an: Wo liegt welches Token? Wer kann es lesen? Wie lange gilt es? Was passiert bei 401, 403, 5xx und Netzwerkfehler? Diese Tabelle gehört in die Projektdokumentation und in die Tests. Bei neuen Projekten lohnt die Frage, ob ein Sitzungs-Cookie mit „Backend for Frontend“ nicht einfacher und sicherer ist als Tokens im Browser. Schreibe nie Token oder Cookies in Logs, URLs oder Fehlermeldungen.',
    exercises: [
      { task: 'Ergänze einen Test für logout(): Nach dem Abmelden lehnt der Server /api/me ab, hasToken ist false, und eine erneute Wiederherstellung (restore) schlägt fehl.', acceptance: 'Nach logout() ist hasToken false; restore() liefert false, weil das Refresh-Cookie am Server verworfen ist.' },
      { task: 'Grenzfall: Lasse zehn Anfragen gleichzeitig mit abgelaufenem Token laufen und starte zusätzlich eine elfte Anfrage 5 ms später, während die Erneuerung noch läuft. Zähle die Refresh-Aufrufe.', acceptance: 'Genau ein Refresh; die späte Anfrage nutzt dieselbe Erneuerung. Der Ablauf ist in einem Zeitdiagramm skizziert.' },
      { task: 'Fehlerfall: Lasse /auth/refresh mit 500 antworten und rufe authFetch auf. Welche Ausnahme kommt an, bleibt die Sitzung bestehen, und was zeigt die Oberfläche? Entscheide, ob 500 eine Abmeldung rechtfertigt.', acceptance: 'HttpError mit Status 500, onSessionExpired läuft nicht; begründete Entscheidung („Serverfehler beenden die Sitzung nicht“) und ein „Erneut versuchen“-Konzept sind notiert.' },
    ],
    quiz: [
      { q: 'Fünf Anfragen scheitern gleichzeitig mit 401. Wie viele Aufrufe von /auth/refresh sendet authFetch?',
        options: ['Fünf, damit jede Anfrage ihr eigenes frisches Token bekommt und unabhängig bleibt.', 'Genau einen: Die Anfragen teilen sich dieselbe laufende Erneuerung und werden danach wiederholt.', 'Keinen, weil bei einem 401 die Sitzung immer sofort beendet und zur Anmeldung gewechselt wird.'],
        correct: 1,
        rationales: ['Fünf Erneuerungen verschwenden Anfragen und können bei rotierenden Refresh-Token die Sitzung beenden.', 'So funktioniert Single Flight: ein Promise wird gemerkt und geteilt; der Test belegt genau einen Aufruf.', 'Ein 401 am Datenendpunkt löst zuerst eine Erneuerung aus; nur wenn sie mit 401/403 scheitert, endet die Sitzung.'],
        explain: 'Single Flight verhindert mehrfache Erneuerungen und schützt rotierende Refresh-Token.' },
      { q: 'Wo wird das Access-Token in diesem Entwurf gespeichert, und warum?',
        options: ['In einer Variable im Arbeitsspeicher, weil Skripte der Seite localStorage lesen können und Tokens dort leichter gestohlen werden.', 'In localStorage, weil es nur dort einen Reload übersteht und deshalb am bequemsten und sichersten ist.', 'In der URL als Query-Parameter, weil Links dann überall und ohne Cookie funktionieren.'],
        correct: 0,
        rationales: ['Der Speicherort begrenzt die Angriffsfläche; die Sitzung wird beim Start per httpOnly-Cookie wiederhergestellt.', 'localStorage ist für jedes Skript der Seite lesbar; Bequemlichkeit ist hier kein Sicherheitsargument.', 'URLs landen in Verlauf, Logs und Referer-Headern; Token gehören nie dorthin.'],
        explain: 'Ein Token im Arbeitsspeicher ist schwerer abzugreifen als eines in localStorage; der Preis ist die Wiederherstellung beim Start.' },
      { q: 'Die Erneuerung scheitert mit einem Netzwerkfehler (TypeError aus fetch). Was ist die richtige Reaktion?',
        options: ['Sofort abmelden und zur Anmeldeseite wechseln, damit die Sitzung sicher beendet ist.', 'Die Anfrage unbegrenzt wiederholen, bis das Netz wieder erreichbar ist.', 'Den Fehler an den Aufrufer geben und die Sitzung behalten; die Oberfläche bietet „Erneut versuchen“ an.'],
        correct: 2,
        rationales: ['Ein Netzausfall sagt nichts über die Gültigkeit der Sitzung; Abmelden würde Eingaben unnötig vernichten.', 'Unbegrenzte Wiederholung erzeugt eine Dauerschleife und belastet das Gerät und später den Server.', 'Nur 401/403 bei der Erneuerung beenden die Sitzung; alles andere ist ein vorübergehendes Problem.'],
        explain: 'Netzwerkfehler sind vorübergehend: Sitzung behalten, Fehler melden, Wiederholung anbieten.' },
    ],
    sources: [
      linkOnly('OWASP Cheat Sheet: Session Management', 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'),
      linkOnly('OWASP Cheat Sheet: CSRF Prevention', 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html'),
      linkOnly('RFC 6750: The OAuth 2.0 Bearer Token Usage', 'https://www.rfc-editor.org/rfc/rfc6750.html', 'IETF-Standard; nur verlinkt.'),
      linkOnly('IETF-Entwurf: OAuth 2.0 for Browser-Based Applications', 'https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/', 'Entwurf (Draft), kein endgültiger Standard; Inhalt kann sich ändern.'),
      linkOnly('MDN: Fetch API, Option credentials', 'https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials', 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt.'),
    ],
    verification: 'Alle Tests im vue-lab grün (13 Tests, simulierter Server mit ablaufenden Tokens und simuliertem Refresh-Cookie; Zod 4.6.7). NICHT geprüft: ein echter Server mit httpOnly-Cookies, SameSite-Verhalten, CORS-Konfiguration, Rotation von Refresh-Token und CSRF-Schutz (das Lab hat nur den Client und eine Fake-Gegenseite); das Spring-Lab dieses Pfads enthält keine Anmeldung. Der IETF-Entwurf ist noch nicht final.',
  },

  // ───────────────────────────── 3: Moderne Vue-3.5-APIs ─────────────────────────────
  {
    id: 'js-m4-l3', title: 'Moderne Vue-3.5-APIs: useId, useTemplateRef, defineExpose und Attribute', minutes: 45,
    prerequisites: 'Lektion „defineModel“ (js-m2-l1); Props, Emits, Slots und zugängliche Formulare (js-m1-l10).',
    objectives: [
      'Mit useId eindeutige, SSR-stabile ids für Beschriftung, Hinweis und Fehlermeldung erzeugen',
      'Mit useTemplateRef typisierte Template-Refs verwenden und erklären, wie sie sich von der älteren Schreibweise unterscheiden',
      'Mit defineExpose bewusst festlegen, was eine Komponente nach außen freigibt (z. B. focus())',
      'Mit defineOptions({ inheritAttrs: false }) Attribute gezielt an das Eingabefeld statt an den Wrapper leiten und Props reaktiv destrukturieren',
    ],
    simple: `Ein gutes Formularfeld besteht aus mehr als einem <input>: Es hat eine Beschriftung, vielleicht einen Hinweis („Wir senden nur eine Bestätigung“) und im Fehlerfall eine Fehlermeldung. Damit Screenreader das zusammen vorlesen, müssen diese Teile über ids miteinander verbunden sein: label for=…, aria-describedby=…. Wenn du dieselbe Komponente zehnmal verwendest, braucht jedes Feld seine eigene, eindeutige id. Das erledigt useId für dich.

Dazu kommen drei Fragen, die jede wiederverwendbare Komponente beantworten muss. Erstens: Welche Attribute gehören wohin? Ein class gehört an den äußeren Rahmen, aber type="email" und autocomplete gehören an das Eingabefeld. Zweitens: Wie kommt der Elternteil an das Feld, um es zu fokussieren? Die Antwort: nur über das, was die Komponente ausdrücklich freigibt (defineExpose). Drittens: Wie bekomme ich das <input> selbst in die Hand, ohne document.querySelector? Mit einer Template-Ref.

Alle vier Werkzeuge (useId, useTemplateRef, defineExpose, inheritAttrs) sind klein. Zusammen machen sie aus einem Eingabefeld einen sauberen Baustein, den du in jedem Formular wiederverwenden kannst.`,
    steps: [
      'defineOptions({ inheritAttrs: false }) schaltet das automatische Durchreichen von Attributen an das Wurzelelement ab. Ohne das würden type, autocomplete und data-* am äußeren <div> landen, wo sie nichts bewirken.',
      'const { label, hint, error } = defineProps<…>() destrukturiert die Props. Seit Vue 3.5 schreibt der Compiler das so um, dass die Werte reaktiv bleiben: Ändert der Elternteil error, aktualisiert sich das Template. (Vor 3.5 wäre das eine Momentaufnahme gewesen.)',
      'const model = defineModel<string>({ default: "" }) bildet v-model ab (Lektion js-m2-l1).',
      'const id = useId() liefert eine id, die pro Aufruf eindeutig ist und beim Server-Rendering und im Browser dieselbe ist. Aus ihr werden drei Namen: id (Feld), `${id}-hint` und `${id}-error`. useId gehört in setup, nicht in computed (die Doku warnt davor).',
      'describedBy ist ein computed, das nur die ids der tatsächlich vorhandenen Texte zusammensetzt. Gibt es weder Hinweis noch Fehler, entfällt aria-describedby ganz, ebenso aria-invalid. Leere Verweise auf nicht existierende ids sind selbst ein Fehler.',
      'const input = useTemplateRef<HTMLInputElement>("input") liefert eine typisierte Ref auf das Element, dessen Attribut ref="input" lautet. Der Name im String ist die Verbindung, es muss keine gleichnamige Variable geben (das war die ältere Schreibweise). Vor dem Einhängen ist der Wert null.',
      'inputAttrs() trennt class und style ab (sie gehören an den Wrapper) und gibt alle übrigen Attribute an das <input>. Es ist eine Funktion im Template statt ein computed, weil $attrs laut Vue-Doku nicht reaktiv ist: Ein computed würde sich nicht aktualisieren.',
      'defineExpose({ focus }) gibt als einziges frei, dass der Elternteil focus() aufrufen darf. Komponenten mit script setup sind sonst „geschlossen“: Eine Ref des Elternteils sieht nichts von dem, was drinnen passiert.',
      'SignupForm.vue nutzt FormField zweimal und holt die Instanzen mit useTemplateRef<InstanceType<typeof FormField>>("nameField"). Beim Absenden fokussiert sie das erste fehlerhafte Feld über die freigegebene focus()-Methode.',
      'Die Tests prüfen: Verknüpfung von Label, Hinweis und Fehler; unterschiedliche ids bei mehreren Instanzen; Wegfall der aria-Attribute; Aufteilung von class und type; reaktive Props; dass nur focus() freigegeben ist; und die Fokusreihenfolge im Elternformular.',
    ],
    background: `Warum useId statt eigenem Zähler oder Math.random? Bei Server-Side-Rendering (SSR) wird das HTML zuerst auf dem Server erzeugt und im Browser „übernommen“ (Hydration). Wenn der Browser andere ids berechnet als der Server, passen Beschriftung und Feld nicht mehr zusammen, und Vue meldet einen Hydration-Mismatch. useId ist so gebaut, dass Server und Browser dieselben Werte bekommen. Gleichzeitig sind die Werte pro Anwendung eindeutig. Laufen auf einer Seite mehrere getrennte Vue-Apps, können deren ids kollidieren; dafür gibt es app.config.idPrefix. Mit Präfix sehen die ids anders aus (z. B. "myApp:0"); der Doppelpunkt muss in CSS-Selektoren maskiert werden (im Test mit CSS.escape).

Warum sind Komponenten standardmäßig „geschlossen“? Wenn Eltern in das Innere greifen könnten, wäre jede Umbenennung einer internen Variable ein Bruch für alle Verwender. Mit defineExpose legst du einen kleinen, öffentlichen Vertrag fest (hier: focus). Alles andere darfst du frei ändern. Das ist dasselbe Prinzip wie bei privaten Methoden in einer Klasse.

Warum Attribute teilen? Ein Eingabefeld hat zwei Ebenen: Der Rahmen (div mit class, Abständen, Layout) und das eigentliche Feld (type, autocomplete, inputmode, data-testid, required). Verwender wollen beides beeinflussen, ohne die Interna zu kennen. Mit inheritAttrs: false entscheidest du selbst, wohin welches Attribut geht, statt dich auf die Voreinstellung (alles an das Wurzelelement) zu verlassen.

Eine Falle am Rande: Ein HTML-Kommentar vor dem Wurzelelement im Template macht die Komponente im Entwicklungs- und Testmodus zu einem Fragment mit mehreren Wurzeln. Im Lab ist genau das beim ersten Test aufgefallen (wrapper.element zeigte auf den Kommentar). Kommentare gehören deshalb in den Script-Teil.`,
    terms: [
      { term: 'useId()', text: 'Erzeugt eine pro Anwendung eindeutige id, die bei Server- und Browser-Rendering gleich ist. Gedacht für Beschriftungen und ARIA-Verweise.' },
      { term: 'Template-Ref', text: 'Verbindung zwischen einem Element oder einer Komponente im Template und einer Variable im Script. Mit useTemplateRef („name“) typisiert und ohne gleichnamige Variable lesbar.' },
      { term: 'Fallthrough-Attribute', text: 'Attribute, die ein Elternteil an eine Komponente setzt, die diese aber nicht als Prop deklariert. Standardmäßig landen sie am Wurzelelement.' },
      { term: 'aria-describedby', text: 'Verweist auf Elemente (per id), deren Text das Feld zusätzlich beschreibt, z. B. Hinweis und Fehlermeldung. Screenreader lesen sie nach der Beschriftung vor.' },
      { term: 'Hydration', text: 'Das „Lebendigmachen“ von serverseitig erzeugtem HTML im Browser. Dafür müssen erzeugte Werte (wie ids) auf beiden Seiten übereinstimmen.' },
      { term: 'defineExpose', text: 'Legt fest, welche Werte und Funktionen eine script-setup-Komponente per Template-Ref nach außen zeigt. Ohne Aufruf bleibt sie komplett geschlossen.' },
    ],
    code: { file: lab + 'src/lessons/modern/FormField.vue', lang: 'Vue' },
    code2: { file: lab + 'src/lessons/modern/SignupForm.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (tests/modern-apis.spec.ts): 9 Tests grün
 - label for == input id; aria-describedby nennt zwei vorhandene ids; aria-invalid="true"
 - zwei Instanzen: unterschiedliche ids; ohne Hinweis/Fehler: weder aria-describedby noch aria-invalid
 - class/style am Wrapper; type, autocomplete, data-testid am input; input hat keine class
 - setProps({ label: "Neu", error: "Fehler" }) aktualisiert Beschriftung und Fehlertext (reaktives Destructuring)
 - exposed Schlüssel: ["focus"]; focus() setzt document.activeElement auf das input
 - SignupForm: erster Submit -> Fokus Name, zweiter -> Fokus E-Mail; gültige Daten werden gesendet`,
    mistakes: [
      { wrong: 'ids von Hand zu erzeugen (Zähler, Math.random, feste Namen wie "email").',
        why: 'Feste Namen kollidieren bei mehrfacher Verwendung, Zufallswerte erzeugen Hydration-Fehler beim Server-Rendering. Doppelte ids brechen die Zuordnung von Label und Feld.',
        fix: 'useId() verwenden, daraus Teil-ids ableiten (`${id}-hint`) und bei mehreren Apps app.config.idPrefix setzen.' },
      { wrong: 'useId() innerhalb von computed() aufzurufen.',
        why: 'Die Vue-Dokumentation warnt davor: Es kann zu Instanzkonflikten kommen, weil der Aufruf an die Komponenteninstanz gebunden ist.',
        fix: 'Einmal in setup aufrufen und den Wert im computed nur lesen (wie describedBy).' },
      { wrong: 'useAttrs() in einem computed zu nutzen und dann auf Änderungen zu warten.',
        why: 'Die Attributobjekte sind laut Doku nicht reaktiv. Ein computed wertet nur einmal aus und bleibt veraltet.',
        fix: 'Direkt im Template lesen oder eine Funktion im Template aufrufen (inputAttrs()). Für Reaktivität eine Prop deklarieren.' },
      { wrong: 'Per Elternkomponente auf Interna der Kindkomponente zuzugreifen (child.$refs.input) statt eine Methode freizugeben.',
        why: 'Jede interne Umbenennung bricht alle Verwender. Außerdem sind script-setup-Komponenten ohne defineExpose ohnehin geschlossen: der Zugriff liefert nichts.',
        fix: 'Einen kleinen Vertrag mit defineExpose festlegen (focus) und im Test prüfen, dass nur diese Schlüssel sichtbar sind.' },
      { wrong: 'Vor onMounted auf eine Template-Ref zuzugreifen oder sie nie auf null zu prüfen.',
        why: 'Bis zum Einhängen ist der Wert null; bei v-if kann das Element auch später wieder verschwinden. Der Zugriff wirft sonst einen Fehler.',
        fix: 'Mit optionaler Verkettung (input.value?.focus()) arbeiten und den Zugriff erst nach dem Einhängen auslösen.' },
      { wrong: 'Kommentare vor das Wurzelelement im Template zu setzen.',
        why: 'Im Entwicklungsmodus zählt der Kommentar als weiterer Wurzelknoten. Die Komponente wird zum Fragment, und Tests oder Attribut-Weitergabe verhalten sich anders als in der Produktion.',
        fix: 'Kommentare in den Script-Teil oder innerhalb des Wurzelelements setzen.' },
    ],
    practice: 'Zugängliche Formularbausteine sind der Ort, wo sich Sorgfalt am meisten auszahlt: Jede Komponente einmal richtig bauen, dann überall wiederverwenden. Prüfe das Ergebnis mit der Tastatur (Tab, Fokusreihenfolge, Sprung zum ersten Fehler) und mit einem Screenreader, wenn möglich. Halte den freigegebenen Vertrag klein (focus, eventuell select), dokumentiere ihn in einem Satz und teste ihn, damit niemand versehentlich Interna freigibt.',
    exercises: [
      { task: 'Ergänze eine Möglichkeit, das Feld als Pflichtfeld zu kennzeichnen: Das Attribut required soll am <input> ankommen, und die Beschriftung zeigt ein sichtbares „(Pflicht)“. Schreibe einen Test.', acceptance: 'required steht am input (nicht am Wrapper); die Beschriftung enthält den Hinweis als Text, nicht nur durch Farbe oder ein Symbol.' },
      { task: 'Grenzfall: Mounte zwei getrennte Vue-Apps mit je einem FormField auf derselben Seite und vergleiche die ids. Setze danach app.config.idPrefix und vergleiche erneut.', acceptance: 'Beobachtung dokumentiert (ohne Präfix können gleiche ids entstehen, mit Präfix nicht); Maskierung des Doppelpunkts im Selektor ist beachtet.' },
      { task: 'Fehlerfall: Entferne defineOptions({ inheritAttrs: false }) und übergib type und data-testid. Wohin gehen die Attribute, und welche Warnung oder welches Verhalten beobachtest du?', acceptance: 'Die Attribute landen am Wrapper-Element, nicht am Feld; type="email" wirkt nicht; die Beobachtung und die Wiederherstellung des Codes sind notiert.' },
    ],
    quiz: [
      { q: 'Warum nutzt FormField useId() statt einer selbst gebauten Zufallszahl?',
        options: ['Zufallszahlen sind in Vue verboten und lösen beim Bauen einen Fehler aus.', 'useId liefert pro Anwendung eindeutige Werte, die beim Server- und Browser-Rendering übereinstimmen.', 'useId erzeugt kürzere ids, wodurch das HTML kleiner und die Seite schneller wird.'],
        correct: 1,
        rationales: ['Zufallswerte sind erlaubt; sie führen aber beim Server-Rendering zu Abweichungen.', 'Das verhindert Hydration-Mismatches und doppelte ids; so steht es in der Vue-Dokumentation.', 'Länge oder Geschwindigkeit sind nicht der Grund; es geht um Eindeutigkeit und Stabilität.'],
        explain: 'useId ist eindeutig und SSR-stabil; selbstgebaute Werte können beim Hydrieren abweichen.' },
      { q: 'Warum ist inputAttrs() eine Funktion im Template und kein computed?',
        options: ['Ein computed darf keine Objekte zurückgeben, nur einfache Werte wie Zahlen oder Text.', 'Funktionen im Template laufen schneller als computed-Werte und sparen deshalb Rechenzeit.', 'useAttrs() ist laut Vue-Doku nicht reaktiv; ein computed würde sich bei geänderten Attributen nicht aktualisieren.'],
        correct: 2,
        rationales: ['computed kann beliebige Werte zurückgeben, auch Objekte.', 'Der Unterschied ist nicht die Geschwindigkeit, sondern die Aktualität der Werte.', 'Die Attribute ändern sich außerhalb des Reaktivitätssystems; die Funktion wird bei jedem Rendern neu ausgewertet.'],
        explain: '$attrs/useAttrs sind nicht reaktiv; die Aufteilung muss bei jedem Rendern neu erfolgen.' },
      { q: 'Eine Elternkomponente hält eine Ref auf FormField und ruft focus() auf. Was ist dafür in FormField nötig?',
        options: ['defineExpose({ focus }), denn script-setup-Komponenten geben ohne diese Freigabe nichts nach außen.', 'Nichts, denn Eltern können in Vue immer jede interne Variable ihrer Kinder lesen.', 'Eine Prop namens focus, die der Elternteil auf true setzt, damit das Feld den Fokus nimmt.'],
        correct: 0,
        rationales: ['Der Vertrag wird ausdrücklich freigegeben; im Test sind nur "focus" und sonst nichts sichtbar.', 'Komponenten mit script setup sind standardmäßig geschlossen.', 'Eine Prop würde einen Zustand beschreiben, kein einmaliges Kommando; „true setzen“ löst bei zweitem Aufruf nichts aus.'],
        explain: 'Ohne defineExpose bleibt eine script-setup-Komponente geschlossen; der Vertrag wird bewusst klein gehalten.' },
    ],
    sources: [
      vueDocs('Vue: useId() (Composition API Helpers)', 'https://vuejs.org/api/composition-api-helpers.html#useid'),
      vueDocs('Vue: Template Refs (useTemplateRef, v-for, Funktions-Refs)', 'https://vuejs.org/guide/essentials/template-refs.html'),
      vueDocs('Vue: Fallthrough Attributes ($attrs, inheritAttrs)', 'https://vuejs.org/guide/components/attrs.html'),
      vueDocs('Vue: Props (Reactive Props Destructure, Vue 3.5)', 'https://vuejs.org/guide/components/props.html#reactive-props-destructure'),
      linkOnly('W3C WCAG 2.2: Technik ARIA1 – aria-describedby', 'https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1.html', 'W3C-Technik; nur verlinkt.'),
    ],
    verification: 'Alle Tests im vue-lab (Vue 3.5.45, @vue/test-utils 2.4.11, jsdom) grün; vue-tsc fehlerfrei (inklusive InstanceType der Komponente). NICHT geprüft: Server-Rendering/Hydration (kein SSR-Lab), Screenreader-Ansage, mehrere Vue-Apps mit idPrefix (nur aus der Vue-Dokumentation).',
  },

  // ───────────────────────────── 4: Reaktivitätsfallen ─────────────────────────────
  {
    id: 'js-m4-l4', title: 'Reaktivitätsfallen erkennen und beheben', minutes: 55,
    prerequisites: 'Reaktivität, computed, watch und Lifecycle (js-m1-l9); Composables (js-m1-l11).',
    objectives: [
      'Die häufigsten Reaktivitätsfallen erkennen: Destrukturieren, Ersetzen von reactive-Objekten, tiefe Änderungen bei shallowRef',
      'Verstehen, wann watchEffect Abhängigkeiten sammelt und warum sie nach einem await verloren gehen',
      'Den Zeitpunkt von Watchern (flush: pre/post) am echten DOM beobachten',
      'Werte, Refs und Getter an Composables richtig übergeben (MaybeRefOrGetter, toValue) und mit Vue-3.5-Props-Destructuring umgehen',
    ],
    simple: `Vues Reaktivität fühlt sich oft wie Zauberei an: Du änderst eine Variable, und die Seite aktualisiert sich. Die Zauberei hat Regeln. Sie funktioniert, solange Vue „mitbekommt“, wer einen Wert liest und wer ihn ändert. Die meisten Fehler entstehen, weil man unbemerkt diese Verbindung kappt, und dann scheint die Anwendung „kaputt“, ohne dass eine Fehlermeldung erscheint.

Das Bild dazu: Ein reaktiver Wert ist wie eine Wasserleitung. Wer den Wert liest, hängt einen Schlauch an. Wer eine Kopie macht (z. B. durch Destrukturieren), hat einen Eimer Wasser: Er enthält den Stand von eben, wird aber nie nachgefüllt.

Diese Lektion zeigt sieben solcher Fallen. Jede steht als Paar aus „falsch“ und „richtig“ im Code, mit einem Test, der den Unterschied beweist. Du siehst also nicht nur, was man tun soll, sondern auch, was ohne Gegenmaßnahme tatsächlich passiert.`,
    steps: [
      'Falle 1, Destrukturieren: const { count } = state kopiert die Zahl 0. Ändert sich state.count später auf 5, bleibt die Kopie bei 0. Test: { state: 5, copy: 0 }. Lösung: toRefs(state) macht aus jeder Eigenschaft eine ref, die auf das Original zeigt (Lesen und Schreiben).',
      'Falle 2, reactive ersetzen: Wer state = reactive({ … }) neu zuweist, erzeugt ein neues Objekt. Wer die alte Referenz hält (z. B. in einem Composable), sieht die Änderung nie. Test: { held: 1, current: 2 }. Lösung: eine ref verwenden und .value austauschen; die Referenz bleibt dieselbe.',
      'Falle 3, shallowRef: Eine shallowRef verfolgt nur das Ersetzen von .value, nicht Änderungen im Inneren. Test: Änderung innerhalb löst nichts aus (0), triggerRef löst manuell aus (1), Austausch löst aus (2). Sinnvoll für große, unveränderliche Datenstrukturen oder externe Objekte.',
      'Falle 4, watchEffect und await: watchEffect sammelt Abhängigkeiten nur synchron, also bis zum ersten await. Was danach gelesen wird, wird nicht verfolgt. Test: Die Folge lautet ["1/1", "2/2"], b = 2 allein löst keinen Lauf aus. Lösung: watch mit ausdrücklichen Quellen ([a, b]); dort ist klar, worauf reagiert wird.',
      'Falle 5, Zeitpunkt (flush): Ein Watcher läuft standardmäßig vor dem DOM-Update (flush: "pre") und sieht das alte DOM. Mit flush: "post" läuft er danach. FlushDemo.vue zeigt das am echten <p>: pre liest "0", post liest "1".',
      'Falle 6, Props und Composables: Vue 3.5 destrukturiert Props reaktiv (const { name = "Gast" } = defineProps<…>()). Gibst du aber name an eine Funktion weiter (useUppercase(name)), übergibst du einen String, also eine Momentaufnahme. Mit einem Getter (() => name) bleibt es aktuell. Die Funktion nimmt MaybeRefOrGetter und liest mit toValue().',
      'Falle 7, Refs in Sammlungen: In reactive-Objekten werden refs entpackt (state.n ist eine Zahl), in reactive-Arrays nicht (list[0] ist weiter eine ref, list[0].value nötig). Test: { objectUnwrapped: true, listUnwrapped: false }.',
      'Jede Falle hat einen Test mit konkretem Soll-Ergebnis (12 Tests). Das Muster „falsch beobachten, dann richtig beobachten“ ist selbst die wichtigste Technik: Reaktivitätsfehler findest du nicht durch Lesen, sondern durch einen kleinen Test.',
    ],
    background: `Was passiert unter der Haube? Vue verpackt reaktive Objekte in einen Proxy. Greift Code auf eine Eigenschaft zu, merkt sich Vue, wer gerade liest („Tracking“), und wird bei einer Änderung genau diese Leser neu ausführen („Trigger“). Bei einer ref passiert dasselbe über .value. Fehler entstehen immer dort, wo ein Lesen nicht über den Proxy läuft: Bei der Kopie einer Zahl, beim Austausch des Objekts, beim Lesen nach einem await (der Lesevorgang gehört dann zu keinem „aktuell laufenden Effekt“ mehr).

Warum nur synchron? JavaScript kennt nach einem await keinen Zusammenhang mehr zum ursprünglichen Aufruf. Vue weiß nur „jetzt läuft Effekt X“, solange der Code synchron weiterläuft. Deshalb sammelt watchEffect nur das, was vor dem ersten await passiert. Das ist eine technische Grenze, kein Fehler. Wer asynchron arbeitet, nennt die Quellen ausdrücklich (watch) oder liest alle Werte vor dem await.

Warum läuft ein Watcher standardmäßig vor dem DOM-Update? Vue bündelt Änderungen: Mehrere Änderungen in einem Tick führen zu einem einzigen Update. Watcher vom Typ pre laufen davor, damit sie Zustand noch korrigieren können, bevor gerendert wird. Wer das fertige DOM braucht (Größe messen, Fokus setzen), nimmt flush: "post" oder wartet mit nextTick.

Zwei Faustregeln: (1) Ganze Objekte als ref halten, wenn sie als Ganzes ersetzt werden (Antwort vom Server); reactive nur für Zustand, dessen Identität stabil bleibt. (2) Werte in Composables als MaybeRefOrGetter annehmen und mit toValue lesen: Das akzeptiert Wert, ref und Getter und bleibt trotzdem reaktiv, wenn man eine ref oder einen Getter übergibt.`,
    terms: [
      { term: 'Tracking / Trigger', text: 'Vue merkt sich beim Lesen, wer einen Wert braucht (Tracking), und führt diese Leser bei Änderung neu aus (Trigger).' },
      { term: 'toRefs', text: 'Wandelt jede Eigenschaft eines reactive-Objekts in eine ref um, die mit dem Original verbunden bleibt. Macht Destrukturieren sicher.' },
      { term: 'shallowRef', text: 'Eine ref, die nur das Ersetzen von .value verfolgt, nicht Änderungen tief im Inneren. triggerRef löst manuell aus.' },
      { term: 'flush', text: 'Zeitpunkt, an dem ein Watcher läuft: pre (vor dem DOM-Update, Standard), post (danach) oder sync (sofort).' },
      { term: 'MaybeRefOrGetter', text: 'Typ für „Wert, ref oder Getter“. Mit toValue() liest man ihn einheitlich, ohne zu wissen, was übergeben wurde.' },
      { term: 'Momentaufnahme', text: 'Kopie eines Werts zu einem Zeitpunkt. Ändert sich das Original später, bleibt die Kopie stehen.' },
    ],
    code: { file: lab + 'src/lessons/reactivity/pitfalls.ts', lang: 'TypeScript' },
    code2: { file: lab + 'src/lessons/reactivity/FlushDemo.vue', lang: 'Vue' },
    code3: { file: lab + 'src/lessons/reactivity/GreetingProps.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'code3', 'body2'],
    output: `vitest (tests/reactivity-pitfalls.spec.ts): 12 Tests grün
 1 falsch { state: 5, copy: 0 }            richtig { viaRef: 5, state: 7 }
 2 falsch { held: 1, current: 2 }          richtig { held: 2, current: 2 }
 3 shallowRef { afterMutation: 0, afterTrigger: 1, afterReplace: 2 }
 4 watchEffect nach await ["1/1", "2/2"]   watch([a, b]) ["1/2", "2/2"]
 5 flush pre sieht "0", flush post sieht "1" (echtes DOM)
 6 Props-Destructuring reaktiv ("Hallo Gast." -> "Hallo Ada!"); Getter "GRACE", Momentaufnahme "ADA"
 7 Objekt entpackt: true, Array entpackt: false`,
    mistakes: [
      { wrong: 'Props oder reactive-Eigenschaften zu destrukturieren und die Variablen später in Watchern oder Composables zu verwenden.',
        why: 'Du erhältst Kopien. In Props-Destructuring von Vue 3.5 hilft der Compiler im Template und in Watchern, nicht aber, wenn du den Wert an eine Funktion übergibst.',
        fix: 'toRefs für reactive-Objekte, Getter () => name bei Übergabe an Funktionen und Composables, die MaybeRefOrGetter annehmen.' },
      { wrong: 'Ein reactive-Objekt komplett neu zuzuweisen (state = reactive({ … })).',
        why: 'Alle, die die alte Referenz halten, sehen das neue Objekt nicht. Es gibt keine Fehlermeldung.',
        fix: 'ref verwenden und .value austauschen, oder Eigenschaften einzeln ändern (Object.assign).' },
      { wrong: 'In watchEffect nach einem await weitere Werte zu lesen und zu erwarten, dass sie verfolgt werden.',
        why: 'Abhängigkeiten werden nur bis zum ersten await gesammelt. Spätere Lesezugriffe lösen keinen neuen Lauf aus.',
        fix: 'Werte vor dem await lesen oder watch mit ausdrücklichen Quellen verwenden.' },
      { wrong: 'Im Watcher DOM-Größen oder -Inhalte zu lesen und das aktuelle Ergebnis zu erwarten.',
        why: 'Standardmäßig läuft der Watcher vor dem DOM-Update und sieht noch den alten Stand.',
        fix: 'flush: "post" setzen oder await nextTick() verwenden.' },
      { wrong: 'shallowRef für Daten zu verwenden, die man später tief verändert, ohne triggerRef.',
        why: 'Die Oberfläche aktualisiert sich nicht. Das ist die dokumentierte Eigenschaft von shallowRef und kein Fehler von Vue.',
        fix: 'Für tief veränderte Daten ref nehmen; shallowRef nur für ersetzte große Strukturen oder externe Objekte.' },
      { wrong: 'Zu erwarten, dass refs in reactive-Arrays automatisch entpackt werden.',
        why: 'Das passiert nur bei Objekteigenschaften. In Arrays und Maps bleiben refs refs; list[0] ist eine ref.',
        fix: 'Mit .value arbeiten oder die Struktur ohne verschachtelte refs aufbauen.' },
    ],
    practice: 'Wenn „die Anzeige sich nicht aktualisiert“, bevor du den Code ansiehst: Schreibe den kleinsten möglichen Test, der den Wert ändert und das Ergebnis liest. Tracking-Probleme zeigen sich dort sofort. Bewährte Routine bei Composables: Parameter als MaybeRefOrGetter typisieren, mit toValue lesen, und einen Test mit einem Wert und einem Getter schreiben (wie snapshotVersusGetter). Vermeide es, reactive-Objekte als Ganzes zu ersetzen; teste Austauschfälle ausdrücklich.',
    exercises: [
      { task: 'Schreibe ein Composable useFullName(first, last) mit MaybeRefOrGetter<string>-Parametern und teste es mit einem String, einer ref und einem Getter.', acceptance: 'Mit ref und Getter aktualisiert sich der Name nach einer Änderung; mit dem String bleibt er auf dem Anfangswert (Momentaufnahme); der Unterschied ist im Test als Soll-Ergebnis festgehalten.' },
      { task: 'Grenzfall: Ändere in Falle 3 den Wert zweimal hintereinander im selben Tick (box.value = { n: 1 }; box.value = { n: 2 }). Wie oft läuft der Watcher? Erkläre das Ergebnis mit dem Bündeln von Änderungen.', acceptance: 'Der Watcher läuft einmal pro Tick (nicht zweimal); die Erklärung nennt das Bündeln von Updates (Scheduler/Flush).' },
      { task: 'Fehlerfall: Baue in FlushDemo die Auswertung des DOM-Texts in einen Watcher mit flush: "sync". Was liest der Watcher, und warum?', acceptance: 'Beobachtung: Er sieht den alten Text (DOM noch nicht aktualisiert); Gegenmaßnahme flush: "post" oder nextTick ist getestet.' },
    ],
    quiz: [
      { q: 'Nach `const { count } = state` ändert sich state.count auf 5, aber count bleibt 0. Wie hältst du die Verbindung?',
        options: ['Mit toRefs(state) destrukturieren; dann ist count eine ref, die auf state.count zeigt.', 'Mit `let { count } = state` statt const; let-Variablen werden automatisch reaktiv.', 'Mit JSON.parse(JSON.stringify(state)), damit die Kopie vollständig und aktuell ist.'],
        correct: 0,
        rationales: ['toRefs erzeugt für jede Eigenschaft eine ref mit Verbindung zum Original (Lesen und Schreiben).', 'let oder const spielt keine Rolle; beides kopiert den Wert zum Zeitpunkt des Destrukturierens.', 'Eine tiefe Kopie ist eine Momentaufnahme und verliert die Verbindung erst recht.'],
        explain: 'toRefs erhält die Verbindung; Destrukturieren allein kopiert nur den aktuellen Wert.' },
      { q: 'watchEffect(async () => { const a = x.value; await load(); use(y.value); }): Was passiert bei einer Änderung von y?',
        options: ['Der Effekt läuft sofort neu, weil y.value im Effekt gelesen wird.', 'Nichts, denn y wurde erst nach dem await gelesen und wird deshalb nicht als Abhängigkeit verfolgt.', 'Vue wirft einen Fehler, weil asynchrone Effekte in watchEffect nicht erlaubt sind.'],
        correct: 1,
        rationales: ['Das Lesen nach dem await gehört nicht mehr zu den gesammelten Abhängigkeiten.', 'Abhängigkeiten werden nur bis zum ersten await gesammelt; y.value kommt danach.', 'Asynchrone Effekte sind erlaubt, nur ihre Abhängigkeiten nach dem await werden nicht verfolgt.'],
        explain: 'watchEffect verfolgt nur synchron gelesene Werte; nach dem await braucht es ausdrückliche Quellen.' },
      { q: 'Ein Watcher soll die Höhe eines Elements nach einer Zustandsänderung messen. Welche Einstellung liefert den aktuellen Stand?',
        options: ['flush: "pre" (Standard), denn der Watcher läuft direkt nach der Änderung.', 'flush: "sync", denn dann läuft der Watcher am schnellsten.', 'flush: "post", denn dann ist das DOM bereits aktualisiert.'],
        correct: 2,
        rationales: ['pre läuft vor dem DOM-Update und sieht noch den alten Zustand.', 'sync läuft sofort und damit noch vor dem Rendern; das DOM ist nicht aktualisiert.', 'post läuft nach dem DOM-Update; FlushDemo zeigt den Unterschied am echten DOM ("0" bei pre, "1" bei post).'],
        explain: 'Für Zugriff auf das fertige DOM braucht der Watcher flush: "post" oder nextTick.' },
    ],
    sources: [
      vueDocs('Vue: Reactivity Fundamentals', 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html'),
      vueDocs('Vue: Watchers (flush, watchEffect, async)', 'https://vuejs.org/guide/essentials/watchers.html'),
      vueDocs('Vue: Reactivity in Depth', 'https://vuejs.org/guide/extras/reactivity-in-depth.html'),
      vueDocs('Vue: Composables (MaybeRefOrGetter, toValue)', 'https://vuejs.org/guide/reusability/composables.html'),
      vueDocs('Vue: Reactivity API Advanced (shallowRef, triggerRef)', 'https://vuejs.org/api/reactivity-advanced.html'),
    ],
    verification: 'Alle 12 Tests im vue-lab grün (Vue 3.5.45); jede Falle wurde als falsches und richtiges Verhalten gegen die installierte Version ausgeführt, nicht aus Erinnerung behauptet. Nicht behandelt: Proxy-Details (Map/Set-Verhalten), effectScope-Randfälle und Vue Vapor Mode.',
  },

  // ───────────────────────────── 5: Dynamische Formulare ─────────────────────────────
  {
    id: 'js-m4-l5', title: 'Dynamische Formulare: Listen von Feldern mit Fokus und Ansage', minutes: 60,
    prerequisites: 'Lektionen „Formulare mit Zod“ (js-m3-l1) und „Moderne Vue-3.5-APIs“ (js-m4-l3); Listen und Schlüssel (v-for, :key).',
    objectives: [
      'Eine Liste von Eingabezeilen mit Zod prüfen, inklusive Zeilenpfad, Dubletten, Mindest- und Höchstanzahl',
      'Stabile Schlüssel für Zeilen verwenden und erklären, warum der Listenindex als Key Fehler verursacht',
      'Den Fokus beim Hinzufügen und Entfernen von Zeilen führen und Änderungen mit einer Live-Region ansagen',
      'Interne UI-Daten (Schlüssel) von den Daten für die API trennen',
    ],
    simple: `Manche Formulare haben eine feste Zahl von Feldern, andere wachsen: „Lade bis zu fünf Personen ein“, mit einer Zeile pro E-Mail-Adresse und den Knöpfen „Person hinzufügen“ und „Entfernen“. Das wirkt einfach, ist aber voller kleiner Fallen.

Erstens: Wenn du die zweite Zeile löschst, sollen die anderen Zeilen ihren Text behalten. Das klappt nur, wenn jede Zeile eine feste Identität hat und Vue sie auch nach dem Umsortieren wiedererkennt. Nimmst du den Listenindex dafür (Zeile 0, 1, 2), „wandern“ Eingaben zur falschen Zeile.

Zweitens: Menschen, die mit der Tastatur arbeiten, brauchen den Fokus an einer sinnvollen Stelle. Nach „Person hinzufügen“ soll das neue Feld den Fokus haben, nach „Entfernen“ die Nachbarzeile. Sonst springt der Fokus in den Nirgendwo und man muss neu suchen.

Drittens: Wer einen Screenreader nutzt, sieht nicht, dass eine Zeile verschwunden ist. Eine kleine, unsichtbare „Durchsage“ (Live-Region) sagt es an: „Zeile 2 entfernt. 2 von 5 Personen.“

Viertens: Das Schema prüft nicht nur jedes Feld, sondern auch die Liste als Ganzes: nicht leer, höchstens fünf, keine doppelte Adresse, und der Fehler erscheint an der richtigen Zeile.`,
    steps: [
      'Das Schema trennt zwei Dinge: Eine Zeile hat { key, email }, aber an die API gehen nur die Adressen. Das Ende des Schemas formt mit .transform({ team, emails }) die Ausgabe: Die UI-Schlüssel bleiben im Formular. z.input und z.output unterscheiden sich also bewusst.',
      'Pro Zeile: z.string().trim().min(1, "E-Mail fehlt").pipe(z.email("Gültige E-Mail-Adresse eingeben")).transform(toLowerCase). Zuerst wird getrimmt, dann geprüft, dann kleingeschrieben, damit "Ada@Example.com " und "ada@example.com" dieselbe Adresse sind.',
      'Die Liste: z.array(memberSchema).min(1).max(5). Ein Test belegt die Grenzen: 0 und 6 Zeilen sind ungültig, 1 und 5 gültig.',
      'Dubletten brauchen den Blick über mehrere Zeilen. Dafür gibt es superRefine am Objekt: Ein Set merkt sich gesehene Adressen; die zweite und jede weitere Zeile mit derselben Adresse bekommt ctx.addIssue mit path ["members", index, "email"]. Der Fehler steht also an der Zeile, die ihn verursacht.',
      'validateInvite wandelt die Zod-Issues in ein einfaches Objekt: Schlüssel wie "team", "members" (Listenfehler) oder "members.1.email" (Zeilenfehler), je Schlüssel die erste Meldung.',
      'Beobachtet, nicht angenommen: Zod 4 meldet Zeilenfehler und Dubletten gemeinsam in einem Durchlauf. Das ist für Nutzer besser („alles auf einmal sehen“). Ein Test hält das fest.',
      'InviteForm.vue erzeugt Zeilen mit einem Zähler (row-1, row-2 …) als key und verwendet :key="row.key" in v-for. Der Index dient nur der Anzeige („Person 2“).',
      'Fokus: Funktions-Refs (:ref="(instance) => trackField(row.key, instance)") merken sich pro Zeile die freigegebene focus()-Methode aus FormField (Lektion 3). Nach dem Hinzufügen wartet addRow auf nextTick und fokussiert das neue Feld. Funktions-Refs statt useTemplateRef im v-for, denn die Reihenfolge eines Ref-Arrays entspricht laut Vue-Doku nicht garantiert der Quellliste.',
      'Nach dem Entfernen geht der Fokus an die Zeile an gleicher Position; war es die letzte, an die neue letzte; gibt es keine, an „Person hinzufügen“. Die Entfernen-Schaltfläche ist bei nur einer Zeile deaktiviert.',
      'Ansage: <p role="status"> bleibt immer im DOM. Ihr Text wird bei Änderungen gesetzt („Zeile 2 hinzugefügt. 2 von 5 Personen.“). Screenreader lesen Änderungen in einer solchen Region höflich vor, ohne den Fokus zu bewegen. Eine Region, die erst bei Bedarf eingefügt wird, wird häufig nicht zuverlässig angesagt.',
      'Beschriftungen: Der sichtbare Text lautet „Entfernen“, das aria-label „Entfernen: Person 2“ beginnt mit dem sichtbaren Text, wie WCAG „Label in Name“ (2.5.3) verlangt, und sagt, welche Zeile gemeint ist.',
      'Fehler erst nach dem ersten Absenden zeigen (submitted), danach live aktualisieren. Beim Absenden mit Fehlern geht der Fokus auf das erste Feld mit aria-invalid="true".',
    ],
    background: `Warum nicht der Index als Key? Vue erkennt Listenelemente an ihrem Key. Mit dem Index als Key bedeutet „Zeile 0“ immer das erste Element, egal welche Daten dort stehen. Löschst du die erste Zeile, erhält die bisherige Zeile 1 den Key 0: Vue ändert nur den Inhalt und übernimmt das vorhandene DOM-Element. Eingaben im Feld (Cursorposition, nicht gebundene Werte, Fokus, Animationen) bleiben am Element hängen und erscheinen plötzlich in der falschen Zeile. Der Test „behält Eingaben und DOM-Elemente“ prüft deshalb sogar die Identität der Elemente (dasselbe DOM-Element nach dem Löschen).

Warum Zeilenfehler am Zeilenpfad? Ein Fehler „E-Mail ungültig“ ohne Zeilenangabe hilft nicht, wenn fünf Felder da sind. Zod liefert für jedes Problem einen Pfad (members → 2 → email). Daraus entsteht der Schlüssel "members.2.email", der direkt zum Feld in Zeile 3 passt. Die Anzeige liest einfach den Eintrag zum Schlüssel "members.<Zeilennummer>.email".

Warum eine Live-Region? Bei Tastatur- und Screenreader-Nutzung ist der Fokus der „Zeigefinger“. Änderungen außerhalb des Fokus bemerken Nutzer ohne Hinweis nicht. WCAG 2.2 verlangt in 4.1.3 (Statusmeldungen), dass solche Meldungen programmatisch bestimmbar sind, ohne den Fokus zu bewegen. role="status" (implizit polite) leistet das.

Warum Grenzen als Text? Beim Maximum von fünf Zeilen wird „Person hinzufügen“ deaktiviert, und ein Text erklärt, warum („Höchstens 5 Personen.“). Ein deaktivierter Knopf ohne Begründung lässt Nutzer rätseln. Alternativ kannst du den Knopf aktiv lassen und beim Klick eine Meldung ausgeben; beides ist vertretbar, solange der Grund sichtbar ist.`,
    terms: [
      { term: 'Key (Schlüssel)', text: 'Eindeutige, stabile Kennung eines Listeneintrags, mit der Vue Elemente beim Ändern der Liste wiedererkennt. Niemals der Index bei veränderlichen Listen.' },
      { term: 'Zeilenpfad', text: 'Zods Angabe, wo ein Fehler liegt, z. B. ["members", 2, "email"]. Wird zu "members.2.email" verbunden.' },
      { term: 'superRefine', text: 'Zusätzliche Prüfung auf einem ganzen Objekt, die mehrere Fehler mit eigenem Pfad melden darf (z. B. Dubletten).' },
      { term: 'Live-Region', text: 'Bereich (role="status" oder aria-live), dessen Textänderungen Screenreader automatisch ansagen, ohne dass der Fokus dorthin wandert.' },
      { term: 'Funktions-Ref', text: 'Eine Funktion als ref-Wert: Vue ruft sie beim Einhängen mit der Instanz und beim Entfernen mit null auf. Gut für Elemente in v-for.' },
      { term: 'z.input / z.output', text: 'Zods Typen für die Rohdaten vor der Prüfung und die geprüften Daten nach transform.' },
    ],
    code: { file: lab + 'src/lessons/dynamic-forms/inviteSchema.ts', lang: 'TypeScript' },
    code2: { file: lab + 'src/lessons/dynamic-forms/InviteForm.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (tests/invite-schema.spec.ts, tests/dynamic-forms.spec.ts): 15 Tests grün
 Schema
 - "  Ada@Example.COM " -> "ada@example.com"; Ausgabe { team: "Backend", emails: [...] } ohne key
 - Fehler: team "Teamname fehlt", members.0.email "E-Mail fehlt", members.1.email "Gültige E-Mail-Adresse eingeben"
 - 0 und 6 Zeilen ungültig, 1 und 5 gültig; Teamname 40 ok, 41 nicht
 - Dublette (auch mit anderer Schreibweise) -> nur die spätere Zeile: members.2.email
 - Zeilenfehler und Dublette werden zusammen gemeldet
 Formular
 - Start mit 1 Zeile (Entfernen gesperrt); Hinzufügen -> Fokus auf neuem Feld; Ansage "Zeile 2 hinzugefügt. 2 von 5 Personen."
 - bei 5 Zeilen Hinzufügen gesperrt, Text "Höchstens 5 Personen."
 - Zeile 1 entfernen: übrige Eingaben und dieselben DOM-Elemente bleiben; Fokus an gleicher Position
 - Absenden mit Fehler: Fokus auf erstem ungültigen Feld, genau ein aria-invalid, kein submit-Ereignis
 - nach Korrektur verschwindet der Fehler live; gültig -> { team: "Backend", emails: [ada@..., grace@...] }`,
    mistakes: [
      { wrong: 'Den Listenindex als :key zu verwenden.',
        why: 'Beim Löschen oder Umsortieren bleiben DOM-Elemente und Eingaben am Index hängen. Text und Fokus erscheinen in der falschen Zeile.',
        fix: 'Beim Anlegen einer Zeile eine eindeutige, stabile Kennung vergeben und als key verwenden.' },
      { wrong: 'UI-Schlüssel (key) mit an die API zu senden.',
        why: 'Die API kennt das Feld nicht, lehnt die Anfrage ab oder speichert Unsinn; interne Details werden Teil des Vertrags.',
        fix: 'Mit .transform die Ausgabeform festlegen (nur die Adressen). z.input und z.output trennen Formular und API.' },
      { wrong: 'Nach dem Hinzufügen oder Entfernen den Fokus nicht zu führen.',
        why: 'Der Fokus verschwindet mit dem entfernten Element und fällt auf den Seitenanfang zurück. Tastaturnutzer verlieren ihre Position.',
        fix: 'Auf nextTick warten und gezielt fokussieren (neue Zeile, Nachbarzeile oder „Hinzufügen“-Knopf).' },
      { wrong: 'Änderungen nur visuell zu zeigen, ohne Ansage.',
        why: 'Screenreader-Nutzer erfahren nicht, dass sich die Liste geändert hat, und können die Eingabe nicht nachvollziehen.',
        fix: 'Eine immer vorhandene Live-Region (role="status") mit einem kurzen Satz aktualisieren.' },
      { wrong: 'Das Hinzufügen bei Erreichen des Maximums wortlos zu deaktivieren.',
        why: 'Nutzer wissen nicht, warum nichts passiert, und halten es für einen Fehler.',
        fix: 'Den Grund als sichtbaren Text nennen („Höchstens 5 Personen.“) und die Grenze im Schema und in der Oberfläche gleich halten (MAX_MEMBERS).' },
      { wrong: 'Sich bei Dubletten auf die Eingabe im Browser zu verlassen.',
        why: 'Browserprüfungen sind Komfort. Wer die API direkt anspricht, umgeht sie; Groß-/Kleinschreibung und Leerzeichen werden anders behandelt.',
        fix: 'Der Server prüft Dubletten verbindlich (und normalisiert gleich); die Oberfläche zeigt dessen Feldfehler zusätzlich an (siehe js-m3-l5).' },
    ],
    practice: 'Dynamische Listen sind ein guter Test für deine Disziplin: stabile Keys, Fokusführung, Ansage, Grenzen im Schema und im UI gleich. Prüfe jede Liste mit der Tastatur: Hinzufügen, Entfernen, Absenden mit Fehler, Fehler korrigieren. Schreibe für Hinzufügen und Entfernen jeweils einen Test mit Identität der DOM-Elemente. Beim Backend: Diese Daten gelten als Fremdeingabe; die Obergrenze und Dubletten müssen dort erneut geprüft werden.',
    exercises: [
      { task: 'Ergänze pro Zeile ein Feld „Rolle“ (z.enum: leser, bearbeiter). Passe Schema, Formular und API-Ausgabe an (emails wird zu members mit { email, role }).', acceptance: 'Schema lehnt unbekannte Rollen ab; die Ausgabe enthält Rollen; ein Test belegt das Entfernen einer Zeile behält Rolle und E-Mail der übrigen.' },
      { task: 'Grenzfall: Gib in Zeile 1 „A@x.de“ und in Zeile 2 „a@x.de “ (mit Leerzeichen) ein und sende ab. Welche Zeile meldet die Dublette, und warum nicht beide?', acceptance: 'Nur Zeile 2 meldet den Fehler (die zweite und jede weitere); Normalisierung durch trim und toLowerCase ist als Ursache erklärt.' },
      { task: 'Fehlerfall: Ersetze :key="row.key" durch :key="index", tippe in Zeile 2 und 3 etwas ein und entferne Zeile 1. Beschreibe, was mit den Eingaben und dem Fokus passiert, und stelle den Code wieder her.', acceptance: 'Beobachtung dokumentiert (Elemente werden wiederverwendet, Zuordnung weicht ab oder Test zur Elementidentität schlägt fehl); Erklärung nennt den Index als Schlüssel.' },
    ],
    quiz: [
      { q: 'In einer Liste wird die erste Zeile gelöscht, und ein Eingabetext erscheint plötzlich in der falschen Zeile. Was ist die wahrscheinlichste Ursache?',
        options: ['Die Liste hat mehr als fünf Einträge, was Vue nicht korrekt verarbeitet.', 'Der Fokus liegt auf der Entfernen-Schaltfläche, deshalb wird der Eingabewert verschoben.', 'Der Listenindex dient als :key, daher werden Elemente anhand ihrer Position statt ihrer Identität wiederverwendet.'],
        correct: 2,
        rationales: ['Die Anzahl der Einträge spielt hier keine Rolle; Vue verarbeitet auch lange Listen korrekt.', 'Der Fokus verschiebt keine Eingabewerte; das Problem liegt in der Zuordnung von Elementen.', 'Mit dem Index als Key bekommt die bisherige Zeile 1 den Key 0 und übernimmt das DOM-Element der gelöschten Zeile.'],
        explain: 'Stabile ids als Key sorgen dafür, dass Eingaben mit ihrer Zeile wandern.' },
      { q: 'Wozu dient die immer vorhandene `<p role="status">` im Formular?',
        options: ['Sie zeigt Fehlermeldungen in roter Schrift an, damit Nutzer sie nicht übersehen.', 'Sie meldet Änderungen wie „Zeile 2 entfernt“ an Screenreader, ohne den Fokus zu bewegen.', 'Sie ersetzt die Beschriftung der Felder, damit Label nicht doppelt gelesen werden.'],
        correct: 1,
        rationales: ['Farbe allein ist nicht zugänglich; die Region dient der Ansage, nicht der Optik.', 'Eine Live-Region sagt Textänderungen höflich an; so erfahren Nutzer von Änderungen außerhalb des Fokus.', 'Beschriftungen bleiben über label und id erhalten; die Region hat damit nichts zu tun.'],
        explain: 'Statusmeldungen sollen ohne Fokuswechsel ansagbar sein (WCAG 4.1.3).' },
      { q: 'Warum gibt das Schema am Ende nur { team, emails } zurück und nicht die Zeilen mit key?',
        options: ['Zod kann Objekte mit mehr als zwei Feldern nicht ausgeben und kürzt sie deshalb automatisch.', 'Die Schlüssel dienen nur der Oberfläche; die API-Daten sollen ohne interne Details und im vereinbarten Format ankommen.', 'Die Schlüssel würden beim Senden als JSON automatisch verloren gehen und müssten daher nicht entfernt werden.'],
        correct: 1,
        rationales: ['Zod hat keine solche Grenze; die Ausgabeform legt das Schema mit transform fest.', 'transform trennt Eingabe und Ausgabe (z.input/z.output); interne Schlüssel gehören nicht in den API-Vertrag.', 'JSON.stringify behält alle Eigenschaften; nichts geht automatisch verloren.'],
        explain: 'Die Ausgabe wird mit transform auf den API-Vertrag zugeschnitten; UI-Details bleiben im Formular.' },
    ],
    sources: [
      mit('Zod: Dokumentation (Arrays, refine/superRefine, Fehlerpfade, transform)', 'https://zod.dev/api', 'Zod'),
      vueDocs('Vue: List Rendering (Zustand mit key erhalten)', 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key'),
      vueDocs('Vue: Template Refs in v-for und Funktions-Refs', 'https://vuejs.org/guide/essentials/template-refs.html#refs-inside-v-for'),
      linkOnly('W3C WCAG 2.2: 2.5.3 Label in Name', 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html', 'W3C-Erläuterung; nur verlinkt.'),
      linkOnly('W3C WCAG 2.2: 4.1.3 Statusmeldungen', 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html', 'W3C-Erläuterung; nur verlinkt.'),
      linkOnly('MDN: ARIA Live Regions', 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions', 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt.'),
    ],
    verification: 'Alle 15 Tests im vue-lab grün (Zod 4.6.7, Vue 3.5.45, jsdom). Das Verhalten von Zod bei Zeilenfehlern plus Dubletten wurde beobachtet (eine erste Annahme dazu war falsch und wurde korrigiert). NICHT geprüft: tatsächliche Ansage durch Screenreader (die Live-Region ist nur strukturell getestet), echte Tastaturbedienung im Browser, Verhalten bei sehr vielen Zeilen.',
  },

  // ───────────────────────────── 6: Infinite Queries, Prefetching, Retry ─────────────────────────────
  {
    id: 'js-m4-l6', title: 'Infinite Queries, Prefetching und eine ehrliche Retry-Strategie', minutes: 60,
    prerequisites: 'Lektionen „Query-Cache“ und „Mutationen“ (js-m3-l2, js-m3-l3); Fehlerzustände (js-m1-l11).',
    objectives: [
      'Cursor-basierte Paginierung mit useInfiniteQuery umsetzen (initialPageParam, getNextPageParam, fetchNextPage)',
      'Überlappende Seiten entdoppeln und Lade-, Fehler-, Leer- und Endzustand zugänglich darstellen',
      'Eine Wiederholungsstrategie schreiben, die nur vorübergehende Fehler wiederholt (shouldRetry, exponentielles Warten)',
      'Mit prefetchQuery Details beim Überfahren und Fokussieren vorladen und das Verhalten (kein Retry, Fehler werden verschluckt) richtig einordnen',
    ],
    simple: `Eine Aktivitätsliste mit tausenden Einträgen lädt man nicht auf einmal. Man holt zehn, und mit „Mehr laden“ die nächsten zehn. Damit der Server weiß, wo es weitergeht, schickt er mit jeder Seite einen Zeiger („Cursor“) auf die nächste mit. TanStack Query nennt das eine Infinite Query: Der Cache hält alle bisher geladenen Seiten, und fetchNextPage holt die nächste.

Zwei Dinge machen aus dem Muster eine gute Lösung. Erstens: ehrliche Fehlerbehandlung. Nicht jeder Fehler verdient eine Wiederholung. Ein kurzer Serverfehler (503) vielleicht, ein „Nicht gefunden“ (404) nie. Wer blind wiederholt, belastet einen ohnehin schwächelnden Server und lässt Nutzer sekundenlang auf „Lade …“ blicken.

Zweitens: Wartezeiten verstecken. Wenn die Maus über einem Eintrag schwebt oder er per Tastatur den Fokus erhält, ist ein Klick wahrscheinlich. Dann kann man die Details schon laden („Prefetching“). Beim Klick sind sie da, ohne Wartezeit.`,
    steps: [
      'activityApi.ts beschreibt den Vertrag mit Zod: eine Seite hat items (höchstens 50) und nextCursor (Text oder null). null heißt „letzte Seite“. Wie in Lektion js-m3-l2 wird jede Antwort geprüft, bevor sie in den Cache geht.',
      'useInfiniteQuery braucht drei Dinge: initialPageParam (null: erste Seite ohne Cursor), queryFn mit pageParam und signal (Abbruch) und getNextPageParam, das aus der letzten Seite den nächsten Cursor liest. Gibt es keinen (undefined), ist hasNextPage false.',
      'Die Ergebnisse liegen in data.pages (ein Array von Seiten). Das Beispiel führt sie mit flatMap zusammen und entfernt Dubletten per id: Wird zwischen zwei Abrufen vorn ein Eintrag eingefügt, überlappen sich Seiten. Der Test mit einer manipulierten zweiten Seite zeigt 19 statt 20 Einträge.',
      'Der Knopf „Mehr laden“ ist während des Ladens deaktiviert (isFetchingNextPage). Der Test klickt und prüft, dass genau ein Request für Cursor 10 läuft. Am Ende (hasNextPage false) verschwindet der Knopf, und ein Satz meldet „Alle 25 Einträge geladen.“.',
      'Scheitert das Nachladen, bleiben die geladenen Einträge sichtbar (isFetchNextPageError). Eine Meldung (role="alert") nennt den Fehler, der Knopf heißt „Erneut versuchen“. Nur wenn noch gar nichts geladen ist, ersetzt eine Fehleransicht die Liste.',
      'shouldRetry(failureCount, error) entscheidet pro Fehlversuch: höchstens zweimal, und nur bei vorübergehenden Fehlern: ApiError mit Status ≥ 500, 408 oder 429, und TypeError (so meldet fetch Netzwerkfehler). 400, 401, 403, 404 und 422 werden nicht wiederholt, ebenso unbekannte Fehler (wahrscheinlich Programmierfehler).',
      'backoff(attempt) wartet exponentiell: 1 s, 2 s, 4 s, höchstens 8 s. TanStack nutzt von sich aus 3 Wiederholungen und eine Wartezeit mit Obergrenze 30 s. Wer beides nicht setzt, hält bei einem 404 den Ladezustand unnötig lange. Der Test mit der Detailabfrage hat genau das gezeigt: Ohne shouldRetry blieb „Lade Details …“ stehen. Erst retry: shouldRetry behob es.',
      'prefetchActivity(client, api, id) ruft queryClient.prefetchQuery mit demselben Schlüssel wie die Detailabfrage und staleTime 60 s auf. Wird das Detail danach angeklickt, liest es den Cache; der Test zählt: Kein weiterer Request.',
      'prefetchQuery wiederholt nicht und verschluckt Fehler (beobachtet: ein Versuch, kein Fehler nach außen, kein Cache-Eintrag). Das ist richtig für „vielleicht nützlich“: Scheitert das Vorladen, lädt der spätere Klick regulär und zeigt Fehler sichtbar.',
      'Vorladen auch ohne Maus: Der Test löst den Fokus per Tastatur aus (@focus) und prüft den Request. Eine Funktion nur für Mausnutzer wäre ein Zugänglichkeitsproblem.',
    ],
    background: `Warum Cursor statt Seitenzahl? Bei Seitenzahlen („Seite 3“) verschiebt sich der Inhalt, wenn vorn Einträge hinzukommen oder gelöscht werden: Eintrag 10 steht plötzlich auf zwei Seiten, oder einer fehlt. Ein Cursor zeigt auf „den Eintrag nach diesem“ und ist deshalb stabil. Trotzdem sind Dubletten möglich (Server liefert überlappend, oder ein erneutes Laden mischt Stände), deshalb wird im Client nach id entdoppelt.

Warum „Mehr laden“ statt automatischem Nachladen beim Scrollen? Endloses Scrollen ist für Tastatur- und Screenreader-Nutzer oft schwierig: Das Seitenende (Fußzeile, Kontakt) ist nie erreichbar, der Fokus und die Position springen. Ein Knopf gibt Kontrolle und ist einfach zu testen. Als Ergänzung kann man später mit einem IntersectionObserver automatisch nachladen, solange der Knopf bleibt (progressive Verbesserung). Im Lab fehlt das bewusst: jsdom bietet keinen IntersectionObserver.

Warum nur bestimmte Fehler wiederholen? Es gibt zwei Arten von Fehlern. Vorübergehende (Netz, überlasteter Server) können sich von selbst beheben; Wiederholen hilft. Dauerhafte (404, 422, 403) ändern sich durch Wiederholen nicht; es kostet Zeit und Last. Beim Status 429 („zu viele Anfragen“) und manchen 503 schickt der Server oft einen Retry-After-Header mit der empfohlenen Wartezeit. Das Lab wertet ihn nicht aus; es nutzt den festen Backoff. Eine produktive Lösung sollte den Header lesen (Übung).

Warum Vorladen mit Maßen? Prefetching spart Wartezeit, kostet aber Anfragen auf Verdacht. Auf mobilen Verbindungen oder mit „Datensparmodus“ ist das nicht gewünscht. Vorladen nur bei starkem Signal (Maus über dem Eintrag, Fokus), mit eigener staleTime, und niemals für Aktionen mit Nebenwirkungen.`,
    terms: [
      { term: 'Cursor', text: 'Zeiger, den der Server mit einer Seite mitliefert und der „den nächsten Eintrag“ beschreibt. Stabiler als eine Seitennummer.' },
      { term: 'Infinite Query', text: 'Eine Abfrage, die mehrere Seiten im Cache hält und mit fetchNextPage weitere nachlädt.' },
      { term: 'Backoff (exponentiell)', text: 'Wartezeit zwischen Wiederholungen, die sich verdoppelt (1 s, 2 s, 4 s …), meist mit Obergrenze. Entlastet einen überlasteten Server.' },
      { term: 'Prefetching', text: 'Daten vorab laden, bevor sie gebraucht werden, hier beim Überfahren oder Fokussieren.' },
      { term: 'Dublette', text: 'Derselbe Eintrag taucht in zwei Seiten auf, etwa weil sich der Bestand zwischen den Abrufen verändert hat.' },
      { term: '429 und Retry-After', text: '429 „Too Many Requests“: Der Server bittet um Pause. Der Header Retry-After nennt die empfohlene Wartezeit.' },
    ],
    code: { file: lab + 'src/lessons/infinite/activityQueries.ts', lang: 'TypeScript' },
    code2: { file: lab + 'src/lessons/infinite/ActivityFeed.vue', lang: 'Vue' },
    code3: { file: lab + 'src/lessons/infinite/activityApi.ts', lang: 'TypeScript' },
    order: ['body', 'code', 'code2', 'code3', 'body2'],
    output: `vitest (tests/infinite.spec.ts): 14 Tests grün
 Strategie: shouldRetry(0, 503/429/408/TypeError) true; (2, 503) false; 400/401/403/404/422, Error, "text" false
            backoff [0,1,2,3,4,10] -> [1000, 2000, 4000, 8000, 8000, 8000]
 Feed:      10 -> 20 -> 25 Einträge; Aufrufe: ?limit=10, &cursor=10, &cursor=20; Knopf weg; "Alle 25 Einträge geladen."
            während des Ladens gesperrt (1 Aufruf für Cursor 10)
            503, 503, dann Erfolg: 3 Aufrufe, 10 Einträge; 3x 503: Fehleransicht, "Erneut versuchen" lädt
            Nachladen scheitert (404, keine Wiederholung): 10 Einträge bleiben, Meldung, Wiederholung klappt (20)
            überlappende Seite: 19 statt 20 sichtbare Einträge; leere Liste: "Noch keine Aktivität."
 Prefetch:  mouseenter -> GET /api/activity/3; Klick danach: kein weiterer Aufruf; focus -> GET /api/activity/5
            prefetchQuery bei 500: ein Versuch, kein Fehler nach außen, kein Cache-Eintrag
            Detail 404: "Details nicht verfügbar." (kein endloses "Lade …")`,
    mistakes: [
      { wrong: 'Alle Fehler gleich oft zu wiederholen (Standard: 3 Versuche).',
        why: 'Ein 404 oder 422 ändert sich nicht. Nutzer starren sekundenlang auf „Lade …“, und der Server bekommt unnötig Anfragen.',
        fix: 'retry als Funktion: nur vorübergehende Fehler (Netzwerk, 5xx, 408, 429), begrenzte Versuche und exponentielles Warten.' },
      { wrong: 'Bei einem Fehler beim Nachladen die bereits geladenen Einträge auszublenden.',
        why: 'Nutzer verlieren ihren Stand und Scrollposition wegen einer einzelnen fehlgeschlagenen Seite.',
        fix: 'Vorhandene Einträge zeigen, den Fehler (isFetchNextPageError) neben dem Knopf melden und „Erneut versuchen“ anbieten.' },
      { wrong: 'Seiten ungeprüft zusammenzukleben.',
        why: 'Überlappende Seiten erzeugen doppelte Einträge und doppelte Schlüssel im v-for (Vue-Warnung, falsche Zuordnung).',
        fix: 'Nach id entdoppeln und id als :key verwenden.' },
      { wrong: 'Das Nachladen automatisch beim Scrollen zu erzwingen, ohne Alternative.',
        why: 'Fußzeile und Kontakt sind nicht erreichbar, Tastatur- und Screenreader-Nutzer verlieren Orientierung; Tests werden schwer.',
        fix: 'Zuerst einen Knopf anbieten; automatisches Nachladen höchstens zusätzlich (IntersectionObserver) und abschaltbar.' },
      { wrong: 'Auf Verdacht alles vorzuladen (alle Einträge beim Anzeigen der Liste).',
        why: 'Hohe Last, Datenverbrauch auf mobilen Verbindungen und veraltete Daten, die nie gebraucht werden.',
        fix: 'Nur bei starken Signalen (Hover, Fokus) vorladen, mit staleTime, und Fehler beim Vorladen nicht anzeigen.' },
      { wrong: 'Nur mit der Maus vorzuladen.',
        why: 'Tastaturnutzer haben dann keinen Vorteil; ihre Klicks starten die Anfrage erst beim Aktivieren.',
        fix: 'Zusätzlich @focus verwenden (im Beispiel getestet).' },
      { wrong: 'Den Retry-After-Header bei 429 zu ignorieren.',
        why: 'Eine feste Wartezeit kann kürzer sein als vom Server erbeten; die Anfragen verschärfen die Überlastung.',
        fix: 'Header auswerten und die längere der beiden Zeiten abwarten; das Lab zeigt nur den festen Backoff (Übung).' },
    ],
    practice: 'Lege für jede Abfrage fest: Wie viele Wiederholungen, mit welcher Wartezeit, welche Fehler zählen? Dokumentiere es als kleine Tabelle (Status → Wiederholen ja/nein). Für Listen: Welche Zustände gibt es (Laden, Fehler, leer, Daten, Nachladen, Nachladefehler, Ende), und wo erscheinen sie im UI? Teste jeden dieser Zustände. Behandle Vorladen als Optimierung, nicht als Funktion: Die Anwendung muss ohne sie genauso korrekt funktionieren.',
    exercises: [
      { task: 'Werte bei 429 und 503 den Retry-After-Header aus (Sekunden) und nutze ihn als Wartezeit, wenn er größer als der Backoff ist. Schreibe Tests mit und ohne Header.', acceptance: 'Mit Header "3" wartet der Client mindestens 3000 ms; ohne Header gilt backoff; ungültige Werte (negativ, Text) werden ignoriert.' },
      { task: 'Grenzfall: Lasse den Server eine zweite Seite mit genau 0 Einträgen und nextCursor null liefern. Was zeigt die Liste, und wie verhält sich der Knopf?', acceptance: 'Die zehn ersten Einträge bleiben, der Knopf verschwindet, der Status meldet das Ende; es gibt keinen Fehlerzustand.' },
      { task: 'Fehlerfall: Entferne retry: shouldRetry aus useActivityDetail und rufe einen nicht vorhandenen Eintrag auf. Messe, wie lange „Lade Details …“ angezeigt wird, und vergleiche mit der Version mit shouldRetry.', acceptance: 'Ohne shouldRetry erscheint die Fehlermeldung erst nach mehreren Versuchen mit Wartezeit (Standard: 3 Versuche); mit shouldRetry sofort. Die Zeiten sind notiert.' },
    ],
    quiz: [
      { q: 'Der Server antwortet auf eine Detailabfrage mit 404. Was sollte die Wiederholungsstrategie tun?',
        options: ['Dreimal wiederholen, denn vielleicht existiert der Eintrag beim nächsten Versuch doch.', 'Nicht wiederholen und sofort den Fehlerzustand zeigen, denn ein 404 ändert sich durch Wiederholen nicht.', 'Unbegrenzt wiederholen, bis der Server den Eintrag liefert, damit nichts verloren geht.'],
        correct: 1,
        rationales: ['Das ist der TanStack-Standard, verlängert aber bei dauerhaften Fehlern nur die Wartezeit und belastet den Server.', 'Dauerhafte Clientfehler (4xx) werden nicht wiederholt; nur Netzwerk, 5xx, 408 und 429 sind vorübergehend.', 'Eine unbegrenzte Wiederholung erzeugt eine Dauerlast und blockiert die Anzeige.'],
        explain: 'shouldRetry wiederholt nur vorübergehende Fehler; 404 bleibt ein sofort sichtbarer Fehler.' },
      { q: 'Zwischen zwei Seitenabrufen wurde vorn ein Eintrag eingefügt, und Eintrag 10 steht auf Seite 1 und 2. Wie vermeidet die Liste doppelte Zeilen?',
        options: ['Sie lädt nach jedem Abruf alle Seiten neu, damit der Stand sicher einheitlich ist.', 'Sie verwendet die Seitenposition als Schlüssel, damit Vue die Zeilen automatisch trennt.', 'Sie führt die Seiten zusammen und entfernt Einträge mit bereits gesehener id.'],
        correct: 2,
        rationales: ['Das wäre teuer und löst das Problem nur teilweise, weil sich der Bestand auch danach ändern kann.', 'Die Position ist kein Merkmal des Eintrags; doppelte Zeilen blieben bestehen und Schlüssel kollidieren.', 'Nach id zu entdoppeln ist einfach, schnell und im Test belegt (19 statt 20 Einträge).'],
        explain: 'Entdoppeln nach id schützt vor überlappenden Seiten und doppelten Schlüsseln.' },
      { q: 'Warum zeigt die Anwendung Fehler von prefetchQuery nicht an?',
        options: ['Vorladen ist eine Optimierung auf Verdacht; scheitert es, lädt der spätere Klick regulär und zeigt Fehler dort.', 'Fehler beim Vorladen sind immer harmlos und müssen deshalb nie behandelt oder beachtet werden.', 'prefetchQuery kann technisch keine Fehler auslösen, weil es nur im Cache arbeitet.'],
        correct: 0,
        rationales: ['prefetchQuery verschluckt Fehler und wiederholt nicht; die eigentliche Abfrage macht später sichtbar, was schiefgeht.', 'Sie sind nicht immer harmlos; sie betreffen nur nicht die aktuelle Nutzeraktion, und die Anzeige bleibt korrekt ohne Vorladen.', 'prefetchQuery sendet eine echte Anfrage, die scheitern kann; das Ergebnis ist nur ein leerer Cache-Eintrag.'],
        explain: 'Vorladen ist optional: Scheitert es, lädt der Klick normal und zeigt Fehler dort an.' },
    ],
    sources: [
      mit('TanStack Query (Vue): Infinite Queries', 'https://tanstack.com/query/latest/docs/framework/vue/guides/infinite-queries', 'TanStack Query'),
      mit('TanStack Query (Vue): Query Retries', 'https://tanstack.com/query/latest/docs/framework/vue/guides/query-retries', 'TanStack Query'),
      mit('TanStack Query (Vue): Prefetching und Router-Integration', 'https://tanstack.com/query/latest/docs/framework/vue/guides/prefetching', 'TanStack Query'),
      linkOnly('RFC 6585: 429 Too Many Requests', 'https://www.rfc-editor.org/rfc/rfc6585.html#section-4', 'IETF-Standard; nur verlinkt.'),
      linkOnly('MDN: Retry-After', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After', 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt.'),
      linkOnly('MDN: Intersection Observer API', 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API', 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt.'),
    ],
    verification: 'Alle 14 Tests im vue-lab grün (@tanstack/vue-query 5.107.1, Zod 4.6.7, Cursor-Server in der Testdatei). Standard-Retry (3 Versuche, Wartezeit bis 30 s) wurde der Dokumentation entnommen; das Verhalten von prefetchQuery (kein Retry, Fehler verschluckt) wurde mit einem Probelauf beobachtet. NICHT geprüft: echter Server, mobile Netze, automatisches Nachladen per IntersectionObserver, Auswertung von Retry-After (Übung), Screenreader-Ansage der Statuszeilen.',
  },
];
