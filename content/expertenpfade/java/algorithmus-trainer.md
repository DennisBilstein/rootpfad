# Algorithmus-Trainer – Java Expertenpfad

Schrittweise Ablaufverfolgung (Trace-Tabellen).

## Summe der geraden Zahlen

*Einsteiger · Eingabe: `zahlen = [3, 4, 7, 8]`*

Der Klassiker: Akkumulator plus Filterbedingung. Verfolge, wann sich `summe` ändert — und wann nicht.

```java
int summeGerade(int[] zahlen) {
    int summe = 0;
    for (int zahl : zahlen) {
        if (zahl % 2 == 0) {
            summe += zahl;
        }
    }
    return summe;
}
```

| Schritt | Zeile | zahl | summe | Erläuterung |
|---|---|---|---|---|
| 1 | 2 | — | 0 | Akkumulator initialisieren. |
| 2 | 3 | 3 | 0 | 1\. Durchlauf: zahl = 3. |
| 3 | 4 | 3 | 0 | 3 % 2 ergibt 1 → Bedingung falsch, Rumpf übersprungen. |
| 4 | 3 | 4 | 0 | 2\. Durchlauf: zahl = 4. |
| 5 | 4 | 4 | 0 | 4 % 2 ergibt 0 → Bedingung wahr. |
| 6 | 5 | 4 | 4 | summe = 0 + 4. |
| 7 | 3 | 7 | 4 | 3\. Durchlauf: zahl = 7. |
| 8 | 4 | 7 | 4 | 7 ist ungerade → übersprungen. |
| 9 | 3 | 8 | 4 | 4\. Durchlauf: zahl = 8. |
| 10 | 4 | 8 | 4 | 8 ist gerade → Rumpf wird ausgeführt. |
| 11 | 5 | 8 | 12 | summe = 4 + 8. |
| 12 | 8 | 8 | 12 | Array zu Ende → Rückgabe. |

**Ergebnis:** 12

## Maximum-Suche mit Gleichstand

*Einsteiger · Eingabe: `zahlen = [12, 45, 7, 45, 23]`*

Achte auf den Vergleichsoperator: `>` oder `>=` macht bei doppelten Werten den Unterschied.

```java
int findeMaximum(int[] zahlen) {
    int maximum = zahlen[0];
    for (int i = 1; i < zahlen.length; i++) {
        if (zahlen[i] > maximum) {
            maximum = zahlen[i];
        }
    }
    return maximum;
}
```

| Schritt | Zeile | i | zahlen[i] | maximum | Erläuterung |
|---|---|---|---|---|---|
| 1 | 2 | — | — | 12 | Startwert ist das erste Element (Index 0). |
| 2 | 3 | 1 | 45 | 12 | Schleife beginnt bei Index 1. |
| 3 | 4 | 1 | 45 | 12 | 45 > 12 → wahr. |
| 4 | 5 | 1 | 45 | 45 | Neues Maximum. |
| 5 | 3 | 2 | 7 | 45 | Nächster Index. |
| 6 | 4 | 2 | 7 | 45 | 7 > 45 → falsch. |
| 7 | 3 | 3 | 45 | 45 | Achtung: gleicher Wert wie das aktuelle Maximum. |
| 8 | 4 | 3 | 45 | 45 | 45 > 45 ist FALSCH — strikt größer. maximum bleibt unverändert. |
| 9 | 3 | 4 | 23 | 45 | Letzter Index. |
| 10 | 4 | 4 | 23 | 45 | 23 > 45 → falsch. |
| 11 | 8 | 5 | — | 45 | i = 5 bricht die Schleife ab (length = 5). Rückgabe. |

**Ergebnis:** 45

## Bubble-Sort komplett

*Fortgeschritten · Eingabe: `zahlen = [5, 2, 9, 1]`*

Verschachtelte Schleifen mit Tausch über eine Hilfsvariable. Verfolge den Array-Zustand nach jedem Vergleich.

```java
void bubbleSort(int[] a) {
    int n = a.length;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < n - i; j++) {
            if (a[j] > a[j + 1]) {
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
}
```

