<?php
/**
 * @package Produtor_do_Bem
 * Template Single Protocolo
 */

get_header();
?>

<main class="site-main" id="site-main">
    <?php if (get_field('em_breve')) : ?>
        <?php get_template_part('template-parts/sections/cpt-protocolo/hero-em-breve'); ?>
    <?php else : ?>
        <?php get_template_part('template-parts/sections/cpt-protocolo/hero'); ?>
        <?php get_template_part('template-parts/sections/cpt-protocolo/protocolo'); ?>
        <?php get_template_part('template-parts/sections/cpt-protocolo/apendice-bcc-ecc'); ?>
        <?php get_template_part('template-parts/sections/cpt-protocolo/cta'); ?>
    <?php endif; ?>
    
</main>

<?php
get_footer(); 