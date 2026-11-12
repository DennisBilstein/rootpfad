// Lektion "Sequenced Collections und neue Alltags-APIs" (Java 21+, final).
// Ausführen: java SequencedDemo.java
import java.util.*;

public class SequencedDemo {
    public static void main(String[] args) {
        List<String> queue = new ArrayList<>(List.of("b", "c", "d"));
        queue.addFirst("a");
        queue.addLast("e");
        System.out.println(queue + " first=" + queue.getFirst() + " last=" + queue.getLast());

        // reversed() ist eine SICHT, keine Kopie: Änderungen wirken auf beide Seiten.
        List<String> view = queue.reversed();
        view.addFirst("Z");              // landet hinten in der Originalliste
        System.out.println(view + " | Original: " + queue);

        LinkedHashMap<String, Integer> scores = new LinkedHashMap<>();
        scores.put("anna", 3);
        scores.put("ben", 5);
        scores.putFirst("clara", 9);     // Java 21: Position ist steuerbar
        System.out.println(scores + " firstEntry=" + scores.firstEntry() + " lastEntry=" + scores.lastEntry());
        System.out.println(scores.reversed());

        LinkedHashSet<Integer> ids = new LinkedHashSet<>(List.of(1, 2, 3));
        ids.addFirst(3);                 // bestehendes Element wandert nach vorn
        System.out.println(ids);

        try {
            new ArrayList<String>().getFirst();
        } catch (NoSuchElementException e) {
            System.out.println("Leere Liste: getFirst() wirft NoSuchElementException");
        }
        try {
            List.of(1, 2).reversed().addFirst(9);
        } catch (UnsupportedOperationException e) {
            System.out.println("Unveränderliche Liste: addFirst() über reversed() wirft UnsupportedOperationException");
        }
    }
}
