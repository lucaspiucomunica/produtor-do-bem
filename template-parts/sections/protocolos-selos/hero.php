<?php
/**
 * Hero Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_field('hero_titulo');
$hero_titulo_destaque = get_field('hero_titulo_destaque');
$hero_titulo_icone = get_field('hero_titulo_icone');
$hero_bg = get_field('hero_bg');
$hero_titulo_conteudo = get_field('hero_titulo_conteudo');

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
                        <span class="title"><?php echo $hero_titulo; ?></span>
                        <div>
                            <span class="destaque"><?php echo $hero_titulo_destaque; ?></span>
                            <div class="content-icon content-icon--secundario">
                                <?php echo icon($hero_titulo_icone); ?>
                            </div>
                        </div>
                    </h1>
                </div>
                <div class="content-text">
                    <?php echo $hero_titulo_conteudo; ?>
                </div>
            </div>

            <div class="hero-bg-image">
                <img src="<?php echo $hero_bg['url']; ?>" alt="<?php echo $hero_bg['alt']; ?>">
            </div>
        </div>
    </div>
</section>