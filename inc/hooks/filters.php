<?php

/**
 * Filtros e hooks personalizados
 * 
 * Funções para modificar comportamentos padrão do WordPress.
 */

/**
 * Desativa os blocos do Core do WordPress (Gutenberg)
 */

// Desativa os blocos do editor Gutenberg
function produtor_do_bem_disable_gutenberg_blocks() {
    // Desativa o carregamento dos blocos core
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style'); // Remove estilos de blocos do WooCommerce se existirem
    wp_dequeue_style('global-styles'); // Remove estilos globais gerados pelo WordPress
    wp_dequeue_style('classic-theme-styles'); // Remove estilos de temas clássicos

    // Remove estilos embutidos
    remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
    remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
}
add_action('wp_enqueue_scripts', 'produtor_do_bem_disable_gutenberg_blocks', 100);

// Desativa o carregamento do editor Gutenberg em todos os tipos de post
function produtor_do_bem_disable_gutenberg_editor() {
    return false;
}
add_filter('use_block_editor_for_post_type', 'produtor_do_bem_disable_gutenberg_editor', 100);

// Remove suporte ao editor de blocos nas configurações do tema
function produtor_do_bem_remove_block_editor_settings() {
    remove_theme_support('core-block-patterns');
    remove_theme_support('widgets-block-editor');
}
add_action('after_setup_theme', 'produtor_do_bem_remove_block_editor_settings', 999);

// Remove REST API endpoints relacionados a blocos
function produtor_do_bem_disable_block_rest_api() {
    if (is_user_logged_in()) {
        return;
    }
    
    // Remove endpoints da REST API relacionados a blocos
    remove_action('rest_api_init', 'create_initial_rest_routes', 99);
    remove_action('rest_api_init', 'wp_block_editor_rest_api_preload', 10);
    remove_action('rest_api_init', 'register_block_patterns_core_rest_fields');
}
add_action('init', 'produtor_do_bem_disable_block_rest_api');

// Remove os scripts e estilos do editor de blocos no frontend
function produtor_do_bem_remove_block_scripts() {
    wp_dequeue_script('wp-block-library');
    wp_dequeue_script('wp-block-library-theme');
}
add_action('wp_print_scripts', 'produtor_do_bem_remove_block_scripts', 100);

// Desativa a renderização de novos widgets baseados em blocos
add_filter('gutenberg_use_widgets_block_editor', '__return_false');
add_filter('use_widgets_block_editor', '__return_false'); 