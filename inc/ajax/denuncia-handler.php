<?php

/**
 * Handler AJAX para Formulário de Denúncia
 *
 * Processa dados do formulário de denúncia e envia via Contact Form 7
 */

function handle_denuncia_form() {
    // Log dos dados recebidos
    error_log('Denúncia form - Dados recebidos: ' . print_r($_POST, true));

    // Verificar se CF7 está ativo
    if (!function_exists('wpcf7_get_contact_form_by_title')) {
        error_log('Denúncia form - Contact Form 7 não está ativo');
        wp_send_json_error(array(
            'message' => 'Contact Form 7 não está ativo',
            'details' => 'Plugin Contact Form 7 necessário'
        ));
    }

    // Verificar nonce por segurança
    if (!wp_verify_nonce($_POST['nonce'], 'denuncia_form_nonce')) {
        error_log('Denúncia form - Erro de nonce');
        wp_send_json_error(array(
            'message' => 'Erro de segurança',
            'details' => 'Nonce inválido'
        ));
    }

    // Coletar e validar dados do formulário
    $form_data = array();

    // Campos opcionais
    if (!empty($_POST['nome'])) {
        $form_data['your-name'] = sanitize_text_field($_POST['nome']);
    }

    if (!empty($_POST['email'])) {
        $form_data['your-email'] = sanitize_email($_POST['email']);
    }

    if (!empty($_POST['telefone'])) {
        $form_data['your-phone'] = sanitize_text_field($_POST['telefone']);
    }

    // Campo mensagem obrigatório
    $form_data['your-message'] = sanitize_textarea_field($_POST['mensagem']);

    error_log('Denúncia form - Dados processados: ' . print_r($form_data, true));

    // Verificar se campo obrigatório está presente
    if (empty($form_data['your-message'])) {
        error_log('Denúncia form - Mensagem obrigatória faltando');
        wp_send_json_error(array(
            'message' => 'Campo obrigatório faltando',
            'details' => 'A mensagem é obrigatória'
        ));
    }

    // Buscar o formulário Contact Form 7
    $contact_form = get_posts(array(
        'post_type' => 'wpcf7_contact_form',
        'title' => 'Formulário de denúncia',
        'post_status' => 'publish',
        'numberposts' => 1
    ));

    error_log('Denúncia form - Busca CF7 resultado: ' . print_r($contact_form, true));

    if (empty($contact_form)) {
        error_log('Denúncia form - Formulário CF7 não encontrado');
        wp_send_json_error(array(
            'message' => 'Formulário não encontrado',
            'details' => 'Contact Form 7 com título "Formulário de denúncia" não foi encontrado'
        ));
    }

    $form_id = $contact_form[0]->ID;
    error_log('Denúncia form - Form ID encontrado: ' . $form_id);

    $contact_form_obj = WPCF7_ContactForm::get_instance($form_id);

    if (!$contact_form_obj) {
        error_log('Denúncia form - Erro ao instanciar CF7 objeto');
        wp_send_json_error(array(
            'message' => 'Erro ao carregar formulário',
            'details' => 'Não foi possível instanciar o objeto Contact Form 7'
        ));
    }

    // Submeter dados ao Contact Form 7
    error_log('Denúncia form - Iniciando submissão CF7');

    // Simular submissão direta do CF7
    $_POST = array_merge($_POST, $form_data);
    $_POST['_wpcf7'] = $form_id;
    $_POST['_wpcf7_version'] = WPCF7_VERSION;
    $_POST['_wpcf7_locale'] = get_locale();
    $_POST['_wpcf7_unit_tag'] = 'wpcf7-f' . $form_id . '-p' . get_the_ID() . '-o1';

    error_log('Denúncia form - $_POST final: ' . print_r($_POST, true));

    $submission = WPCF7_Submission::get_instance();

    if ($submission) {
        error_log('Denúncia form - Usando submission existente');
        $submission->set_posted_data($form_data);
        $result = $contact_form_obj->submit($submission);

        error_log('Denúncia form - Resultado submission: ' . print_r($result, true));

        if ($result['status'] === 'mail_sent') {
            error_log('Denúncia form - Email enviado com sucesso');
            wp_send_json_success(array(
                'message' => 'Denúncia enviada com sucesso'
            ));
        } else {
            error_log('Denúncia form - Erro ao enviar: ' . print_r($result, true));
            wp_send_json_error(array(
                'message' => 'Erro ao enviar denúncia',
                'details' => $result['message'] ?? 'Status: ' . $result['status']
            ));
        }
    } else {
        error_log('Denúncia form - Usando fallback direto');
        // Fallback: submissão direta
        $result = $contact_form_obj->submit();

        error_log('Denúncia form - Resultado fallback: ' . print_r($result, true));

        if ($result['status'] === 'mail_sent') {
            error_log('Denúncia form - Email enviado com sucesso (fallback)');
            wp_send_json_success(array(
                'message' => 'Denúncia enviada com sucesso'
            ));
        } else {
            error_log('Denúncia form - Erro ao enviar (fallback): ' . print_r($result, true));
            wp_send_json_error(array(
                'message' => 'Erro ao enviar denúncia',
                'details' => $result['message'] ?? 'Status: ' . ($result['status'] ?? 'Erro desconhecido')
            ));
        }
    }
}

// Registrar actions AJAX para usuários logados e não logados
add_action('wp_ajax_submit_denuncia', 'handle_denuncia_form');
add_action('wp_ajax_nopriv_submit_denuncia', 'handle_denuncia_form');
