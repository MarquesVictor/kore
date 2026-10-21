// Linguagem de movimento da KORE + peças que todos os hooks usam.
// Personalidade: editorial, preciso, confiante. Sem overshoot, sem bounce, sem rotação.
// Cada elemento anima uma vez, na entrada. A única exceção é o ponto "ao vivo".
import { gsap, ScrollTrigger, SplitText } from './gsap.js';

// ---------- Tokens ----------
export const EASE = 'power3.out'; // entradas (80% das animações)
export const EASE_IN_OUT = 'power2.inOut'; // movimentos dentro da página (hairlines, contadores)

export const DURATION = {
  title: 0.8, // títulos por linha/palavra
  item: 0.5, // textos, itens, botões
  fade: 0.2, // único movimento permitido com "reduzir movimento"
};

export const STAGGER = 0.08;
export const START = 'top 80%'; // seção dispara quando o topo chega a 80% da tela

// Quanto a linha/palavra desce dentro da máscara. Um pouco mais que 100% porque a
// máscara tem folga vertical (ver .split-line-mask em utilities.css) para não cortar acentos.
const RISE = 120;

// ---------- Fontes ----------
// A quebra de linha do SplitText depende da Syne já carregada. fonts.load() força o
// download da Syne 800 e depois fonts.ready espera o resto. O timeout garante que,
// se a fonte falhar, o conteúdo não fica escondido para sempre.
// Criado só na primeira chamada: no build (pré-renderização em Node) não existe document.
let fontsReady;

function waitForFonts() {
  fontsReady ??= Promise.race([
    document.fonts
      ? document.fonts.load('800 1em Syne').then(() => document.fonts.ready)
      : Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ])
    .catch(() => {})
    .then(() => ScrollTrigger.refresh()); // posições recalculadas com a fonte certa
  return fontsReady;
}

// ---------- Base de todos os hooks ----------
const MOTION_OK = '(prefers-reduced-motion: no-preference)';
const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';

/**
 * Roda a animação certa depois que as fontes carregam.
 * - full(ctx, safe): com movimento. Use safe(fn) para callbacks que criam animações depois
 *   (ex.: onEnter do ScrollTrigger), assim elas também são limpas.
 * - reduced(): "reduzir movimento" ligado. Mostra tudo no estado final.
 * O gsap.matchMedia() fica dentro do contexto do useGSAP: ao desmontar, tudo é revertido.
 * Se o usuário trocar a preferência com a página aberta, o matchMedia troca de caminho sozinho.
 * Retorne o resultado dentro do useGSAP (é a limpeza que cancela a espera das fontes).
 */
export function whenReady(contextSafe, { full, reduced }) {
  // Sem a classe .js (adicionada no <head> do index.html), os estados iniciais do CSS
  // não valem e o conteúdo já está visível: não anima. Acontece quando o JS chega tão
  // tarde que a rede de segurança do <head> já tirou a classe.
  if (!document.documentElement.classList.contains('js')) return undefined;

  let active = true;
  waitForFonts().then(
    contextSafe(() => {
      if (!active) return; // o componente desmontou antes das fontes (StrictMode faz isso)
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, full);
      mm.add(MOTION_REDUCED, reduced);
    })
  );
  return () => {
    active = false;
  };
}

/** Chama play() uma única vez, quando o gatilho entra na tela (ou na hora, se onLoad). */
export function onEnter(trigger, play, onLoad = false) {
  if (onLoad) {
    play();
    return;
  }
  ScrollTrigger.create({ trigger, start: START, once: true, onEnter: play });
}

// ---------- Abertura do hero ----------
// Seções que já estão na tela ao carregar (ex.: OperationLog) esperam a abertura
// do hero terminar, para não competir com ela.
let introEndsAt = 0;

export function setIntroDuration(seconds) {
  introEndsAt = gsap.ticker.time + seconds;
}

export function afterIntro() {
  return Math.max(0, introEndsAt - gsap.ticker.time);
}

// ---------- Peças de animação ----------

/** Estado final sem movimento, para "reduzir movimento". */
export function showNow(targets) {
  return gsap.to(targets, { opacity: 1, duration: DURATION.fade });
}

/**
 * Texto que sobe por linha (ou palavra) dentro de uma máscara.
 * - accent: seletor da parte que chega por último, um pouco depois (ex.: "assinado.").
 * Ao terminar, o SplitText é desfeito: o texto volta ao HTML original e quebra
 * normalmente em qualquer resize, sem precisar refazer a divisão.
 */
export function riseText(elements, { type = 'lines', accent, duration = DURATION.title, stagger = STAGGER } = {}) {
  gsap.set(elements, { opacity: 1 }); // o CSS esconde o título; agora quem esconde é a máscara

  // aria "auto" (padrão): o elemento ganha aria-label com o texto inteiro e os pedaços
  // ficam aria-hidden, então o leitor de tela lê a frase normal.
  const split = SplitText.create(elements, {
    type,
    mask: type,
    linesClass: 'split-line',
    wordsClass: 'split-word',
  });

  const units = split[type];
  const isAccent = (unit) => Boolean(accent && unit.closest(accent));
  const main = units.filter((unit) => !isAccent(unit));
  const last = units.filter(isAccent);

  const tl = gsap.timeline({ defaults: { ease: EASE, duration }, onComplete: () => split.revert() });
  tl.from(main, { yPercent: RISE, stagger });
  if (last.length) tl.from(last, { yPercent: RISE, stagger }, '-=0.2');
  return tl;
}

/** Fade + deslocamento curto (padrão: sobe 16px). */
export function fadeIn(targets, { x = 0, y = 16, duration = DURATION.item, stagger = STAGGER, delay = 0 } = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, x, y },
    { opacity: 1, x: 0, y: 0, duration, stagger, delay, ease: EASE }
  );
}

/** Hairline que desenha da esquerda para a direita (classe .hairline, variável --draw). */
export function drawLine(targets, { duration = 0.8, stagger = 0, delay = 0 } = {}) {
  return gsap.fromTo(
    targets,
    { '--draw': 0 },
    { '--draw': 1, duration, stagger, delay, ease: EASE_IN_OUT }
  );
}

/**
 * Número que conta de 0 até o valor escrito no elemento (só o número, sem prefixo/sufixo).
 * Enquanto conta, a largura fica travada na do valor final: os dígitos mudam de largura
 * e, sem isso, o que está ao lado (ex.: itens do plano) "andaria" junto.
 */
export function countUp(targets, { duration = 0.7, delay = 0 } = {}) {
  const numbers = gsap.utils.toArray(targets);
  gsap.set(numbers, { display: 'inline-block', width: (i, el) => el.getBoundingClientRect().width });

  return gsap.from(numbers, {
    textContent: 0,
    snap: { textContent: 1 },
    duration,
    delay,
    ease: 'power2.out',
    onComplete: () => gsap.set(numbers, { clearProps: 'display,width' }),
  });
}
