# Actuator, Observability und Produktionsbetrieb

*Testen, Sicherheit & Betrieb · ca. 9 Min.*

**Spring Boot Actuator** liefert Betriebsendpunkte ohne eigenen Code: `/actuator/health` für Kubernetes-Probes (mit `liveness` und `readiness`), `/actuator/metrics` und `/actuator/prometheus` für Kennzahlen, `/actuator/info` für Buildinformationen.

Wichtig: **Nur freigeben, was gebraucht wird.** Endpunkte wie `env`, `heapdump` oder `configprops` verraten Konfiguration und Speicherinhalte — sie gehören abgesichert oder abgeschaltet.

Für die Fehlersuche über Systemgrenzen hinweg ist **verteiltes Tracing** (Micrometer Tracing) entscheidend: Jede Anfrage erhält eine Trace-ID, die durch alle beteiligten Dienste und in jede Logzeile wandert.

```yaml
# application-prod.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus     # bewusst nur diese drei
  endpoint:
    health:
      probes:
        enabled: true                       # liveness + readiness
      show-details: when-authorized

logging:
  pattern:
    level: "%5p [${spring.application.name},%X{traceId:-},%X{spanId:-}]"
```

> **Tipp:** Die Unterscheidung zwischen Liveness und Readiness rettet Produktionsbetrieb: Liveness beantwortet „läuft der Prozess noch?" — ist sie rot, wird der Container neu gestartet. Readiness beantwortet „kann er gerade Anfragen bedienen?" — ist sie rot, bekommt er nur keinen Verkehr mehr. Wer eine Datenbankprüfung in die Liveness-Probe legt, bewirkt bei einem kurzen Datenbankausfall einen Neustart aller Instanzen gleichzeitig. Externe Abhängigkeiten gehören in Readiness, nie in Liveness.

## Kontrollfragen

**1. Welche Actuator-Endpunkte sollten in Produktion offen sein?**

- [ ] Alle, für maximale Transparenz
- [x] Nur die benötigten, etwa health, info und prometheus
- [ ] Keine

*Erklärung:* Endpunkte wie env oder heapdump verraten Konfiguration und Speicherinhalte.

**2. Was gehört NICHT in eine Liveness-Probe?**

- [ ] Eine Prüfung, ob der Prozess arbeitsfähig ist
- [x] Die Erreichbarkeit der Datenbank
- [ ] Ein einfacher Statuswert

*Erklärung:* Sonst löst ein kurzer Datenbankausfall den Neustart aller Instanzen aus — externe Abhängigkeiten gehören in Readiness.
