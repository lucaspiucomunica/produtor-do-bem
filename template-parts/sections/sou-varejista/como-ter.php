<?php
/**
 * Outras Certificações Section - Sou Varejista
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$como_ter_conteudo = get_field('como_ter_conteudo');

if (!$como_ter_conteudo) {
    return;
}
?>

<section id="como-ter" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="box">
            <div class="flex">
                <div class="content-text">
                    <?php echo $como_ter_conteudo; ?>
                </div>
            </div>
        </div>
    </div>
</section>