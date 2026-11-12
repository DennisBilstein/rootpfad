// Lektion "Pattern Matching für switch und Record Patterns" (Java 21+, final).
// Ausführen: java PatternSwitchDemo.java
import java.math.BigDecimal;

public class PatternSwitchDemo {

    record Money(BigDecimal amount, String currency) {}
    record Point(int x, int y) {}

    static String describe(Object input) {
        return switch (input) {
            case null -> "kein Wert";
            case Integer i when i < 0 -> "negative Zahl " + i;
            case Integer i -> "Zahl " + i;
            case String s when s.isBlank() -> "leerer Text";
            case String s -> "Text mit " + s.length() + " Zeichen";
            case Money(var amount, var currency) when amount.signum() == 0 -> "kostenlos in " + currency;
            case Money(var amount, var currency) -> amount + " " + currency;
            case Point(int x, int y) when x == y -> "Diagonalpunkt " + x;
            case Point(int x, int y) -> "Punkt (" + x + "|" + y + ")";
            default -> "unbekannt: " + input.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        Object[] samples = {
            null, -4, 7, "  ", "Java",
            new Money(BigDecimal.ZERO, "EUR"), new Money(new BigDecimal("19.90"), "EUR"),
            new Point(3, 3), new Point(1, 2), 3.5
        };
        for (Object sample : samples) System.out.println(describe(sample));
    }
}
