<?php
/**
 * Depoimentos Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$depoimentos_texto = get_field('depoimentos_texto');
$depoimentos_itens = get_field('depoimentos_itens');

if (!$depoimentos_texto) {
    return;
}
?>

<section id="depoimentos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex pb-10">
            <div class="content-text content-text--light text-center">
                <h2><?php echo $depoimentos_texto; ?></h2>
            </div>
        </div>
    </div>
</section>