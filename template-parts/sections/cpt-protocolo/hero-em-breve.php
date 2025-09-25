<?php
/**
 * Hero Section - CPT Protocolo
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_the_title();
$hero_descricao = get_field('descricao');
$hero_icone = get_field('icone');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="hero-header">
                <div class="hero-header-icon">
                    <?php echo icon($hero_icone); ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/icone-logo-produtor-do-bem-branco.svg" class="svg-inline w-full h-auto hero-header-icon-logo">
                </div>
                <div class="content-text content-text--light">
                    <div class="tag-1">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                        <span>Em breve</span>
                    </div>
                    <h1><?php echo $hero_titulo; ?></h1>
                    <?php echo $hero_descricao; ?>
                    <a href="<?php echo home_url('/fale-conosco'); ?>" class="btn btn-secondary btn-outline">
                        <span>Quero a certificação</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>