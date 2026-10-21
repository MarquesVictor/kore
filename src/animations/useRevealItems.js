// Itens que entram em stagger (fade + deslocamento curto) quando entram na tela.
//
// Uso: useRevealItems(rowRef, { targets: '.module-row__features li', delay: 0.3 })
// - targets: seletor dos itens dentro da ref (estado inicial opacity: 0 no CSS do componente)
// - x / y: de onde os itens vêm (padrão: 16px abaixo)
// - trigger: seletor do gatilho do scroll; sem ele, a própria ref
// - delay, stagger, duration: ajustes finos de ritmo
// - onLoad: true anima ao carregar, sem esperar o scroll (ex.: header)
import { gsap, useGSAP } from './gsap.js';
import { DURATION, STAGGER, afterIntro, fadeIn, onEnter, showNow, whenReady } from './motion.js';

export function useRevealItems(
  ref,
  { targets, trigger, x = 0, y = 16, delay = 0, stagger = STAGGER, duration = DURATION.item, onLoad = false } = {}
) {
  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(ref);
      const items = q(targets);

      return whenReady(contextSafe, {
        full: (ctx, safe) => {
          // Quem anima ao carregar entra junto com o hero; o resto espera a abertura acabar
          const wait = onLoad ? 0 : afterIntro();
          const play = () => fadeIn(items, { x, y, stagger, duration, delay: delay + wait });
          onEnter(trigger ? q(trigger)[0] : ref.current, safe(play), onLoad);
        },
        reduced: () => {
          showNow(items);
        },
      });
    },
    { scope: ref }
  );
}
