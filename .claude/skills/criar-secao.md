---
name: criar-secao
description: Cria uma nova seção de template seguindo os padrões do projeto
---

# Criar Seção

Esta skill cria novas seções de template PHP seguindo a estrutura e padrões estabelecidos no projeto.

## Objetivo

Facilitar a criação de seções reutilizáveis em `template-parts/sections/` com a estrutura correta, classes automáticas e organização do projeto.

## Estrutura de Seções

As seções são organizadas por página:
```
template-parts/sections/
├── pagina-principal/
│   ├── hero.php
│   ├── sobre.php
│   └── certificacoes.php
├── quem-somos/
├── certificacoes/
├── fale-conosco/
└── protocolos-selos/
```

## Padrão de Código para Seções

```php
<?php
/**
 * Seção: [Nome da Seção]
 * Página: [Nome da Página]
 */

$section_class = get_class_section();
?>

<section class="<?php echo $section_class; ?>">
    <div class="container">
        <!-- Conteúdo da seção -->

    </div>
</section>
```

## Instruções

Quando o usuário solicitar criar uma seção:

1. **Coletar informações necessárias**:
   - Nome da página (ex: "quem-somos", "certificacoes")
   - Nome da seção (ex: "hero", "sobre", "depoimentos")
   - Descrição breve do propósito da seção

2. **Criar o arquivo** no caminho correto:
   - `template-parts/sections/{nome-da-pagina}/{nome-da-secao}.php`

3. **Incluir estrutura base**:
   - Comentário descritivo no topo
   - Uso da função `get_class_section()` para classe automática
   - Container Tailwind
   - Estrutura semântica HTML5

4. **Informar ao usuário**:
   - Caminho onde o arquivo foi criado
   - Lembrar de incluir a seção no template da página
   - Exemplo de como incluir: `get_template_part('template-parts/sections/{pagina}/{secao}');`

## Função get_class_section()

Esta função gera automaticamente uma classe CSS baseada no caminho do arquivo:
- Caminho: `template-parts/sections/quem-somos/hero.php`
- Classe gerada: `sections-quem-somos-hero`

Essa classe pode ser usada para estilização específica em `src/css/styles/sections.css`.

## Notas Importantes

- Sempre use `get_class_section()` para consistência de classes
- Classes geradas estão na safelist do Tailwind
- Siga a estrutura de pastas por página
- Use container Tailwind para layouts consistentes
- Mantenha HTML semântico (section, article, header, etc.)
