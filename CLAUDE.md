# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Regras de Desenvolvimento

Execute APENAS o que for explicitamente solicitado. Não faça melhorias, refatorações ou sugestões não solicitadas. Mantenha respostas concisas e diretas.

## Comandos de Build

Todos os comandos de build são executados a partir de `src/libs/`:

```bash
cd src/libs

# Desenvolvimento - modo watch (saída não minificada)
npm run build:css-watch    # Tailwind CSS watch
npm run build:js-watch     # esbuild watch

# Produção - saída minificada
npm run build:css-prod     # CSS minificado
npm run build:js-prod      # Bundles JS minificados
npm run build:all-prod     # CSS + JS
```

## Visão Geral da Arquitetura

### Estrutura PHP
- `functions.php` - Loader do tema, requer todos os módulos de `inc/`
- `inc/core/setup.php` - Configuração do tema e suporte a features
- `inc/core/assets.php` - Enqueue de scripts/styles com alternância dev/prod
- `inc/core/icons.php` - Sistema de ícones SVG via função `icon('nome-icone')`
- `inc/hooks/helpers.php` - Utilitários `pdb_get_header()` e `get_class_section()`
- `inc/ajax/` - Handlers AJAX para formulários (contato, newsletter, denúncia, download de protocolo)

### Arquitetura JavaScript
**Entry points** (`src/js/entries/`): Arquivos de entrada para bundles do esbuild
**Bundles** (`src/js/bundles/`): Saída compilada (IIFE para core/forms, ESM para transitions/pages)
**Libs externas** (`src/js/libs/`): GSAP, ScrollTrigger, ScrollSmoother, SplitText, Swiper (carregadas separadamente, não empacotadas)

Modo dev (`WP_DEBUG=true`): Arquivos individuais carregados
Modo prod (`WP_DEBUG=false`): Bundles minificados utilizados

### Arquitetura CSS
- `src/css/input.css` - Entry point do Tailwind, importa todos os partials
- `src/css/styles/` - Estilos de componentes e layout
- `src/libs/tailwind.config.js` - Design tokens customizados (cores, breakpoints, fontes)

### Estrutura de Templates
- `page-{slug}.php` - Templates específicos de página
- `single-protocolo.php` - Template single do CPT Protocolo
- `template-parts/sections/{pagina}/` - Partials de seções por página
- `template-parts/globals/` - Componentes header, footer, CTA
- `template-parts/modals/` - Componentes de modal

## Adicionando uma Nova Página

Consulte `src/docs/fluxo-nova-pagina.md` para o fluxo completo. Passos principais:

1. Criar template de página `page-{slug}.php`
2. Criar seções em `template-parts/sections/{slug}/`
3. Criar arquivo de animação `src/js/animations/{slug}.js`
4. Criar entry point `src/js/entries/{slug}-entry.js`
5. Registrar bundle em `src/libs/build-js.mjs` (array pageAnimations)
6. Registrar assets em `inc/core/assets.php` (4 pontos: dev CSS, prod CSS, dev JS, prod JS)
7. Executar `npm run build:all-prod`

## Padrões Principais

### Classes CSS de Seções
Use `get_class_section()` nas seções para gerar automaticamente classes estilo BEM baseadas no caminho do arquivo.

### Formulários AJAX
Formulários usam `wp_localize_script()` para nonces e `ajax_url`. Handlers validam nonces e retornam JSON.

### Carregamento de Assets
`inc/core/assets.php` carrega assets condicionalmente baseado no slug da página usando verificações `is_page()`.

### Ícones SVG
Ícones armazenados em `src/img/iconpdb/`. Use `<?php icon('nome-icone', 'classe-css-opcional'); ?>` para renderizar.

## Deploy

Consulte `src/docs/deploy.md`. Fluxo básico: merge para `main` → SSH no servidor → `git pull origin main`

## Design System (Tailwind)

- **Cores**: primary (verde #13863D), secondary (verde-amarelo #78BE21), accent (lima #E6F200)
- **Fontes**: Inter (corpo), Sora (display)
- **Breakpoints**: xxs (340px) até xl-plus (1200px)
