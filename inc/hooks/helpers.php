<?php

/**
 * Helper function para chamar headers específicos
 * 
 * @param string $type Tipo do header '1', '2' | (default, alternativo)
 * 
 */

function pdb_get_header($type = 'default') {
    set_query_var('header_type', $type);
    get_header();
}

/**
 * Gera classe CSS para seções baseada no caminho do arquivo atual
 * 
 * @param string $manual_name Nome manual para substituir o nome do arquivo (opcional)
 * @return string Classe CSS no formato "sections-pagina-principal-sobre"
 */
function get_class_section($manual_name = '') {
    // Obtém informações sobre o arquivo que está chamando a função
    $backtrace = debug_backtrace();
    $calling_file = $backtrace[0]['file'];
    
    // Obtém o caminho do tema
    $theme_path = get_template_directory();
    
    // Normaliza as barras para funcionar no Windows e Linux
    $theme_path = str_replace('\\', '/', $theme_path);
    $calling_file = str_replace('\\', '/', $calling_file);
    
    // Remove o caminho do tema do caminho completo
    $relative_path = str_replace($theme_path . '/', '', $calling_file);
    
    // Remove a extensão .php
    $path_without_extension = str_replace('.php', '', $relative_path);
    
    // Divide o caminho em partes
    $path_parts = explode('/', $path_without_extension);
    
    // Encontra o índice onde "sections" começa
    $sections_index = array_search('sections', $path_parts);
    
    if ($sections_index !== false) {
        // Pega apenas a partir de "sections"
        $relevant_parts = array_slice($path_parts, $sections_index);
        
        // Se um nome manual foi fornecido, substitui o último elemento
        if (!empty($manual_name)) {
            $relevant_parts[count($relevant_parts) - 1] = $manual_name;
        }
        
        // Junta as partes com hífen
        $class_name = implode('-', $relevant_parts);
    } else {
        // Fallback: se não encontrar "sections", usa o caminho completo
        $class_name = str_replace(['/', '_', ' '], '-', $path_without_extension);
        
        // Se um nome manual foi fornecido, substitui o último elemento
        if (!empty($manual_name)) {
            $parts = explode('-', $class_name);
            $parts[count($parts) - 1] = $manual_name;
            $class_name = implode('-', $parts);
        }
    }
    
    // Remove hífens duplos se houver
    $class_name = preg_replace('/-+/', '-', $class_name);
    
    // Remove hífens no início e fim
    $class_name = trim($class_name, '-');
    
    return $class_name;
}