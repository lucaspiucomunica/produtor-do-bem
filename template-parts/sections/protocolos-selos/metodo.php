<?php
/**
 * Métodos Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$metodo_titulo = get_field('metodo_titulo');
$metodo_cards = get_field('metodo_cards');

if (!$metodo_titulo) {
    return;
}
?>

<section id="metodo" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            
        </div>
    </div>
</section>