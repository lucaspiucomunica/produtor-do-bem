<?php

/**
 * Funções principais do tema Produtor do Bem
 *
 * Este arquivo carrega todos os componentes necessários para o funcionamento do tema.
 */

// Configurações básicas do tema
require_once('inc/core/setup.php');

// Gerenciamento de assets (CSS, JS, bibliotecas)
require_once('inc/core/assets.php');

// Sistema de gerenciamento de ícones SVG
require_once('inc/core/icons.php');

// Seletor de ícones no painel administrativo
require_once('inc/core/admin-icon-selector.php');

// Hooks e filtros personalizados
require_once('inc/hooks/filters.php');

/**
 * Helper function para chamar headers específicos
 * 
 * @param string $type Tipo do header (default, alt, etc.)
 */
function pdb_get_header($type = 'default') {
    set_query_var('header_type', $type);
    get_header();
}