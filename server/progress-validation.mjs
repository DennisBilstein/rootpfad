const records=['srs','stats','xpLog','badges','solved','notizen','merkzettel','ueTexte','kalib','erklaerungen'];
const arrays=['completed','tracesDone','exams','klausuren'];
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);

export function validateProgress(data) {
  if(!object(data))return 'Lernstand muss ein Objekt sein.';
  for(const field of records)if(data[field]!==undefined&&!object(data[field]))return `Ungültiges Feld: ${field}`;
  for(const field of arrays)if(data[field]!==undefined&&!Array.isArray(data[field]))return `Ungültiges Feld: ${field}`;
  if(data.completed?.some(id=>typeof id!=='string'||id.length>300)||data.tracesDone?.some(id=>typeof id!=='string'||id.length>300))return 'Ungültige Inhalts-ID.';
  if((data.completed?.length||0)>10000||(data.tracesDone?.length||0)>10000)return 'Zu viele Inhalts-IDs.';
  for(const value of Object.values(data.stats||{})){
    if(!object(value)||!['right','wrong'].every(key=>Number.isSafeInteger(value[key])&&value[key]>=0&&value[key]<=1e6))return 'Ungültige Antwortstatistik.';
  }
  for(const value of Object.values(data.srs||{})){
    if(!object(value))return 'Ungültiger Wiederholungsstand.';
    for(const key of ['ease','iv','due','reps','lapses','ts'])if(value[key]!==undefined&&(!Number.isFinite(value[key])||value[key]<0))return 'Ungültiger Wiederholungswert.';
  }
  if(data.xp!==undefined&&(!Number.isSafeInteger(data.xp)||data.xp<0||data.xp>1e9))return 'Ungültiger XP-Wert.';
  for(const field of ['learning','competencies'])if(data[field]!==undefined&&!object(data[field]))return `Ungültiges Feld: ${field}`;
  if(data.learning){
    for(const key of ['events','missions'])if(data.learning[key]!==undefined&&!object(data.learning[key]))return 'Ungültige Lernereignisse.';
    if(Object.keys(data.learning.events||{}).length>20000)return 'Zu viele Lernereignisse; bitte exportieren.';
    for(const event of Object.values(data.learning.events||{}))if(!object(event)||!Number.isFinite(event.ts)||event.ts<0||typeof event.kind!=='string')return 'Ungültiges Lernereignis.';
  }
  if(data.competencies){
    for(const key of ['submissions','variants','feedback'])if(data.competencies[key]!==undefined&&!object(data.competencies[key]))return 'Ungültiger Kompetenznachweis.';
    for(const record of Object.values(data.competencies.submissions||{})){
      if(!object(record)||!Number.isFinite(record.ts)||typeof record.moduleId!=='string')return 'Ungültige Einreichung.';
      for(const key of ['normal','boundary','failure','evidence','help'])if(typeof record[key]!=='string'||record[key].length>6000)return 'Ungültiger Einreichungstext.';
    }
    for(const record of Object.values(data.competencies.feedback||{}))if(!object(record)||typeof record.cardId!=='string'||typeof record.note!=='string'||record.note.length>1500||!Number.isFinite(record.ts))return 'Ungültige Fragenrückmeldung.';
    for(const record of Object.values(data.competencies.variants||{}))if(!object(record)||typeof record.taskId!=='string'||typeof record.variantId!=='string'||typeof record.correct!=='boolean'||!Number.isFinite(record.ts))return 'Ungültiger Variantenversuch.';
  }
  return null;
}

export function mergeLatestMap(previous={},incoming={}) {
  const result={...previous};
  for(const [key,value]of Object.entries(incoming)){
    if(value&&(!result[key]||(Number(value.ts)||0)>=(Number(result[key].ts)||0)))result[key]=value;
  }
  return result;
}
