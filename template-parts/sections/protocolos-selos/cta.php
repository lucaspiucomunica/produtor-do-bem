<?php
/**
 * CTA Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$cta_titulo = get_field('cta_titulo');
$cta_destino = get_field('cta_destino');

if (!$cta_titulo) {
    return;
}
?>

<section id="cta" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            
        </div>
    </div>
</section>