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
$hero_destaques_titulo = get_field('destaque_titulo');
$hero_destaques_subtitulo = get_field('destaques_subtitulo');
$hero_infos_extras = get_field('informacoes_extras');
$arquivo_protocolo_cta_fixo = get_field('arquivo_protocolo_cta_fixo');

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
                    <h1><?php echo $hero_titulo; ?></h1>
                    <?php echo $hero_descricao; ?>
                </div>
            </div>
        </div>

        <?php if ($hero_destaques_subtitulo) : ?>
        <div class="flex mt-20 mb-10 hero-destaques-subtitulo">
            <div class="content-text content-text--light">
                <h2><?php echo $hero_destaques_subtitulo; ?></h2>
            </div>
        </div>
        <?php endif; ?>
        
        <?php if ($hero_destaques) : ?>
        <div class="grid lg:grid-cols-<?php echo count($hero_destaques); ?> sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
            <?php foreach ($hero_destaques as $destaque) : ?>
                <div class="hero-destaque">
                    <div class="content-icon content-icon--secundario content-icon--large">
                        <?php echo icon($destaque['icone']); ?>
                    </div>
                    <div class="content-text content-text--light">
                        <h3><?php echo $destaque['titulo']; ?></h3>
                        <?php if (!empty($destaque['texto'])) : ?>
                            <?php echo $destaque['texto']; ?>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <?php if ($hero_infos_extras) : ?>
        <div class="flex mt-10 hero-infos-extras">
            <div class="content-text content-text--light">
                <p><?php echo $hero_infos_extras; ?></p>
            </div>
        </div>
        <?php endif; ?>

        <?php if ($arquivo_protocolo_cta_fixo) : ?>
        <div class="cta-2-hero mt-10">
            <div class="cta-2">
                <div class="content-left">
                    <div class="content-icon content-icon--primario">
                        <?php echo icon($hero_icone); ?>
                    </div>
                    <div class="content-text">
                        <h3 class="content-text-title">Baixe o protocolo completo</h3>
                        <p class="content-text-description">Tenha acesso a todos os detalhes técnicos, critérios de avaliação e diretrizes para implementação do protocolo.</p>
                    </div>
                </div>
                <div class="content-right">
                    <div class="content-button">
                        <button id="download-protocolo" class="btn btn-is-icon" data-modal="download-protocolo">
                            <span class="text-nowrap">Baixar protocolo</span>
                            <?php echo icon('document-download'); ?>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </div>
</section>