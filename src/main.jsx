// Ponto de entrada: carrega os estilos globais (na ordem certa) e monta o App.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Ordem importa: tokens (variáveis) → base (reset/tipografia) → utilitários
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
