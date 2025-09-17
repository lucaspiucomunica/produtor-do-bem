<?php
/**
 * @package Produtor_do_Bem
 * Template Name: Certificações
 */

get_header();
?>

<main class="site-main" id="site-main">
    <?php get_template_part('template-parts/sections/certificacoes/hero'); ?>
    <?php get_template_part('template-parts/sections/certificacoes/metodo'); ?>
    <?php get_template_part('template-parts/sections/certificacoes/niveis'); ?>
    <?php get_template_part('template-parts/sections/certificacoes/certificacoes'); ?>
    <?php get_template_part('template-parts/sections/certificacoes/como-obter'); ?>
    <?php get_template_part('template-parts/globals/cta-1'); ?>
</main>

<?php
get_footer();