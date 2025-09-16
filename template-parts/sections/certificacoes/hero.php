<?php
/**
 * Hero Section - Certificações
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_field('hero_titulo');
$hero_titulo_destaque = get_field('hero_titulo_destaque');
$hero_conteudo = get_field('hero_conteudo');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="hero-content">
                <div class="titulo">
                    <h1>
                        <?php echo $hero_titulo; ?>
                        <span class="destaque"><?php echo $hero_titulo_destaque; ?></span>
                    </h1>
                </div>
                <div class="content-text">
                    <?php echo $hero_conteudo; ?>
                </div>
                <a href="<?php echo home_url('/fale-conosco'); ?>" class="btn btn-secondary">
                    <span>Quero a certificação</span>
                </a>
            </div>

            <div class="hero-ilustracoes">
                <div class="hero-ilustracao hero-ilustracao--1">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/ilustracao-certificacoes-campo.svg" alt="Ilustração Certificações Campo">
                </div>
                <div class="hero-ilustracao hero-ilustracao--2">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/ilustracao-certificacoes-mesa.svg" alt="Ilustração Certificações Mesa">
                </div>
            </div>
        </div>
    </div>
</section>