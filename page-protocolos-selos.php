<?php
/**
 * @package Produtor_do_Bem
 * Template Name: Protocolos e Selos
 */

get_header();
?>

<main class="site-main" id="site-main">
    <?php get_template_part('template-parts/sections/protocolos-selos/hero'); ?>
    <?php get_template_part('template-parts/sections/protocolos-selos/criterios'); ?>
    <?php get_template_part('template-parts/sections/protocolos-selos/metodo'); ?>
    <?php get_template_part('template-parts/sections/protocolos-selos/comunicacao'); ?>
    <?php get_template_part('template-parts/sections/protocolos-selos/cta'); ?>
    <?php get_template_part('template-parts/sections/protocolos-selos/auditorias'); ?>
    <?php get_template_part('template-parts/sections/protocolos-selos/protocolos'); ?>
</main>

<?php
get_footer();