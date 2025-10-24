---
name: adicionar-asset
description: Registra novos scripts ou estilos no sistema de enqueue do WordPress
---

# Adicionar Asset

Esta skill facilita o registro de novos scripts e estilos no sistema de enqueue do WordPress, seguindo os padrões do projeto.

## Objetivo

Adicionar corretamente scripts JS e estilos CSS em `inc/core/assets.php` com dependências, condições de carregamento e configurações apropriadas.

## Localização

Todos os assets são registrados em: `inc/core/assets.php`

Função principal: `produtor_do_bem_scripts()`

## Padrão de Enqueue

### Scripts JavaScript

```php
wp_enqueue_script(
    'produtor-do-bem-{nome}',                          // Handle único
    get_template_directory_uri() . '/src/js/{arquivo}.js',  // Caminho
    array('dependencia-1', 'dependencia-2'),           // Dependências
    PRODUTOR_DO_BEM_VERSION,                           // Versão
    true                                                // Carregar no footer
);
```

### Estilos CSS

```php
wp_enqueue_style(
    'produtor-do-bem-{nome}',                          // Handle único
    get_template_directory_uri() . '/src/css/{arquivo}.css',  // Caminho
    array(),                                            // Dependências
    PRODUTOR_DO_BEM_VERSION                            // Versão
);
```

## Ordem de Carregamento

1. **Utils** (`utils.js`)
2. **GSAP libs** (gsap, ScrollTrigger, SplitText, ScrollSmoother)
3. **ScrollSmoother** (`scroll-smoother.js`)
4. **Page transitions** (`page-transition.js`)
5. **Swiper** (biblioteca + slides-swiper.js)
6. **Base Form** (`base-form.js`)
7. **Page-specific scripts** (animações, formulários)
8. **Global scripts** (menu, theme, modal-denuncia)

## Carregamento Condicional

### Por página específica
```php
if (is_page('slug-da-pagina')) {
    wp_enqueue_script(...);
}
```

### Página inicial
```php
if (is_front_page()) {
    wp_enqueue_script(...);
}
```

### Custom Post Type
```php
if (is_singular('protocolo')) {
    wp_enqueue_script(...);
}
```

## ES Modules

Para scripts que usam `import/export`, adicione ao filtro `produtor_do_bem_add_type_module()`:

```php
$module_scripts = array(
    'produtor-do-bem-page-transition',
    'produtor-do-bem-slides-swiper',
    'produtor-do-bem-animations-globals',
    'produtor-do-bem-animations-home',
    // Adicione seu script aqui
    'produtor-do-bem-novo-script',
);
```

## Localização AJAX

Para scripts que fazem requisições AJAX:

```php
wp_localize_script('produtor-do-bem-{nome}', 'ajax_object', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('nome_nonce')
));
```

## Instruções

Quando o usuário solicitar adicionar um asset:

1. **Identificar tipo**: Script ou estilo?

2. **Determinar condição de carregamento**:
   - Global (sempre)
   - Página específica
   - Custom post type

3. **Listar dependências** corretas

4. **Adicionar wp_enqueue_script/style** na posição apropriada

5. **Se for ES module**: Adicionar ao array `$module_scripts`

6. **Se usar AJAX**: Adicionar `wp_localize_script()`

## Exemplo Completo

```php
// Script de animação para nova página
if (is_page('nova-pagina')) {
    wp_enqueue_script(
        'produtor-do-bem-animations-nova-pagina',
        get_template_directory_uri() . '/src/js/animations/nova-pagina.js',
        array(),
        PRODUTOR_DO_BEM_VERSION,
        true
    );
}

// No filtro type="module"
function produtor_do_bem_add_type_module($tag, $handle, $src) {
    $module_scripts = array(
        // ... scripts existentes
        'produtor-do-bem-animations-nova-pagina',
    );

    if (in_array($handle, $module_scripts)) {
        $tag = str_replace('<script ', '<script type="module" ', $tag);
    }

    return $tag;
}
```

## Notas Importantes

- Use sempre `PRODUTOR_DO_BEM_VERSION` para versão
- Handles devem seguir padrão: `produtor-do-bem-{nome}`
- Scripts de animação sempre precisam type="module"
- Respeite a ordem de dependências
- Scripts devem carregar no footer (true como último parâmetro)
- Estilos carregam no header por padrão
