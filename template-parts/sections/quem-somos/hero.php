<?php
/**
 * Hero Section - Quem Somos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_field('hero_titulo');
$hero_titulo_destaque = get_field('hero_titulo_destaque');
$hero_conteudo = get_field('hero_conteudo');
$hero_imagem = get_field('hero_imagem');
$hero_icones = get_field('hero_icones');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex items-center justify-center gap-10">
            <div class="w-5/12">
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
                </div>
            </div>

            <div class="w-5/12">
                <div class="hero-image">
                    <div class="hero-image-content">
                        <img src="<?php echo $hero_imagem['url']; ?>" alt="<?php echo $hero_imagem['alt']; ?>">
                    </div>

                    <div class="hero-image-icons">
                        <?php foreach ($hero_icones as $index => $icone) : ?>
                            <div class="hero-image-icon">
                                <div class="content-icon content-icon--primario<?php echo $index !== 1 ? ' content-icon--large' : ''; ?>">
                                    <?php echo icon($icone['icone']); ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>