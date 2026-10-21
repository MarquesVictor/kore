// Ponto de entrada da página /privacidade/ (privacidade/index.html).
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/utilities.css';

import LegalPage from '../components/LegalPage/LegalPage.jsx';
import { privacy } from '../data/legal/privacy.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalPage doc={privacy} />
  </StrictMode>
);
