import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  destructuredCopyGoesStale, toRefsStaysLive, replacingReactiveBreaksLink, refCanBeReplaced,
  shallowRefTracksOnlyValue, watchEffectLosesDependenciesAfterAwait, watchWithExplicitSources,
  snapshotVersusGetter, refsInsideReactiveCollections,
} from '../src/lessons/reactivity/pitfalls';
import FlushDemo from '../src/lessons/reactivity/FlushDemo.vue';
import GreetingProps from '../src/lessons/reactivity/GreetingProps.vue';

describe('Falle 1: Destrukturieren', () => {
  it('falsch: die Kopie bleibt bei 0 stehen', () => {
    expect(destructuredCopyGoesStale()).toEqual({ state: 5, copy: 0 });
  });
  it('richtig: toRefs hält die Verbindung in beide Richtungen', () => {
    expect(toRefsStaysLive()).toEqual({ viaRef: 5, state: 7 });
  });
});

describe('Falle 2: reactive ersetzen', () => {
  it('falsch: die alte Referenz sieht das neue Objekt nicht', () => {
    expect(replacingReactiveBreaksLink()).toEqual({ held: 1, current: 2 });
  });
  it('richtig: eine ref behält die Referenz beim Austausch', () => {
    expect(refCanBeReplaced()).toEqual({ held: 2, current: 2 });
  });
});

describe('Falle 3: shallowRef', () => {
  it('verfolgt nur den Austausch, tiefe Änderungen brauchen triggerRef', async () => {
    expect(await shallowRefTracksOnlyValue()).toEqual({ afterMutation: 0, afterTrigger: 1, afterReplace: 2 });
  });
});

describe('Falle 4: Abhängigkeiten nach await', () => {
  it('falsch: b wird in watchEffect nach dem await nicht verfolgt', async () => {
    // Lauf 1 (Start) -> "1/1"; b ändern löst nichts aus; a ändern löst aus und liest dann b=2.
    expect(await watchEffectLosesDependenciesAfterAwait()).toEqual(['1/1', '2/2']);
  });
  it('richtig: watch mit ausdrücklichen Quellen reagiert auf beide', async () => {
    expect(await watchWithExplicitSources()).toEqual(['1/2', '2/2']);
  });
});

describe('Falle 5: Zeitpunkt von Watchern', () => {
  it("flush 'pre' sieht das alte DOM, flush 'post' das neue", async () => {
    const wrapper = mount(FlushDemo);
    await wrapper.get('button').trigger('click'); await nextTick();
    const exposed = wrapper.vm as unknown as { seenByPre: string; seenByPost: string };
    expect(exposed.seenByPre).toBe('0');
    expect(exposed.seenByPost).toBe('1');
    wrapper.unmount();
  });
});

describe('Falle 6: Props und Composables', () => {
  it('Props-Destructuring bleibt in Vue 3.5 reaktiv, inklusive Standardwert', async () => {
    const wrapper = mount(GreetingProps);
    expect(wrapper.get('[data-test=greeting]').text()).toBe('Hallo Gast.');
    await wrapper.setProps({ name: 'Ada', excited: true });
    expect(wrapper.get('[data-test=greeting]').text()).toBe('Hallo Ada!');
    wrapper.unmount();
  });
  it('Getter bleibt aktuell, Momentaufnahme veraltet', async () => {
    const wrapper = mount(GreetingProps, { props: { name: 'ada' } });
    await wrapper.setProps({ name: 'grace' });
    expect(wrapper.get('[data-test=live]').text()).toBe('GRACE');
    expect(wrapper.get('[data-test=stale]').text()).toBe('ADA');
    wrapper.unmount();
  });
  it('Composable: Wert übergeben ist eine Momentaufnahme, Getter bleibt aktuell', () => {
    expect(snapshotVersusGetter()).toEqual({ snapshot: 'ADA', live: 'GRACE' });
  });
});

describe('Falle 7: Refs in Sammlungen', () => {
  it('werden in Objekten entpackt, in Arrays nicht', () => {
    expect(refsInsideReactiveCollections()).toEqual({ objectUnwrapped: true, listUnwrapped: false, listItemValue: 1 });
  });
});
