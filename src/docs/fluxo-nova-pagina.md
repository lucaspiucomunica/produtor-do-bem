# Fluxo para Criar Nova Página

## Visão Geral

```
LOCAL (desenvolvimento)
   ↓ git push
GITHUB (repositório)
   ↓ git pull (via SSH)
PRODUÇÃO (Locaweb)
   ↓ WP Admin
CMS (página + conteúdo)
```

---

## Fase 1: Desenvolvimento do Tema

### 1.1 Criar branch

```bash
git checkout -b feat/page-nome-da-pagina
```

### 1.2 Criar arquivos do tema

- `page-nome-da-pagina.php` — Template da página
- `template-parts/sections/nome-da-pagina/` — Seções da página
- `src/js/animations/nome-da-pagina.js` — Animações (se necessário)
- `src/css/styles/sections.css` — Estilos específicos (se necessário)

### 1.3 Registrar assets (se necessário)

Adicionar em `inc/core/assets.php` os scripts/estilos específicos da página.

### 1.4 Build e commit

```bash
cd src/libs
npm run build:css-prod
cd ../..
git add .
git commit -m "feat: adiciona página nome-da-pagina"
```

### 1.5 Merge para main

```bash
git checkout main
git pull origin main
git merge feat/page-nome-da-pagina
git push origin main
```

---

## Fase 2: Deploy do Tema

### 2.1 Conectar via SSH

```bash
ssh -o MACs=hmac-sha2-256 produtordobem1@ftp.produtordobem.org
```

### 2.2 Atualizar tema

```bash
cd ~/public_html/wp-content/themes/produtor-do-bem
git checkout main
git pull origin main
exit
```

---

## Fase 3: Configuração do CMS

### 3.1 Exportar campos ACF (local)

1. Acesse WP Admin local
2. Vá em **ACF → Ferramentas → Exportar**
3. Selecione o grupo de campos da nova página
4. Exporte como JSON
5. Salve em `src/backups/nome-da-pagina/acf-export-YYYY-MM-DD.json`

### 3.2 Importar campos ACF (produção)

1. Acesse WP Admin de produção
2. Vá em **ACF → Ferramentas → Importar**
3. Selecione o arquivo JSON exportado
4. Importe

### 3.3 Criar página (produção)

1. Vá em **Páginas → Adicionar nova**
2. Defina o título da página
3. Em **Atributos da página**, selecione o **Modelo** correspondente
4. Preencha os campos ACF com o conteúdo
5. Faça upload das imagens necessárias
6. **Publique** a página

---

## Fase 4: Menu (opcional)

Após a página estar publicada e funcionando:

1. Vá em **Aparência → Menus**
2. Selecione o menu desejado (`menu-main` ou `menu-footer`)
3. Adicione a nova página ao menu
4. Salve o menu

> **Nota:** Os menus são gerenciados pelo WordPress, não requerem deploy do tema.

---

## Notas Importantes

### Sobre imagens

- Campos ACF de imagem armazenam o **ID do attachment**
- IDs são específicos de cada instalação WordPress
- Imagens devem ser enviadas manualmente em produção

### Sobre migração de conteúdo

Para uma página única, o mais prático é preencher manualmente em produção.

Para migração em massa, considere:
- All-in-One WP Migration
- WP Migrate DB Pro
- Duplicator

### Backup de campos ACF

Mantenha os JSONs de ACF versionados em `src/backups/`:

```
src/backups/
├── nome-da-pagina/
│   └── acf-export-YYYY-MM-DD.json
```

---

## Checklist

### Antes do deploy
- [ ] Código testado localmente
- [ ] Build do CSS executado
- [ ] Commit feito com mensagem descritiva
- [ ] Push para GitHub realizado
- [ ] Branch main atualizada

### Em produção
- [ ] SSH conectado
- [ ] Pull realizado
- [ ] JSON do ACF importado
- [ ] Página criada e publicada
- [ ] Conteúdo preenchido
- [ ] Menu atualizado (se aplicável)
- [ ] Página funcionando corretamente

