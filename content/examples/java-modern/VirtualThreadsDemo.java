// Lektion "Virtual Threads: wann sie helfen und wann nicht" (Java 21+, final).
// Ausführen: java VirtualThreadsDemo.java
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class VirtualThreadsDemo {

    static String slowCall(int id) throws InterruptedException {
        Thread.sleep(Duration.ofMillis(200));   // simuliert blockierendes I/O
        return "antwort-" + id;
    }

    public static void main(String[] args) throws Exception {
        long start = System.nanoTime();
        List<Future<String>> futures = new ArrayList<>();
        // Pro Aufgabe ein neuer virtueller Thread: NICHT poolen, die sind billig.
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 5_000; i++) {
                final int id = i;
                futures.add(executor.submit(() -> slowCall(id)));
            }
        } // close() wartet, bis alle Aufgaben beendet sind
        long ms = Duration.ofNanos(System.nanoTime() - start).toMillis();
        System.out.println("5000 Aufgaben à 200 ms in " + ms + " ms (sequenziell wären das 1000 s)");
        System.out.println("letztes Ergebnis: " + futures.getLast().get());

        // Begrenzung einer knappen Ressource (z. B. Datenbankverbindungen) mit Semaphore statt Poolgröße.
        Semaphore permits = new Semaphore(10);
        AtomicInteger maxParallel = new AtomicInteger();
        AtomicInteger running = new AtomicInteger();
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 200; i++) {
                executor.submit(() -> {
                    permits.acquire();
                    try {
                        maxParallel.accumulateAndGet(running.incrementAndGet(), Math::max);
                        Thread.sleep(20);
                        running.decrementAndGet();
                    } finally {
                        permits.release();
                    }
                    return null;
                });
            }
        }
        System.out.println("max. gleichzeitig: " + maxParallel.get() + " (Limit 10)");

        Thread t = Thread.ofVirtual().name("demo-vthread").start(() ->
            System.out.println("virtuell? " + Thread.currentThread().isVirtual()));
        t.join();
    }
}
