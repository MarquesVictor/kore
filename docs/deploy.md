# Deploy do site KORE (servidor próprio, Apache)

O site é estático: o build gera a pasta `dist/`, já com as páginas pré-renderizadas, e o Apache
só entrega esses arquivos. Não roda Node no ar. O Node só é usado no servidor para fazer o build.

```
sua máquina                         servidor
───────────                         ──────────────────────────────────────────────
testes + git push  ──────────────►  clone do repositório (ex.: /srv/kore-site)
                                      └─ npm run deploy
                                           git pull → npm ci → lint e testes → build
                                           └─ publica dist/ ──► pasta do Apache (DEPLOY_DIR)
```

Dia a dia, depois de configurado:

```bash
# na sua máquina
npm run lint && npm test && npm run test:e2e
git push <remoto> master

# no servidor
cd /srv/kore-site && npm run deploy
```

---

## 0. Pré-requisitos no servidor (uma vez)

- **Apache 2.4** com o domínio e o HTTPS já funcionando.
- **Módulos `headers` e `deflate` ativos** (cache e compressão). No Debian/Ubuntu:

  ```bash
  sudo a2enmod headers deflate && sudo systemctl reload apache2
  ```

  Sem eles o site funciona, só sem esses ajustes.
- **`AllowOverride All` na pasta do site.** O `.htaccess` (cache, compressão, tipo das fontes)
  vai junto no build e só vale com isso. No VirtualHost do `korebr.com`:

  ```apache
  <Directory /var/www/korebr.com/public_html>
      AllowOverride All
      Require all granted
  </Directory>
  ```

