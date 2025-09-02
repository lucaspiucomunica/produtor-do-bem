<?php

/**
 * Ícones Produtor do Bem - Painel Administrativo
 * 
 * Adiciona uma página no painel administrativo do WordPress para
 * navegar e copiar nomes dos ícones disponíveis no tema.
 */

/**
 * Adiciona o menu "Ícones Produtor do Bem" no submenu "Ferramentas"
 */
function produtor_do_bem_add_icon_selector_menu() {
    add_management_page(
        'Ícones Produtor do Bem',           // Título da página
        'Ícones Produtor do Bem',           // Texto do menu
        'manage_options',              // Capacidade necessária
        'icon-selector',               // Slug da página
        'produtor_do_bem_icon_selector_page' // Função que renderiza a página
    );
}
add_action('admin_menu', 'produtor_do_bem_add_icon_selector_menu');

/**
 * Enfileira os assets necessários apenas na página do Ícones Produtor do Bem
 */
function produtor_do_bem_icon_selector_assets($hook) {
    // Verifica se estamos na página correta
    if ($hook !== 'tools_page_icon-selector') {
        return;
    }

    // Enfileira o CSS customizado
    wp_enqueue_style(
        'icon-selector-admin',
        get_template_directory_uri() . '/src/css/plugins/admin-icon-selector.css',
        array(),
        PRODUTOR_DO_BEM_VERSION
    );

    // Enfileira o JavaScript
    wp_enqueue_script(
        'icon-selector-admin',
        get_template_directory_uri() . '/src/js/plugins/admin-icon-selector.js',
        array(),
        PRODUTOR_DO_BEM_VERSION,
        true
    );

    // Localiza o script com dados necessários
    wp_localize_script('icon-selector-admin', 'iconSelectorData', array(
        'iconsPath' => get_template_directory_uri() . '/src/img/iconpdb/',
        'totalIcons' => 1030,
        'nonce' => wp_create_nonce('icon_selector_nonce')
    ));
}
add_action('admin_enqueue_scripts', 'produtor_do_bem_icon_selector_assets');

/**
 * Renderiza a página do Ícones Produtor do Bem
 */
function produtor_do_bem_icon_selector_page() {
    ?>
    <div class="wrap icon-selector-wrap">
        <div class="icon-selector-container">
            <div class="icon-selector-header">
                <h1>Ícones Produtor do Bem</h1>
            </div>

            <div class="icon-selector-controls">
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Buscar ícones... (ex: arrow, user, home)">
                </div>

                <div class="stats">
                    <span id="totalIcons">1.030 ícones</span>
                    <span id="visibleIcons">1.030 visíveis</span>
                </div>
            </div>

            <div class="icons-grid" id="iconsGrid">
                <div style="text-align: center; padding: 40px; color: #6c757d;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">⏳</div>
                    <div>Carregando ícones...</div>
                </div>
            </div>

            <div class="no-results" id="noResults" style="display: none;">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3>Nenhum ícone encontrado</h3>
                <p>Tente usar termos diferentes na busca</p>
            </div>

        </div>
    </div>
    <?php
}