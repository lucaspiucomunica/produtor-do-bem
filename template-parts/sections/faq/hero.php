<?php
/**
 * Hero Section - Fale Conosco
 * 
 * @package Produtor_do_Bem
 */

 $texto = get_field('hero_texto');
?>

<section id="hero" class="<?php echo get_class_section(); ?> section-hero-custom-2">
    <div class="container">
        <div class="flex">
            <div class="content-text text-center">
                <?php echo $texto; ?>
            </div>
        </div>
    </div>
</section>