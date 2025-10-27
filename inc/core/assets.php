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

	// JavaScript - Utils (deve ser carregado primeiro)
	wp_enqueue_script( 'produtor-do-bem-utils', get_template_directory_uri() . '/src/js/utils.js', array(), PRODUTOR_DO_BEM_VERSION, true );

	// GSAP
	wp_enqueue_script( 'produtor-do-bem-gsap', get_template_directory_uri() . '/src/js/libs/gsap.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-scroll-trigger', get_template_directory_uri() . '/src/js/libs/ScrollTrigger.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-split-text', get_template_directory_uri() . '/src/js/libs/SplitText.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-scroll-smoother', get_template_directory_uri() . '/src/js/libs/ScrollSmoother.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-scroll-smoother', get_template_directory_uri() . '/src/js/scroll-smoother.js', array('produtor-do-bem-gsap', 'produtor-do-bem-utils'), PRODUTOR_DO_BEM_VERSION, true );

	// Transição de página
	wp_enqueue_script( 'produtor-do-bem-page-transition', get_template_directory_uri() . '/src/js/page-transition.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );

	// Swiper
	wp_enqueue_script( 'produtor-do-bem-swiper', get_template_directory_uri() . '/src/js/libs/swiper-bundle.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-slides-swiper', get_template_directory_uri() . '/src/js/slides-swiper.js', array('produtor-do-bem-page-transition', 'produtor-do-bem-swiper'), PRODUTOR_DO_BEM_VERSION, true );

	// Base Form (dependência para formulários)
	wp_enqueue_script( 'produtor-do-bem-base-form', get_template_directory_uri() . '/src/js/base-form.js', array('produtor-do-bem-utils'), PRODUTOR_DO_BEM_VERSION, true );

	// Toast (sistema global de notificações)
	wp_enqueue_script( 'produtor-do-bem-toast', get_template_directory_uri() . '/src/js/toast.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );

	// Páginas específicas
	if (is_page('fale-conosco')) {
		wp_enqueue_script( 'produtor-do-bem-contact-form', get_template_directory_uri() . '/src/js/contact-form.js', array('produtor-do-bem-base-form'), PRODUTOR_DO_BEM_VERSION, true );
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

	// Scripts globais
	wp_enqueue_script( 'produtor-do-bem-menu', get_template_directory_uri() . '/src/js/menu.js', array('produtor-do-bem-utils'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-animations-globals', get_template_directory_uri() . '/src/js/animations/globals.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-theme', get_template_directory_uri() . '/src/js/theme.js', array('produtor-do-bem-utils'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-modal-denuncia', get_template_directory_uri() . '/src/js/modal-denuncia.js', array('produtor-do-bem-base-form'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-modal-download-protocolo', get_template_directory_uri() . '/src/js/modal-download-protocolo.js', array('produtor-do-bem-base-form'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-newsletter-form', get_template_directory_uri() . '/src/js/newsletter-form.js', array('produtor-do-bem-base-form', 'produtor-do-bem-toast'), PRODUTOR_DO_BEM_VERSION, true );

	// Localizar script para AJAX
	wp_localize_script( 'produtor-do-bem-contact-form', 'contact_form_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'multi_step_form_nonce' )
	));

	wp_localize_script( 'produtor-do-bem-modal-denuncia', 'denuncia_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'denuncia_form_nonce' )
	));

	wp_localize_script( 'produtor-do-bem-newsletter-form', 'newsletter_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'newsletter_form_nonce' )
	));

	wp_localize_script( 'produtor-do-bem-modal-download-protocolo', 'download_protocolo_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'download_protocolo_form_nonce' ),
		'post_id' => get_the_ID(),
		'post_title' => get_the_title()
	));
}
add_action( 'wp_enqueue_scripts', 'produtor_do_bem_scripts' );

/**
 * Adiciona atributo type="module" aos scripts de animação
 */
function produtor_do_bem_add_type_module($tag, $handle, $src) {
    $module_scripts = array(
        'produtor-do-bem-page-transition',
        'produtor-do-bem-slides-swiper',
        'produtor-do-bem-animations-globals',
        'produtor-do-bem-animations-home',
        'produtor-do-bem-animations-quem-somos',
        'produtor-do-bem-animations-certificacoes',
        'produtor-do-bem-animations-fale-conosco',
        'produtor-do-bem-animations-protocolo',
        'produtor-do-bem-animations-protocolos-e-selos',
    );

    if (in_array($handle, $module_scripts)) {
        $tag = str_replace('<script ', '<script type="module" ', $tag);
    }

    return $tag;
}
add_filter('script_loader_tag', 'produtor_do_bem_add_type_module', 10, 3);