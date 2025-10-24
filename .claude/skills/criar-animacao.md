---
name: criar-animacao
description: Cria arquivo de animação GSAP e registra no sistema de assets
---

# Criar Animação GSAP

Esta skill cria arquivos de animação GSAP específicos por página e os registra corretamente no sistema de assets.

## Objetivo

Facilitar a criação de animações GSAP seguindo a arquitetura do projeto, incluindo registro de assets e configuração de módulos ES.

## Estrutura de Animações

```
src/js/animations/
├── animations-config.js      # Constantes de timing
├── animations-utils.js       # Funções reutilizáveis
├── globals.js                # Animações globais
├── home.js                   # Página inicial
├── quem-somos.js             # Página quem somos
├── certificacoes.js          # Página certificações
├── fale-conosco.js           # Página contato
├── protocolo.js              # Single protocolo
└── protocolos-e-selos.js     # Página protocolos
```

## Padrão de Código para Animações

```javascript
import { gsap } from '../libs/gsap.min.js';
import { ScrollTrigger } from '../libs/ScrollTrigger.min.js';
import { fadeInUp, fadeIn } from './animations-utils.js';

gsap.registerPlugin(ScrollTrigger);

// Suas animações aqui
document.addEventListener('DOMContentLoaded', () => {

});
```

## Instruções

Quando o usuário solicitar criar uma animação:

1. **Criar arquivo de animação**:
   - Caminho: `src/js/animations/{nome-da-pagina}.js`
   - Incluir imports necessários (GSAP, ScrollTrigger, utils)
   - Estrutura básica com DOMContentLoaded

2. **Registrar em inc/core/assets.php**:
   - Adicionar `wp_enqueue_script()` na função `produtor_do_bem_scripts()`
   - Usar condição apropriada (`is_page()`, `is_singular()`, `is_front_page()`)
   - Definir dependências corretas

3. **Adicionar ao filtro type="module"**:
   - Incluir o handle do script no array `$module_scripts`
   - Função: `produtor_do_bem_add_type_module()`

## Exemplo de Registro em assets.php

```php
if (is_page('nova-pagina')) {
    wp_enqueue_script(
        'produtor-do-bem-animations-nova-pagina',
        get_template_directory_uri() . '/src/js/animations/nova-pagina.js',
        array(),
        PRODUTOR_DO_BEM_VERSION,
        true
    );
}
```

E no filtro:

```php
$module_scripts = array(
    // ... outros scripts
    'produtor-do-bem-animations-nova-pagina',
);
```

## Utilitários Disponíveis

Em `animations-utils.js`:
- `fadeInUp()` - Fade in com movimento vertical
- `fadeIn()` - Fade in simples
- Outras funções de animação reutilizáveis

## Ordem de Carregamento

Utils → GSAP libs → ScrollSmoother → Page transitions → Swiper → Animações específicas

## Notas Importantes

- Sempre use ES modules (type="module")
- Registre plugins GSAP antes de usar
- Use DOMContentLoaded para garantir que DOM está pronto
- ScrollTrigger e ScrollSmoother já estão carregados globalmente
- Considere performance: use will-change e transforms CSS
