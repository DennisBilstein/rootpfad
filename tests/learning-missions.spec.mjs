import { test, expect } from '@playwright/test';

test('Tagesmission nutzt passende fällige Karten, speichert und vergibt XP nur einmal', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  const result = await page.evaluate(() => {
    rpChoosePath('abap');
    const cards = rpData().cards.slice(0,5);
    cards.forEach(c => { state.srs[c.id] = {due:today0(),iv:0,reps:0,ease:2.5}; });
    rpStartMission();
    const dueFirst = cards.every(c => rpMission.cards.slice(0,5).some(x => x.id === c.id));
    const pathOK = rpMission.cards.every(c => rpLessonPaths[c.lessonId] === 'abap');
    while(!rpMission.done){
      const card = rpMission.cards[rpMission.index];
      if(rpMission.index > rpMission.reviewCount){ document.getElementById('rpRecall').value = 'Meine erste begründete Antwort'; rpMissionRecall(); }
      rpMissionAnswer(card.correct); rpMissionNext();
    }
    const xp = state.xp, key = rpMission.key;
    rpMissionNext();
    return {dueFirst,pathOK,done:!!rpLearning.missions[key],eventCount:rpEvents().filter(e => e.kind === 'answer').length,xpStable:xp === state.xp,exported:!!serialize().learning};
  });
  expect(result).toEqual({dueFirst:true,pathOK:true,done:true,eventCount:7,xpStable:true,exported:true});
  await page.reload();
  await page.waitForFunction(() => window.RP_APP_READY);
  expect(await page.evaluate(() => Object.keys(rpLearning.missions).length)).toBe(1);
  expect(errors).toEqual([]);
});

test('Boss-Hinweise verhindern Selbstständigkeitsnachweis und zwei Varianten sind nötig', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  const result = await page.evaluate(() => {
    rpChoosePath('abap');
    function solve(hint){
      rpStartBoss('cds');
      if(hint) rpBossHint();
      while(!rpBossRun.finished){
        const boss = RP_BOSSES.find(b => b.id === 'cds');
        rpBossAnswer(boss.variants[rpBossRun.variant][rpBossRun.index].correct);
        rpBossNext();
      }
    }
    solve(true);
    const hinted = rpEvents().filter(e => e.kind === 'boss' && e.clean).length;
    solve(false); solve(false);
    const variants = new Set(rpEvents().filter(e => e.kind === 'boss' && e.clean && e.score === e.total).map(e => e.variant)).size;
    const count = rpEvents().length; rpBossNext();
    return {hinted,variants,noDoubleSave:count === rpEvents().length};
  });
  expect(result).toEqual({hinted:0,variants:2,noDoubleSave:true});
});

test('Gefestigt erfordert zeitlichen Abstand und einen neuen Nachweis nach Fehlern', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  const result = await page.evaluate(() => {
    const lesson = {id:'test-lesson',quiz:[{}]}, id = 'test-lesson#0';
    state.stats[id] = {right:2,wrong:0};
    const now = Date.now();
    rpLearning.events = {
      a:{kind:'answer',cardId:id,correct:true,ts:now-4*DAY},
      b:{kind:'answer',cardId:id,correct:true,ts:now}
    };
    const retained = rpLessonMastery(lesson).label;
    rpLearning.events.c = {kind:'answer',cardId:id,correct:false,ts:now+1};
    const afterError = rpLessonMastery(lesson).label;
    rpLearning.events.d = {kind:'answer',cardId:id,correct:true,ts:now+2};
    const immediate = rpLessonMastery(lesson).label;
    return {retained,afterError,immediate};
  });
  expect(result).toEqual({retained:'Gefestigt',afterError:'Geübt',immediate:'Geübt'});
});
