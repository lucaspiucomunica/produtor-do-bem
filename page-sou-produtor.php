<?php
/**
 * @package Produtor_do_Bem
 * Template Name: Sou Produtor
 */

get_header();
?>

<main class="site-main" id="site-main">
    <?php get_template_part('template-parts/sections/sou-produtor/hero'); ?>
    <?php get_template_part('template-parts/sections/sou-produtor/intro'); ?>
    <?php get_template_part('template-parts/sections/sou-produtor/produtor-do-bem'); ?>
    <?php get_template_part('template-parts/sections/sou-produtor/conectamos'); ?>
    <div class="group-sections-sou-produtor">
    <?php get_template_part('template-parts/sections/sou-produtor/como-ser'); ?>
    <?php get_template_part('template-parts/sections/sou-produtor/depoimentos'); ?>
    <?php get_template_part('template-parts/globals/cta-1', '', array('style' => 'style-2')); ?>
    </div>
</main>

<?php
get_footer();