import { computed, nextTick, reactive, ref, shallowRef, toRefs, toValue, triggerRef, watch, watchEffect, type MaybeRefOrGetter } from 'vue';

// Lektion "Reaktivitätsfallen": Jede Falle steht als Paar "falsch" und "richtig", damit Test und Lektion beides zeigen.

// 1) Destrukturieren kopiert den Wert: Die Kopie bleibt stehen, während der Zustand sich ändert.
export function destructuredCopyGoesStale() {
  const state = reactive({ count: 0 });
  const { count } = state;                // Kopie der Zahl 0, keine Verbindung mehr zu state
  state.count = 5;
  return { state: state.count, copy: count };
}
export function toRefsStaysLive() {
  const state = reactive({ count: 0 });
  const { count } = toRefs(state);        // count ist eine ref, die auf state.count zeigt
  state.count = 5;
  const viaRef = count.value;
  count.value = 7;                         // Schreiben geht auch in die andere Richtung
  return { viaRef, state: state.count };
}

// 2) Ein reactive-Objekt kann man nicht als Ganzes ersetzen: Wer die alte Referenz hält, sieht keine Änderungen.
export function replacingReactiveBreaksLink() {
  let state = reactive({ items: ['a'] });
  const held = state;                      // z. B. an eine Komponente oder ein Composable weitergegeben
  state = reactive({ items: ['a', 'b'] }); // neues Objekt: held zeigt weiter auf das alte
  return { held: held.items.length, current: state.items.length };
}
export function refCanBeReplaced() {
  const state = ref({ items: ['a'] });
  const held = state;                      // dieselbe ref
  state.value = { items: ['a', 'b'] };     // Inhalt austauschen, die Referenz bleibt
  return { held: held.value.items.length, current: state.value.items.length };
}

// 3) shallowRef verfolgt nur den Austausch von .value, nicht Änderungen im Inneren.
export async function shallowRefTracksOnlyValue() {
  const box = shallowRef({ n: 0 });
  let runs = 0;
  watch(box, () => { runs++; });
  box.value.n++;                           // tief verändert: keine Benachrichtigung
  await nextTick();
  const afterMutation = runs;
  triggerRef(box);                         // manuell auslösen
  await nextTick();
  const afterTrigger = runs;
  box.value = { n: 5 };                    // Austausch: Benachrichtigung
  await nextTick();
  return { afterMutation, afterTrigger, afterReplace: runs };
}

// 4) watchEffect sammelt Abhängigkeiten nur SYNCHRON, also vor dem ersten await.
export async function watchEffectLosesDependenciesAfterAwait() {
  const a = ref(1);
  const b = ref(1);
  const seen: string[] = [];
  watchEffect(async () => {
    const first = a.value;                 // wird verfolgt
    await Promise.resolve();
    seen.push(`${first}/${b.value}`);      // b.value wird NICHT verfolgt
  });
  await nextTick(); await Promise.resolve();
  b.value = 2;                             // löst keinen neuen Lauf aus
  await nextTick(); await Promise.resolve();
  a.value = 2;                             // löst aus
  await nextTick(); await Promise.resolve(); await Promise.resolve();
  return seen;
}
export async function watchWithExplicitSources() {
  const a = ref(1);
  const b = ref(1);
  const seen: string[] = [];
  watch([a, b], async ([nextA, nextB]) => {   // Quellen stehen ausdrücklich da, auch nach await ändert das nichts
    await Promise.resolve();
    seen.push(`${nextA}/${nextB}`);
  });
  b.value = 2; await nextTick(); await Promise.resolve();
  a.value = 2; await nextTick(); await Promise.resolve();
  return seen;
}

// 5) Zeitpunkt von Watchern (flush: 'pre' | 'post') zeigt FlushDemo.vue am echten DOM.

// 6) Props an Composables: Wer den Wert übergibt, übergibt eine Momentaufnahme. MaybeRefOrGetter + toValue löst das.
export function useUppercase(source: MaybeRefOrGetter<string>) {
  return computed(() => toValue(source).toUpperCase());
}
export function snapshotVersusGetter() {
  const name = ref('ada');
  const snapshot = useUppercase(name.value);     // String: wird nie wieder aktualisiert
  const live = useUppercase(() => name.value);   // Getter: bleibt aktuell
  name.value = 'grace';
  return { snapshot: snapshot.value, live: live.value };
}

// 7) Refs in reactive-Arrays und -Maps werden NICHT automatisch entpackt (in Objekten schon).
export function refsInsideReactiveCollections() {
  const object = reactive({ n: ref(1) });
  const list = reactive([ref(1)]);
  return { objectUnwrapped: typeof object.n === 'number', listUnwrapped: typeof list[0] === 'number', listItemValue: list[0]!.value };
}
