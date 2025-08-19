# Estrutura de Arquivos CSS - Produtor do Bem

Esta pasta contém todos os arquivos CSS organizados do tema WordPress Produtor do Bem, utilizando Tailwind CSS.

## Estrutura de Arquivos

### 📁 Arquivos Principais

- **`input.css`** - Arquivo de entrada principal (usado apenas para importar outros arquivos)
- **`output.css`** - Arquivo de saída gerado pelo Tailwind CSS (não editar manualmente)

### 📁 Arquivos Organizados

- **`base.css`** - Configurações base do Tailwind e estilos fundamentais
  - Importação de fontes
  - Diretivas `@tailwind`
  - Estilos base (`@layer base`)
  - Configurações de tipografia e elementos HTML

- **`components.css`** - Componentes reutilizáveis
  - Botões (`.btn`, `.btn-outline`, etc.)
  - Conteúdo de texto (`.content-text`)
  - Ícones (`.content-icon`)

- **`layout.css`** - Layout e estrutura do site
  - Header (`.site-header`, `.content-header`)
  - Footer (`.site-footer`)
  - Menu de navegação

- **`sections.css`** - Seções específicas do site
  - Hero da página principal
  - Seção "Sobre"
  - Seção de certificações
  - Cards e componentes específicos

- **`utilities.css`** - Classes utilitárias customizadas
  - Classes de padding para seções
  - Utilitários específicos do projeto

## Como Usar

### Desenvolvimento
```bash
cd src/libs
npm run dev
```

### Build de Produção
```bash
cd src/libs
npm run build
```

### Build com Watch
```bash
cd src/libs
npm run build:watch
```

## Vantagens da Nova Estrutura

1. **Organização**: Cada arquivo tem uma responsabilidade específica
2. **Manutenibilidade**: Mais fácil encontrar e editar estilos específicos
3. **Reutilização**: Componentes organizados facilitam a reutilização
4. **Escalabilidade**: Estrutura preparada para crescimento do projeto
5. **Colaboração**: Equipe pode trabalhar em arquivos diferentes sem conflitos

## Regras de Organização

- **Base**: Apenas configurações fundamentais e estilos base
- **Components**: Componentes reutilizáveis em todo o site
- **Layout**: Estrutura geral (header, footer, grid)
- **Sections**: Estilos específicos de cada seção/página
- **Utilities**: Classes utilitárias customizadas

## Notas Importantes

- Todos os arquivos usam a sintaxe do Tailwind CSS (`@apply`, `@layer`)
- O arquivo `input.css` agora serve apenas como ponto de entrada
- O Tailwind processa todos os arquivos em ordem alfabética
- Mantenha a organização para facilitar futuras manutenções
