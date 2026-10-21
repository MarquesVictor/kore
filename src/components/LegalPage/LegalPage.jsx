// Página de documento legal (Privacidade, Termos), com o mesmo header e rodapé da home.
// O conteúdo vem de src/data/legal/. Enquanto doc.draft for true, mostra um aviso de rascunho.
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import ContactDialog from '../ContactDialog/ContactDialog.jsx';
import './LegalPage.css';

export default function LegalPage({ doc }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" tabIndex={-1}>
        <article className="legal" aria-labelledby="legal-title">
          <div className="wrap legal__wrap">
            {doc.draft && (
              <p className="legal__draft" role="note">
                <strong>Rascunho.</strong> Este documento ainda está em elaboração e passará por
                revisão jurídica antes da versão final.
              </p>
            )}

            <h1 id="legal-title" className="legal__title">
              {doc.title}
            </h1>
            <p className="legal__updated">Última atualização: {doc.updatedAt}</p>
            <p className="legal__intro">{doc.intro}</p>

            {doc.sections.map((section) => (
              <section key={section.title} className="legal__section">
                <h2 className="legal__heading">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
      <ContactDialog />
    </>
  );
}
