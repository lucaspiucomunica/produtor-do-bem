<?php
/**
 * @package Produtor_do_Bem
 * Template Página Principal
 */

get_header();
?>

<main class="site-main" id="site-main">
    <div class="flex flex-col gap-10">
        <h1 class="text-3xl">Sistema Simplificado de Ícones SVG</h1>
        <p>Apenas duas formas de usar: <strong>básico</strong> e <strong>com classes CSS</strong>.</p>
        <div class="flex flex-row gap-4">
            <?php echo icon('pig', 'fill-primario-principal'); ?>
            <?php echo icon('chicken', 'fill-primario-principal'); ?>
            <?php echo icon('cow', 'fill-primario-principal'); ?>
            <?php echo icon('leaf', 'fill-primario-principal'); ?>
            <?php echo icon('capsule', 'fill-primario-principal'); ?>
            <?php echo icon('egg', 'fill-primario-principal'); ?>
        </div>
    </div>
</main>

<?php
get_footer(); 