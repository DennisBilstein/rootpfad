# Hintergrundverarbeitung & Application Jobs

*Integration & Hintergrundverarbeitung · ca. 7 Min.*

Massenverarbeitung gehört nicht in den Dialog. Klassisch werden Reports als **Hintergrundjob** eingeplant (SM36/SM37); im ABAP-Cloud-Modell gibt es dafür **Application Jobs**, die Fachanwender selbst über eine Fiori-App einplanen können.

Technisch definierst du dazu eine Job-Katalogeintrag-Klasse mit den Interfaces `IF_APJ_DT_EXEC_OBJECT` (Design Time: Parameterprüfung) und `IF_APJ_RT_EXEC_OBJECT` (Runtime: die eigentliche Ausführung).

Drei Regeln für robuste Hintergrundläufe:

-   **Wiederaufsetzbar** gestalten: Ein abgebrochener Lauf muss erneut startbar sein, ohne Daten doppelt zu verarbeiten.
-   **Paketweise committen** statt alles am Ende — aber in fachlich sinnvollen Einheiten (z. B. je Beleg, nicht je Feld).
-   **Protokollieren ins Application Log**, nicht auf die Liste (siehe Modul 18).

```abap
CLASS zcl_job_rechnungslauf DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_apj_dt_exec_object.
    INTERFACES if_apj_rt_exec_object.
ENDCLASS.

CLASS zcl_job_rechnungslauf IMPLEMENTATION.
  METHOD if_apj_rt_exec_object~execute.
    " Selektion, Verarbeitung in Paketen, Protokollierung
  ENDMETHOD.

  METHOD if_apj_dt_exec_object~get_parameters.
    " Parameter fuer die Einplanungs-App bereitstellen
  ENDMETHOD.
ENDCLASS.
```

> **Tipp:** Die Frage, die in Reviews von Hintergrundläufen fast immer zu selten gestellt wird: „Was passiert, wenn der Job nachts um 3 Uhr nach 80 % abbricht?" Wenn die Antwort lautet „dann muss jemand von Hand aufräumen", ist der Job nicht produktionsreif. Wiederaufsetzbarkeit ist kein Luxus, sondern die Grundvoraussetzung für unbeaufsichtigte Verarbeitung.

## Kontrollfragen

**1. Welche Interfaces braucht eine Application-Job-Klasse in ABAP Cloud?**

- [x] IF_APJ_DT_EXEC_OBJECT und IF_APJ_RT_EXEC_OBJECT
- [ ] IF_OO_ADT_CLASSRUN allein
- [ ] IF_AMDP_MARKER_HDB

*Erklärung:* DT liefert die Parameterdefinition für die Einplanungs-App, RT enthält die eigentliche Ausführungslogik.

**2. Was ist die wichtigste Eigenschaft eines produktionsreifen Hintergrundlaufs?**

- [ ] Er schreibt möglichst viele WRITE-Ausgaben
- [x] Er ist nach Abbruch wiederaufsetzbar, ohne doppelt zu verarbeiten
- [ ] Er läuft ausschließlich nachts

*Erklärung:* Unbeaufsichtigte Verarbeitung muss einen Abbruch verkraften, ohne manuelle Aufräumarbeit zu erzwingen.
