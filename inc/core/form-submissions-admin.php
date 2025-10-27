<?php

/**
 * Interface Admin para Submissões de Formulários
 *
 * Páginas de administração para visualizar e gerenciar submissões dos formulários
 */

// Interceptar exportações antes de enviar headers
function pdb_handle_csv_exports() {
    // Exportação de submissões
    if (isset($_GET['page']) && $_GET['page'] === 'pdb-submissions' &&
        isset($_GET['action']) && $_GET['action'] === 'export_csv' &&
        isset($_GET['_wpnonce']) && wp_verify_nonce($_GET['_wpnonce'], 'pdb_export_submissions')) {

        if (!current_user_can('manage_options')) {
            wp_die('Você não tem permissão para exportar.');
        }

        pdb_export_submissions_csv();
        exit;
    }

    // Exportação de emails
    if (isset($_GET['page']) && $_GET['page'] === 'pdb-submissions-emails' &&
        isset($_GET['action']) && $_GET['action'] === 'export_emails_csv' &&
        isset($_GET['_wpnonce']) && wp_verify_nonce($_GET['_wpnonce'], 'pdb_export_emails')) {

        if (!current_user_can('manage_options')) {
            wp_die('Você não tem permissão para exportar.');
        }

        pdb_export_emails_csv();
        exit;
    }
}
add_action('admin_init', 'pdb_handle_csv_exports');

// Adicionar menu no admin
function pdb_submissions_admin_menu() {
    add_menu_page(
        'Submissões de formulários',
        'Submissões',
        'manage_options',
        'pdb-submissions',
        'pdb_submissions_list_page',
        'dashicons-list-view',
        31
    );

    add_submenu_page(
        'pdb-submissions',
        'Lista de submissões',
        'Todas submissões',
        'manage_options',
        'pdb-submissions',
        'pdb_submissions_list_page'
    );

    add_submenu_page(
        'pdb-submissions',
        'E-mails cadastrados',
        'E-mails cadastrados',
        'manage_options',
        'pdb-submissions-emails',
        'pdb_submissions_emails_page'
    );
}
add_action('admin_menu', 'pdb_submissions_admin_menu');

