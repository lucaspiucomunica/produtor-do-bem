<?php
/**
 * Hero Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$intro_titulo = get_field('intro_titulo');

if (!$intro_titulo) {
    return;
}
?>

<section id="introducao" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="content-text text-center">
                <h2><?php echo $intro_titulo; ?></h2>
            </div>
        </div>
    </div>
</section>