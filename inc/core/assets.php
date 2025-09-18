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
	wp_enqueue_script( 'produtor-do-bem-gsap', get_template_directory_uri() . '/src/js/libs/gsap-all.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-scroll-smoother', get_template_directory_uri() . '/src/js/scroll-smoother.js', array('produtor-do-bem-gsap'), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-swiper', get_template_directory_uri() . '/src/js/libs/swiper-bundle.min.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-slides-swiper', get_template_directory_uri() . '/src/js/slides-swiper.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-contact-form', get_template_directory_uri() . '/src/js/contact-form.js', array(), PRODUTOR_DO_BEM_VERSION, true );
	wp_enqueue_script( 'produtor-do-bem-theme', get_template_directory_uri() . '/src/js/theme.js', array(), PRODUTOR_DO_BEM_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'produtor_do_bem_scripts' ); 