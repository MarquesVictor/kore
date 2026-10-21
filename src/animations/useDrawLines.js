// Hairlines que desenham da esquerda para a direita quando entram na tela.
// O elemento precisa da classe .hairline (utilities.css): a linha é um ::before
// com transform: scaleX(var(--draw)), e aqui o GSAP anima --draw de 0 a 1.
//
// Uso: useDrawLines(rowRef)                              → a própria ref é a hairline
//      useDrawLines(sectionRef, { targets: '.step', stagger: 0.3 }) → várias, uma depois da outra
import { gsap, useGSAP } from './gsap.js';
import { afterIntro, drawLine, onEnter, whenReady } from './motion.js';

export function useDrawLines(ref, { targets, trigger, delay = 0, stagger = 0, duration } = {}) {
  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(ref);
      const lines = targets ? q(targets) : [ref.current];

      return whenReady(contextSafe, {
        full: (ctx, safe) => {
          const play = () => drawLine(lines, { duration, stagger, delay: delay + afterIntro() });
          onEnter(trigger ? q(trigger)[0] : ref.current, safe(play));
        },
        reduced: () => {
          gsap.set(lines, { '--draw': 1 }); // linha inteira, sem desenhar
        },
      });
    },
    { scope: ref }
  );
}
