# CLAUDE.md

Este arquivo fornece orientações para o Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

**IMPORTANTE: Este projeto e toda comunicação deve ser conduzida em português brasileiro.**

## Visão Geral do Projeto

Este é um tema WordPress personalizado para "Produtor do Bem" construído com práticas modernas de desenvolvimento. O tema usa TailwindCSS para estilização e SwiperJS para componentes interativos.

## Arquitetura

### Estrutura de Diretórios
- `functions.php` - Arquivo principal de funções do tema, carrega todos os componentes
- `inc/` - Funcionalidades centrais do tema organizadas por propósito
  - `inc/core/` - Configurações essenciais do tema (setup.php, assets.php, icons.php, admin-icon-selector.php)
  - `inc/hooks/` - Filtros e helpers personalizados
- `src/` - Assets de desenvolvimento
  - `src/css/` - Arquivos CSS fonte com imports organizados
  - `src/js/` - Arquivos JavaScript incluindo configurações do Swiper
  - `src/libs/` - Módulos Node e dependências
- `template-parts/` - Componentes de template reutilizáveis
  - `template-parts/globals/` - Componentes globais do site (cabeçalho, rodapé)
  - `template-parts/sections/` - Seções específicas de página organizadas por página

### Principais Recursos do Tema
- Arquitetura PHP modular com separação de responsabilidades
- Sistema personalizado de gerenciamento de ícones SVG com interface administrativa
- Estilização baseada em TailwindCSS com imports CSS organizados
- Integração do SwiperJS para carrosséis e sliders
- Template parts específicos por página para diferentes seções

## Comandos de Desenvolvimento

### Comandos de Build CSS
Navegue para o diretório `src/libs/` antes de executar:

```bash
# Modo watch para desenvolvimento (reconstrói ao modificar arquivos)
npm run build:css-watch

# Build de produção (saída minificada)  
npm run build:css-prod
```

### Estrutura de Arquivos CSS
- Entrada: `src/css/input.css` (arquivo principal de entrada com imports organizados)
- Saída: `src/css/output.css` (desenvolvimento) ou `src/css/output.min.css` (produção)
- O arquivo de entrada importa dos subdiretórios `src/css/styles/` para melhor organização

### JavaScript
- `src/js/slides-swiper.js` - Configurações dos carrosséis Swiper
- `src/js/theme.js` - JavaScript geral do tema
- Dependências são gerenciadas via npm em `src/libs/`

## Trabalhando com o Tema

### Adicionando Novos Estilos
1. Adicione CSS aos arquivos apropriados no diretório `src/css/styles/`
2. Importe em `src/css/input.css` se criar novos arquivos
3. Execute comando de build para compilar

### Adicionando Novas Funcionalidades JavaScript
1. Adicione funcionalidade aos arquivos JS existentes ou crie novos em `src/js/`
2. Enfileire novos scripts em `inc/core/assets.php` seguindo os padrões existentes

### Desenvolvimento de Templates
- Use template parts existentes em `template-parts/` como referência para estrutura
- Siga as convenções da hierarquia de templates do WordPress
- Seções específicas de página são organizadas por nome da página em `template-parts/sections/`

### Gerenciamento de Ícones
O tema inclui um sistema personalizado de ícones SVG gerenciado através de `inc/core/icons.php` com interface administrativa para seleção de ícones.