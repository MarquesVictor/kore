// Registro único do GSAP e dos plugins. Todo arquivo de animação importa daqui,
// nunca direto de 'gsap', para garantir que os plugins já estejam registrados.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
