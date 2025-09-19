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
        <div class="flex flex-col items-center justify-center gap-6">
            <div class="animate-1">
                <div class="content-text text-center">
                    <h2><?php echo str_replace('bem-estar animal', '<span class="destaque">bem-estar animal</span>', $cta_titulo); ?></h2>
                </div>
            </div>
            <div class="animate-2">
                <a href="<?php echo $cta_destino['url']; ?>" class="btn btn-large">
                    <span><?php echo $cta_destino['title']; ?></span>
                </a>
            </div>
        </div>
    </div>
</section>