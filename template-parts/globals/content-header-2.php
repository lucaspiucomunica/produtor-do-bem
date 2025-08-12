<?php
/**
 * Content Header - Modelo 2
 * 
 * @package Produtor_do_Bem
 */
?>

<header class="site-header site-header--2" id="site-header">
    <div class="content-header">
        <div class="content-left">
            <div class="site-logo">
                <a href="<?php echo home_url(); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/logo-produtor-do-bem.svg" alt="Logo" class="svg-inline">
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
            <a href="/certificacoes" class="btn">
                <span>Obter a certificação</span>
            </a>
        </div>
    </div>
</header>