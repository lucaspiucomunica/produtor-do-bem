<?php
/**
 * Produtores e Empresas Section - Quem Somos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$produtores_e_empresas_titulo = get_field('produtores_e_empresas_titulo');
$produtores_e_empresas_logos = get_field('produtores_e_empresas_logos');
?>

<section id="produtores-e-empresas" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex justify-center mb-10">
            <div class="w-full max-w-[740px] flex xs:flex-row flex-col items-center gap-10">
                <div class="content-image w-auto icone-logo">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/icone-logo-produtor-do-bem.svg" class="svg-inline w-auto h-20">
                </div>
                <div class="content-text xs:text-left text-center">
                    <h2><?php echo $produtores_e_empresas_titulo; ?></h2>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center flex-wrap md:gap-20 gap-10">
            <?php foreach ($produtores_e_empresas_logos as $logo) : ?>
                <div class="item-logo w-auto">
                    <img src="<?php echo $logo['url']; ?>" alt="<?php echo $logo['alt']; ?>" class="w-auto h-auto max-w-[208px] sm:max-h-[112px] max-h-[82px]">
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>