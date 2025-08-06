<?php
/**
 * @package Produtor_do_Bem
 * Template Single Protocolo
 */

get_header();
?>

<main class="site-main" id="site-main">
    <div class="flex flex-row items-center gap-2">
        <?php
        $icone = get_field('icone');
        if ($icone) {
            echo icon($icone, 'fill-primario-principal');
        }
        ?>
        <?php echo the_field('descricao'); ?>
    </div>
</main>

<?php
get_footer(); 