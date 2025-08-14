<?php
/**
 * Content Header - Modelo 1
 * 
 * @package Produtor_do_Bem
 */
?>

<header class="site-header site-header--1" id="site-header">
    <div class="content-header">
        <div class="content-left">
            <div class="site-logo">
            <a href="<?php echo home_url(); ?>" rel="home" aria-label="<?php bloginfo('name'); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/logo-produtor-do-bem-branco.svg" alt="Logo" class="svg-inline">
                </a>
            </div>
            <div class="site-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'menu-main',
                    'menu_class'     => 'main-menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                ));
                ?>
            </div>
        </div>

        <div class="content-right">
            <a href="/certificacoes" class="btn btn-secondary btn-outline">
                <span>Obter a certificação</span>
            </a>
        </div>
    </div>
</header>