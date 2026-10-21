// Hook de animação de entrada.
// Observa um elemento com IntersectionObserver e retorna inView = true
// quando ele aparece na tela (uma vez só). O "delay" permite o efeito
// escalonado entre cards (ex.: index * 90ms).
// Com prefers-reduced-motion, o elemento já começa visível.
import { useEffect, useRef, useState } from 'react';

export function useInView({ delay = 0, threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setInView(true), delay);
          observer.disconnect(); // anima só na primeira vez
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay, threshold]);

  return { ref, inView };
}
