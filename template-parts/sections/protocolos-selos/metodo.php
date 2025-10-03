<?php
/**
 * Métodos Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$metodo_titulo = get_field('metodo_titulo');
$metodo_cards = get_field('metodo_cards');

if (!$metodo_titulo) {
    return;
}
?>

<section id="metodo" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex items-end justify-between gap-10 mb-10">
            <div class="content-text max-w-[780px]">
                <h2><?php echo $metodo_titulo; ?></h2>
            </div>

            <div class="swiper-cards-rotate-navigation">
                <div class="navigation-carrossel">
                    <div class="navigation-item navigation-item--prev">
                        <div class="btn btn-icon">
                            <?php echo icon('arrow-square-left'); ?>
                        </div>
                    </div>
                    <div class="navigation-item navigation-item--next">
                        <div class="btn btn-icon">
                            <?php echo icon('arrow-square-right'); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex">
            <div class="swiper swiper-cards-rotate cursor-hover">
                <div class="swiper-wrapper">
                    <?php $i = 0; foreach ($metodo_cards as $metodo_card) : $i++; ?>
                        <div class="swiper-slide">
                            <div class="card-rotate <?php 
                                $class_number = ($i % 4);
                                if ($class_number == 2) echo 'card-rotate-2';
                                elseif ($class_number == 3) echo 'card-rotate-3';
                                elseif ($class_number == 0) echo 'card-rotate-4';
                            ?>">
                                <div class="content-icon <?php echo ($i % 4 == 3) ? 'content-icon--secundario' : 'content-icon--primario'; ?> content-icon--large">
                                    <?php echo icon($metodo_card['icone']); ?>
                                </div>
                                <div class="content-text">
                                    <h3><?php echo $metodo_card['texto']; ?></h3>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>