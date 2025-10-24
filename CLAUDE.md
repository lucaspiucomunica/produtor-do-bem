# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Visão Geral do Projeto

Este é um tema WordPress personalizado para "Produtor do Bem", construído com PHP, Tailwind CSS e JavaScript moderno (animações GSAP, carrosséis Swiper). O site foca em certificações e protocolos agrícolas, com múltiplos templates específicos por página e um sistema sofisticado de animações.

## Comandos de Desenvolvimento

### Build do CSS
Navegue primeiro para o diretório `src/libs/`:
```bash
cd src/libs
```

Modo watch (desenvolvimento):
```bash
npm run build:css-watch
```

Build de produção (minificado):
```bash
npm run build:css-prod
```

**Nota**: O Tailwind CSS está configurado em `src/libs/tailwind.config.js` e compila de `src/css/input.css` para `src/css/output.css`.

## Arquitetura

### Estrutura de Diretórios

- **`inc/`** - Funcionalidades PHP principais e utilitários
  - `core/` - Configuração do tema, gerenciamento de assets, sistema de ícones, menu walker, recursos admin
  - `hooks/` - Filtros e funções auxiliares
  - `ajax/` - Handlers AJAX para formulários (formulário de contato, formulário de denúncia)

- **`src/`** - Assets do frontend
  - `css/` - Configuração do Tailwind CSS e saída compilada
    - `input.css` - Ponto de entrada principal importando todos os estilos
    - `output.css` - CSS compilado (não editar diretamente)
    - `styles/` - Módulos CSS organizados (base, components, layout, sections, utilities)
  - `js/` - Módulos JavaScript
    - `animations/` - Animações GSAP específicas por página
    - `libs/` - Bibliotecas de terceiros (GSAP, Swiper)
    - Módulos utilitários: `utils.js`, `theme.js`, `menu.js`, `page-transition.js`, etc.
  - `img/iconpdb/` - Biblioteca de ícones SVG
  - `libs/` - Módulos Node e ferramentas de build (Tailwind)

- **`template-parts/`** - Componentes de template reutilizáveis
  - `sections/` - Seções específicas por página organizadas por nome da página
  - `globals/` - Componentes globais (cabeçalhos, rodapé, CTAs, cursor)
  - `modals/` - Templates de modais
  - `transition-page/` - Overlays de transição de página

### Sistema de Carregamento de Assets

Assets são enfileirados via `inc/core/assets.php` com gerenciamento inteligente de dependências:

1. **Ordem de carregamento importa**: Utils → GSAP libs → ScrollSmoother → Transições de página → Swiper → Código específico da página
2. **ES Modules**: Scripts de animação são carregados com atributo `type="module"` via filtro
3. **Carregamento condicional**: Assets específicos de página só carregam em suas respectivas páginas (verificado via `is_page()` ou `is_singular()`)
4. **Localização AJAX**: Formulários recebem `ajax_url` e `nonce` via `wp_localize_script()`

### Sistema de Ícones

O tema usa um sistema customizado de ícones SVG (`inc/core/icons.php`):

```php
// Uso em templates
echo icon('add'); // retorna iconpdb-add.svg com classe "iconpdb"
echo icon('arrow-right-01', 'w-6 h-6 fill-blue-500'); // com classes adicionais
```

Ícones são armazenados em `src/img/iconpdb/` com prefixo `iconpdb-{nome}.svg`.

### Funções Auxiliares Personalizadas

Helpers principais em `inc/hooks/helpers.php`:

- **`pdb_get_header($type)`** - Carrega diferentes tipos de cabeçalho ('1' ou '2')
- **`get_class_section($manual_name)`** - Gera automaticamente classes CSS no estilo BEM a partir de caminhos de arquivo (ex: `sections-pagina-principal-sobre`)

### Sistema de Menus

Walker personalizado: `Produtor_Do_Bem_Menu_Walker` (estende `Walker_Nav_Menu`) em `inc/core/menu-walker.php`
- Dois menus registrados: `menu-main` e `menu-footer`

### Formulários AJAX

Dois handlers de formulário AJAX:
- **Formulário de Contato**: `handle_multi_step_contact_form()` - Integração de formulário multi-steps com Contact Form 7
- **Formulário de Denúncia**: `handle_denuncia_form()` - Envio de relatórios/denúncias

Ambos os handlers:
- Verificam nonces para segurança
- Sanitizam todas as entradas
- Requerem plugin Contact Form 7
- Registram requisições no modo debug

### Arquitetura de Animações

Sistema de animações baseado em GSAP com:
- **Animações globais** (`animations/globals.js`) - Animações comuns em todas as páginas
- **Animações específicas por página** - Arquivos individuais por página (home.js, certificacoes.js, etc.)
- **Utilitários compartilhados** (`animations/animations-utils.js`) - Funções de animação reutilizáveis
- **Configuração** (`animations/animations-config.js`) - Constantes de timing de animação
- **ScrollTrigger** - Animações baseadas em scroll
- **ScrollSmoother** - Experiência de scroll suave
- **SplitText** - Biblioteca de animação de texto (plugin GSAP)

### Templates de Página

O tema usa templates de página do WordPress:
- `page.php` - Template de página padrão
- `page-quem-somos.php` - Página "Quem somos"
- `page-fale-conosco.php` - Página de contato
- `page-protocolos-selos.php` - Página de protocolos e selos
- `page-certificacoes.php` - Página de certificações
- `single-protocolo.php` - Custom post type de protocolo individual

### Configuração do Tailwind

Design tokens personalizados em `src/libs/tailwind.config.js`:

**Paleta de Cores:**
- `primario-*` - Tons de verde primário
- `secundario-*` - Tons de verde-amarelo secundário
- `neutro-*` - Tons de cinza neutro
- `limao-*` - Cores de destaque limão

**Tipografia:**
- Fonte display: Sora
- Fonte body: Inter

**Container:** Largura máxima de 1600px no breakpoint 2xl

**Safelist:** Classes dinâmicas de `get_class_section()` estão na safelist para prevenir remoção.

### Regras do Cursor

O projeto impõe regras de desenvolvimento estritas (veja `.cursor/rules/regras-de-desenvolvimento.mdc`):
- Execute APENAS o que for explicitamente solicitado
- Sem melhorias ou sugestões não solicitadas
- Mantenha respostas concisas e diretas
- Inclua apenas comentários essenciais

## Notas Importantes

1. **Segurança de Edição de Arquivos**: Edição de arquivos está desabilitada no admin do WordPress (`DISALLOW_FILE_EDIT`)
2. **Constante de Versão**: Versão do tema é definida como `PRODUTOR_DO_BEM_VERSION` em `inc/core/setup.php`
3. **Dependência do Contact Form 7**: Formulários requerem plugin CF7 ativo
4. **Desenvolvimento Local**: Este é um setup Local by Flywheel (caminho inclui "Local Sites")
5. **Branch Git**: Desenvolvimento acontece na branch `dev`, PRs fazem merge para `main`
6. **Transições de Página**: Sistema customizado de transição de página usando GSAP (`page-transition.js`)
7. **Integração Swiper**: Funcionalidade de carrossel/slider via biblioteca Swiper
