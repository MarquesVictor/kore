// Monta uma página no #root.
// - No build, o HTML já vem pronto (scripts/prerender.js): o React só o "hidrata",
//   ligando a interatividade e as animações sem recriar o DOM.
// - No `npm run dev` o #root vem vazio: renderiza do zero.
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

export function mount(page) {
  const container = document.getElementById('root');
  const element = <StrictMode>{page}</StrictMode>;

  if (container.hasChildNodes()) {
    hydrateRoot(container, element);
  } else {
    createRoot(container).render(element);
  }
}
