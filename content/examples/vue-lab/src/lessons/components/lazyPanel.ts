import { defineAsyncComponent, h, type AsyncComponentLoader } from 'vue';

// Lazy Loading einer schweren Komponente mit eigenem Lade- und Fehlerzustand.
export function createLazyPanel(loader: AsyncComponentLoader) {
  return defineAsyncComponent({
    loader,
    delay: 200,                                   // Ladeanzeige erst nach 200 ms (kein Flackern)
    timeout: 3000,
    loadingComponent: { render: () => h('p', { role: 'status' }, 'Panel wird geladen …') },
    errorComponent: { render: () => h('p', { role: 'alert' }, 'Panel konnte nicht geladen werden.') },
  });
}
