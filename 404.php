<?php
/**
 * Página 404 - Página não encontrada
 * 
 * @package Produtor_do_Bem
 */

// Redirecionamento para a home se não estiver na home ou na página inicial
if (!is_front_page() && !is_home()) {
    wp_redirect(home_url());
    exit;
}
?>