- **Node.js 20.19 ou superior**, `git` e `rsync`: confira com `node -v`, `git --version` e `rsync --version`.
  Se o Node for antigo, instale uma versão nova com o [nvm](https://github.com/nvm-sh/nvm):
  `nvm install 22`.
- **Uma pasta exclusiva do site** como `DocumentRoot` (ex.: `/var/www/korebr.com/public_html`).
  O deploy apaga dela o que não existe mais no build. Nada além do site pode morar lá; a exceção
  é `.well-known/`, do certificado HTTPS, que o deploy nunca apaga.
- **O usuário que faz o deploy precisa poder escrever nessa pasta.** O Apache só precisa ler.

> **Nunca aponte o Apache para o repositório.** O clone (`/srv/kore-site`) tem `.git/` e `.env`,
> que não podem ficar públicos. O `npm run deploy` se recusa a rodar se uma pasta estiver
> dentro da outra.

---

## 1. De onde o servidor puxa o código (uma vez)

O servidor precisa de um repositório Git de onde fazer `git pull`. Hoje o projeto não tem
nenhum remoto configurado. Escolha **uma** das opções:

### Opção A: repositório privado (GitHub, GitLab…)

```bash
# na sua máquina
git remote add origin <url-do-repositório-privado>
git push -u origin master
```

O servidor precisa de acesso de leitura a ele (chave SSH de deploy, por exemplo).

### Opção B: repositório no próprio servidor (sem serviço externo)

```bash
# no servidor
git init --bare /srv/git/kore-site.git

# na sua máquina
git remote add servidor ssh://<usuario>@<servidor>/srv/git/kore-site.git
git push -u servidor master
```

---

## 2. Preparar o servidor (uma vez)

```bash
# clone (use a URL da opção escolhida no passo 1)
git clone <url-ou-/srv/git/kore-site.git> /srv/kore-site
cd /srv/kore-site

# variáveis: o .env NÃO vem pelo git (está no .gitignore)
cp .env.example .env
nano .env
```

No `.env` do servidor, coloque os mesmos valores do seu `.env` local e **acrescente a pasta
do Apache**:

```bash
VITE_SITE_URL=https://korebr.com
VITE_APP_URL=...
VITE_LOGIN_URL=...
VITE_CONTACT_WPP=...
DEPLOY_DIR=/var/www/korebr.com/public_html
```

| Variável | Para que serve | Se faltar |
| --- | --- | --- |
| `VITE_SITE_URL` | domínio público: canonical, `og:url` e imagem de compartilhamento | o deploy para (o build sairia sem canonical) |
| `VITE_APP_URL` | destino dos botões "Começar agora" | os botões levam para a seção de planos |
| `VITE_LOGIN_URL` | destino do botão "Entrar" | o botão fica como `#` |
| `VITE_CONTACT_WPP` | WhatsApp (só dígitos, com DDI e DDD) | o WhatsApp abre sem contato definido |
| `DEPLOY_DIR` | pasta que o Apache serve | o deploy para e avisa |

As `VITE_` são embutidas no build e ficam visíveis no código do site. Nunca coloque segredos nelas.
Mudou uma variável? Rode o deploy de novo.

---

## 3. Antes de cada deploy (na sua máquina)

```bash
npm run lint        # ESLint + Stylelint
npm test            # dados, pré-renderização e hydration (~1s)
npm run test:e2e    # navegador, contra o build de produção (~20s)
git push <remoto> master
```

Os testes de navegador (`test:e2e`) rodam só na sua máquina, porque precisam do Chromium.
O servidor roda o lint e os testes rápidos.

---

## 4. Publicar (no servidor)

```bash
ssh <usuario>@<servidor>
cd /srv/kore-site
npm run deploy
```

O `npm run deploy` ([scripts/deploy.sh](../scripts/deploy.sh)) faz, em ordem:

1. confere o `.env` e o `DEPLOY_DIR`;
2. `git pull` (só avança, nunca mescla);
3. `npm ci` (instala exatamente o que está no `package-lock.json`);
4. `npm run lint` e `npm test`;
5. `npm run build` (com pré-renderização) e confere se o canonical saiu;
6. publica `dist/` no `DEPLOY_DIR` em duas etapas: primeiro os arquivos novos, depois o HTML,
   apagando o que sobrou. Quem estiver navegando nunca recebe uma página que aponta para um
   arquivo que ainda não chegou.

**Se qualquer passo falhar, o script para antes de publicar e o site no ar não muda.**

---

## 5. Checagem depois do deploy

Em `https://korebr.com`:

- [ ] A home abre e a abertura do hero anima. Role até o fim: tudo aparece.
- [ ] O botão de tema alterna e mantém a escolha ao recarregar.
- [ ] `/privacidade/` e `/termos/` abrem.
- [ ] "Começar agora", "Entrar" e o WhatsApp levam aos destinos certos.
- [ ] *Ver código-fonte* (Ctrl/Cmd+U): o texto está dentro de `<div id="root">` (pré-renderização)
      e o canonical aponta para `https://korebr.com/`.
- [ ] No celular, o site abre sem rolagem lateral.
- [ ] A prévia do link aparece com imagem: teste no
      [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ou no WhatsApp.

Confira se o `.htaccess` está valendo:

```bash
curl -sI https://korebr.com/ | grep -i cache-control
# esperado: Cache-Control: no-cache

curl -sI https://korebr.com/fonts/syne-latin.woff2 | grep -iE "cache-control|content-type"
# esperado: Cache-Control: public, max-age=2592000 / Content-Type: font/woff2
```

Se o `Cache-Control` não aparecer, o Apache está ignorando o `.htaccess` (ver *Problemas comuns*).

---

## 6. Voltar para uma versão anterior

No servidor:

```bash
cd /srv/kore-site
git log --oneline            # escolha o commit bom
git checkout <commit>
SKIP_PULL=1 npm run deploy   # publica essa versão sem puxar código novo
git checkout master          # volta a acompanhar a master para o próximo deploy
```

---

## 7. Antes do primeiro deploy: o que vai ao ar

Estas pendências são conhecidas. O site funciona com elas, mas decida conscientemente:

- [ ] **Privacidade e Termos ainda são rascunho.** Aparecem com o aviso "Rascunho" e com `noindex`.
      Para a versão final, siga a seção "Páginas" do README.
- [ ] **O formulário de contato não envia.** O botão "E-mail" valida os campos e mostra um aviso
      indicando o WhatsApp.
- [ ] **`VITE_APP_URL` e `VITE_LOGIN_URL` apontam para o app de produção** (não para homologação).

---

## Problemas comuns

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| Sem `Cache-Control` nas respostas | `.htaccess` ignorado ou `mod_headers` desativado | `AllowOverride All` na pasta (passo 0) e `a2enmod headers` |
| Erro 500 em todas as páginas | `AllowOverride` restrito barrando uma diretiva do `.htaccess` | use `AllowOverride All` ou veja o `error.log` do Apache |
| `/privacidade/` dá 403 ou 404 | `DirectoryIndex` sem efeito, ou permissão de leitura | confira o passo 0 e as permissões da pasta |
| `rsync: Permission denied` no deploy | usuário do deploy sem escrita no `DEPLOY_DIR` | ajuste o dono ou o grupo da pasta |
| `fatal: Not possible to fast-forward` | o clone do servidor tem commits ou alterações locais | não edite arquivos no servidor; `git status` mostra o que mudou |
| `There is no tracking information` no `git pull` | clone sem branch remota associada | `git branch -u origin/master` (ou `servidor/master`) |
| `npm ci` ou `npm test` falham com erro de sintaxe ou engine | Node antigo no servidor | Node 20.19+ (passo 0) |
| Mudou uma variável, mas o site não | as `VITE_` são embutidas no build | rode `npm run deploy` de novo |
