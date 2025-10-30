<?php
/**
 * Content Header - Modelo Consolidado
 *
 * @package Produtor_do_Bem
 */

// Campos ACF
$redes_sociais = get_field('redes_sociais', 'option');

// Obtém o tipo de header da query var (definido por pdb_get_header())
$header_type = get_query_var('header_type', '1');

// Define variáveis condicionais baseadas no tipo
$header_class = 'site-header--' . $header_type;
$logo_desktop = ($header_type === '1') ? 'logo-produtor-do-bem-branco.svg' : 'logo-produtor-do-bem.svg';
$btn_classes = ($header_type === '1') ? 'btn btn-secondary btn-outline' : 'btn';
?>

<header class="site-header <?php echo esc_attr($header_class); ?>" id="site-header">
    <div class="site-header-content">
        <div class="site-header-content-left">
            <div class="site-header-logo">
                <a href="<?php echo home_url(); ?>" rel="home" aria-label="<?php bloginfo('name'); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/<?php echo esc_attr($logo_desktop); ?>" alt="Logo" class="svg-inline">
                </a>
            </div>
            <div class="site-header-menu">
                <button class="btn btn-icon btn-secondary xl:hidden inline-flex" id="menu-mobile-open" aria-label="Abrir menu mobile">
                    <?php echo icon('menu'); ?>
                </button>
                <div class="site-menu-desktop">
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

        <div class="content-right">
            <a href="/certificacoes" class="<?php echo esc_attr($btn_classes); ?>">
                <span>Obter a certificação</span>
            </a>
        </div>
    </div>

    <div class="site-menu-mobile-wrapper site-menu-mobile-wrapper-hidden">
        <div class="site-menu-mobile-header">
            <a href="<?php echo home_url(); ?>" rel="home" aria-label="<?php bloginfo('name'); ?>" class="logo">
                <img src="<?php echo get_template_directory_uri(); ?>/src/img/icone-logo-produtor-do-bem-branco.svg" alt="Logo" class="svg-inline">
            </a>

            <button class="btn btn-icon btn-secondary" id="menu-mobile-close" aria-label="Fechar menu mobile">
                <?php echo icon('close-circle'); ?>
            </button>
        </div>

        <div class="site-menu-mobile-content">
            <div class="site-menu-mobile-content-pages">
                <div class="site-menu-mobile-content-pages-item">
                    <span class="title">Páginas</span>
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
                    <span class="title">Redes sociais</span>
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
                <div class="site-menu-mobile-content-protocolos-item">
                    <span class="title">Protocolos</span>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'menu-main',
                        'menu_class'     => 'main-menu-protocolos',
                        'container'      => false,
                        'fallback_cb'    => false,
                        'walker'         => new Produtor_Do_Bem_Menu_Walker_Protocolos(),
                    ));
                    ?>
                </div>

                <div class="site-menu-mobile-content-protocolos-item">
                    <a href="/certificacoes" class="btn btn-secondary btn-outline">
                        <span>Obter a certificação</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
