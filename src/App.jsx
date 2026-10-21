// Página única: monta as seções na ordem da landing.
// A navegação é por âncoras (#modulos, #como-funciona, #planos) com scroll suave.
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import OperationLog from './components/OperationLog/OperationLog.jsx';
import Modules from './components/Modules/Modules.jsx';
import HowItWorks from './components/HowItWorks/HowItWorks.jsx';
import Pricing from './components/Pricing/Pricing.jsx';
import CtaBand from './components/CtaBand/CtaBand.jsx';
import Footer from './components/Footer/Footer.jsx';
import ContactDialog from './components/ContactDialog/ContactDialog.jsx';

export default function App() {
  return (
    <>
      {/* Atalho de teclado para pular o header */}
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <OperationLog />
        <Modules />
        <HowItWorks />
        <Pricing />
        <CtaBand />
      </main>

      <Footer />

      {/* Formulário de contato (modal), aberto pelo botão "E-mail" */}
      <ContactDialog />
    </>
  );
}
