// Lektion "Sealed Types und Records als Domänenmodell" (Java 21+, final).
// Ausführen: java SealedResultDemo.java
public class SealedResultDemo {

    sealed interface Result<T> permits Ok, Failure {}
    record Ok<T>(T value) implements Result<T> {}
    record Failure<T>(String reason, int code) implements Result<T> {}

    sealed interface PaymentMethod permits Card, Invoice, Voucher {}
    record Card(String lastFour) implements PaymentMethod {}
    record Invoice(int dueDays) implements PaymentMethod {}
    record Voucher(String code, int percent) implements PaymentMethod {}

    // Kein default: Der Compiler prüft Vollständigkeit. Kommt ein vierter Typ hinzu,
    // schlägt die Kompilierung hier fehl - nicht erst ein Test oder die Produktion.
    static String label(PaymentMethod method) {
        return switch (method) {
            case Card(var lastFour) -> "Karte ****" + lastFour;
            case Invoice(var dueDays) -> "Rechnung, zahlbar in " + dueDays + " Tagen";
            case Voucher(var code, var percent) -> "Gutschein " + code + " (-" + percent + " %)";
        };
    }

    static Result<Integer> parseAge(String text) {
        try {
            int age = Integer.parseInt(text.trim());
            return age < 0 ? new Failure<>("Alter darf nicht negativ sein", 422) : new Ok<>(age);
        } catch (NumberFormatException e) {
            return new Failure<>("Keine Zahl: '" + text + "'", 400);
        }
    }

    public static void main(String[] args) {
        System.out.println(label(new Card("4242")));
        System.out.println(label(new Invoice(14)));
        System.out.println(label(new Voucher("SOMMER", 10)));
        for (String input : new String[] {"42", "-1", "abc"}) {
            String message = switch (parseAge(input)) {
                case Ok<Integer>(var value) -> "OK: " + value;
                case Failure<Integer>(var reason, var code) -> "Fehler " + code + ": " + reason;
            };
            System.out.println(message);
        }
    }
}
