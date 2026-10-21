// Formulário de contato: módulo, assunto, e-mail, mensagem e imagens opcionais.
//
// O ENVIO AINDA NÃO ESTÁ ATIVO: ao enviar, o formulário só valida os campos e mostra
// um aviso apontando para o WhatsApp.
// TODO: ligar o envio (ex.: função serverless + Resend) dentro de handleSubmit.
import { useId, useState } from 'react';
import { PRIVACY_URL, WHATSAPP_URL } from '../../config.js';
import { modules } from '../../data/modules.js';
import Button from '../Button/Button.jsx';
import './ContactForm.css';

const MAX_FILES = 3;
const MAX_TOTAL_MB = 3;

// Opções do campo "Módulo": os módulos do site + duas opções abertas
const MODULE_OPTIONS = [...modules.map((module) => module.label), 'Mais de um módulo', 'Ainda não sei'];

export default function ContactForm({ onCancel }) {
  const id = useId();
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [showNotice, setShowNotice] = useState(false);

  // Valida as imagens escolhidas; se passar do limite, limpa a seleção e explica
  function handleFiles(event) {
    const selected = Array.from(event.target.files);
    const totalMb = selected.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);

    let error = '';
    if (selected.length > MAX_FILES) error = `Envie no máximo ${MAX_FILES} imagens.`;
    else if (totalMb > MAX_TOTAL_MB) error = `As imagens passam de ${MAX_TOTAL_MB} MB no total.`;

    if (error) {
      event.target.value = '';
      setFiles([]);
    } else {
      setFiles(selected);
    }
    setFileError(error);
  }

  // Os campos obrigatórios já foram validados pelo navegador quando chega aqui
  function handleSubmit(event) {
    event.preventDefault();
    setShowNotice(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label htmlFor={`${id}-modulo`}>Módulo</label>
        <select id={`${id}-modulo`} name="modulo" required defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          {MODULE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${id}-assunto`}>Assunto</label>
        <input id={`${id}-assunto`} name="assunto" type="text" required maxLength={120} />
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${id}-email`}>Seu e-mail</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="voce@empresa.com.br"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${id}-mensagem`}>Mensagem</label>
        <textarea id={`${id}-mensagem`} name="mensagem" required rows={5} maxLength={3000} />
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${id}-imagens`}>
          Imagens <span className="contact-form__optional">(opcional)</span>
        </label>
        <input
          id={`${id}-imagens`}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          aria-describedby={`${id}-imagens-dica`}
        />
        <p id={`${id}-imagens-dica`} className="contact-form__hint">
          Até {MAX_FILES} imagens, {MAX_TOTAL_MB} MB no total. Ex.: print de tela ou foto.
        </p>
        {fileError && (
          <p className="contact-form__error" role="alert">
            {fileError}
          </p>
        )}
        {files.length > 0 && (
          <ul className="contact-form__files">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <p className="contact-form__consent">
        Ao enviar, você concorda com a <a href={PRIVACY_URL}>Política de Privacidade</a>.
      </p>

      {showNotice && (
        <p className="contact-form__notice" role="status">
          O envio por e-mail ainda não está disponível. Enquanto isso,{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            fale com a gente pelo WhatsApp
          </a>
          .
        </p>
      )}

      <div className="contact-form__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Enviar mensagem</Button>
      </div>
    </form>
  );
}
