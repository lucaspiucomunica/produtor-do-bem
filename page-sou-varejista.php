<?php
/**
 * @package Produtor_do_Bem
 * Template Name: Sou Varejista
 */

get_header();
?>

<main class="site-main" id="site-main">
    <?php get_template_part('template-parts/sections/sou-varejista/hero'); ?>
    <?php get_template_part('template-parts/sections/sou-varejista/intro'); ?>
    <?php get_template_part('template-parts/sections/sou-varejista/produtor-do-bem'); ?>
    <?php get_template_part('template-parts/sections/sou-varejista/selos'); ?>
    <?php get_template_part('template-parts/sections/sou-varejista/outras-certificacoes'); ?>
    <?php get_template_part('template-parts/sections/sou-varejista/como-ter'); ?>
    
    <div class="group-last-section-footer">
        <?php get_template_part('template-parts/globals/cta-1', '', array('style' => 'style-2')); ?>
    </div>
</main>

<?php
get_footer();