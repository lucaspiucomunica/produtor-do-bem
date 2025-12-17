<?php
/**
 * Selos Section - Sou Varejista
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$selos_titulo = get_field('selos_titulo');
$selos_itens = get_field('selos_itens');

if (!$selos_titulo) {
    return;
}
?>

<section id="selos" class="<?php echo get_class_section(); ?> sections-sou-selos">
    <div class="container">
        <div class="box">
            <div class="flex mb-10">
                <div class="content-text text-center content-text--light">
                    <h2><?php echo $selos_titulo; ?></h2>
                </div>
            </div>

            <div class="grid grid-cols-<?php echo count($selos_itens); ?> gap-10">
                <?php foreach ($selos_itens as $item) : ?>
                    <div class="selo col-span-1">
                        <div class="selo-content ligacao-<?php echo $item['posicao']; ?>">
                            <img src="<?php echo $item['selo']['url']; ?>" alt="<?php echo $item['selo']['alt']; ?>">
                            <div class="ligacao">
                                <img src="<?php echo get_template_directory_uri(); ?>/src/img/arrow-pdb-1.svg" class="svg-inline">
                            </div>
                        </div>
                        <div class="selo-text">
                            <?php echo $item['texto']; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>