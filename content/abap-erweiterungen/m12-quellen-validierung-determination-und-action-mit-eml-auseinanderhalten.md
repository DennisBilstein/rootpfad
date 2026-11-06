# Validierung, Determination und Action mit EML auseinanderhalten

Modul: abap-m12 · 50 Minuten

Drei ähnliche Begriffe lösen unterschiedliche Aufgaben. Eine Determination setzt oder berechnet Werte aufgrund deklarierter Trigger. Eine Validation prüft Konsistenz und kann das Speichern ungültiger Instanzen verhindern. Eine Action bietet eine explizit aufgerufene fachliche Operation außerhalb des Standard-CRUD. Für unsere Reise heißt das: Status beim Anlegen vorbelegen, Datumsbereich beim Speichern prüfen und eine Reise bewusst freigeben. Die Deklarationen stehen in der BDEF; Quick Fix in ADT erzeugt passende Methodensignaturen im Behavior Pool.

Arbeitsbeispiel: Eine neue Reise ohne Status erhält N. Eine bereits befüllte Reise behält ihren Status, auch wenn die Vorbelegungslogik erneut ausgelöst wird. Die gezeigte eigene Determination liest deshalb mit READ ENTITIES aus dem BO-Zustand, entfernt bereits befüllte Instanzen und aktualisiert nur die verbleibenden. EML ist der ABAP-Zugang zum Business Object, nicht bloß ein anderer Name für direktes Tabellen-SQL. IN LOCAL MODE ist hier für den Zugriff auf das eigene BO im Behavior Pool vorgesehen und umgeht dabei bestimmte Kontrollen; es ist kein allgemeiner Freibrief zum Umgehen fremder Berechtigungen.

Die Datumsvalidierung weist etwa EndDate kleiner BeginDate zurück. Dafür gehören betroffene Schlüssel nach failed und verständliche Meldungen nach reported; über %element kann die Meldung einem Feld zugeordnet werden. Eine reine Textmeldung ist nicht dasselbe wie eine zurückgewiesene Instanz. Validations besitzen den Zeitpunkt on save; ihre Reihenfolge ist nicht fest. Nach der geprüften SAP-Lektion sind deklarative Validations in managed sowie unmanaged mit Draft vorgesehen, nicht pauschal in unmanaged ohne Draft. Eine Action wie approve muss außerdem in der Behavior Projection freigegeben werden, bevor ein Verbraucher sie dort verwenden kann.

Übung: Schreibe eine Tabelle mit Eingabe, erwarteter Statusvorbelegung und erwartetem Speicherergebnis für vier Fälle: leerer Status, vorhandener Status, gültige Daten und vertauschte Daten. Implementiere zuerst die Determination und rufe sie gedanklich zweimal auf; das Resultat soll stabil bleiben. Ergänze anschließend Validation und Action als getrennte Schritte. Teste mehrere Schlüssel gemeinsam und prüfe den Fehlerpfad. Das Fragment konzentriert sich auf die Vorbelegung; eine vollständige Anwendung muss EML-Fehlerantworten und das konkrete Meldungs-/Draft-Konzept vollständig behandeln.

```abap
// Ergänzungen INNERHALB des bestehenden BDEF-Entity-Blocks:
// determination setInitialStatus on modify { create; }
// validation checkDates on save { create; field BeginDate, EndDate; }
// action approve result [1] $self;

// Eigene Implementierung im generierten Handler, Fragment:
METHOD setInitialStatus.
  READ ENTITIES OF ZI_LearnTravel IN LOCAL MODE
    ENTITY Travel FIELDS ( Status )
    WITH CORRESPONDING #( keys )
    RESULT DATA(travels)
    FAILED DATA(read_failed).

  DELETE travels WHERE Status IS NOT INITIAL.
  IF travels IS NOT INITIAL.
    MODIFY ENTITIES OF ZI_LearnTravel IN LOCAL MODE
      ENTITY Travel UPDATE FIELDS ( Status )
      WITH VALUE #( FOR travel IN travels
        ( %tky = travel-%tky Status = 'N' ) )
      REPORTED DATA(update_reported).
    reported = CORRESPONDING #( DEEP update_reported ).
  ENDIF.
ENDMETHOD.
// Für die Action zusätzlich in der Behavior Projection: use action approve;
```

## Kontrollfragen

### Welche Funktion passt zur Validation?

- [ ] Ein Status wird bei jeder Ausführung überschrieben
- [ ] Ein Benutzer öffnet eine externe URL
- [x] Ungültige Datumsbereiche werden vor dem Speichern zurückgewiesen

Eine Validation prüft Konsistenz. Das automatische Setzen von Werten gehört zur Determination; eine bewusst aufgerufene Fachoperation zur Action.

### Was muss bei einer zurückzuweisenden Instanz neben einer Meldung berücksichtigt werden?

- [x] Der Instanzschlüssel in failed
- [ ] Nur eine Konsolenausgabe
- [ ] Nur eine neue UI-Beschriftung

failed identifiziert abgelehnte Instanzen. reported liefert die dazugehörigen Meldungen; eine Meldung allein ersetzt die Ablehnung nicht.

### Welche Vorbelegung ist wiederholbar, ohne bestehende Eingaben unnötig zu verändern?

- [ ] Jeden vorhandenen Status blind durch N ersetzen
- [x] N nur setzen, wenn der Status noch initial ist
- [ ] Bei jedem Lauf einen zufälligen Status wählen

Die initiale Vorbelegung soll bereits gesetzte Werte bewahren. Wiederholte Ausführung darf keinen unbeabsichtigten neuen Zustand erzeugen.

## Quellen und Zugang

- [SAP Learning: Implementing Input Checks Using Validations](https://learning.sap.com/courses/building-transactional-apps-with-the-abap-restful-application-programming-model/implementing-input-checks-using-validations): Volltext am 2026-11-06 frei geprüft; on save, failed/reported, Feldbindung, nicht feste Reihenfolge und unmanaged/Draft-Einschränkung überprüft.
- [SAP-samples RAP100: Determinations](https://raw.githubusercontent.com/SAP-samples/abap-platform-rap100/main/exercises/ex04/README.md): Volltext frei geprüft am 2026-11-06; EML und IN LOCAL MODE erklärt. Ausführung benötigt ADT/ABAP-System.
- [SAP-samples RAP100: Actions](https://raw.githubusercontent.com/SAP-samples/abap-platform-rap100/main/exercises/ex06/README.md): Volltext frei geprüft am 2026-11-06; Action-Definition, Handler, Ergebnis und Projection-Freigabe belegt.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
