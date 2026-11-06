# Lambdas und funktionale Interfaces

*Lambdas, Streams & funktionale Programmierung · ca. 9 Min.*

Ein **Lambda** ist eine kompakt geschriebene Funktion. Möglich ist das überall dort, wo ein **funktionales Interface** erwartet wird — ein Interface mit genau einer abstrakten Methode.

| Interface | Signatur | Typischer Einsatz |
| --- | --- | --- |
| Predicate<T> | T → boolean | filter() |
| Function<T,R> | T → R | map() |
| Consumer<T> | T → void | forEach() |
| Supplier<T> | () → T | Lazy-Erzeugung, orElseGet() |
| BinaryOperator<T> | (T,T) → T | reduce() |

**Methodenreferenzen** (`::`) sind die Kurzform für Lambdas, die nichts weiter tun als eine bestehende Methode aufzurufen.

```java
// Lambda in vier Schreibweisen — alle gleichwertig
Predicate<String> leer1 = (String s) -> { return s.isBlank(); };
Predicate<String> leer2 = (s) -> s.isBlank();
Predicate<String> leer3 = s -> s.isBlank();
Predicate<String> leer4 = String::isBlank;        // Methodenreferenz

// Eigenes funktionales Interface
@FunctionalInterface
interface Rabattregel {
    BigDecimal berechne(BigDecimal betrag);
}
Rabattregel standard = b -> b.multiply(new BigDecimal("0.05"));

// Funktionen verketten
Function<String, String> trimmen = String::trim;
Function<String, String> pipeline = trimmen.andThen(String::toUpperCase);
```

> **Tipp:** Setz die Annotation @FunctionalInterface an eigene funktionale Interfaces. Sie ist technisch nicht nötig, aber der Compiler prüft dann, dass wirklich nur eine abstrakte Methode existiert. Fügt später jemand eine zweite hinzu, bricht der Build sofort — statt an hundert Lambda-Aufrufstellen gleichzeitig.

## Kontrollfragen

**1. Was kennzeichnet ein funktionales Interface?**

- [x] Es hat genau eine abstrakte Methode
- [ ] Es hat keine Methoden
- [ ] Es erbt von Function

*Erklärung:* Default- und statische Methoden sind zusätzlich erlaubt — nur eine abstrakte Methode darf es geben.

**2. Welches Interface passt zu filter()?**

- [ ] Function
- [x] Predicate
- [ ] Consumer

*Erklärung:* filter() erwartet eine Bedingung, also T → boolean.
