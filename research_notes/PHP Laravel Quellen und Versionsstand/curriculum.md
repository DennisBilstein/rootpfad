# ROOTPFAD – vorhandenes Curriculum PHP & Laravel

Stand der Extraktion: 2026-11-06. Quelle: [assets/script-01.js](../../assets/script-01.js), `MODULES`, Filter `part === 10`. Ausgeführt ausschließlich mit Node.js `vm` bis vor dem ersten `var VERSION`; keine Browser-/App-Initialisierung. Reihenfolge und IDs unverändert.

## Takeaway

19 Module, 72 Lektionen. Vorhandener Bestand, keine neue Struktur und kein neuer Lektionsinhalt.

## Cited Findings

### m52 – Einsteiger · PHP Schritt für Schritt

- `m52-l1` – Deine Werkstatt: PHP installieren und das erste Skript
- `m52-l2` – Text ausgeben: echo, Strings und Verkettung
- `m52-l3` – Zahlen und Rechnen ohne Überraschungen
- `m52-l4` – Entscheidungen: if, else und Wahrheitswerte
- `m52-l5` – Schleifen Schritt für Schritt

### m42 – Einsteiger · Typen, Arrays und Funktionen kompakt

- `m42-l1` – Was PHP ist und wie ein Skript läuft
- `m42-l2` – Variablen, Typen und Vergleiche
- `m42-l3` – Kontrollstrukturen und Arrays
- `m42-l4` – Funktionen, Typen und Closures

### m53 – Einsteiger · Arrays, Strings und Datum in der Tiefe

- `m53-l1` – Arrays anlegen, lesen und verändern
- `m53-l2` – Sortieren und Umformen
- `m53-l3` – Strings bearbeiten: suchen, zerlegen, ersetzen
- `m53-l4` – Datum und Zeit richtig behandeln

### m43 – Einsteiger · PHP im Web: Formulare, Sessions, Datenbank

- `m43-l1` – Formulare verarbeiten und Ausgaben absichern
- `m43-l2` – Sessions, Cookies und Passwörter
- `m43-l3` – Datenbankzugriff mit PDO und Prepared Statements

### m54 – Fortgeschritten · Dateien, JSON, HTTP und Fehler

- `m54-l1` – Dateien lesen und schreiben
- `m54-l2` – JSON sauber verarbeiten
- `m54-l3` – HTTP-Anfragen an andere Dienste
- `m54-l4` – Fehler, Exceptions und Logging in der Praxis

### m44 – Fortgeschritten · Modernes, objektorientiertes PHP

- `m44-l1` – Klassen, Konstruktoren und readonly
- `m44-l2` – Interfaces, abstrakte Klassen und Traits
- `m44-l3` – Enums und Exceptions
- `m44-l4` – Namespaces, Composer und PSR-Standards

### m55 – Fortgeschritten · Modernes PHP und saubere Architektur

- `m55-l1` – Generatoren: große Datenmengen mit wenig Speicher
- `m55-l2` – SOLID verständlich erklärt
- `m55-l3` – Was PHP 8.4 und 8.5 Neues bringen
- `m55-l4` – Dependency Injection und Unit-Tests ohne Framework

### m45 – Fortgeschritten · Laravel-Einstieg

- `m45-l1` – Installation, Projektstruktur und Konfiguration
- `m45-l2` – Request-Lebenszyklus und Routing
- `m45-l3` – Controller und Blade-Templates

### m46 – Fortgeschritten · Datenbank mit Eloquent

- `m46-l1` – Migrationen, Factories und Seeder
- `m46-l2` – Eloquent-Models und CRUD
- `m46-l3` – Beziehungen zwischen Models
- `m46-l4` – N+1-Problem, Eager Loading und Query Builder

### m47 – Fortgeschritten · Validierung, Authentifizierung und Rechte

- `m47-l1` – Validierung und Form Requests
- `m47-l2` – Authentifizierung, Middleware und CSRF
- `m47-l3` – Autorisierung mit Gates und Policies

### m56 – Fortgeschritten · Blade-Komponenten und Frontend

- `m56-l1` – Blade-Komponenten bauen
- `m56-l2` – Vite, CSS und JavaScript einbinden
- `m56-l3` – Livewire: interaktiv ohne eigenes JavaScript
- `m56-l4` – Formulare mit gutem Nutzererlebnis

### m57 – Fortgeschritten · Dateien, Mails und Benachrichtigungen

- `m57-l1` – Datei-Uploads und das Storage-System
- `m57-l2` – E-Mails mit Mailables
- `m57-l3` – Benachrichtigungen über mehrere Kanäle

### m58 – Experte · Eloquent für Profis

- `m58-l1` – Fortgeschrittene Abfragen: whereHas, Aggregate, Subqueries
- `m58-l2` – Eigene Casts und Value Objects
- `m58-l3` – Polymorphe Beziehungen
- `m58-l4` – Globale Scopes, Soft Deletes und Pruning

### m48 – Experte · REST-APIs mit Laravel

- `m48-l1` – API-Routen, Ressourcen und Statuscodes
- `m48-l2` – Token-Authentifizierung mit Sanctum
- `m48-l3` – Rate Limiting, Fehlerformat und Idempotenz

### m49 – Experte · Architektur: Container, Provider, Events

- `m49-l1` – Service Container und Dependency Injection
- `m49-l2` – Service Provider und Facades
- `m49-l3` – Events, Listener und Observer
- `m49-l4` – Schlanke Controller: Actions und Services

### m59 – Experte · Integrationen, Suche und Echtzeit

- `m59-l1` – Der HTTP-Client von Laravel
- `m59-l2` – Webhooks sicher empfangen
- `m59-l3` – Volltextsuche mit Laravel Scout
- `m59-l4` – Echtzeit mit Broadcasting und Reverb

### m50 – Experte · Queues, Cache und Performance

- `m50-l1` – Jobs und Queues
- `m50-l2` – Caching-Strategien
- `m50-l3` – Performance messen und optimieren
- `m50-l4` – Scheduler und Artisan-Commands

### m51 – Experte · Testen, Qualität und Deployment

- `m51-l1` – Feature-Tests mit Pest und PHPUnit
- `m51-l2` – Fakes, Mocks und Zeitreisen
- `m51-l3` – Codequalität: Pint, Larastan und CI
- `m51-l4` – Deployment und Sicherheit in Produktion

### m60 – Experte · Sicherheit, Betrieb und Abschlussprojekt

- `m60-l1` – Security-Checkliste für Laravel
- `m60-l2` – Betrieb beobachten: Logs, Pulse, Telescope, Fehlerdienste
- `m60-l3` – Abschlussprojekt Teil 1: einen Mini-Shop planen
- `m60-l4` – Abschlussprojekt Teil 2: Umsetzung und Release

## Inferences und Gaps

Die Titel allein belegen keine fachliche Tiefe. Die Quellenzuordnung und inhaltlich geprüften Ergänzungskandidaten stehen in `practice.md`.
