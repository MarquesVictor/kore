// Pré-renderização: roda depois do `vite build` (ver "build" no package.json).
// 1. Carrega o bundle de servidor gerado em dist-ssr/ (src/entry-server.jsx).
// 2. Renderiza cada página e coloca o HTML dentro do <div id="root"> de dist/.
// 3. Apaga dist-ssr/, que só serve para este passo.
// Resultado: o site aparece mesmo com JS desligado, e as âncoras (/#planos) funcionam
// na hora do carregamento, porque o conteúdo já existe no HTML.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ROOT_TAG = '<div id="root"></div>';

const { renderPages } = await import(`${root}dist-ssr/entry-server.js`);

for (const { file, html } of renderPages()) {
  const path = `${root}dist/${file}`;
  const template = await readFile(path, 'utf8');
  if (!template.includes(ROOT_TAG)) throw new Error(`${file}: ${ROOT_TAG} não encontrado`);
  await writeFile(path, template.replace(ROOT_TAG, `<div id="root">${html}</div>`));
  console.log(`pré-renderizado: dist/${file}`);
}

await rm(`${root}dist-ssr`, { recursive: true, force: true });
