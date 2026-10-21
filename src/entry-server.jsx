// Entrada usada só no build, em Node (scripts/prerender.js): renderiza cada página
// em HTML estático. No navegador, src/mount.jsx "hidrata" esse HTML.
// As chaves são os arquivos HTML gerados pelo Vite em dist/.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import LegalPage from './components/LegalPage/LegalPage.jsx';
import { privacy } from './data/legal/privacy.js';
import { terms } from './data/legal/terms.js';

const pages = {
  'index.html': () => <App />,
  'privacidade/index.html': () => <LegalPage doc={privacy} />,
  'termos/index.html': () => <LegalPage doc={terms} />,
};

export function renderPages() {
  return Object.entries(pages).map(([file, page]) => ({ file, html: renderToString(page()) }));
}
