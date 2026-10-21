// Pré-renderização (src/entry-server.jsx), rodando em Node como no build.
// Aqui não existe window nem document: se algum componente usar um deles durante
// o render (fora de efeitos), este teste quebra antes do `npm run build`.
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { renderPages } from '../src/entry-server.jsx';
import { privacy } from '../src/data/legal/privacy.js';
import { terms } from '../src/data/legal/terms.js';

describe('pré-renderização', () => {
  let pages;
  let consoleErrors;

  beforeAll(() => {
    expect(typeof window).toBe('undefined'); // garante que é mesmo um ambiente sem navegador
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    pages = Object.fromEntries(renderPages().map(({ file, html }) => [file, html]));
    consoleErrors = spy.mock.calls;
    spy.mockRestore();
  });

  it('gera as 3 páginas', () => {
    expect(Object.keys(pages).sort()).toEqual(['index.html', 'privacidade/index.html', 'termos/index.html']);
  });

  it('o React não avisa nada no render (ex.: useLayoutEffect no servidor)', () => {
    expect(consoleErrors).toEqual([]);
  });

  it('a home traz o conteúdo de todas as seções no HTML', () => {
    const home = pages['index.html'];
    expect(home).toContain('assinado.');
    for (const id of ['inicio', 'modulos', 'como-funciona', 'planos']) {
      expect(home).toContain(`id="${id}"`);
    }
    expect(home).toContain('planilha.');
  });

  it('os números animados saem no valor final (sem JS, é o que aparece)', () => {
    const home = pages['index.html'];
    expect(home).toMatch(/class="hero__count">100</);
    expect(home).toMatch(/class="plan-row__amount">349</);
  });

  it('o tema sai no padrão escuro (o claro é aplicado no navegador antes do paint)', () => {
    expect(pages['index.html']).toContain('aria-label="Ativar tema claro"');
  });

  it('as páginas legais trazem o próprio título', () => {
    expect(pages['privacidade/index.html']).toContain(privacy.title);
    expect(pages['termos/index.html']).toContain(terms.title);
  });

  it('nenhuma página tem atributo style (regra: estilos ficam no .css)', () => {
    for (const [file, html] of Object.entries(pages)) {
      expect(html, file).not.toMatch(/\sstyle="/);
    }
  });
});
