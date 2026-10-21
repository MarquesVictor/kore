// Ponto de entrada da página /termos/ (termos/index.html).
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/utilities.css';

import LegalPage from '../components/LegalPage/LegalPage.jsx';
import { terms } from '../data/legal/terms.js';

// Avisa o CSS que o JS carregou: só então os elementos animados começam escondidos
// (ver .js em utilities.css). Sem JS, o site aparece normal.
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalPage doc={terms} />
  </StrictMode>
);
