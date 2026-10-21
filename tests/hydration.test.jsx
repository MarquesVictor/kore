// @vitest-environment jsdom
// Hydration: o React precisa assumir o HTML pré-renderizado sem divergência.
// Se o HTML do build e o primeiro render no navegador diferirem, o React descarta
// o HTML e recria a página inteira (perde o ganho da pré-renderização e pisca).
// Sem a classe .js no <html>, os hooks de animação não rodam (ver motion.js → whenReady).
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App.jsx';
import LegalPage from '../src/components/LegalPage/LegalPage.jsx';
import { terms } from '../src/data/legal/terms.js';

// jsdom não implementa matchMedia, usado pelo tema, pelo menu do header e pelo
// ScrollTrigger já no import. vi.hoisted roda antes dos imports acima.
vi.hoisted(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
});

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;
let errors;

// Renderiza como o build faria e hidrata, guardando todo erro de hydration.
// O espião do console só liga depois do renderToString: aqui no jsdom o document
// existe, então o useGSAP usa useLayoutEffect e o React avisa no render de servidor.
// No build real (Node, sem document) isso não acontece; prerender.test.jsx garante.
async function hydrate(page) {
  container = document.createElement('div');
  container.id = 'root';
  const quiet = vi.spyOn(console, 'error').mockImplementation(() => {});
  container.innerHTML = renderToString(page);
  quiet.mockRestore();
  document.body.append(container);

  vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.join(' ')));
  await act(async () => {
    root = hydrateRoot(container, page, { onRecoverableError: (error) => errors.push(error) });
  });
}

beforeEach(() => {
  errors = [];
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('hydration', () => {
  it('a home hidrata sem erros', async () => {
    await hydrate(<App />);
    expect(errors).toEqual([]);
  });

  it('as páginas legais hidratam sem erros', async () => {
    await hydrate(<LegalPage doc={terms} />);
    expect(errors).toEqual([]);
  });

  it('com tema claro aplicado antes do React, hidrata sem erro e mostra o botão certo', async () => {
    // É o que public/theme-init.js faz no <head> para quem prefere o claro
    document.documentElement.setAttribute('data-theme', 'light');
    await hydrate(<App />);

    expect(errors).toEqual([]);
    expect(container.querySelector('.theme-toggle').getAttribute('aria-label')).toBe('Ativar tema escuro');
  });

  it('o botão de tema alterna o <html> e salva a escolha', async () => {
    await hydrate(<App />);
    const toggle = container.querySelector('.theme-toggle');

    await act(async () => toggle.click());
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('kore-theme')).toBe('light');
    expect(toggle.getAttribute('aria-label')).toBe('Ativar tema escuro');

    await act(async () => toggle.click());
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem('kore-theme')).toBe('dark');
  });
});
