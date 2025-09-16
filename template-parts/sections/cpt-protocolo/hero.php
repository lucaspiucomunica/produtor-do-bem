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
$hero_destaques = get_field('destaques');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="hero-header">
                <div class="hero-header-icon">
                    <?php echo icon($hero_icone); ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/icone-logo-produtor-do-bem-branco.svg" class="svg-inline w-full h-auto hero-header-icon-logo">
                </div>
                <div class="content-text content-text--light">
                    <h1><?php echo $hero_titulo; ?></h1>
                    <p><?php echo $hero_descricao; ?></p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <?php foreach ($hero_destaques as $destaque) : ?>
                <div class="hero-destaque">
                    <div class="content-icon content-icon--secundario content-icon--large">
                        <?php echo icon($destaque['icone']); ?>
                    </div>
                    <div class="content-text content-text--light">
                        <h3><?php echo $destaque['titulo']; ?></h3>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>