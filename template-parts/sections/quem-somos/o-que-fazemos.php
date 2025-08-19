<?php
/**
 * O Que Fazemos Section - Quem Somos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$o_que_fazemos_titulo = get_field('o_que_fazemos_titulo');
$o_que_fazemos_descricao = get_field('o_que_fazemos_descricao');
$o_que_fazemos_carrossel = get_field('o_que_fazemos_carrossel');

if (!$o_que_fazemos_titulo) {
    return;
}
?>

<section id="o-que-fazemos" class="<?php echo get_class_section(); ?> swiper-o-que-fazemos-wrapper">
    <div class="container">
        <div class="flex">
            <div class="w-full flex items-end justify-between gap-10">
                <div class="content-text">
                    <h2><?php echo $o_que_fazemos_titulo; ?></h2>
                    <p class="max-w-[660px]"><?php echo $o_que_fazemos_descricao; ?></p>
                </div>

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
        </div>

        <div class="swiper swiper-o-que-fazemos">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>
        </div>
    </div>
</section>