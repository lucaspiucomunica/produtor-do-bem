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
        <?php echo icon('security', 'fill-primario-principal'); ?>
    </div>
</main>

<?php
get_footer(); 