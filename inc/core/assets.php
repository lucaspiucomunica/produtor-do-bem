<?php

/**
 * Gerenciamento de assets do tema
 * 
 * Carrega scripts, estilos e bibliotecas necessárias para o funcionamento do tema.
 */

/**
 * Enfileira os estilos e scripts do tema
 */

 function produtor_do_bem_scripts() {
    // CSS
	wp_enqueue_style( 'produtor-do-bem-style', get_stylesheet_uri(), array(), PRODUTOR_DO_BEM_VERSION );
    wp_enqueue_style( 'produtor-do-bem-theme', get_template_directory_uri() . '/src/css/output.css', array(), PRODUTOR_DO_BEM_VERSION );

	// JavaScript
	wp_enqueue_script( 'produtor-do-bem-gsap', get_template_directory_uri() . '/src/js/libs/gsap.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-scroll-trigger', get_template_directory_uri() . '/src/js/libs/ScrollTrigger.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-split-text', get_template_directory_uri() . '/src/js/libs/SplitText.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-scroll-smoother', get_template_directory_uri() . '/src/js/libs/ScrollSmoother.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-scroll-smoother', get_template_directory_uri() . '/src/js/scroll-smoother.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-swiper', get_template_directory_uri() . '/src/js/libs/swiper-bundle.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-slides-swiper', get_template_directory_uri() . '/src/js/slides-swiper.js', array(), PRODUTOR_DO_BEM_VERSION, true );

	if (is_page('fale-conosco')) {
		wp_enqueue_script( 'produtor-do-bem-contact-form', get_template_directory_uri() . '/src/js/contact-form.js', array(), PRODUTOR_DO_BEM_VERSION, true );
		wp_enqueue_script( 'produtor-do-bem-animations-fale-conosco', get_template_directory_uri() . '/src/js/animations/fale-conosco.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_front_page()) {
		wp_enqueue_script( 'produtor-do-bem-animations-home', get_template_directory_uri() . '/src/js/animations/home.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('quem-somos')) {
		wp_enqueue_script( 'produtor-do-bem-animations-quem-somos', get_template_directory_uri() . '/src/js/animations/quem-somos.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('protocolos-e-selos')) {
		wp_enqueue_script( 'produtor-do-bem-animations-protocolos-e-selos', get_template_directory_uri() . '/src/js/animations/protocolos-e-selos.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('certificacoes')) {
		wp_enqueue_script( 'produtor-do-bem-animations-certificacoes', get_template_directory_uri() . '/src/js/animations/certificacoes.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_singular('protocolo')) {
		wp_enqueue_script( 'produtor-do-bem-animations-protocolo', get_template_directory_uri() . '/src/js/animations/protocolo.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	wp_enqueue_script( 'produtor-do-bem-menu', get_template_directory_uri() . '/src/js/menu.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-animations-globals', get_template_directory_uri() . '/src/js/animations/globals.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-theme', get_template_directory_uri() . '/src/js/theme.js', array(), PRODUTOR_DO_BEM_VERSION, true );

	// Localizar script para AJAX
	wp_localize_script( 'produtor-do-bem-contact-form', 'contact_form_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'multi_step_form_nonce' )
	));
}
add_action( 'wp_enqueue_scripts', 'produtor_do_bem_scripts' );