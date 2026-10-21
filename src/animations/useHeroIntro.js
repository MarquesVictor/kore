// Abertura do hero: uma timeline só, ao carregar, em ~1.7s.
// (1) rótulo → (2) título sobe por linha → (3) "assinado." chega por último →
// (4) hairline dos números desenha → (5) números contam → (6) texto e botões.
// Os estados iniciais (opacity: 0) ficam em Hero.css.
import { gsap, useGSAP } from './gsap.js';
import {
  EASE,
  countUp,
  drawLine,
  fadeIn,
  riseText,
  setIntroDuration,
  showNow,
  whenReady,
} from './motion.js';

export function useHeroIntro(ref) {
  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(ref);

      return whenReady(contextSafe, {
        full: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE } });

          tl.fromTo(q('.hero__label'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
            // Cada .hero__line é dividida em linhas: no celular "ao documento" pode virar duas
            .add(riseText(q('.hero__line'), { accent: '.hero__accent', duration: 0.7 }), 0.1)
            .add(drawLine(q('.hero__stats'), { duration: 0.6 }), 0.9)
            .add(fadeIn(q('.hero__stat dt, .hero__stat dd'), { y: 0, duration: 0.4, stagger: 0 }), 1)
            .add(countUp(q('.hero__count')), 1)
            .add(fadeIn(q('.hero__lead, .hero__actions > *')), 1);

          // Seções já visíveis ao carregar esperam a abertura terminar
          setIntroDuration(tl.duration());
        },
        reduced: () => {
          showNow(q('.hero__label, .hero__line, .hero__stat dt, .hero__stat dd, .hero__lead, .hero__actions > *'));
          gsap.set(q('.hero__stats'), { '--draw': 1 });
        },
      });
    },
    { scope: ref }
  );
}
