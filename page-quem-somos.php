<?php
/**
 * @package Produtor_do_Bem
 * Template Name: Quem Somos
 */

// Usando o header alternativo
pdb_get_header('2');
?>

<main class="site-main" id="site-main">
    <?php get_template_part('template-parts/sections/quem-somos/hero'); ?>
    <?php get_template_part('template-parts/sections/quem-somos/o-que-fazemos'); ?>
    <?php get_template_part('template-parts/sections/quem-somos/produtores-e-empresas'); ?>
    <?php get_template_part('template-parts/sections/quem-somos/ct-consultivo'); ?>
</main>

<?php
get_footer();