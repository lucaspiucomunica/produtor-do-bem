<?php
/**
 * Content Header - Modelo 1
 * 
 * @package Produtor_do_Bem
 */

 //  Campos ACF

 $redes_sociais = get_field('redes_sociais', 'option');
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
                <div class="site-menu-wrapper">
                    <button class="btn btn-icon btn-secondary xl:hidden inline-flex">
                        <?php echo icon('menu'); ?>
                    </button>
                    <div class="site-menu-desktop xl:block hidden">
                        <div class="site-menu-desktop-content">
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'menu-main',
                                'menu_class'     => 'main-menu',
                                'container'      => false,
                                'fallback_cb'    => false,
                                'walker'         => new Produtor_Do_Bem_Menu_Walker(),
                            ));
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-right">
            <a href="/certificacoes" class="btn btn-secondary btn-outline">
                <span>Obter a certificação</span>
            </a>
        </div>
    </div>

    <div class="site-menu-mobile-wrapper xl:hidden block">
        <div class="site-menu-mobile-header">
            <a href="<?php echo home_url(); ?>" rel="home" aria-label="<?php bloginfo('name'); ?>" class="logo">
                <img src="<?php echo get_template_directory_uri(); ?>/src/img/icone-logo-produtor-do-bem-branco.svg" alt="Logo" class="svg-inline">
            </a>

            <button class="btn btn-icon btn-secondary">
                <?php echo icon('close-circle'); ?>
            </button>
        </div>

        <div class="site-menu-mobile-content">
            <div class="site-menu-mobile-content-pages">
                <div class="site-menu-mobile-content-pages-item">
                    <span>Páginas</span>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'menu-main',
                        'menu_class'     => 'main-menu-pages',
                        'container'      => false,
                        'fallback_cb'    => false,
                        'walker'         => new Produtor_Do_Bem_Menu_Walker_Pages(),
                    ));
                    ?>
                </div>

                <div class="site-menu-mobile-content-pages-item">
                    <span>Redes sociais</span>
                    <div class="content-redes-sociais-list">
                    <?php foreach ($redes_sociais as $rede_social) : ?>
                        <a href="<?php echo $rede_social['url']; ?>" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-secondary">
                            <?php echo icon($rede_social['icone']); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            
            <div class="site-menu-mobile-content-protocolos">
                <div class="site-menu-mobile-content-pages-item">
                    <span>Protocolos</span>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'menu-main',
                        'menu_class'     => 'main-menu-protocolos',
                        'container'      => false,
                        'fallback_cb'    => false,
                        'walker'         => new Produtor_Do_Bem_Menu_Walker_Protocolos(),
                    ));
                    ?>
                    <a href="/certificacoes" class="btn btn-secondary btn-outline">
                        <span>Obter a certificação</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>