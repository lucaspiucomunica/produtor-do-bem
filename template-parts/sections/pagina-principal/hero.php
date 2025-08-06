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

<section class="flex flex-col items-start gap-4">
    <h1><?php echo $hero_titulo . ' <span class="text-primario-principal">' . $hero_titulo_destaque . '</span>';?></h1>
    <div class="inline-flex flex-row items-center gap-2">
        <?php echo icon('pig', 'w-8 h-8 fill-primario-principal'); ?>
        <p><?php echo $hero_subtitulo;?></p>
    </div>
    <a href="<?php echo $hero_botao['link'];?>" target="<?php if($hero_botao['blank'] == true) { echo '_blank'; } else { echo '_self'; }?>"><?php echo $hero_botao['texto'];?></a>
</section>