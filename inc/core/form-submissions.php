<?php

/**
 * Sistema de Submissões de Formulários
 *
 * Registra Custom Post Type para armazenar submissões dos formulários CF7
 * e captura automaticamente todos os envios via hook do Contact Form 7
 */

// Registrar Custom Post Type para submissões
function pdb_register_submission_post_type() {
    $labels = array(
        'name'               => 'Submissões',
        'singular_name'      => 'Submissão',
        'menu_name'          => 'Submissões',
        'name_admin_bar'     => 'Submissão',
        'add_new'            => 'Adicionar Nova',
        'add_new_item'       => 'Adicionar Nova Submissão',
        'new_item'           => 'Nova Submissão',
        'edit_item'          => 'Editar Submissão',
        'view_item'          => 'Ver Submissão',
        'all_items'          => 'Todas Submissões',
        'search_items'       => 'Buscar Submissões',
        'not_found'          => 'Nenhuma submissão encontrada',
        'not_found_in_trash' => 'Nenhuma submissão na lixeira'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => false,
        'show_in_menu'        => false,
        'query_var'           => false,
        'rewrite'             => false,
        'capability_type'     => 'post',
        'capabilities'        => array(
            'create_posts' => 'manage_options',
        ),
        'map_meta_cap'        => true,
        'has_archive'         => false,
        'hierarchical'        => false,
        'supports'            => array('title'),
    );

    register_post_type('pdb_submission', $args);
}
add_action('init', 'pdb_register_submission_post_type');

// Hook para capturar submissões do Contact Form 7
function pdb_save_cf7_submission($contact_form) {
    // Obter dados da submissão
    $submission = WPCF7_Submission::get_instance();

    if (!$submission) {
        return;
    }

    // Obter dados do formulário
    $posted_data = $submission->get_posted_data();

    if (empty($posted_data)) {
        return;
    }

    // Remover campos duplicados dos handlers AJAX personalizados
    // Os handlers enviam campos como 'nome', 'email', 'telefone', 'mensagem'
    // que são mapeados para 'your-name', 'your-email', etc.
    $fields_to_remove = array('nome', 'email', 'telefone', 'mensagem', 'nonce', 'action', 'post_id');

    foreach ($fields_to_remove as $field) {
        if (isset($posted_data[$field])) {
            unset($posted_data[$field]);
        }
    }

    // Obter informações do formulário
    $form_id = $contact_form->id();
    $form_title = $contact_form->title();

    // Extrair email (procura por campos comuns de email)
    $submission_email = '';
    $email_fields = array('your-email', 'email', 'e-mail', 'your_email');

    foreach ($email_fields as $field) {
        if (!empty($posted_data[$field])) {
            $submission_email = sanitize_email($posted_data[$field]);
            break;
        }
    }

    // Criar título descritivo para o post
    $post_title = $form_title . ' - ' . date('d/m/Y H:i:s');
    if (!empty($submission_email)) {
        $post_title .= ' - ' . $submission_email;
    }

    // Criar post de submissão
    $post_id = wp_insert_post(array(
        'post_type'   => 'pdb_submission',
        'post_title'  => $post_title,
        'post_status' => 'publish',
        'post_author' => 1,
    ));

    if ($post_id && !is_wp_error($post_id)) {
        // Salvar meta fields
        update_post_meta($post_id, 'form_name', sanitize_text_field($form_title));
        update_post_meta($post_id, 'form_id', absint($form_id));
        update_post_meta($post_id, 'form_data', wp_json_encode($posted_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        update_post_meta($post_id, 'submission_email', $submission_email);
        update_post_meta($post_id, 'submission_date', current_time('mysql'));

        error_log('PDB Submission saved - Post ID: ' . $post_id . ' | Form: ' . $form_title);
    }
}
add_action('wpcf7_before_send_mail', 'pdb_save_cf7_submission');
