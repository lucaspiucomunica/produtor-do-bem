<?php
/**
 * Protocolos Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$protocolos_titulo = get_field('protocolos_titulo');

if (!$protocolos_titulo) {
    return;
}
?>

<section id="protocolos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="<?php echo get_class_section(); ?>-content">
                <div class="content-text text-center">
                    <h2><?php echo $protocolos_titulo; ?></h2>
                </div>
            </div>
        </div>
    </div>
</section>