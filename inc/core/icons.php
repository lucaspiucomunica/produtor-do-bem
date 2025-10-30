<?php

/**
 * Sistema simplificado de ícones SVG
 * 
 * Facilita o uso dos ícones IconPDB de forma simples e com classes CSS.
 */

/**
 * Retorna o conteúdo SVG de um ícone
 * 
 * @param string $icon_name Nome do ícone (sem prefixo 'iconpdb-' e sem extensão '.svg')
 * @param string $class Classes CSS adicionais para o SVG (opcional)
 * @return string Conteúdo SVG do ícone ou string vazia se não encontrado
 * 
 * Nota: A classe 'iconpdb' é adicionada automaticamente a todos os ícones.
 * 
 * Exemplos de uso:
 * echo icon('add'); // Resultado: <svg class="iconpdb">...
 * echo icon('arrow-right-01', 'w-6 h-6 fill-blue-500'); // Resultado: <svg class="iconpdb w-6 h-6 fill-blue-500">...
 */
function icon($icon_name, $class = '') {
    // Constrói o caminho completo do arquivo
    $icon_path = get_template_directory() . '/src/img/iconpdb/iconpdb-' . $icon_name . '.svg';
    
    // Verifica se o arquivo existe
    if (!file_exists($icon_path)) {
        // Em desenvolvimento, mostra erro. Em produção, retorna vazio silenciosamente
        if (WP_DEBUG) {
            return '<!-- Ícone não encontrado: ' . $icon_name . ' -->';
        }
        return '';
    }
    
    // Lê o conteúdo do arquivo SVG
    $svg_content = file_get_contents($icon_path);

    // Garante IDs únicos quando o SVG utiliza defs (clipPath, mask, etc.)
    $unique_suffix = wp_unique_id('iconpdb-');

    if (preg_match_all('/\sid="([^"]+)"/', $svg_content, $matches)) {
        $id_map = [];

        foreach ($matches[1] as $original_id) {
            $id_map[$original_id] = $original_id . '-' . $unique_suffix;
        }

        // Substitui as declarações de id="..."
        foreach ($id_map as $original_id => $new_id) {
            $svg_content = preg_replace(
                '/\sid="' . preg_quote($original_id, '/') . '"/',
                ' id="' . $new_id . '"',
                $svg_content
            );
        }

        // Atualiza referências do tipo url(#id)
        $svg_content = preg_replace_callback(
            '/url\(#([^)]+)\)/',
            function ($matches) use ($id_map) {
                $referenced_id = $matches[1];

                if (isset($id_map[$referenced_id])) {
                    return 'url(#' . $id_map[$referenced_id] . ')';
                }

                return $matches[0];
            },
            $svg_content
        );

        // Atualiza atributos href e xlink:href
        $svg_content = preg_replace_callback(
            '/(href|xlink:href)="#([^"]+)"/',
            function ($matches) use ($id_map) {
                $attribute = $matches[1];
                $referenced_id = $matches[2];

                if (isset($id_map[$referenced_id])) {
                    return sprintf('%s="#%s"', $attribute, $id_map[$referenced_id]);
                }

                return $matches[0];
            },
            $svg_content
        );

        // Atualiza atributos aria-labelledby / aria-describedby, se presentes
        $svg_content = preg_replace_callback(
            '/aria-(labelledby|describedby)="([^"]+)"/',
            function ($matches) use ($id_map) {
                $attribute = $matches[1];
                $ids = preg_split('/\s+/', trim($matches[2]));

                foreach ($ids as &$id) {
                    if (isset($id_map[$id])) {
                        $id = $id_map[$id];
                    }
                }

                return sprintf('aria-%s="%s"', $attribute, implode(' ', $ids));
            },
            $svg_content
        );
    }
    
    // Adiciona a classe 'iconpdb' automaticamente e classes adicionais se fornecidas
    $classes = 'iconpdb';
    if (!empty($class)) {
        $classes .= ' ' . $class;
    }
    
    $svg_content = str_replace('<svg', '<svg class="' . esc_attr($classes) . '"', $svg_content);
    
    return $svg_content;
}