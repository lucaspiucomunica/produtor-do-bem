<?php

/**
 * Handler para gerar nonces dinamicamente via AJAX
 * 
 * Soluciona problemas de cache de página onde nonces ficam inválidos
 */

function get_form_nonces() {
    // Retorna nonces frescos para todos os formulários
    wp_send_json_success(array(
        'multi_step_form_nonce' => wp_create_nonce('multi_step_form_nonce'),
        'denuncia_form_nonce' => wp_create_nonce('denuncia_form_nonce'),
        'newsletter_form_nonce' => wp_create_nonce('newsletter_form_nonce'),
        'download_protocolo_form_nonce' => wp_create_nonce('download_protocolo_form_nonce')
    ));
}

add_action('wp_ajax_get_form_nonces', 'get_form_nonces');
add_action('wp_ajax_nopriv_get_form_nonces', 'get_form_nonces');

