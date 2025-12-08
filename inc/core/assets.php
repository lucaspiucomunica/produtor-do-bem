<?php

/**
 * Gerenciamento de assets do tema
 * 
 * Carrega scripts, estilos e bibliotecas necessárias para o funcionamento do tema.
 * Em desenvolvimento (WP_DEBUG=true): carrega arquivos individuais
 * Em produção (WP_DEBUG=false): carrega bundles minificados
 */

/**
 * Enfileira os estilos e scripts do tema
 */
function produtor_do_bem_scripts() {
	$is_dev = defined('WP_DEBUG') && WP_DEBUG;

	// CSS
	wp_enqueue_style( 'produtor-do-bem-style', get_stylesheet_uri(), array(), PRODUTOR_DO_BEM_VERSION );
	$css_file = $is_dev ? 'output.css' : 'output.min.css';
	wp_enqueue_style( 'produtor-do-bem-theme', get_template_directory_uri() . '/src/css/' . $css_file, array(), PRODUTOR_DO_BEM_VERSION );

	// Bibliotecas externas (sempre carregadas separadamente para caching)
	wp_enqueue_script( 'produtor-do-bem-gsap', get_template_directory_uri() . '/src/js/libs/gsap.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-scroll-trigger', get_template_directory_uri() . '/src/js/libs/ScrollTrigger.min.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-split-text', get_template_directory_uri() . '/src/js/libs/SplitText.min.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-gsap-scroll-smoother', get_template_directory_uri() . '/src/js/libs/ScrollSmoother.min.js', array('produtor-do-bem-gsap', 'produtor-do-bem-gsap-scroll-trigger'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-swiper', get_template_directory_uri() . '/src/js/libs/swiper-bundle.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );

	if ($is_dev) {
		produtor_do_bem_enqueue_dev_scripts();
	} else {
		produtor_do_bem_enqueue_prod_scripts();
	}

	// Localizar scripts para AJAX (independente do modo)
	produtor_do_bem_localize_scripts($is_dev);
}
add_action( 'wp_enqueue_scripts', 'produtor_do_bem_scripts' );

/**
 * Enfileira scripts em modo desenvolvimento (arquivos individuais)
 */
function produtor_do_bem_enqueue_dev_scripts() {
	$gsap_deps = array('produtor-do-bem-gsap', 'produtor-do-bem-gsap-scroll-trigger', 'produtor-do-bem-gsap-split-text', 'produtor-do-bem-gsap-scroll-smoother');

	// JavaScript - Utils (deve ser carregado primeiro)
	wp_enqueue_script( 'produtor-do-bem-utils', get_template_directory_uri() . '/src/js/utils.js', array(), PRODUTOR_DO_BEM_VERSION, true );

	// ScrollSmoother
	wp_enqueue_script( 'produtor-do-bem-scroll-smoother', get_template_directory_uri() . '/src/js/scroll-smoother.js', array_merge($gsap_deps, array('produtor-do-bem-utils')), PRODUTOR_DO_BEM_VERSION, true );

	// Transição de página
	wp_enqueue_script( 'produtor-do-bem-page-transition', get_template_directory_uri() . '/src/js/page-transition.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );

	// Swiper slides
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
		wp_enqueue_script( 'produtor-do-bem-tabs', get_template_directory_uri() . '/src/js/tabs.js', array('produtor-do-bem-gsap', 'produtor-do-bem-gsap-scroll-trigger'), PRODUTOR_DO_BEM_VERSION, true );
		wp_enqueue_script( 'produtor-do-bem-animations-protocolo', get_template_directory_uri() . '/src/js/animations/protocolo.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('outros-servicos')) {
		wp_enqueue_script( 'produtor-do-bem-animations-outros-servicos', get_template_directory_uri() . '/src/js/animations/outros-servicos.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('perguntas-frequentes')) {
		wp_enqueue_script( 'produtor-do-bem-accordion', get_template_directory_uri() . '/src/js/accordion.js', array('produtor-do-bem-utils', 'produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );
		wp_enqueue_script( 'produtor-do-bem-animations-faq', get_template_directory_uri() . '/src/js/animations/faq.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	}

	// Scripts globais
	wp_enqueue_script( 'produtor-do-bem-menu', get_template_directory_uri() . '/src/js/menu.js', array('produtor-do-bem-utils'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-animations-globals', get_template_directory_uri() . '/src/js/animations/globals.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-theme', get_template_directory_uri() . '/src/js/theme.js', array('produtor-do-bem-utils'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-modal-denuncia', get_template_directory_uri() . '/src/js/modal-denuncia.js', array('produtor-do-bem-base-form'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-modal-download-protocolo', get_template_directory_uri() . '/src/js/modal-download-protocolo.js', array('produtor-do-bem-base-form'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-modal-criterios', get_template_directory_uri() . '/src/js/modal-criterios.js', array('produtor-do-bem-gsap', 'produtor-do-bem-gsap-split-text'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-newsletter-form', get_template_directory_uri() . '/src/js/newsletter-form.js', array('produtor-do-bem-base-form', 'produtor-do-bem-toast'), PRODUTOR_DO_BEM_VERSION, true );
}

/**
 * Enfileira scripts em modo produção (bundles minificados)
 */
function produtor_do_bem_enqueue_prod_scripts() {
	$gsap_deps = array('produtor-do-bem-gsap', 'produtor-do-bem-gsap-scroll-trigger', 'produtor-do-bem-gsap-split-text', 'produtor-do-bem-gsap-scroll-smoother');

	// Core bundle (utils, base-form, toast, theme, menu, scroll-smoother)
	wp_enqueue_script( 'produtor-do-bem-core-bundle', get_template_directory_uri() . '/src/js/bundles/core.bundle.min.js', $gsap_deps, PRODUTOR_DO_BEM_VERSION, true );

	// Transitions bundle (page-transition, animations-config, animations-utils, globals)
	wp_enqueue_script( 'produtor-do-bem-transitions-bundle', get_template_directory_uri() . '/src/js/bundles/transitions.bundle.min.js', array('produtor-do-bem-gsap', 'produtor-do-bem-core-bundle'), PRODUTOR_DO_BEM_VERSION, true );

	// Forms bundle (newsletter-form, modal-denuncia, modal-download-protocolo, modal-criterios)
	wp_enqueue_script( 'produtor-do-bem-forms-bundle', get_template_directory_uri() . '/src/js/bundles/forms.bundle.min.js', array('produtor-do-bem-core-bundle', 'produtor-do-bem-gsap-split-text'), PRODUTOR_DO_BEM_VERSION, true );

	// Swiper bundle
	wp_enqueue_script( 'produtor-do-bem-swiper-bundle', get_template_directory_uri() . '/src/js/bundles/swiper.bundle.min.js', array('produtor-do-bem-swiper', 'produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );

	// Page bundles
	if (is_page('fale-conosco')) {
		wp_enqueue_script( 'produtor-do-bem-fale-conosco-bundle', get_template_directory_uri() . '/src/js/bundles/pages/fale-conosco.bundle.min.js', array('produtor-do-bem-core-bundle', 'produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_front_page()) {
		wp_enqueue_script( 'produtor-do-bem-home-bundle', get_template_directory_uri() . '/src/js/bundles/pages/home.bundle.min.js', array('produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('quem-somos')) {
		wp_enqueue_script( 'produtor-do-bem-quem-somos-bundle', get_template_directory_uri() . '/src/js/bundles/pages/quem-somos.bundle.min.js', array('produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('protocolos-e-selos')) {
		wp_enqueue_script( 'produtor-do-bem-protocolos-e-selos-bundle', get_template_directory_uri() . '/src/js/bundles/pages/protocolos-e-selos.bundle.min.js', array('produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('certificacoes')) {
		wp_enqueue_script( 'produtor-do-bem-certificacoes-bundle', get_template_directory_uri() . '/src/js/bundles/pages/certificacoes.bundle.min.js', array('produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_singular('protocolo')) {
		wp_enqueue_script( 'produtor-do-bem-protocolo-bundle', get_template_directory_uri() . '/src/js/bundles/pages/protocolo.bundle.min.js', array('produtor-do-bem-transitions-bundle', 'produtor-do-bem-gsap-scroll-trigger'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('outros-servicos')) {
		wp_enqueue_script( 'produtor-do-bem-outros-servicos-bundle', get_template_directory_uri() . '/src/js/bundles/pages/outros-servicos.bundle.min.js', array('produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}

	if (is_page('perguntas-frequentes')) {
		wp_enqueue_script( 'produtor-do-bem-faq-bundle', get_template_directory_uri() . '/src/js/bundles/pages/faq.bundle.min.js', array('produtor-do-bem-transitions-bundle'), PRODUTOR_DO_BEM_VERSION, true );
	}
}

/**
 * Localiza scripts para AJAX
 */
function produtor_do_bem_localize_scripts($is_dev) {
	// Script handles para localização dependem do modo
	$contact_form_handle = $is_dev ? 'produtor-do-bem-contact-form' : 'produtor-do-bem-fale-conosco-bundle';
	$denuncia_handle = $is_dev ? 'produtor-do-bem-modal-denuncia' : 'produtor-do-bem-forms-bundle';
	$newsletter_handle = $is_dev ? 'produtor-do-bem-newsletter-form' : 'produtor-do-bem-forms-bundle';
	$download_protocolo_handle = $is_dev ? 'produtor-do-bem-modal-download-protocolo' : 'produtor-do-bem-forms-bundle';
	$nonce_refresh_handle = $is_dev ? 'produtor-do-bem-nonce-refresh' : 'produtor-do-bem-nonce-refresh';

	// Script de refresh de nonces (sempre carregado)
	wp_enqueue_script( 'produtor-do-bem-nonce-refresh', get_template_directory_uri() . '/src/js/nonce-refresh.js', array(), PRODUTOR_DO_BEM_VERSION, true );

	// Variável global com ajax_url para refresh de nonces
	wp_localize_script( $nonce_refresh_handle, 'pdb_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' )
	));

	// Contact form (apenas na página fale-conosco)
	if (is_page('fale-conosco')) {
		wp_localize_script( $contact_form_handle, 'contact_form_ajax', array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'multi_step_form_nonce' )
		));
	}

	// Denuncia form
	wp_localize_script( $denuncia_handle, 'denuncia_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'denuncia_form_nonce' )
	));

	// Newsletter form
	wp_localize_script( $newsletter_handle, 'newsletter_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'newsletter_form_nonce' )
	));

	// Download protocolo form
	wp_localize_script( $download_protocolo_handle, 'download_protocolo_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'download_protocolo_form_nonce' ),
		'post_id' => get_the_ID(),
		'post_title' => get_the_title()
	));
}

/**
 * Adiciona atributo type="module" aos scripts ES Module
 */
function produtor_do_bem_add_type_module($tag, $handle, $src) {
	$is_dev = defined('WP_DEBUG') && WP_DEBUG;

	// Scripts que precisam de type="module" em modo desenvolvimento
	$dev_module_scripts = array(
		'produtor-do-bem-page-transition',
		'produtor-do-bem-slides-swiper',
		'produtor-do-bem-animations-globals',
		'produtor-do-bem-animations-home',
		'produtor-do-bem-animations-quem-somos',
		'produtor-do-bem-animations-certificacoes',
		'produtor-do-bem-animations-fale-conosco',
		'produtor-do-bem-animations-protocolo',
		'produtor-do-bem-animations-protocolos-e-selos',
		'produtor-do-bem-animations-outros-servicos',
		'produtor-do-bem-animations-faq',
	);

	// Scripts que precisam de type="module" em modo produção
	$prod_module_scripts = array(
		'produtor-do-bem-transitions-bundle',
		'produtor-do-bem-swiper-bundle',
		'produtor-do-bem-home-bundle',
		'produtor-do-bem-quem-somos-bundle',
		'produtor-do-bem-certificacoes-bundle',
		'produtor-do-bem-fale-conosco-bundle',
		'produtor-do-bem-protocolos-e-selos-bundle',
		'produtor-do-bem-protocolo-bundle',
		'produtor-do-bem-outros-servicos-bundle',
		'produtor-do-bem-faq-bundle',
	);

	$module_scripts = $is_dev ? $dev_module_scripts : $prod_module_scripts;

	if (in_array($handle, $module_scripts)) {
		$tag = str_replace('<script ', '<script type="module" ', $tag);
	}

	return $tag;
}
add_filter('script_loader_tag', 'produtor_do_bem_add_type_module', 10, 3);
