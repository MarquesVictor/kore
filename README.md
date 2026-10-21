# KORE — site institucional

Landing page da KORE (Frota, Logística e Segurança do Trabalho) em **React 18 + Vite**, com CSS puro.
Dependências: `react`, `react-dom` e, só na home, `gsap` + `@gsap/react` para as animações.

## Requisitos

- Node.js 18 ou superior
- npm

## Comandos

```bash
npm install       # instala as dependências
npm run dev       # servidor local em http://localhost:5173
npm run build     # gera o build de produção em dist/ (com as páginas pré-renderizadas)
npm run preview   # serve o build de dist/ localmente para conferir
```

## Configuração (.env)

Copie `.env.example` para `.env` e preencha:

```bash
VITE_SITE_URL=https://www.exemplo.com.br        # domínio público (canonical e imagem de compartilhamento)
VITE_APP_URL=https://app.exemplo.com/cadastro   # botões "Começar agora"
VITE_LOGIN_URL=https://app.exemplo.com/login    # botão "Entrar"
VITE_CONTACT_WPP=5511999999999                  # WhatsApp: só números, DDI + DDD + número
```

Sem essas variáveis o site funciona assim:

- sem `VITE_SITE_URL`: o build avisa no terminal e deixa de fora canonical e Open Graph;
- sem `VITE_APP_URL`: "Começar agora" leva para a seção de planos;
- sem `VITE_LOGIN_URL`: "Entrar" fica como `#`;
- sem `VITE_CONTACT_WPP`: o ícone do WhatsApp abre o WhatsApp sem um contato definido.

Os contatos (ícone do WhatsApp e botão "E-mail") aparecem na faixa final de CTA e no rodapé.
URLs sem `https://` no `.env` (ex.: `korebr.com/login`) são completadas automaticamente.

As variáveis `VITE_` são embutidas no build: depois de alterá-las, rode `npm run build` de novo
(ou reinicie o `npm run dev`). Elas ficam visíveis no código do site — não coloque segredos nelas.

## Formulário de contato

O botão "E-mail" abre um formulário (módulo, assunto, e-mail, mensagem e até 3 imagens, 3 MB no total).

**O envio ainda não está ativo:** ao clicar em "Enviar mensagem", o formulário valida os campos
e mostra um aviso indicando o WhatsApp. Para ativar, implemente o envio em `handleSubmit`
(`src/components/ContactForm/ContactForm.jsx`, marcado com `TODO`).

## Páginas

| URL | Arquivo HTML | Conteúdo |
| --- | --- | --- |
| `/` | `index.html` | landing |
| `/privacidade/` | `privacidade/index.html` | `src/data/legal/privacy.js` |
| `/termos/` | `termos/index.html` | `src/data/legal/terms.js` |

As páginas de Privacidade e Termos estão como **rascunho**: o texto de cada seção é uma
orientação marcada com `[A PREENCHER]`, não texto jurídico. Para publicar a versão final:

1. substitua os textos em `src/data/legal/` pelo conteúdo revisado por um advogado;
2. mude `draft: true` para `draft: false` (remove o aviso de rascunho);
3. remova a linha `<meta name="robots" content="noindex" />` do HTML da página.

## Onde editar

| O quê | Onde |
| --- | --- |
| Textos dos módulos e funcionalidades | `src/data/modules.js` |
| Passos do "Como funciona" | `src/data/steps.js` |
| Planos e preços | `src/data/plans.js` |
| Números do hero | `src/data/hero.js` |
| Eventos da faixa "Operação ao vivo" | `src/data/operationLog.js` |
| Cores, fontes, espaços e raios (escuro é o padrão; claro via `data-theme="light"`) | `src/styles/tokens.css` — os tokens oficiais vêm de `docs/design/tokens.css` |
| Textos do hero, CTA e rodapé | no próprio componente em `src/components/` |
| Título, descrição e Open Graph | `index.html` |
| Imagem de compartilhamento | `public/og-image.png` (fonte editável: `public/og-image.svg`) |
| Textos de Privacidade e Termos | `src/data/legal/` |

Regra do projeto: **nenhuma cor literal fora de `tokens.css`** — os componentes usam sempre `var(--...)`.

## Pré-renderização

O `npm run build` faz três passos:

1. `vite build`: gera o site em `dist/`, como sempre;
2. `vite build --ssr src/entry-server.jsx`: gera um bundle que renderiza as páginas em Node;
3. `node scripts/prerender.js`: coloca o HTML de cada página dentro do `#root` em `dist/`.

Assim o conteúdo já vem no HTML: o site aparece com JS desligado, buscadores leem o texto
direto e links com âncora (`/#planos`) rolam até a seção ao abrir. No navegador, `src/mount.jsx`
"hidrata" esse HTML. No `npm run dev` não há pré-renderização: a página é montada do zero.

Ao criar uma página nova, registre-a também em `src/entry-server.jsx`.
Nada pode ler `window`, `document` ou `localStorage` durante o render (só dentro de efeitos).

## Animações

GSAP (com ScrollTrigger e SplitText), só na home. A lógica fica em hooks em `src/animations/`,
os componentes só chamam o hook com uma `ref`, e os estados iniciais ficam no `.css` de cada
componente, sob a classe `.js`.

- A classe `.js` entra por um script no `<head>` do `index.html`. Se o JS do site não rodar em
  3s, ela sai e tudo aparece sem animação.
- Com "reduzir movimento" no sistema, nada se move: tudo aparece com um fade de 0.2s.

## Deploy

O build é um site estático (pasta `dist/`).

### Vercel

1. Importe o repositório em [vercel.com/new](https://vercel.com/new).
2. Framework: **Vite** (detectado automaticamente). Build: `npm run build`. Output: `dist`.
3. Em *Settings → Environment Variables*, cadastre as variáveis do `.env`
   (`VITE_SITE_URL`, `VITE_APP_URL`, `VITE_LOGIN_URL`, `VITE_CONTACT_WPP`).
4. Faça o deploy.

### Netlify

1. Em [app.netlify.com](https://app.netlify.com), *Add new site → Import an existing project*.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Em *Site configuration → Environment variables*, cadastre as mesmas variáveis do `.env`.
4. Faça o deploy.

> Depois de publicar, teste a prévia do link no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ou mandando o link para você mesmo no WhatsApp.

## Estrutura

```
public/            arquivos servidos como estão (favicon, og-image, apple-touch-icon, theme-init.js)
privacidade/       HTML da página /privacidade/
termos/            HTML da página /termos/
src/main.jsx       ponto de entrada da home: importa os estilos globais e monta o App
src/entries/       pontos de entrada das páginas de Privacidade e Termos
src/mount.jsx      monta a página: hidrata o HTML pré-renderizado (ou renderiza do zero no dev)
src/entry-server.jsx  renderiza as páginas em HTML no build (usado por scripts/prerender.js)
scripts/           prerender.js: injeta o HTML pré-renderizado em dist/
src/animations/    GSAP: registro dos plugins, tokens de movimento e hooks de animação
src/App.jsx        ordem das seções da página
src/config.js      URLs vindas do .env
src/styles/        tokens (cores/tema), base (reset/tipografia) e utilitários (.label, .display, .section-intro)
src/data/          conteúdo editável (hero, operação ao vivo, módulos, passos, planos, textos legais)
src/hooks/         useTheme (tema escuro/claro)
src/components/    um componente por pasta, com .jsx e .css lado a lado
docs/design/       referência visual aprovada (Editorial ousado) e tokens oficiais do DS
```
