<?php
/**
 * Depoimentos Section - Sou Produtor
 *
 * @package Produtor_do_Bem
 */

// Campos ACF
$depoimentos_texto = get_field('depoimentos_texto');
$depoimentos_itens = get_field('depoimentos_itens');

if (!$depoimentos_texto) {
    return;
}
?>

<section id="depoimentos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="box">
            <div class="flex box-header">
                <div class="content-text content-text--light content-text--large text-center">
                    <?php echo $depoimentos_texto; ?>
                </div>
            </div>

            <div class="flex flex-col gap-10 box-swiper">
                <div class="swiper swiper-depoimentos">
                    <div class="swiper-wrapper">
                        <?php
                        if ($depoimentos_itens && is_array($depoimentos_itens)) :
                            foreach ($depoimentos_itens as $item) :
                                $imagem = $item['imagem'];
                                $nome = $item['nome'];
                                $cargo = $item['cargo'];
                                $depoimento = $item['depoimento'];
                        ?>
                            <div class="swiper-slide">
                                <div class="depoimento-card">
                                    <div class="depoimento-texto">
                                        <div class="content-text content-text--light">
                                            <?php echo $depoimento; ?>
                                        </div>
                                    </div>

                                    <div class="depoimento-autor">
                                        <?php if ($imagem) : ?>
                                            <div class="depoimento-avatar">
                                                <img src="<?php echo esc_url($imagem['url']); ?>" alt="<?php echo esc_attr($imagem['alt']); ?>">
                                            </div>
                                        <?php else : ?>
                                            <div class="depoimento-avatar">
                                                <?php echo icon('user-tick'); ?>
                                            </div>
                                        <?php endif; ?>

                                        <div class="depoimento-info">
                                            <span class="depoimento-nome"><?php echo $nome; ?></span>
                                            <span class="depoimento-cargo"><?php echo $cargo; ?></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php
                            endforeach;
                        endif;
                        ?>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="depoimento-nav">
                        <button class="depoimento-nav-prev">
                            <?php echo icon('arrow-right-01'); ?>
                        </button>
                        <button class="depoimento-nav-next">
                            <?php echo icon('arrow-right-01'); ?>
                        </button>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="depoimento-pagination"></div>
            </div>
        </div>
    </div>
</section>