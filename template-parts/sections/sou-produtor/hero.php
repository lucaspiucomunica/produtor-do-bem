<?php
/**
 * Hero Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_field('hero_titulo');
$hero_titulo_destaque = get_field('hero_titulo_destaque');
$hero_bg = get_field('hero_background');
$hero_conteudo = get_field('hero_conteudo');
$hero_botao = get_field('hero_botao');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?> section-hero-custom-1">
    <div class="container">
        <div class="flex">
            <div class="hero-content">
                <div class="titulo">
                    <h1>
                        <span class="title"><?php echo $hero_titulo; ?></span>
                        <span class="destaque"><?php echo $hero_titulo_destaque; ?></span>
                    </h1>
                </div>
                <div class="content-text">
                    <?php echo $hero_conteudo; ?>
                </div>
                <?php if ($hero_botao): ?>
                <div class="content-button">
                    <a href="<?php echo esc_url($hero_botao['url']); ?>" target="<?php echo $hero_botao['target']; ?>" class="btn btn-secondary">
                            <span><?php echo esc_html($hero_botao['title']); ?></span>
                        </a>
                    </div>
                <?php endif; ?>
            </div>

            <div class="hero-bg-image">
                <img src="<?php echo $hero_bg['url']; ?>" alt="<?php echo $hero_bg['alt']; ?>">
            </div>
        </div>
    </div>
</section>