// Ponto de entrada: carrega os estilos globais (na ordem certa) e monta o App
// (ver src/mount.jsx: hidrata o HTML pré-renderizado do build).

// Ordem importa: tokens (variáveis) → base (reset/tipografia) → utilitários
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';

import { mount } from './mount.jsx';
import App from './App.jsx';

// Avisa a rede de segurança do <head> (index.html) que o JS rodou: a classe .js fica.
document.documentElement.classList.add('js-ready');

mount(<App />);
