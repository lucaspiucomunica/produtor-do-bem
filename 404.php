<?php
/**
 * Página 404 - Página não encontrada
 * 
 * @package Produtor_do_Bem
 */

// Redirecionamento temporário para a home
wp_redirect(home_url('/'), 302);
exit;
?>