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
$o_que_fazemos_o_que_significa = get_field('o_que_fazemos_o_que_significa');

if (!$o_que_fazemos_titulo) {
    return;
}
?>

<section id="o-que-fazemos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="w-full flex items-end justify-between gap-10">
                <div class="content-text">
                    <h2><?php echo $o_que_fazemos_titulo; ?></h2>
                    <p class="max-w-[660px]"><?php echo $o_que_fazemos_descricao; ?></p>
                </div>

                <div class="swiper-carrossel-o-que-fazemos-navigation">
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

        <div class="flex">
            <div class="w-full">
                <div class="swiper swiper-o-que-fazemos">
                    <div class="swiper-wrapper">
                        <?php foreach ($o_que_fazemos_carrossel as $item) : ?>
                            <div class="swiper-slide">
                                <div class="card-primary">
                                    <div class="card-primary-icon">
                                        <div class="card-primary-connection connection-left">
                                            <div class="rounded-inverted rounded-inverted--1"></div>
                                            <div class="fill"></div>
                                            <div class="rounded-inverted rounded-inverted--2"></div>
                                        </div>
                                        <div class="content-icon content-icon--secundario content-icon--bigger">
                                            <?php echo icon($item['icone']); ?>
                                        </div>
                                        <div class="card-primary-connection connection-right">
                                            <div class="rounded-inverted rounded-inverted--1"></div>
                                            <div class="fill"></div>
                                            <div class="rounded-inverted rounded-inverted--2"></div>
                                        </div>
                                        <div class="card-primary-connection-line"></div>
                                    </div>

                                    <div class="card-primary-text">
                                        <div class="content-text">
                                            <h3><?php echo $item['texto']; ?></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex pt-10">
            <div class="w-full">
                <div class="carrossel-o-que-significa">
                    <div class="left">
                        <div class="content-text">
                            <h3><?php echo $o_que_fazemos_o_que_significa['titulo']; ?></h3>
                            <p><?php echo $o_que_fazemos_o_que_significa['descricao']; ?></p>
                        </div>
                        <div class="swiper-carrossel-o-que-significa-navigation mt-6">
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
                        <div class="progress-carrossel"></div>
                    </div>

                    <div class="right">
                        <div class="swiper swiper-o-que-significa">
                            <div class="swiper-wrapper">
                                <?php foreach ($o_que_fazemos_o_que_significa['cards'] as $item) : ?>
                                    <div class="swiper-slide cursor-hover">
                                        <div class="card-secondary">
                                            <div class="content-text card-secondary-titulo">
                                                <h4><?php echo $item['titulo']; ?></h4>
                                            </div>
                                            <div class="content-text card-secondary-conteudo">
                                                <?php echo $item['conteudo']; ?>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>