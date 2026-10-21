// Título que revela por linha (ou palavra), de baixo para cima, dentro de uma máscara,
// quando entra na tela.
//
// Uso: useRevealLines(sectionRef, { target: '.display' })
// - target: seletor do(s) título(s) dentro da ref (estado inicial opacity: 0 no CSS do componente)
// - type: 'lines' (padrão) ou 'words'
// - accent: seletor da parte que chega por último (ex.: '.cta-band__accent')
// - trigger: seletor do gatilho do scroll; sem ele, a própria ref
// - delay: atraso em segundos depois do gatilho, para encadear com outros hooks
// - stagger: intervalo entre linhas/palavras (menor quando há muitas palavras)
import { gsap, useGSAP } from './gsap.js';
import { STAGGER, afterIntro, onEnter, riseText, showNow, whenReady } from './motion.js';

export function useRevealLines(ref, { target, type = 'lines', accent, trigger, delay = 0, stagger = STAGGER } = {}) {
  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(ref);
      const elements = q(target);

      return whenReady(contextSafe, {
        full: (ctx, safe) => {
          // A divisão em linhas só acontece na hora de animar, com a largura real da tela
          const play = () => riseText(elements, { type, accent, stagger }).delay(delay + afterIntro());
          onEnter(trigger ? q(trigger)[0] : ref.current, safe(play));
        },
        reduced: () => {
          showNow(elements);
        },
      });
    },
    { scope: ref }
  );
}
