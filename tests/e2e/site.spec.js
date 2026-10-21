// Testes de navegador do site (build de produção). Cobrem o que só dá para ver com
// layout e tempo reais: animações, "reduzir movimento", JS desligado, a rede de
// segurança da classe .js, largura no celular, fontes locais e páginas legais.
import { expect, test } from '@playwright/test';

// ---------- Ajudantes (rodam dentro da página) ----------

// Elementos que continuam escondidos: opacity 0 ou hairline sem desenhar (--draw 0)
function hiddenElements(page) {
  return page.evaluate(() => {
    const hidden = [...document.querySelectorAll('header *, main *')].filter(
      (el) => getComputedStyle(el).opacity === '0'
    );
    const undrawn = [...document.querySelectorAll('.hairline')].filter(
      (el) => getComputedStyle(el).getPropertyValue('--draw').trim() === '0'
    );
    return [...hidden, ...undrawn].map((el) => el.className || el.tagName);
  });
}

// Pedaços do SplitText ainda na página (o texto deve voltar ao HTML original no fim)
function splitPieces(page) {
  return page.evaluate(() => document.querySelectorAll('.split-line, .split-word').length);
}

function horizontalOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}

// Rola a página inteira devagar, conferindo a largura a cada passo
async function scrollThrough(page) {
  let maxOverflow = 0;
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += 300) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
    maxOverflow = Math.max(maxOverflow, await horizontalOverflow(page));
  }
  return maxOverflow;
}

// Junta erros e avisos do console (hydration, React, GSAP)
function collectConsole(page) {
  const messages = [];
  page.on('console', (msg) => ['error', 'warning'].includes(msg.type()) && messages.push(msg.text()));
  page.on('pageerror', (error) => messages.push(error.message));
  return messages;
}

// ---------- Animações ----------

test.describe('abertura do hero', () => {
  test('termina em menos de 2s e não muda a altura do título durante a divisão', async ({ page }) => {
    // Observador instalado antes de qualquer script da página: mede do início da
    // divisão do título até tudo estar no lugar, guardando as alturas do <h1>.
    await page.addInitScript(() => {
      window.heroIntro = new Promise((resolve) => {
        let start = null;
        const heights = new Set();
        function tick() {
          const title = document.querySelector('.hero__title');
          const splitting = document.querySelector('.hero__title .split-line');
          if (splitting && start === null) start = performance.now();
          if (start !== null) heights.add(Math.round(title.getBoundingClientRect().height));

          const settled =
            start !== null &&
            !splitting &&
            [...document.querySelectorAll('.hero__actions > *, .hero__lead')].every(
              (el) => getComputedStyle(el).opacity === '1'
            ) &&
            [...document.querySelectorAll('.hero__count')].map((el) => el.textContent).join('|') === '3|100|14';

          if (settled) resolve({ ms: performance.now() - start, heights: [...heights] });
          else requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    });

    const messages = collectConsole(page);
    await page.goto('/');
    const intro = await page.evaluate(() => window.heroIntro);

    expect(intro.ms).toBeLessThan(2000);
    expect(intro.heights).toHaveLength(1);
    expect(await hiddenElements(page)).toEqual(expect.not.arrayContaining(['hero__lead']));
    expect(messages).toEqual([]);
  });
});

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'celular', width: 390, height: 844 },
]) {
  test(`rolando a página inteira no ${viewport.name}, tudo aparece e nada estoura a largura`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const messages = collectConsole(page);
    await page.goto('/');

    const maxOverflow = await scrollThrough(page);
    await page.waitForTimeout(2500); // última seção termina de animar

    expect(maxOverflow).toBe(0);
    expect(await hiddenElements(page)).toEqual([]);
    expect(await splitPieces(page)).toBe(0);
    expect(messages).toEqual([]);
  });
}

test('o preço em destaque conta sem mexer na coluna ao lado', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);

  const read = () =>
    page.evaluate(() => {
      const row = document.querySelector('.plan-row--featured');
      return {
        amount: row.querySelector('.plan-row__amount').textContent,
        itemsLeft: Math.round(row.querySelector('.plan-row__items').getBoundingClientRect().left),
      };
    });

  await page.locator('.pricing__list').scrollIntoViewIfNeeded();
  const samples = [];
  for (let i = 0; i < 10; i++) {
    samples.push(await read());
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1500);
  samples.push(await read());

  expect(new Set(samples.map((s) => s.amount)).size).toBeGreaterThan(2); // contou
  expect(samples.at(-1).amount).toBe('349');
  expect(new Set(samples.map((s) => s.itemsLeft)).size).toBe(1); // não andou
});

