// ESLint (JS e JSX). Rode com `npm run lint`.
// Além das regras recomendadas de JS, React e hooks, transforma em erro as regras
// do projeto que dá para checar automaticamente:
// - nada de style={{}} (estilos e estados iniciais ficam no .css do componente);
// - GSAP só via src/animations/gsap.js (onde os plugins são registrados);
// - nenhuma outra biblioteca de animação (uma só, para não ter dois sistemas brigando).
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const NO_STYLE_PROP = {
  propName: 'style',
  message: 'Sem style={{}}: coloque o estilo (ou o estado inicial da animação) no .css do componente.',
};

const OTHER_ANIMATION_LIBS = [
  'framer-motion',
  'motion',
  'motion/react',
  'lottie-web',
  'lottie-react',
  'react-spring',
  '@react-spring/web',
  'animejs',
].map((name) => ({
  name,
  message: 'O site usa só GSAP para animação (ver src/animations/).',
}));

const GSAP_DIRECT = {
  paths: [
    { name: 'gsap', message: "Importe de 'src/animations/gsap.js', onde os plugins são registrados." },
    { name: '@gsap/react', message: "Importe useGSAP de 'src/animations/gsap.js'." },
  ],
  patterns: [{ group: ['gsap/*'], message: "Importe plugins de 'src/animations/gsap.js'." }],
};

export default [
  { ignores: ['dist/', 'dist-ssr/', 'docs/', 'coverage/', 'playwright-report/', 'test-results/'] },

  js.configs.recommended,

  // ---------- Código do site (navegador + pré-renderização) ----------
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off', // projeto sem PropTypes/TypeScript
      'react/forbid-dom-props': ['error', { forbid: [NO_STYLE_PROP] }],
      'react/forbid-component-props': ['error', { forbid: [NO_STYLE_PROP] }],
      'no-restricted-imports': ['error', { ...GSAP_DIRECT, paths: [...GSAP_DIRECT.paths, ...OTHER_ANIMATION_LIBS] }],
    },
  },

  // O único arquivo que importa o GSAP direto
  {
    files: ['src/animations/gsap.js'],
    rules: {
      'no-restricted-imports': ['error', { paths: OTHER_ANIMATION_LIBS }],
    },
  },

  // ---------- Scripts que rodam no <head> (sem módulos) ----------
  // Escritos em ES5 de propósito (rodam antes de tudo, até em navegador antigo):
  // por isso o catch (e) com variável não usada é permitido.
  {
    files: ['public/**/*.js'],
    languageOptions: { sourceType: 'script', globals: globals.browser },
    rules: { 'no-unused-vars': ['error', { caughtErrors: 'none' }] },
  },

  // ---------- Node: configs, build e testes ----------
  {
    files: ['*.config.js', 'scripts/**/*.js', 'tests/**/*.{js,jsx}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
  },
];
