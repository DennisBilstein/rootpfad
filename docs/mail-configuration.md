# Passwortwiederherstellung konfigurieren

Umgebungsvariablen über Shell/Prozessmanager setzen, keine echten Secrets in Git:

- `PUBLIC_BASE_URL`: feste Origin, Produktion ausschließlich HTTPS, kein Unterpfad.
- `MAIL_MODE=disabled`: kein Versand, neutrale Benutzerantwort.
- `MAIL_MODE=development`: nur außerhalb Produktion; private JSON-Vorschauen unter
  `.data/mail-preview/`, keine öffentliche Route. **Keine E-Mail gesendet.**
- `MAIL_MODE=smtp`: benötigt `SMTP_HOST`, `MAIL_FROM`, optional `SMTP_USER` und
  `SMTP_PASSWORD`; `SMTP_PORT` standardmäßig 587, `SMTP_SECURE=true` für implizites
  TLS (typisch Port 465), sonst erzwungenes STARTTLS. Keine deaktivierte Zertifikatsprüfung.

Token ist 15 Minuten gültig, einmalig, serverseitig nur gehasht gespeichert.
Links werden nie aus einem beliebigen Request-Host erzeugt. Kein automatischer
Login nach Reset; Sitzungen werden widerrufen. Neutrale Antworten verhindern
direkte Kontoabfrage, stellen aber keine vollständige Timing-/SMTP-Seitenkanalgarantie dar.
Mailzustellung,DNS/SPF/DKIM/DMARC und Bouncehandling separat in der Zielumgebung prüfen.

Kontolöschung entfernt aktive Benutzer-,Sitzungs-,Reset- und Fortschrittsdatensätze.
Backups,Downloads,Mailserver und andere Geräte folgen eigener Aufbewahrung;
keine forensische Datenvernichtungszusage. Letzten Admin erst nach geregelter
Übergabe löschen; dafür gibt es noch keine automatische Admin-Beförderungsoberfläche.
