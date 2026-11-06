# Sicherheitsgrundlagen für Anwendungsentwickler

*Anti-Patterns & rote Linien · ca. 9 Min.*

Sicherheit ist keine Spezialdisziplin, sondern Teil normaler Sorgfalt. Die wichtigsten Punkte für Java-Anwendungen:

-   **Eingaben validieren** — grundsätzlich mit Positivlisten (was ist erlaubt), nicht mit Negativlisten (was ist verboten).
-   **SQL-Injection** — ausschließlich `PreparedStatement` (Modul 17).
-   **Passwörter** — niemals im Klartext oder mit MD5/SHA-1. Korrekt ist ein langsames Verfahren mit Salt: **bcrypt**, **scrypt** oder **Argon2**.
-   **Geheimnisse** gehören nicht in den Quelltext und nicht ins Repository, sondern in Umgebungsvariablen oder einen Secret Store.
-   **Zufallszahlen** für Tokens mit `SecureRandom`, nie mit `Random`.
-   **Fehlermeldungen nach außen** dürfen keine Stacktraces, SQL-Fragmente oder Pfade enthalten — das ist Aufklärungsmaterial für Angreifer.

```java
// Falsch: schnelles Hashverfahren, kein Salt
String hash = DigestUtils.md5Hex(passwort);        // in Sekunden knackbar

// Richtig: bewusst langsam, mit Salt
String hash = BCrypt.hashpw(passwort, BCrypt.gensalt(12));
boolean ok  = BCrypt.checkpw(eingabe, hash);

// Token sicher erzeugen
byte[] token = new byte[32];
new SecureRandom().nextBytes(token);
String base64 = Base64.getUrlEncoder().withoutPadding().encodeToString(token);

// Geheimnisse aus der Umgebung, nicht aus dem Code
String dbPass = System.getenv("DB_PASSWORD");
```

> **Tipp:** Dass Passwort-Hashing absichtlich langsam sein soll, wirkt zunächst widersinnig. Der Grund: Ein Angreifer mit gestohlener Datenbank probiert Milliarden Kandidaten durch. MD5 schafft davon Milliarden pro Sekunde, bcrypt mit Kostenfaktor 12 nur einige Dutzend. Für deinen Login ist ein Zehntelsekunde unmerklich — für den Angreifer wird aus Stunden ein Jahrhundert.

## Kontrollfragen

**1. Womit speichert man Passwörter korrekt?**

- [ ] MD5
- [ ] SHA-256 ohne Salt
- [x] bcrypt, scrypt oder Argon2 mit Salt

*Erklärung:* Bewusst langsame Verfahren mit Salt machen massenhaftes Durchprobieren unwirtschaftlich.

**2. Welche Klasse erzeugt sicherheitstaugliche Zufallswerte?**

- [ ] Random
- [x] SecureRandom
- [ ] Math.random()

*Erklärung:* Random ist vorhersagbar und für Tokens oder Schlüssel ungeeignet.
