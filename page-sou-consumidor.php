<?php
/**
 * @package Produtor_do_Bem
 * Template Name: Sou Consumidor
 */

get_header();
?>

<main class="site-main" id="site-main">
    <?php get_template_part('template-parts/sections/sou-consumidor/hero'); ?>
    <?php get_template_part('template-parts/sections/sou-consumidor/produtor-do-bem'); ?>
    <?php get_template_part('template-parts/sections/sou-consumidor/selos'); ?>
    <?php get_template_part('template-parts/sections/sou-consumidor/outras-certificacoes'); ?>
    
    <div class="group-last-section-footer">
        <?php get_template_part('template-parts/globals/cta-1', '', array('style' => 'style-2')); ?>
    </div>
</main>

<?php
get_footer();