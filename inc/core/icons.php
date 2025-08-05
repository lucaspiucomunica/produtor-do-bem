<?php

/**
 * Sistema simplificado de ícones SVG
 * 
 * Facilita o uso dos ícones Iconsax de forma simples e com classes CSS.
 */

/**
 * Retorna o conteúdo SVG de um ícone
 * 
 * @param string $icon_name Nome do ícone (sem prefixo 'iconsax-' e sem extensão '.svg')
 * @param string $class Classes CSS adicionais para o SVG (opcional)
 * @return string Conteúdo SVG do ícone ou string vazia se não encontrado
 * 
 * Nota: A classe 'iconsax' é adicionada automaticamente a todos os ícones.
 * 
 * Exemplos de uso:
 * echo icon('add'); // Resultado: <svg class="iconsax">...
 * echo icon('arrow-right-01', 'w-6 h-6 fill-blue-500'); // Resultado: <svg class="iconsax w-6 h-6 fill-blue-500">...
 */
function icon($icon_name, $class = '') {
    // Constrói o caminho completo do arquivo
    $icon_path = get_template_directory() . '/src/img/iconsax/iconsax-' . $icon_name . '.svg';
    
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
    
    // Adiciona a classe 'iconsax' automaticamente e classes adicionais se fornecidas
    $classes = 'iconsax';
    if (!empty($class)) {
        $classes .= ' ' . $class;
    }
    
    $svg_content = str_replace('<svg', '<svg class="' . esc_attr($classes) . '"', $svg_content);
    
    return $svg_content;
}