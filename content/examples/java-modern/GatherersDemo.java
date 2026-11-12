// Lektion "Stream Gatherers und unbenannte Variablen".
// Gatherer: final seit Java 24 (JEP 485). Unbenannte Variablen "_": final seit Java 22 (JEP 456).
// Ausführen: java GatherersDemo.java   (JDK 24 oder neuer)
import java.util.List;
import java.util.Map;
import java.util.stream.Gatherer;
import java.util.stream.Gatherers;
import java.util.stream.Stream;

public class GatherersDemo {

    // Eigener Gatherer: entfernt direkt aufeinanderfolgende Duplikate (zustandsbehaftet).
    static <T> Gatherer<T, ?, T> dropConsecutiveDuplicates() {
        return Gatherer.ofSequential(
            () -> new Object() { T last; boolean hasLast; },
            (state, element, downstream) -> {
                if (state.hasLast && state.last.equals(element)) return true;   // weiter, nichts ausgeben
                state.last = element;
                state.hasLast = true;
                return downstream.push(element);                                 // false = Downstream will nichts mehr
            });
    }

    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2, 3, 4, 5, 6, 7).gather(Gatherers.windowFixed(3)).toList());
        System.out.println(Stream.of(1, 2, 3, 4, 5).gather(Gatherers.windowSliding(2)).toList());
        System.out.println(Stream.of(1, 2, 3, 4).gather(Gatherers.scan(() -> 0, Integer::sum)).toList());
        System.out.println(Stream.of("a", "b", "b", "b", "c", "a", "a").gather(dropConsecutiveDuplicates()).toList());

        // Parallel begrenzte Abbildung mit virtuellen Threads (z. B. für blockierende Aufrufe).
        List<String> pages = Stream.of(1, 2, 3, 4, 5, 6)
            .gather(Gatherers.mapConcurrent(3, id -> "Seite-" + id))
            .toList();
        System.out.println(pages);

        // Unbenannte Variablen: "_" macht sichtbar, dass ein Wert bewusst nicht gebraucht wird.
        Map<String, Integer> counts = Map.of("a", 1, "b", 2, "c", 3);
        int entries = 0;
        for (var _ : counts.entrySet()) entries++;
        System.out.println("Einträge: " + entries);

        try {
            Integer.parseInt("kaputt");
        } catch (NumberFormatException _) {
            System.out.println("Ungültige Zahl, Ausnahme bewusst nicht weiterverwendet");
        }
    }
}
