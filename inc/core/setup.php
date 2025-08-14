<?php

/**
 * Configurações básicas do tema
 * 
 * Define constantes, suporte de recursos e configurações gerais do tema.
 */

// Define a versão do tema para cache e versionamento
if ( ! defined( 'PRODUTOR_DO_BEM_VERSION' ) ) {
	define( 'PRODUTOR_DO_BEM_VERSION', '1.0.0' );
}

// Desativa a edição de arquivos pelo painel administrativo (medida de segurança)
define('DISALLOW_FILE_EDIT', true);

/**
 * Configura os recursos suportados pelo tema
 * - Adiciona suporte para tag de título
 * - Adiciona suporte para miniaturas de posts
 * - Adiciona suporte para elementos HTML5
 * - Registra o menu principal
 */
function produtor_do_bem_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	register_nav_menus(
		array(
			'menu-main' => esc_html__( 'Menu principal', 'produtor-do-bem' ),
			'menu-footer' => esc_html__( 'Menu rodapé', 'produtor-do-bem' ),
		)
	);
}
add_action( 'after_setup_theme', 'produtor_do_bem_setup' );