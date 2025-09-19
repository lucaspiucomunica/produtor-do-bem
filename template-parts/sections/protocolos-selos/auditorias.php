<?php
/**
 * Auditorias Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$auditorias_titulo = get_field('auditorias_titulo');
$auditorias_conteudo = get_field('auditorias_conteudo');
$auditorias_imagem = get_field('auditorias_imagem');

if (!$auditorias_titulo) {
    return;
}
?>

<section id="auditorias" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex items-center gap-10">
            <div class="w-1/2">
                <div class="content-text">
                    <h2><?php echo $auditorias_titulo; ?></h2>
                    <?php echo $auditorias_conteudo; ?>
                </div>
            </div>

            <div class="w-1/2">
                <div class="flex items-center gap-4">
                    <div class="w-1/2">
                        <div class="content-image animate-1">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/icone-logo-produtor-do-bem.svg" class="svg-inline w-full h-auto">
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="content-image content-image--rounded-full content-image--square animate-2">
                            <img src="<?php echo $auditorias_imagem['url']; ?>" alt="<?php echo $auditorias_imagem['alt']; ?>" class="w-full h-full object-cover object-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>