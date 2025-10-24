---
name: criar-template-pagina
description: Cria novo template de página WordPress seguindo padrões do projeto
---

# Criar Template de Página

Esta skill cria novos templates de página WordPress seguindo a estrutura e padrões do projeto.

## Objetivo

Facilitar a criação de templates personalizados de página com header/footer corretos, estrutura de seções e assets específicos.

## Templates Existentes

- `page.php` - Template padrão
- `page-quem-somos.php` - Quem somos
- `page-fale-conosco.php` - Contato
- `page-protocolos-selos.php` - Protocolos e selos
- `page-certificacoes.php` - Certificações
- `single-protocolo.php` - CPT protocolo

## Padrão de Template

```php
<?php
/**
 * Template Name: [Nome da Página]
 * Description: [Descrição breve]
 */

pdb_get_header('1'); // ou '2' para header alternativo
?>

<main id="main-content">
    <?php
    // Incluir seções
    get_template_part('template-parts/sections/{pagina}/{secao}');
    ?>
</main>

<?php get_footer(); ?>
```

## Instruções

Quando o usuário solicitar criar um template de página:

1. **Coletar informações**:
   - Nome da página (slug)
   - Título do template
   - Tipo de header ('1' ou '2')
   - Seções necessárias

2. **Criar arquivo do template**:
   - Nome: `page-{slug}.php`
   - Incluir Template Name no cabeçalho
   - Usar função `pdb_get_header()` apropriada
   - Estrutura main com id="main-content"

3. **Criar pasta de seções** (se necessário):
   - `template-parts/sections/{slug}/`

4. **Registrar assets específicos** (se necessário):
   - Adicionar em `inc/core/assets.php`
   - Usar condição `is_page('{slug}')`

## Tipos de Header

- **Header 1**: Header padrão (transparente com logo)
- **Header 2**: Header alternativo (variação visual)

Use `pdb_get_header('1')` ou `pdb_get_header('2')`.

## Exemplo Completo

```php
<?php
/**
 * Template Name: Nova Página
 * Description: Template para a nova página do site
 */

pdb_get_header('1');
?>

<main id="main-content">
    <?php
    get_template_part('template-parts/sections/nova-pagina/hero');
    get_template_part('template-parts/sections/nova-pagina/conteudo');
    get_template_part('template-parts/globals/cta-1');
    ?>
</main>

<?php get_footer(); ?>
```

## Após Criar o Template

1. No WordPress admin, crie uma nova página
2. Selecione o template no seletor "Atributos da Página"
3. Publique a página
4. Acesse via slug definido

## Notas Importantes

- Sempre use `pdb_get_header()` em vez de `get_header()` diretamente
- Mantenha id="main-content" na tag main
- Organize seções específicas em pastas por página
- Componentes globais ficam em `template-parts/globals/`
- Assets específicos só carregam quando a página está ativa
