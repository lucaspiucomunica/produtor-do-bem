<?php
/**
 * Hero Section - Página Principal
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$hero_titulo = get_field('hero_titulo');
$hero_titulo_destaque = get_field('hero_titulo_destaque');
$hero_subtitulo = get_field('hero_subtitulo');
$hero_botao = get_field('hero_botao');

if (!$hero_titulo) {
    return;
}
?>

<section id="hero" class="<?php echo get_class_section(); ?> w-full h-auto min-h-[636px] bg-primario-variacao-5 rounded-b-[80px]">
    <div class="container">
        <div class="flex">
            
        </div>
    </div>
</section>