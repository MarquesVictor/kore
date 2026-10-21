// Modal do formulário de contato (usa o <dialog> nativo do navegador:
// prende o foco dentro do modal e fecha com Esc sem código extra).
// Existe UM por página (em App.jsx e LegalPage.jsx); qualquer botão abre com openContactForm().
import { useEffect, useRef, useState } from 'react';
import ContactForm from '../ContactForm/ContactForm.jsx';
import { CloseIcon } from '../icons/Icons.jsx';
import './ContactDialog.css';

const OPEN_EVENT = 'kore:open-contact';

export function openContactForm() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function ContactDialog() {
  const dialogRef = useRef(null);
  const [formKey, setFormKey] = useState(0); // muda a cada abertura → formulário limpo

  useEffect(() => {
    const dialog = dialogRef.current;

    function handleOpen() {
      setFormKey((key) => key + 1);
      if (!dialog.open) dialog.showModal();
      // Foco no primeiro campo (espera o React recriar o formulário)
      requestAnimationFrame(() => dialog.querySelector('select')?.focus());
    }

    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  const close = () => dialogRef.current.close();

  // Clique no fundo escurecido (fora da caixa) também fecha
  function handleClick(event) {
    if (event.target === dialogRef.current) close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="contact-dialog"
      aria-labelledby="contact-dialog-title"
      onClick={handleClick}
    >
      <div className="contact-dialog__box">
        <div className="contact-dialog__head">
          <h2 id="contact-dialog-title" className="contact-dialog__title">
            Fale com a gente
          </h2>
          <button
            type="button"
            className="contact-dialog__close"
            onClick={close}
            aria-label="Fechar"
          >
            <CloseIcon />
          </button>
        </div>

        <ContactForm key={formKey} onCancel={close} />
      </div>
    </dialog>
  );
}
