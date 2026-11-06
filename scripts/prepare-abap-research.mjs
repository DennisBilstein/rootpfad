import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'research_notes/ABAP Lernquellen und Modulerweiterung');
const lessons = ['basics','rap-fiori','cloud-integration'].flatMap(name => JSON.parse(fs.readFileSync(path.join(dir,name+'.json'),'utf8')));
const tools = lessons.find(l => l.moduleId === 'abap-m20');
lessons.push({ moduleId:'abap-m17', title:'SAP S/4HANA verstehen: ERP, Datenbank und Oberflächen', minutes:15,
  body:'SAP S/4HANA ist ein ERP-System für zusammenhängende Geschäftsprozesse. SAP HANA ist die zugrunde liegende Datenbanktechnologie. SAP GUI und SAP Fiori bezeichnen Zugangs- und Oberflächenwelten, während ADT die Entwicklungswerkzeuge in Eclipse bereitstellt. Diese Begriffe sind keine austauschbaren Produktnamen.\n\nBeispiel: Ein Auftrag wird fachlich im Anwendungssystem verarbeitet. Die Geschäftslogik prüft Regeln und Berechtigungen; die Datenbank speichert die Daten. Eine Fiori-App konsumiert einen dafür bereitgestellten Service. Dass ein Feld auf einer Seite verborgen ist, ersetzt deshalb keine Berechtigungsprüfung im Backend.\n\nDie konkrete Edition, das Release, die Sprachversion und freigegebene APIs bestimmen, welche Erweiterungen möglich sind. Eine Anleitung für ein klassisches On-premise-System lässt sich nicht unverändert auf die Public Cloud übertragen. Auch ein vorhandener SAP-GUI-Zugang bedeutet nicht, dass eigene Entwicklung oder Debugging erlaubt ist.\n\nÜbung: Zeichne für die Änderung einer Auftragsbeschreibung vier Ebenen: Oberfläche, Service, Geschäftslogik und Datenhaltung. Markiere, wo du einen Fehler suchen würdest, wenn der Service eine fachliche Ablehnung meldet. Schreibe anschließend Edition, Release, Entwicklungsberechtigung und erlaubte APIs auf, die du vor einer praktischen Umsetzung klären musst.',
  tip:'Lerne zuerst die fachliche und technische Zuständigkeit jeder Ebene. Ein Fiori-Problem ist nicht automatisch ein Datenbankproblem.',
  quiz:[{q:'Welche Zuordnung ist richtig?',options:['HANA ist der Eclipse-Editor','S/4HANA ist das ERP-System; HANA ist die Datenbanktechnologie','Fiori ist die ABAP-Sprachversion'],correct:1,explain:'ERP, Datenbank, Oberfläche und Entwicklungswerkzeug haben unterschiedliche Aufgaben.'},{q:'Warum muss vor einer Erweiterung die Systemedition geklärt werden?',options:['Weil alle Editionen dieselben Erweiterungsrechte haben','Nur für die Farbe der Oberfläche','Weil Entwicklungsmodell, verfügbare APIs und Zugriffswege variieren'],correct:2,explain:'Edition und Release bestimmen unterstützte Erweiterungs- und Entwicklungsoptionen.'}],
  sources:tools.sources.filter(s => /s.?4hana|sap.gui/i.test(s.url+' '+s.title)) });
const out = path.join(root,'content/abap-erweiterungen');
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'lessons.json'),JSON.stringify(lessons,null,2)+'\n');
console.log(`${lessons.length} recherchierte Ergänzungen gesichert.`);
