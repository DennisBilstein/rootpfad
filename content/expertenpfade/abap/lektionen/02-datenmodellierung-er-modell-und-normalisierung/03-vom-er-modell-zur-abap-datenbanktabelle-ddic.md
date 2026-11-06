# Vom ER-Modell zur ABAP-Datenbanktabelle (DDIC)

*Datenmodellierung: ER-Modell & Normalisierung · ca. 7 Min.*

In ABAP entsteht aus dem fachlichen Datenmodell eine Tabelle im **ABAP Dictionary (DDIC)**: Entität → Datenbanktabelle, Attribute → Felder mit Datenelementen/Domänen, Primärschlüssel → Schlüsselfelder, Beziehungen → Fremdschlüssel mit Prüftabellen.

In ABAP Cloud werden Tabellen zunehmend direkt in ADT als **quelltextbasierte Database Table** definiert statt im klassischen SE11-GUI:

```abap
@EndUserText.label : 'Bestellungen'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
define table zorder {
  key client      : abap.clnt not null;
  key order_id    : abap.char(10) not null;
  customer_id     : abap.char(10) not null;
  amount          : abap.dec(13,2) not null;
  currency        : abap.cuky not null;
}
```

> **Tipp:** Das MANDT-Feld (hier "client") ist in klassischen SAP-Systemen fast immer das erste Schlüsselfeld — es trennt logisch getrennte Mandanten innerhalb derselben technischen Datenbank. Dieses Konzept bleibt auch in ABAP-Cloud-Tabellen erhalten, selbst wenn moderne Cloud-Systeme oft nur einen Mandanten nutzen.

## Kontrollfragen

**1. Wozu dient das MANDT-Feld (client)?**

- [x] Trennt logisch getrennte Mandanten innerhalb derselben technischen Datenbank
- [ ] Speichert das Erstellungsdatum
- [ ] Ist ein Performance-Index

*Erklärung:* MANDT ist die zentrale Mandantentrennung in SAP-Systemen — meist das erste Schlüsselfeld jeder mandantenabhängigen Tabelle.

**2. Was entspricht einer ER-Beziehung in der technischen DDIC-Umsetzung?**

- [ ] Ein Index
- [x] Ein Fremdschlüssel (Foreign Key) mit Prüftabelle
- [ ] Eine Domäne

*Erklärung:* Fremdschlüssel mit Prüftabelle bilden die referenzielle Integrität der fachlichen Beziehung technisch ab.
