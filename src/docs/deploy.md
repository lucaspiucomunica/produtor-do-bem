# Guia de Deploy - Produtor do Bem

## Informações do Servidor (Locaweb)

| Dado | Valor |
|------|-------|
| URL SSH | ftp.produtordobem.org |
| Usuário | produtordobem1 |
| IP | 179.188.55.55 |
| Porta | 22 |

---

## 1. CONFIGURAÇÃO INICIAL (FAZER UMA VEZ)

### 1.1 Habilitar SSH na Locaweb

1. Acesse o painel da Locaweb
2. Vá em **Informações para acesso SSH**
3. Clique no botão **"Habilitar"**
4. Defina ou altere a senha FTP (será usada para SSH)

### 1.2 Testar Conexão SSH

```bash
ssh -o MACs=hmac-sha2-256 produtordobem1@ftp.produtordobem.org
```

Quando solicitado, digite a senha FTP.

> **Nota:** O parâmetro `-o MACs=hmac-sha2-256` é necessário para compatibilidade com o servidor da Locaweb.

### 1.3 Verificar se Git está Instalado

Após conectar via SSH:

```bash
git --version
```

Se aparecer a versão do Git, continue. Se não, será necessário usar deploy via FTP/GitHub Actions.

### 1.4 Navegar até a Pasta de Temas

```bash
cd ~/public_html/wp-content/themes/produtor-do-bem/
ls -la
```

Verifique se a pasta `produtor-do-bem` existe.

### 1.5 Configurar Repositório no Servidor

**Se a pasta NÃO existe (clone inicial):**

```bash
cd ~/public_html/wp-content/themes/
git clone https://github.com/lucaspiucomunica/produtor-do-bem.git produtor-do-bem
cd produtor-do-bem
git checkout main
```

**Se a pasta JÁ existe com arquivos (vincular ao repositório):**

```bash
cd ~/public_html/wp-content/themes/produtor-do-bem

# Inicializar Git
git init
git remote add origin https://github.com/lucaspiucomunica/produtor-do-bem.git

# Sincronizar com repositório
git fetch origin
git reset --hard origin/main
```

### 1.6 Configurar Credenciais Git (se necessário)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 2. FLUXO DE DEPLOY

```
LOCAL (desenvolvimento)
   ↓ git push
GITHUB (repositório)
   ↓ git pull (via SSH)
PRODUÇÃO (Locaweb)
```

---

## 3. DESENVOLVIMENTO LOCAL

### Criar nova feature

```bash
# Criar branch para a feature
git checkout -b feature/nome-da-feature

# Desenvolver e testar localmente
# ...

# Commit das alterações
git add .
git commit -m "feat: descrição da feature"

# Enviar para GitHub
git push origin feature/nome-da-feature
```

### Merge para main

```bash
# Atualizar branch main local
git checkout main
git pull origin main

# Fazer merge da feature
git merge feature/nome-da-feature

# Enviar main atualizada para GitHub
git push origin main

# Deletar branch da feature (opcional)
git branch -d feature/nome-da-feature
git push origin --delete feature/nome-da-feature
```

---

## 4. DEPLOY EM PRODUÇÃO

### 4.1 Conectar via SSH

```bash
ssh -o MACs=hmac-sha2-256 produtordobem1@ftp.produtordobem.org
```

### 4.2 Navegar até o Tema

```bash
cd ~/public_html/wp-content/themes/produtor-do-bem
```

### 4.3 Atualizar com Última Versão

```bash
# Garantir que está em main
git checkout main

# Atualizar com última versão
git pull origin main

# Verificar status
git status
```

### 4.4 Sair do SSH

```bash
exit
```

---

## 5. COMANDOS ÚTEIS

### Verificar branch atual

```bash
git branch
git status
```

### Ver histórico de commits

```bash
git log --oneline -10
```

### Descartar alterações não commitadas

```bash
git restore .
```

### Forçar branch a ficar igual ao remoto

```bash
git fetch origin
git reset --hard origin/main
```

### Listar todas as branches

```bash
git branch -a
```

---

## 6. TROUBLESHOOTING

### Erro: "Authentication failed"

O GitHub não aceita senha. Use Personal Access Token:

1. Acesse: https://github.com/settings/tokens
2. Gere novo token com escopo `repo`
3. Use o token no lugar da senha

### Arquivos modificados no servidor

Se `git status` mostrar arquivos modificados que você não alterou:

```bash
git restore .
```

### Produção não atualiza

```bash
git fetch origin
git reset --hard origin/main
```

### Permissão negada

Se houver erro de permissão, verifique com:

```bash
ls -la
```

---

## 7. CHECKLIST DE DEPLOY

### Antes de enviar para produção

- [ ] Código testado localmente
- [ ] Build do CSS executado (`npm run build:css-prod` em `src/libs/`)
- [ ] Commit feito com mensagem descritiva
- [ ] Push para GitHub realizado
- [ ] Branch main atualizada no GitHub

### Em produção

- [ ] SSH conectado
- [ ] Branch main confirmada
- [ ] Pull realizado
- [ ] Site funcionando
- [ ] Funcionalidade validada

---

## 8. REFERÊNCIAS

- Repositório: https://github.com/lucaspiucomunica/produtor-do-bem
- Documentação do tema: [CLAUDE.md](../../CLAUDE.md)

