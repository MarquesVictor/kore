# KORE — site institucional

Landing page da KORE (Frota, Logística e Segurança do Trabalho) em **React 18 + Vite**, com CSS puro.
Dependências: `react`, `react-dom` e, só na home, `gsap` + `@gsap/react` para as animações.

## Requisitos

- Node.js 20.19 ou superior (exigido pelas ferramentas de lint e teste)
- npm

## Comandos

```bash
npm install       # instala as dependências
npm run dev       # servidor local em http://localhost:5173
npm run build     # gera o build de produção em dist/ (com as páginas pré-renderizadas)
npm run preview   # serve o build de dist/ localmente para conferir
npm run lint      # ESLint (JS/JSX) + Stylelint (CSS)
npm test          # testes rápidos (Vitest): dados, pré-renderização e hydration
npm run test:e2e  # testes no navegador (Playwright) contra o build de produção
npm run deploy    # só no servidor: atualiza, testa, gera o build e publica (docs/deploy.md)
```

## Lint e testes

**Lint** (`eslint.config.js`, `stylelint.config.js`): além das regras recomendadas, as regras
do projeto viram erro: sem `style={{}}`, GSAP só via `src/animations/gsap.js`, nenhuma outra
biblioteca de animação e nenhuma cor literal fora de `src/styles/tokens.css`.

**`npm test`** (`tests/*.test.*`, ~1s):

- `data.test.js`: formato dos dados que componentes e animações assumem (ex.: preço é número);
- `prerender.test.jsx`: renderiza as páginas em Node, como no build. Quebra se algum componente
  usar `window`/`document` durante o render;
- `hydration.test.jsx`: o React assume o HTML pré-renderizado sem divergência, inclusive no tema claro.

**`npm run test:e2e`** (`tests/e2e/`, ~20s): refaz o build, sobe um preview na porta 4183 e testa
no Chromium a abertura do hero (menos de 2s, sem mudar a altura do título), a página inteira em
1440px e 390px (tudo aparece, nada estoura a largura), "reduzir movimento", JS desligado, a rede
de segurança da classe `.js`, âncoras, tema, fontes locais e as páginas legais sem GSAP.
Na primeira vez numa máquina nova, instale o navegador com `npx playwright install chromium`.

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

O site vai para um **servidor próprio com Apache**. O servidor tem um clone do repositório e
roda `npm run deploy` ([scripts/deploy.sh](scripts/deploy.sh)): `git pull` → `npm ci` → lint e
testes → build → publica `dist/` na pasta do Apache (`DEPLOY_DIR`, no `.env` do servidor).
Se algum passo falhar, nada é publicado.

O passo a passo completo está em [docs/deploy.md](docs/deploy.md): pré-requisitos do servidor,
primeira configuração, checagem depois do deploy, como voltar uma versão e problemas comuns.
O `public/.htaccess` vai junto no build e configura cache, compressão e o tipo das fontes no Apache.

## Estrutura

```
public/            arquivos servidos como estão (favicon, og-image, apple-touch-icon, theme-init.js)
public/fonts/      Syne, DM Sans e DM Mono em woff2 (subconjunto latin) + licenças OFL;
                   o @font-face fica em src/styles/fonts.css e o preload no <head> de cada HTML
privacidade/       HTML da página /privacidade/
termos/            HTML da página /termos/
src/main.jsx       ponto de entrada da home: importa os estilos globais e monta o App
src/entries/       pontos de entrada das páginas de Privacidade e Termos
src/mount.jsx      monta a página: hidrata o HTML pré-renderizado (ou renderiza do zero no dev)
src/entry-server.jsx  renderiza as páginas em HTML no build (usado por scripts/prerender.js)
scripts/           prerender.js (injeta o HTML pré-renderizado em dist/) e deploy.sh (npm run deploy)
src/animations/    GSAP: registro dos plugins, tokens de movimento e hooks de animação
src/App.jsx        ordem das seções da página
src/config.js      URLs vindas do .env
src/styles/        tokens (cores/tema), base (reset/tipografia) e utilitários (.label, .display, .section-intro)
src/data/          conteúdo editável (hero, operação ao vivo, módulos, passos, planos, textos legais)
src/hooks/         useTheme (tema escuro/claro)
src/components/    um componente por pasta, com .jsx e .css lado a lado
docs/design/       referência visual aprovada (Editorial ousado) e tokens oficiais do DS
docs/deploy.md     passo a passo do deploy no servidor próprio (Apache)
```