| Schritt | Zeile | i | j | Vergleich | a | Erläuterung |
|---|---|---|---|---|---|---|
| 1 | 2 | — | — | — | [5, 2, 9, 1] | n = 4. |
| 2 | 5 | 1 | 0 | 5 > 2 ✓ | [5, 2, 9, 1] | Erster Vergleich, Tausch nötig. |
| 3 | 8 | 1 | 0 | 5 > 2 ✓ | [2, 5, 9, 1] | Nach dem Tausch über temp. |
| 4 | 5 | 1 | 1 | 5 > 9 ✗ | [2, 5, 9, 1] | Kein Tausch. |
| 5 | 5 | 1 | 2 | 9 > 1 ✓ | [2, 5, 9, 1] | Tausch nötig. |
| 6 | 8 | 1 | 2 | 9 > 1 ✓ | [2, 5, 1, 9] | Die 9 ist durchgeblubbert — ihr Endplatz steht fest. |
| 7 | 5 | 2 | 0 | 2 > 5 ✗ | [2, 5, 1, 9] | 2\. Durchlauf, innere Schleife nur noch bis n-i = 2. |
| 8 | 5 | 2 | 1 | 5 > 1 ✓ | [2, 5, 1, 9] | Tausch nötig. |
| 9 | 8 | 2 | 1 | 5 > 1 ✓ | [2, 1, 5, 9] | Nach dem Tausch. |
| 10 | 5 | 3 | 0 | 2 > 1 ✓ | [2, 1, 5, 9] | 3\. Durchlauf, nur noch ein Vergleich. |
| 11 | 8 | 3 | 0 | 2 > 1 ✓ | [1, 2, 5, 9] | Letzter Tausch — fertig sortiert. |

**Ergebnis:** \[1, 2, 5, 9\]

## Quersumme mit Ganzzahldivision

*Fortgeschritten · Eingabe: `zahl = 4712`*

While-Schleife mit Modulo und Ganzzahldivision — das Standardmuster zum Zerlegen von Zahlen.

```java
int quersumme(int zahl) {
    int summe = 0;
    while (zahl > 0) {
        summe += zahl % 10;
        zahl = zahl / 10;
    }
    return summe;
}
```

| Schritt | Zeile | zahl | zahl % 10 | summe | Erläuterung |
|---|---|---|---|---|---|
| 1 | 2 | 4712 | — | 0 | Start. |
| 2 | 4 | 4712 | 2 | 2 | Letzte Ziffer mit % 10 abgreifen. |
| 3 | 5 | 471 | 2 | 2 | Ganzzahldivision durch 10 schneidet die letzte Ziffer ab — kein Runden. |
| 4 | 4 | 471 | 1 | 3 | summe = 2 + 1. |
| 5 | 5 | 47 | 1 | 3 | Nächste Stelle. |
| 6 | 4 | 47 | 7 | 10 | summe = 3 + 7. |
| 7 | 5 | 4 | 7 | 10 | Nur noch eine Ziffer übrig. |
| 8 | 4 | 4 | 4 | 14 | summe = 10 + 4. |
| 9 | 5 | 0 | 4 | 14 | 4 / 10 ergibt 0 → Schleifenbedingung wird falsch. |
| 10 | 7 | 0 | — | 14 | Rückgabe. |

**Ergebnis:** 14

## Rekursion: Fakultät auf dem Stack

*Fortgeschritten · Eingabe: `fakultaet(4)`*

Rekursion baut Aufrufe auf dem Stack auf und rechnet erst beim Zurückkehren. Verfolge zuerst den Abstieg, dann den Aufstieg.

```java
int fakultaet(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * fakultaet(n - 1);
}
```

| Schritt | Zeile | Aufrufebene | n | Rückgabe | Erläuterung |
|---|---|---|---|---|---|
| 1 | 5 | 1 | 4 | wartet | fakultaet(4) ruft fakultaet(3) auf — noch kein Ergebnis. |
| 2 | 5 | 2 | 3 | wartet | fakultaet(3) ruft fakultaet(2) auf. |
| 3 | 5 | 3 | 2 | wartet | fakultaet(2) ruft fakultaet(1) auf. |
| 4 | 3 | 4 | 1 | 1 | Abbruchbedingung erreicht: n <= 1 liefert 1. |
| 5 | 5 | 3 | 2 | 2 | Rückweg: 2 \* 1 = 2. |
| 6 | 5 | 2 | 3 | 6 | 3 \* 2 = 6. |
| 7 | 5 | 1 | 4 | 24 | 4 \* 6 = 24 — das Endergebnis. |

**Ergebnis:** 24
