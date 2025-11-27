<?php

/**
 * Handler AJAX para Formulário de Download de Protocolo
 *
 * Processa dados do formulário de download e retorna URL do arquivo
 */

function handle_download_protocolo_form() {
    // Log dos dados recebidos
    error_log('Download protocolo form - Dados recebidos: ' . print_r($_POST, true));

    // Verificar se CF7 está ativo
    if (!function_exists('wpcf7_get_contact_form_by_title')) {
        error_log('Download protocolo form - Contact Form 7 não está ativo');
        wp_send_json_error(array(
            'message' => 'Contact Form 7 não está ativo',
            'details' => 'Plugin Contact Form 7 necessário'
        ));
    }

    // Verificar nonce por segurança
    if (!wp_verify_nonce($_POST['nonce'], 'download_protocolo_form_nonce')) {
        error_log('Download protocolo form - Erro de nonce');
        wp_send_json_error(array(
            'message' => 'Erro de segurança',
            'details' => 'Nonce inválido'
        ));
    }

    // Coletar e validar dados do formulário
    $form_data = array();

    // Campos obrigatórios
    if (empty($_POST['nome'])) {
        error_log('Download protocolo form - Nome obrigatório faltando');
        wp_send_json_error(array(
            'message' => 'Campo obrigatório faltando',
            'details' => 'O nome é obrigatório'
        ));
    }

    if (empty($_POST['email'])) {
        error_log('Download protocolo form - E-mail obrigatório faltando');
        wp_send_json_error(array(
            'message' => 'Campo obrigatório faltando',
            'details' => 'O e-mail é obrigatório'
        ));
    }

    if (empty($_POST['eu-sou'])) {
        error_log('Download protocolo form - Campo "eu-sou" obrigatório faltando');
        wp_send_json_error(array(
            'message' => 'Campo obrigatório faltando',
            'details' => 'Por favor, selecione uma opção'
        ));
    }

    // Sanitizar dados
    $form_data['your-name'] = sanitize_text_field($_POST['nome']);
    $form_data['your-email'] = sanitize_email($_POST['email']);
    $form_data['your-phone'] = !empty($_POST['telefone']) ? sanitize_text_field($_POST['telefone']) : '';

    // Mapear valores de "eu-sou" para Contact Form 7
    $eu_sou_map = array(
        'produtor' => 'Produtor',
        'varejista' => 'Varejista',
        'consumidor' => 'Consumidor',
        'outro' => 'Outro'
    );

    $eu_sou_value = sanitize_text_field($_POST['eu-sou']);
    $form_data['eu-sou'] = isset($eu_sou_map[$eu_sou_value]) ? $eu_sou_map[$eu_sou_value] : 'Outro';

    // Nome do protocolo
    $form_data['protocolo'] = !empty($_POST['protocolo']) ? sanitize_text_field($_POST['protocolo']) : '';

    // Variante do protocolo
    $form_data['variant'] = !empty($_POST['variant']) ? sanitize_text_field($_POST['variant']) : '';

    error_log('Download protocolo form - Dados processados: ' . print_r($form_data, true));

    // Buscar o formulário Contact Form 7
    $contact_form = get_posts(array(
        'post_type' => 'wpcf7_contact_form',
        'title' => 'Download protocolo',
        'post_status' => 'publish',
        'numberposts' => 1
    ));

    error_log('Download protocolo form - Busca CF7 resultado: ' . print_r($contact_form, true));

    if (empty($contact_form)) {
        error_log('Download protocolo form - Formulário CF7 não encontrado');
        wp_send_json_error(array(
            'message' => 'Formulário não encontrado',
            'details' => 'Contact Form 7 com título "Download protocolo" não foi encontrado'
        ));
    }

    $form_id = $contact_form[0]->ID;
    error_log('Download protocolo form - Form ID encontrado: ' . $form_id);

    $contact_form_obj = WPCF7_ContactForm::get_instance($form_id);

    if (!$contact_form_obj) {
        error_log('Download protocolo form - Erro ao instanciar CF7 objeto');
        wp_send_json_error(array(
            'message' => 'Erro ao carregar formulário',
            'details' => 'Não foi possível instanciar o objeto Contact Form 7'
        ));
    }

    // Submeter dados ao Contact Form 7
    error_log('Download protocolo form - Iniciando submissão CF7');

    // Simular submissão direta do CF7
    $_POST = array_merge($_POST, $form_data);
    $_POST['_wpcf7'] = $form_id;
    $_POST['_wpcf7_version'] = WPCF7_VERSION;
    $_POST['_wpcf7_locale'] = get_locale();
    $_POST['_wpcf7_unit_tag'] = 'wpcf7-f' . $form_id . '-o1';

    error_log('Download protocolo form - $_POST final: ' . print_r($_POST, true));

    $submission = WPCF7_Submission::get_instance();

    // Obter URL do arquivo do protocolo
    $post_id = !empty($_POST['post_id']) ? intval($_POST['post_id']) : get_the_ID();
    $variant = !empty($_POST['variant']) ? sanitize_text_field($_POST['variant']) : '';
    error_log('Download protocolo form - Post ID: ' . $post_id);
    error_log('Download protocolo form - Variant: ' . $variant);

    $arquivo_url = '';

    // Verificar variante para buscar arquivo específico
    if ($variant === 'apendice-bcc-ecc') {
        $protocolo = get_field('conheca', $post_id);
        if ($protocolo && !empty($protocolo['arquivo_apendice_bcc_ecc']['url'])) {
            $arquivo_url = $protocolo['arquivo_apendice_bcc_ecc']['url'];
            error_log('Download protocolo form - Arquivo URL encontrado (apendice-bcc-ecc): ' . $arquivo_url);
        } else {
            error_log('Download protocolo form - Arquivo apêndice BCC/ECC não encontrado no ACF');
        }
    } else {
        // Verificar primeiro o campo arquivo_protocolo_cta_fixo (usado no CTA do hero)
        $arquivo_cta_fixo = get_field('arquivo_protocolo_cta_fixo', $post_id);
        if ($arquivo_cta_fixo && !empty($arquivo_cta_fixo['url'])) {
            $arquivo_url = $arquivo_cta_fixo['url'];
            error_log('Download protocolo form - Arquivo URL encontrado (cta_fixo): ' . $arquivo_url);
        } else {
            // Fallback para o campo conheca['arquivo_protocolo']
            $protocolo = get_field('conheca', $post_id);
            if ($protocolo && !empty($protocolo['arquivo_protocolo']['url'])) {
                $arquivo_url = $protocolo['arquivo_protocolo']['url'];
                error_log('Download protocolo form - Arquivo URL encontrado (conheca): ' . $arquivo_url);
            } else {
                error_log('Download protocolo form - Arquivo não encontrado no ACF');
            }
        }
    }

    if ($submission) {
        error_log('Download protocolo form - Usando submission existente');
        $submission->set_posted_data($form_data);
        $result = $contact_form_obj->submit($submission);

        error_log('Download protocolo form - Resultado submission: ' . print_r($result, true));

        if ($result['status'] === 'mail_sent') {
            error_log('Download protocolo form - Email enviado com sucesso');
            wp_send_json_success(array(
                'message' => 'Formulário enviado com sucesso!',
                'arquivo_url' => $arquivo_url
            ));
        } else {
            error_log('Download protocolo form - Erro ao enviar: ' . print_r($result, true));
            wp_send_json_error(array(
                'message' => 'Erro ao processar formulário',
                'details' => $result['message'] ?? 'Status: ' . $result['status']
            ));
        }
    } else {
        error_log('Download protocolo form - Usando fallback direto');
        // Fallback: submissão direta
        $result = $contact_form_obj->submit();

        error_log('Download protocolo form - Resultado fallback: ' . print_r($result, true));

        if ($result['status'] === 'mail_sent') {
            error_log('Download protocolo form - Email enviado com sucesso (fallback)');
            wp_send_json_success(array(
                'message' => 'Formulário enviado com sucesso!',
                'arquivo_url' => $arquivo_url
            ));
        } else {
            error_log('Download protocolo form - Erro ao enviar (fallback): ' . print_r($result, true));
            wp_send_json_error(array(
                'message' => 'Erro ao processar formulário',
                'details' => $result['message'] ?? 'Status: ' . ($result['status'] ?? 'Erro desconhecido')
            ));
        }
    }
}

// Registrar actions AJAX para usuários logados e não logados
add_action('wp_ajax_submit_download_protocolo', 'handle_download_protocolo_form');
add_action('wp_ajax_nopriv_submit_download_protocolo', 'handle_download_protocolo_form');
