// Lektion "Structured Concurrency und Scoped Values".
// ScopedValue ist seit Java 25 final. StructuredTaskScope ist in Java 26 noch Preview (JEP 525).
// Ausführen (JDK 26): java --enable-preview --source 26 StructuredScopesDemo.java
import java.time.Duration;
import java.util.concurrent.StructuredTaskScope;
import java.util.concurrent.StructuredTaskScope.Joiner;
import java.util.concurrent.StructuredTaskScope.Subtask;

public class StructuredScopesDemo {

    static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();

    static String findUser() throws InterruptedException {
        Thread.sleep(Duration.ofMillis(100));
        return "anna (Request " + REQUEST_ID.get() + ")";   // Wert wird in Kind-Threads vererbt
    }

    static int fetchOrderCount() throws InterruptedException {
        Thread.sleep(Duration.ofMillis(150));
        return 3;
    }

    static int failingCall() throws InterruptedException {
        Thread.sleep(Duration.ofMillis(50));
        throw new IllegalStateException("Bestellsystem nicht erreichbar");
    }

    static String slowCall() throws InterruptedException {
        try {
            Thread.sleep(Duration.ofSeconds(10));       // würde ohne Scope weiterlaufen
            return "zu spät";
        } catch (InterruptedException e) {
            System.out.println("  slowCall wurde abgebrochen (interrupt)");
            throw e;
        }
    }

    public static void main(String[] args) throws Exception {
        // 1) Beide Teilaufgaben müssen gelingen; scope.join() wirft sonst eine Ausnahme.
        ScopedValue.where(REQUEST_ID, "r-42").run(() -> {
            try (var scope = StructuredTaskScope.open()) {
                Subtask<String> user = scope.fork(StructuredScopesDemo::findUser);
                Subtask<Integer> orders = scope.fork(StructuredScopesDemo::fetchOrderCount);
                scope.join();
                System.out.println("1) " + user.get() + ", Bestellungen: " + orders.get());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        // 2) Fehlerfall: Eine Teilaufgabe scheitert, die langsame wird automatisch abgebrochen.
        try (var scope = StructuredTaskScope.open()) {
            scope.fork(StructuredScopesDemo::slowCall);
            scope.fork(StructuredScopesDemo::failingCall);
            scope.join();
        } catch (StructuredTaskScope.FailedException e) {
            System.out.println("2) Gescheitert: " + e.getCause().getMessage());
        }

        // 3) Wettlauf: Das erste erfolgreiche Ergebnis zählt, der Rest wird abgebrochen (Java 26: anySuccessfulOrThrow).
        try (var scope = StructuredTaskScope.open(Joiner.<String>anySuccessfulOrThrow())) {
            scope.fork(() -> { Thread.sleep(Duration.ofMillis(300)); return "Mirror B"; });
            scope.fork(() -> { Thread.sleep(Duration.ofMillis(50)); return "Mirror A"; });
            System.out.println("3) Schnellste Antwort: " + scope.join());
        }
    }
}
