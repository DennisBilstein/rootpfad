import {test,expect} from '@playwright/test';
import {validateProgress,mergeLatestMap} from '../server/progress-validation.mjs';
test('Sync weist falsche Statistikformen und nichtendliche Zahlen zurück',()=>{
 expect(validateProgress({stats:[]})).toContain('stats');
 expect(validateProgress({stats:{q:{right:NaN,wrong:0}}})).toContain('Antwortstatistik');
 expect(validateProgress({srs:{q:{due:Infinity}}})).toContain('Wiederholungswert');
 expect(validateProgress({completed:[123]})).toContain('Inhalts-ID');
 expect(validateProgress({stats:{q:{right:1,wrong:0}},completed:['lesson']})).toBeNull();
});
test('Ältere Geräteeinträge überschreiben keine neueren Nachweise',()=>{
 expect(mergeLatestMap({a:{ts:20,value:'new'}},{a:{ts:10,value:'old'}}).a.value).toBe('new');
 expect(mergeLatestMap({a:{ts:20,value:'new'}},{a:{ts:30,value:'newest'}}).a.value).toBe('newest');
});
