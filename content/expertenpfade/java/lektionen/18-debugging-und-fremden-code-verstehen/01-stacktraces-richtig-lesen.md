# Stacktraces richtig lesen

*Debugging & fremden Code verstehen · ca. 8 Min.*

Ein Stacktrace ist kein Rauschen, sondern ein präzises Protokoll. So liest man ihn:

1.  **Erste Zeile**: Exception-Typ und Meldung — das WAS.
2.  **Oberste `at`\-Zeile**: wo es geknallt hat.
3.  **Von oben nach unten** lesen, bis die erste Zeile *deines* Codes auftaucht — dort liegt fast immer die Ursache.
4.  **`Caused by`** am Ende ist der eigentliche Auslöser. Bei verschachtelten Ursachen ist das *unterste* „Caused by" die Wurzel.

Bei einer `NullPointerException` auf Java 14+ zeigen die **Helpful NullPointerExceptions** exakt, welche Referenz null war — ein enormer Fortschritt gegenüber der früheren nackten Meldung.

```java
Exception in thread "main" java.lang.IllegalStateException: Konto gesperrt
    at com.firma.KontoService.abbuchen(KontoService.java:84)    <- dein Code: hier ansetzen
    at com.firma.ZahlungsJob.run(ZahlungsJob.java:31)
    at java.base/java.lang.Thread.run(Thread.java:1583)
Caused by: java.sql.SQLException: connection timed out
    at org.postgresql.Driver.connect(Driver.java:259)          <- die eigentliche Wurzel

// Helpful NPE (Java 14+):
// Cannot invoke "Adresse.ort()" because the return value of
// "Kunde.adresse()" is null
```

> **Tipp:** Der häufigste Anfängerfehler beim Debuggen ist, den Stacktrace nur zu überfliegen und sofort im obersten Framework-Frame zu suchen. Scroll stattdessen bis zur ersten Zeile mit deinem Paketnamen — und lies immer bis zum letzten „Caused by". In neun von zehn Fällen steht die Antwort dort, und das Lesen dauert zwanzig Sekunden.

## Kontrollfragen

**1. Welcher Teil eines Stacktrace nennt die eigentliche Ursache?**

- [ ] Die erste at-Zeile
- [x] Das unterste "Caused by"
- [ ] Die letzte Zeile der Datei

*Erklärung:* Verschachtelte Ursachen werden von außen nach innen aufgeführt — ganz unten steht die Wurzel.

**2. Was bringen Helpful NullPointerExceptions ab Java 14?**

- [ ] Sie verhindern NPEs
- [x] Sie nennen genau, welche Referenz null war
- [ ] Sie unterdrücken die Meldung

*Erklärung:* Statt einer nackten NPE bekommst du den konkreten Ausdruck genannt.