// Página: Lista de Submissões
function pdb_submissions_list_page() {
    // Verificar permissão
    if (!current_user_can('manage_options')) {
        wp_die('Você não tem permissão para acessar esta página.');
    }

    // Obter parâmetros de filtro
    $paged = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
    $form_filter = isset($_GET['form_filter']) ? sanitize_text_field($_GET['form_filter']) : '';
    $date_from = isset($_GET['date_from']) ? sanitize_text_field($_GET['date_from']) : '';
    $date_to = isset($_GET['date_to']) ? sanitize_text_field($_GET['date_to']) : '';
    $per_page = 20;

    // Montar query
    $args = array(
        'post_type'      => 'pdb_submission',
        'posts_per_page' => $per_page,
        'paged'          => $paged,
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    // Filtro por formulário
    if (!empty($form_filter)) {
        $args['meta_query'][] = array(
            'key'   => 'form_name',
            'value' => $form_filter,
        );
    }

    // Filtro por data
    if (!empty($date_from) || !empty($date_to)) {
        $date_query = array();

        if (!empty($date_from)) {
            $date_query['after'] = $date_from;
        }

        if (!empty($date_to)) {
            $date_query['before'] = $date_to;
            $date_query['inclusive'] = true;
        }

        $args['date_query'] = array($date_query);
    }

    $query = new WP_Query($args);

    // Obter lista de formulários para filtro
    global $wpdb;
    $forms = $wpdb->get_col("
        SELECT DISTINCT meta_value
        FROM {$wpdb->postmeta}
        WHERE meta_key = 'form_name'
        ORDER BY meta_value ASC
    ");

    ?>
    <div class="wrap">
        <h1>Submissões de formulários</h1>

        <!-- Filtros -->
        <form method="get" style="margin: 20px 0; background: #fff; padding: 15px; border: 1px solid #ccc;">
            <input type="hidden" name="page" value="pdb-submissions">

            <div style="display: flex; gap: 15px; align-items: flex-end; flex-wrap: wrap;">
                <div>
                    <label for="form_filter" style="display: block; margin-bottom: 5px;"><strong>Formulário:</strong></label>
                    <select name="form_filter" id="form_filter" style="min-width: 200px;">
                        <option value="">Todos os formulários</option>
                        <?php foreach ($forms as $form): ?>
                            <option value="<?php echo esc_attr($form); ?>" <?php selected($form_filter, $form); ?>>
                                <?php echo esc_html($form); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div>
                    <label for="date_from" style="display: block; margin-bottom: 5px;"><strong>Data inicial:</strong></label>
                    <input type="date" name="date_from" id="date_from" value="<?php echo esc_attr($date_from); ?>">
                </div>

                <div>
                    <label for="date_to" style="display: block; margin-bottom: 5px;"><strong>Data final:</strong></label>
                    <input type="date" name="date_to" id="date_to" value="<?php echo esc_attr($date_to); ?>">
                </div>

                <div>
                    <button type="submit" class="button button-primary">Filtrar</button>
                    <a href="<?php echo admin_url('admin.php?page=pdb-submissions'); ?>" class="button">Limpar filtros</a>
                </div>
            </div>
        </form>

        <!-- Botão Exportar -->
        <div style="margin: 15px 0;">
            <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=pdb-submissions&action=export_csv&form_filter=' . urlencode($form_filter) . '&date_from=' . urlencode($date_from) . '&date_to=' . urlencode($date_to)), 'pdb_export_submissions'); ?>" class="button button-secondary">
                Exportar para CSV
            </a>
            <span style="color: #666; margin-left: 10px;">
                Total: <strong><?php echo $query->found_posts; ?></strong> submissões
            </span>
        </div>

        <!-- Tabela de Submissões -->
        <?php if ($query->have_posts()): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width: 150px;">Data/Hora</th>
                        <th style="width: 200px;">Formulário</th>
                        <th style="width: 250px;">E-mail</th>
                        <th>Nome</th>
                        <th style="width: 100px;">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($query->have_posts()): $query->the_post(); ?>
                        <?php
                        $post_id = get_the_ID();
                        $form_name = get_post_meta($post_id, 'form_name', true);
                        $submission_email = get_post_meta($post_id, 'submission_email', true);
                        $submission_date = get_post_meta($post_id, 'submission_date', true);
                        $form_data = json_decode(get_post_meta($post_id, 'form_data', true), true);

                        // Tentar extrair nome
                        $name = '';
                        $name_fields = array('your-name', 'nome', 'name', 'your_name');
                        foreach ($name_fields as $field) {
                            if (!empty($form_data[$field])) {
                                $name = $form_data[$field];
                                break;
                            }
                        }
                        ?>
                        <tr>
                            <td><?php echo date('d/m/Y H:i', strtotime($submission_date)); ?></td>
                            <td><?php echo esc_html($form_name); ?></td>
                            <td><?php echo esc_html($submission_email ?: '-'); ?></td>
                            <td><?php echo esc_html($name ?: '-'); ?></td>
                            <td>
                                <a href="#" class="button button-small" onclick="viewSubmission(<?php echo $post_id; ?>); return false;">Ver detalhes</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>

            <!-- Paginação -->
            <?php
            $total_pages = $query->max_num_pages;
            if ($total_pages > 1):
                $base_url = add_query_arg(array(
                    'page' => 'pdb-submissions',
                    'form_filter' => $form_filter,
                    'date_from' => $date_from,
                    'date_to' => $date_to,
                ), admin_url('admin.php'));
                ?>
                <div class="tablenav bottom" style="margin-top: 20px;">
                    <div class="tablenav-pages">
                        <?php
                        echo paginate_links(array(
                            'base' => $base_url . '%_%',
                            'format' => '&paged=%#%',
                            'current' => $paged,
                            'total' => $total_pages,
                            'prev_text' => '&laquo; Anterior',
                            'next_text' => 'Próximo &raquo;',
                        ));
                        ?>
                    </div>
                </div>
            <?php endif; ?>
        <?php else: ?>
            <p>Nenhuma submissão encontrada.</p>
        <?php endif; ?>

        <?php wp_reset_postdata(); ?>
    </div>

    <!-- Modal para ver detalhes -->
    <div id="submission-modal" style="display: none; position: fixed; z-index: 100000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.6);">
        <div style="background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 800px; border-radius: 5px; position: relative;">
            <span onclick="closeSubmissionModal()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; line-height: 20px;">&times;</span>
            <h2>Detalhes da Submissão</h2>
            <div id="submission-details"></div>
        </div>
    </div>

    <script>
    function viewSubmission(postId) {
        // Buscar dados via AJAX
        jQuery.post(ajaxurl, {
            action: 'pdb_get_submission_details',
            post_id: postId,
            nonce: '<?php echo wp_create_nonce('pdb_get_submission'); ?>'
        }, function(response) {
            if (response.success) {
                var html = '<div style="max-height: 500px; overflow-y: auto;">';
                html += '<p><strong>Formulário:</strong> ' + response.data.form_name + '</p>';
                html += '<p><strong>Data/Hora:</strong> ' + response.data.date + '</p>';
                html += '<h3>Dados do Formulário:</h3>';
                html += '<table class="widefat" style="margin-top: 10px;">';
                html += '<thead><tr><th>Campo</th><th>Valor</th></tr></thead><tbody>';

                for (var key in response.data.form_data) {
                    if (key.startsWith('_wpcf7')) continue;

                    // Converter arrays para string
                    var value = response.data.form_data[key];
                    if (Array.isArray(value)) {
                        value = value.join(', ');
                    }

                    html += '<tr><td><strong>' + key + '</strong></td><td>' + value + '</td></tr>';
                }

                html += '</tbody></table></div>';

                document.getElementById('submission-details').innerHTML = html;
                document.getElementById('submission-modal').style.display = 'block';
            }
        });
    }

    function closeSubmissionModal() {
        document.getElementById('submission-modal').style.display = 'none';
    }

    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        var modal = document.getElementById('submission-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    </script>
    <?php
}

// Página: Emails Cadastrados
function pdb_submissions_emails_page() {
    // Verificar permissão
    if (!current_user_can('manage_options')) {
        wp_die('Você não tem permissão para acessar esta página.');
    }

    global $wpdb;

    // Buscar todos os emails com contagem
    $search = isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';
    $where = '';

    if (!empty($search)) {
        $where = $wpdb->prepare("AND pm.meta_value LIKE %s", '%' . $wpdb->esc_like($search) . '%');
    }

    $results = $wpdb->get_results("
        SELECT
            pm.meta_value as email,
            COUNT(*) as total_submissions,
            GROUP_CONCAT(DISTINCT pm2.meta_value ORDER BY pm2.meta_value SEPARATOR '|||') as forms
        FROM {$wpdb->postmeta} pm
        INNER JOIN {$wpdb->posts} p ON pm.post_id = p.ID
        LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'form_name'
        WHERE pm.meta_key = 'submission_email'
        AND pm.meta_value != ''
        AND p.post_type = 'pdb_submission'
        AND p.post_status = 'publish'
        {$where}
        GROUP BY pm.meta_value
        ORDER BY total_submissions DESC, pm.meta_value ASC
    ");

    ?>
    <div class="wrap">
        <h1>Emails Cadastrados</h1>

        <!-- Busca -->
        <form method="get" style="margin: 20px 0;">
            <input type="hidden" name="page" value="pdb-submissions-emails">
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" name="search" value="<?php echo esc_attr($search); ?>" placeholder="Buscar por e-mail..." style="min-width: 300px;">
                <button type="submit" class="button button-primary">Buscar</button>
                <?php if (!empty($search)): ?>
                    <a href="<?php echo admin_url('admin.php?page=pdb-submissions-emails'); ?>" class="button">Limpar</a>
                <?php endif; ?>
            </div>
        </form>

        <!-- Botão Exportar -->
        <div style="margin: 15px 0;">
            <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=pdb-submissions-emails&action=export_emails_csv&search=' . urlencode($search)), 'pdb_export_emails'); ?>" class="button button-secondary">
                Exportar para CSV
            </a>
            <span style="color: #666; margin-left: 10px;">
                Total: <strong><?php echo count($results); ?></strong> e-mails únicos
            </span>
        </div>

        <!-- Tabela de Emails -->
        <?php if (!empty($results)): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width: 300px;">E-mail</th>
                        <th style="width: 150px;">Total de envios</th>
                        <th>Formulários utilizados</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($results as $row): ?>
                        <?php
                        $forms_array = explode('|||', $row->forms);
                        $forms_count = array_count_values($forms_array);
                        $forms_display = array();

                        foreach ($forms_count as $form => $count) {
                            $forms_display[] = esc_html($form) . ' (' . $count . 'x)';
                        }
                        ?>
                        <tr>
                            <td><?php echo esc_html($row->email); ?></td>
                            <td style="text-align: center;"><strong><?php echo intval($row->total_submissions); ?></strong></td>
                            <td><?php echo implode(', ', $forms_display); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>Nenhum email encontrado.</p>
        <?php endif; ?>
    </div>
    <?php
}

// AJAX: Obter detalhes de uma submissão
function pdb_ajax_get_submission_details() {
    check_ajax_referer('pdb_get_submission', 'nonce');

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Sem permissão');
    }

    $post_id = intval($_POST['post_id']);

    if (!$post_id) {
        wp_send_json_error('ID inválido');
    }

    $form_name = get_post_meta($post_id, 'form_name', true);
    $submission_date = get_post_meta($post_id, 'submission_date', true);
    $form_data = json_decode(get_post_meta($post_id, 'form_data', true), true);

    wp_send_json_success(array(
        'form_name' => $form_name,
        'date' => date('d/m/Y H:i:s', strtotime($submission_date)),
        'form_data' => $form_data,
    ));
}
add_action('wp_ajax_pdb_get_submission_details', 'pdb_ajax_get_submission_details');

// Exportar submissões para CSV
function pdb_export_submissions_csv() {
    // Obter parâmetros de filtro
    $form_filter = isset($_GET['form_filter']) ? sanitize_text_field($_GET['form_filter']) : '';
    $date_from = isset($_GET['date_from']) ? sanitize_text_field($_GET['date_from']) : '';
    $date_to = isset($_GET['date_to']) ? sanitize_text_field($_GET['date_to']) : '';

    // Montar query
    $args = array(
        'post_type'      => 'pdb_submission',
        'posts_per_page' => -1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    if (!empty($form_filter)) {
        $args['meta_query'][] = array(
            'key'   => 'form_name',
            'value' => $form_filter,
        );
    }

    if (!empty($date_from) || !empty($date_to)) {
        $date_query = array();
        if (!empty($date_from)) {
            $date_query['after'] = $date_from;
        }
        if (!empty($date_to)) {
            $date_query['before'] = $date_to;
            $date_query['inclusive'] = true;
        }
        $args['date_query'] = array($date_query);
    }

    $query = new WP_Query($args);

    // Preparar CSV
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=submissoes-' . date('Y-m-d-His') . '.csv');

    $output = fopen('php://output', 'w');

    // BOM para UTF-8
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    // Cabeçalhos
    fputcsv($output, array('Data/Hora', 'Formulário', 'E-mail', 'Nome', 'Telefone', 'Mensagem', 'Outros dados'));

    // Dados
    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();

        $form_name = get_post_meta($post_id, 'form_name', true);
        $submission_email = get_post_meta($post_id, 'submission_email', true);
        $submission_date = get_post_meta($post_id, 'submission_date', true);
        $form_data = json_decode(get_post_meta($post_id, 'form_data', true), true);

        // Remover campos duplicados dos handlers AJAX
        $fields_to_remove = array('nome', 'email', 'telefone', 'mensagem', 'nonce', 'action', 'post_id', 'protocolo');
        foreach ($fields_to_remove as $field) {
            if (isset($form_data[$field])) {
                unset($form_data[$field]);
            }
        }

        // Extrair campos comuns
        $name = '';
        $phone = '';
        $message = '';
        $other_data = array();

        $name_fields = array('your-name', 'nome', 'name');
        $email_fields = array('your-email', 'email', 'e-mail', 'your_email');
        $phone_fields = array('your-phone', 'telefone', 'phone');
        $message_fields = array('your-message', 'mensagem', 'message');

        foreach ($form_data as $key => $value) {
            if (strpos($key, '_wpcf7') !== false) continue;

            // Converter arrays para string
            $value_string = is_array($value) ? implode(', ', $value) : $value;

            if (in_array($key, $name_fields)) {
                $name = $value_string;
            } elseif (in_array($key, $email_fields)) {
                // Email já está na coluna separada, pular
                continue;
            } elseif (in_array($key, $phone_fields)) {
                $phone = $value_string;
            } elseif (in_array($key, $message_fields)) {
                $message = $value_string;
            } else {
                $other_data[] = $key . ': ' . $value_string;
            }
        }

        fputcsv($output, array(
            date('d/m/Y H:i:s', strtotime($submission_date)),
            $form_name,
            $submission_email,
            $name,
            $phone,
            $message,
            implode(' | ', $other_data)
        ));
    }

    fclose($output);
    wp_reset_postdata();
}

// Exportar emails para CSV
function pdb_export_emails_csv() {
    global $wpdb;

    $search = isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';
    $where = '';

    if (!empty($search)) {
        $where = $wpdb->prepare("AND pm.meta_value LIKE %s", '%' . $wpdb->esc_like($search) . '%');
    }

    $results = $wpdb->get_results("
        SELECT
            pm.meta_value as email,
            COUNT(*) as total_submissions,
            GROUP_CONCAT(DISTINCT pm2.meta_value ORDER BY pm2.meta_value SEPARATOR '|||') as forms
        FROM {$wpdb->postmeta} pm
        INNER JOIN {$wpdb->posts} p ON pm.post_id = p.ID
        LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'form_name'
        WHERE pm.meta_key = 'submission_email'
        AND pm.meta_value != ''
        AND p.post_type = 'pdb_submission'
        AND p.post_status = 'publish'
        {$where}
        GROUP BY pm.meta_value
        ORDER BY total_submissions DESC, pm.meta_value ASC
    ");

    // Preparar CSV
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=emails-cadastrados-' . date('Y-m-d-His') . '.csv');

    $output = fopen('php://output', 'w');

    // BOM para UTF-8
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    // Cabeçalhos
    fputcsv($output, array('Email', 'Total de Envios', 'Formulários Utilizados'));

    // Dados
    foreach ($results as $row) {
        $forms_array = explode('|||', $row->forms);
        $forms_count = array_count_values($forms_array);
        $forms_display = array();

        foreach ($forms_count as $form => $count) {
            $forms_display[] = $form . ' (' . $count . 'x)';
        }

        fputcsv($output, array(
            $row->email,
            $row->total_submissions,
            implode(', ', $forms_display)
        ));
    }

    fclose($output);
}
