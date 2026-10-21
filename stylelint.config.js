// Stylelint (CSS). Rode com `npm run lint`.
// Regra principal do projeto: nenhuma cor literal fora de src/styles/tokens.css —
// os componentes usam sempre var(--...). O resto pega erros comuns (propriedade
// ou unidade inexistente, seletor duplicado, bloco vazio).
const ONLY_TOKENS = 'Cor literal: use um token (var(--...)) de src/styles/tokens.css.';

export default {
  rules: {
    // Cores só nos tokens
    'color-no-hex': [true, { message: ONLY_TOKENS }],
    'color-named': ['never', { message: ONLY_TOKENS }],
    'function-disallowed-list': [
      ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color'],
      { message: ONLY_TOKENS },
    ],

    // Erros comuns
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-different-values'] }],
    'no-duplicate-selectors': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'unit-no-unknown': true,
    'font-family-no-missing-generic-family-keyword': true,
  },
  overrides: [
    {
      // Onde as cores moram. Os seletores se repetem de propósito: a 1ª parte é o
      // bloco oficial gerado do DS e a 2ª, as extensões do projeto.
      files: ['src/styles/tokens.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
        'no-duplicate-selectors': null,
      },
    },
  ],
};
