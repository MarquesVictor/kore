// Número que conta de 0 até o valor escrito no HTML quando entra na tela.
// O elemento alvo deve conter só o número (prefixos como "R$" ficam fora dele).
// Com "reduzir movimento" o número já aparece no valor final.
//
// Uso: useCountUp(rowRef, { targets: '.plan-row__amount', delay: 0.2 })
import { gsap, useGSAP } from './gsap.js';
import { afterIntro, countUp, onEnter, whenReady } from './motion.js';

export function useCountUp(ref, { targets, trigger, delay = 0, duration } = {}) {
  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(ref);
      const numbers = q(targets);
      if (!numbers.length) return undefined;

      return whenReady(contextSafe, {
        full: (ctx, safe) => {
          const play = () => countUp(numbers, { duration, delay: delay + afterIntro() });
          onEnter(trigger ? q(trigger)[0] : ref.current, safe(play));
        },
        reduced: () => {},
      });
    },
    { scope: ref }
  );
}
