<?php
/**
 * Hero Section - Página Principal
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_field('hero_titulo');
$hero_titulo_destaque = get_field('hero_titulo_destaque');
$hero_subtitulo = get_field('hero_subtitulo');
$hero_botao = get_field('hero_botao');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="w-full">
                <div class="hero-content">
                    <div class="titulo">
                        <h1>
                            <span class="title"><?php echo $hero_titulo; ?></span>
                            <span class="destaque"><?php echo $hero_titulo_destaque; ?></span>
                        </h1>
                    </div>
                    <div class="subtitulo">
                        <div class="icons">
                            <span class="icon"><?php echo icon('pig'); ?></span>
                            <span class="icon"><?php echo icon('cow'); ?></span>
                            <span class="icon"><?php echo icon('chicken'); ?></span>
                            <span class="icon"><?php echo icon('egg'); ?></span>
                        </div>
                        <p><?php echo $hero_subtitulo; ?></p>
                    </div>
                    <div class="botao">
                        <a href="<?php echo esc_url($hero_botao['link']); ?>" 
                            class="btn btn-secondary"
                            <?php echo $hero_botao['blank'] ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
                            <?php echo esc_html($hero_botao['texto']); ?>
                        </a>
                    </div>
                </div>

                <div class="hero-bg-video">
                    <video src="<?php echo get_template_directory_uri(); ?>/src/img/take-banner.webm" autoplay muted loop playsinline disablepictureinpicture></video>
                </div>
            </div>
        </div>
    </div>
</section>