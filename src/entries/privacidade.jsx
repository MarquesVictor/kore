// Ponto de entrada da página /privacidade/ (privacidade/index.html).
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/utilities.css';

import { mount } from '../mount.jsx';
import LegalPage from '../components/LegalPage/LegalPage.jsx';
import { privacy } from '../data/legal/privacy.js';

mount(<LegalPage doc={privacy} />);
