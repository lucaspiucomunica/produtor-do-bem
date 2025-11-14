<?php
/**
 * Critérios Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$criterios_titulo = get_field('criterios_titulo');
$criterio_conteudo = get_field('criterio_conteudo');

if (!$criterios_titulo) {
    return;
}
?>

<section id="criterios" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex lg:flex-row flex-col lg:items-end items-start lg:gap-10 gap-6 p-section-bottom">
            <div class="content-text lg:max-w-[480px] max-w-full">
                <h2><?php echo $criterios_titulo; ?></h2>
            </div>
            
            <div class="content-text">
                <?php echo $criterio_conteudo; ?>
            </div>
        </div>
    </div>
</section>