// ---------- Reduzir movimento ----------

test.describe('com "reduzir movimento"', () => {
  // reducedMotion não é opção direta do test.use: vai pelo contexto do navegador
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('nada se move: sem transform, sem divisão, sem contagem e ponto parado', async ({ page }) => {
    const messages = collectConsole(page);
    await page.goto('/');
    await page.waitForTimeout(600);

    const sample = () =>
      page.evaluate(() => ({
        moving: [...document.querySelectorAll('header *, main *')]
          .filter((el) => el.style.transform && el.style.transform !== 'none')
          .map((el) => el.className),
        dot: getComputedStyle(document.querySelector('.operation-log__dot')).transform,
        counts: [...document.querySelectorAll('.hero__count, .plan-row__amount')].map((el) => el.textContent).join('|'),
      }));

    const first = await sample();
    await scrollThrough(page);
    await page.waitForTimeout(500);
    const last = await sample();

    for (const state of [first, last]) {
      expect(state.moving).toEqual([]);
      expect(state.dot).toBe('none');
      expect(state.counts).toBe('3|100|14|149|349|649');
    }
    expect(await splitPieces(page)).toBe(0);
    expect(await hiddenElements(page)).toEqual([]);
    expect(messages).toEqual([]);
  });
});

// ---------- Sem JS e quando o JS falha ----------

test.describe('com JS desligado', () => {
  test.use({ javaScriptEnabled: false });

  test('o conteúdo vem pronto no HTML e nada fica escondido', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('assinado.');
    await expect(page.locator('#planos')).toContainText('349');
    expect(await page.evaluate(() => document.documentElement.className)).toBe('');
    expect(await hiddenElements(page)).toEqual([]);
  });

  test('link com âncora rola até a seção ao abrir', async ({ page }) => {
    await page.goto('/#planos');
    // scroll-behavior: smooth (base.css): a rolagem leva um instante
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  });
});

test('se o JS do site não carregar, a rede de segurança mostra tudo em 3s', async ({ page }) => {
  await page.route(/\/assets\/main-.*\.js$/, (route) => route.abort());
  await page.goto('/');

  expect(await page.evaluate(() => document.documentElement.classList.contains('js'))).toBe(true);
  await page.waitForTimeout(3300);
  expect(await page.evaluate(() => document.documentElement.classList.contains('js'))).toBe(false);
  expect(await hiddenElements(page)).toEqual([]);
});

test('link com âncora rola até a seção e ela aparece', async ({ page }) => {
  await page.goto('/#planos');
  await page.waitForTimeout(2500);

  const top = await page.evaluate(() => document.querySelector('#planos').getBoundingClientRect().top);
  expect(Math.abs(top)).toBeLessThan(120); // logo abaixo do header fixo
  await expect(page.locator('.plan-row--featured')).toHaveCSS('opacity', '1');
});

// ---------- Tema ----------

test('o tema escolhido sobrevive ao recarregar, sem erro de hydration', async ({ page }) => {
  const messages = collectConsole(page);
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');

  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.theme-toggle')).toHaveAttribute('aria-label', 'Ativar tema escuro');
  expect(messages).toEqual([]);
});

// ---------- Fontes e páginas legais ----------

test('as fontes vêm do próprio site, sem nenhuma requisição externa', async ({ page, baseURL }) => {
  const external = [];
  page.on('request', (request) => !request.url().startsWith(baseURL) && external.push(request.url()));
  await page.goto('/');
  await page.waitForTimeout(1000);

  expect(external).toEqual([]);
  expect(await page.evaluate(() => document.fonts.check('800 1em Syne'))).toBe(true);
});

for (const path of ['/privacidade/', '/termos/']) {
  test(`${path} não carrega GSAP e mostra o header direto`, async ({ page }) => {
    const scripts = [];
    page.on('response', async (response) => {
      if (response.request().resourceType() === 'script') scripts.push(await response.text());
    });
    const messages = collectConsole(page);
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    expect(scripts.some((source) => source.includes('ScrollTrigger'))).toBe(false);
    expect(await page.evaluate(() => document.documentElement.classList.contains('js'))).toBe(false);
    await expect(page.locator('.header__bar')).toHaveCSS('opacity', '1');
    expect(messages).toEqual([]);
  });
}
