<?php

/**
 * Handler AJAX para Contact Form 7
 *
 * Processa dados do formulário multi-steps e envia via Contact Form 7
 */

function handle_multi_step_contact_form() {
    // Log dos dados recebidos
    error_log('Multi-step form - Dados recebidos: ' . print_r($_POST, true));

    // Verificar se CF7 está ativo
    if (!function_exists('wpcf7_get_contact_form_by_title')) {
        error_log('Multi-step form - Contact Form 7 não está ativo');
        wp_send_json_error(array(
            'message' => 'Contact Form 7 não está ativo',
            'details' => 'Plugin Contact Form 7 necessário'
        ));
    }

    // Verificar nonce por segurança
    if (!wp_verify_nonce($_POST['nonce'], 'multi_step_form_nonce')) {
        error_log('Multi-step form - Erro de nonce');
        wp_send_json_error(array(
            'message' => 'Erro de segurança',
            'details' => 'Nonce inválido'
        ));
    }

    // Coletar e validar dados do formulário
    $form_data = array();

    // Campos obrigatórios
    $form_data['your-name'] = sanitize_text_field($_POST['nome']);
    $form_data['your-email'] = sanitize_email($_POST['email']);
    $form_data['your-message'] = sanitize_textarea_field($_POST['mensagem']);

    // Campo telefone (opcional) - só inclui se não estiver vazio
    if (!empty($_POST['telefone'])) {
        $form_data['your-phone'] = sanitize_text_field($_POST['telefone']);
    }

    // Mapear campo "eu-sou" dos valores do form para CF7
    $eu_sou_map = array(
        'produtor' => 'Produtor',
        'varejista' => 'Varejista',
        'consumidor' => 'Consumidor',
        'outro' => 'Outro'
    );
    if (!empty($_POST['eu-sou']) && isset($eu_sou_map[$_POST['eu-sou']])) {
        $form_data['eu-sou'] = $eu_sou_map[$_POST['eu-sou']];
    }

    // Mapear campo "motivo" dos valores do form para CF7
    $motivo_map = array(
        'orcamento' => 'Orçamento',
        'orcamento-servico' => 'Orçamento ou serviço',
        'duvidas' => 'Tenho dúvidas',
        'sugestoes' => 'Tenho sugestões',
        'criticas' => 'Tenho críticas',
        'outro-motivo' => 'Outro motivo'
    );
    if (!empty($_POST['motivo']) && isset($motivo_map[$_POST['motivo']])) {
        $form_data['motivo'] = $motivo_map[$_POST['motivo']];
    }

    error_log('Multi-step form - Dados processados: ' . print_r($form_data, true));

    // Verificar se campos obrigatórios estão presentes
    if (empty($form_data['your-name']) || empty($form_data['your-email']) || empty($form_data['your-message']) ||
        empty($form_data['eu-sou']) || empty($form_data['motivo'])) {
        error_log('Multi-step form - Campos obrigatórios faltando');
        wp_send_json_error(array(
            'message' => 'Campos obrigatórios faltando',
            'details' => 'Nome, email, mensagem, categoria e motivo são obrigatórios'
        ));
    }

    // Buscar o formulário Contact Form 7
    $contact_form = get_posts(array(
        'post_type' => 'wpcf7_contact_form',
        'title' => 'Formulário de contato',
        'post_status' => 'publish',
        'numberposts' => 1
    ));

    error_log('Multi-step form - Busca CF7 resultado: ' . print_r($contact_form, true));

    if (empty($contact_form)) {
        error_log('Multi-step form - Formulário CF7 não encontrado');
        wp_send_json_error(array(
            'message' => 'Formulário não encontrado',
            'details' => 'Contact Form 7 com título "Formulário de contato" não foi encontrado'
        ));
    }

    $form_id = $contact_form[0]->ID;
    error_log('Multi-step form - Form ID encontrado: ' . $form_id);

    $contact_form_obj = WPCF7_ContactForm::get_instance($form_id);

    if (!$contact_form_obj) {
        error_log('Multi-step form - Erro ao instanciar CF7 objeto');
        wp_send_json_error(array(
            'message' => 'Erro ao carregar formulário',
            'details' => 'Não foi possível instanciar o objeto Contact Form 7'
        ));
    }

    // Submeter dados ao Contact Form 7
    error_log('Multi-step form - Iniciando submissão CF7');

    // Simular submissão direta do CF7
    $_POST = array_merge($_POST, $form_data);
    $_POST['_wpcf7'] = $form_id;
    $_POST['_wpcf7_version'] = WPCF7_VERSION;
    $_POST['_wpcf7_locale'] = get_locale();
    $_POST['_wpcf7_unit_tag'] = 'wpcf7-f' . $form_id . '-p' . get_the_ID() . '-o1';

    error_log('Multi-step form - $_POST final: ' . print_r($_POST, true));

    $submission = WPCF7_Submission::get_instance();

    if ($submission) {
        error_log('Multi-step form - Usando submission existente');
        $submission->set_posted_data($form_data);
        $result = $contact_form_obj->submit($submission);

        error_log('Multi-step form - Resultado submission: ' . print_r($result, true));

        if ($result['status'] === 'mail_sent') {
            error_log('Multi-step form - Email enviado com sucesso');
            wp_send_json_success(array(
                'message' => 'Mensagem enviada com sucesso'
            ));
        } else {
            error_log('Multi-step form - Erro ao enviar: ' . print_r($result, true));
            wp_send_json_error(array(
                'message' => 'Erro ao enviar mensagem',
                'details' => $result['message'] ?? 'Status: ' . $result['status']
            ));
        }
    } else {
        error_log('Multi-step form - Usando fallback direto');
        // Fallback: submissão direta
        $result = $contact_form_obj->submit();

        error_log('Multi-step form - Resultado fallback: ' . print_r($result, true));

        if ($result['status'] === 'mail_sent') {
            error_log('Multi-step form - Email enviado com sucesso (fallback)');
            wp_send_json_success(array(
                'message' => 'Mensagem enviada com sucesso'
            ));
        } else {
            error_log('Multi-step form - Erro ao enviar (fallback): ' . print_r($result, true));
            wp_send_json_error(array(
                'message' => 'Erro ao enviar mensagem',
                'details' => $result['message'] ?? 'Status: ' . ($result['status'] ?? 'Erro desconhecido')
            ));
        }
    }
}

// Registrar actions AJAX para usuários logados e não logados
add_action('wp_ajax_submit_multi_step_form', 'handle_multi_step_contact_form');
add_action('wp_ajax_nopriv_submit_multi_step_form', 'handle_multi_step_contact_form');