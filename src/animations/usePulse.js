// Pulso suave e infinito: a única animação em loop do site (o ponto "ao vivo").
// Com "reduzir movimento" o ponto fica parado.
//
// Uso: usePulse(sectionRef, { target: '.operation-log__dot' })
import { gsap, useGSAP } from './gsap.js';
import { whenReady } from './motion.js';

export function usePulse(ref, { target }) {
  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(ref);

      return whenReady(contextSafe, {
        full: () => {
          // sine.inOut: respiração contínua, sem tranco na virada do yoyo
          gsap.to(q(target), { scale: 1.6, opacity: 0.6, duration: 1, ease: 'sine.inOut', repeat: -1, yoyo: true });
        },
        reduced: () => {},
      });
    },
    { scope: ref }
  );
}
