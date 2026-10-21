// Ponto de entrada da página /termos/ (termos/index.html).
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/utilities.css';

import { mount } from '../mount.jsx';
import LegalPage from '../components/LegalPage/LegalPage.jsx';
import { terms } from '../data/legal/terms.js';

mount(<LegalPage doc={terms} />);
