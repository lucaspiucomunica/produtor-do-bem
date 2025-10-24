---
name: build-css
description: Executa build do Tailwind CSS para desenvolvimento ou produção
---

# Build CSS - Tailwind

Esta skill facilita a execução dos builds do Tailwind CSS no projeto.

## Objetivo

Compilar os estilos do tema usando Tailwind CSS, seja em modo watch (desenvolvimento) ou build de produção (minificado).

## Contexto do Projeto

- Tailwind está configurado em `src/libs/tailwind.config.js`
- Arquivo de entrada: `src/css/input.css`
- Arquivo de saída: `src/css/output.css`
- Scripts NPM estão em `src/libs/package.json`

## Comandos Disponíveis

### Modo Watch (Desenvolvimento)
Para desenvolvimento ativo com recompilação automática ao salvar arquivos:

```bash
cd src/libs && npm run build:css-watch
```

**Quando usar**: Durante desenvolvimento ativo, mantém o processo rodando e recompila automaticamente quando você edita arquivos PHP, CSS ou JS que afetam as classes Tailwind.

### Build de Produção
Para gerar CSS minificado otimizado para produção:

```bash
cd src/libs && npm run build:css-prod
```

**Quando usar**: Antes de fazer deploy, commit final, ou quando precisar do CSS otimizado.

## Instruções

Quando o usuário solicitar build do CSS:

1. Pergunte qual tipo de build:
   - **Watch** para desenvolvimento contínuo
   - **Produção** para build final minificado

2. Execute o comando apropriado navegando para `src/libs/` primeiro

3. Se for modo watch, informe que o processo ficará rodando e recompilando automaticamente

4. Se for produção, confirme quando o build estiver completo

## Notas Importantes

- O build watch precisa ficar rodando em background
- Alterações em arquivos dentro do `content` do tailwind.config.js acionam rebuild
- Classes dinâmicas geradas por `get_class_section()` estão na safelist
- Nunca edite `output.css` diretamente - ele é gerado automaticamente
