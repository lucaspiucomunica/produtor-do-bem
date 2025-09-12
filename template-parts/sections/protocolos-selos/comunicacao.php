<?php
/**
 * Comunicação Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$comunicacao_titulo = get_field('comunicacao_titulo');
$comunicacao_conteudo = get_field('comunicacao_conteudo');
$comunicacao_cards = get_field('comunicacao_cards');

if (!$comunicacao_titulo) {
    return;
}
?>

<section id="comunicacao" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            
        </div>
    </div>
</section>