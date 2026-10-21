// Configuração do Vite.
// - O plugin do React habilita JSX e o Fast Refresh (recarregamento instantâneo no dev).
// - O site tem 3 páginas HTML (home, privacidade e termos): todas entram no build.
// - O plugin "site-url" troca %SITE_URL% nos HTML pelo domínio do .env,
//   porque Open Graph e canonical precisam de URL absoluta.
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const page = (path) => new URL(path, import.meta.url).pathname;

// Troca %SITE_URL% pelo domínio. Sem domínio, remove as linhas que dependem dele
// (canonical e Open Graph só funcionam com URL absoluta).
function applySiteUrl(html, siteUrl) {
  if (siteUrl) return html.replaceAll('%SITE_URL%', siteUrl);
  return html
    .split('\n')
    .filter((line) => !line.includes('%SITE_URL%'))
    .join('\n');
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // Sem barra no final e com "https://" quando o .env traz só o domínio
  let siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '');
  if (siteUrl && !/^https?:\/\//i.test(siteUrl)) siteUrl = `https://${siteUrl}`;

  if (command === 'build' && !siteUrl) {
    console.warn('\n⚠ VITE_SITE_URL não definido: canonical, og:url e og:image ficaram de fora do build.\n');
  }

  return {
    plugins: [
      react(),
      {
        name: 'site-url',
        // 'pre': precisa trocar antes de o Vite processar os links do HTML
        transformIndexHtml: {
          order: 'pre',
          handler: (html) => applySiteUrl(html, siteUrl),
        },
      },
    ],
    build: {
      rollupOptions: {
        input: {
          main: page('./index.html'),
          privacidade: page('./privacidade/index.html'),
          termos: page('./termos/index.html'),
        },
      },
    },
  };
});
