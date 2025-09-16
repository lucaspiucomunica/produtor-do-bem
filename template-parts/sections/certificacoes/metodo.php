<?php
/**
 * Método Section - Certificações
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$metodo_titulo = get_field('metodo_titulo');
$metodo_conteudo = get_field('metodo_conteudo');
$metodo_cards = get_field('metodo_cards');

if (!$metodo_titulo) {
    return;
}
?>

<section id="metodo" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex items-end gap-10 mb-10">
            <div class="content-text max-w-[480px] w-full">
                <h2><?php echo $metodo_titulo; ?></h2>
            </div>

            <div class="content-text w-full">
                <?php echo $metodo_conteudo; ?>
            </div>
        </div>

        <div class="flex">
            <div class="swiper swiper-cards-rotate">
                <div class="swiper-wrapper">
                    <?php $i = 0; foreach ($metodo_cards as $metodo_card) : $i++; ?>
                        <div class="swiper-slide">
                            <div class="card-rotate <?php 
                                $class_number = ($i % 4);
                                if ($class_number == 2) echo 'card-rotate-2';
                                elseif ($class_number == 3) echo 'card-rotate-3';
                                elseif ($class_number == 0) echo 'card-rotate-4';
                            ?> card-rotate-reverse">
                                <div class="content-icon <?php echo ($i % 4 == 3) ? 'content-icon--secundario' : 'content-icon--primario'; ?> content-icon--large">
                                    <?php echo icon($metodo_card['icone']); ?>
                                </div>
                                <div class="content-text">
                                    <h3><?php echo $metodo_card['texto']; ?></h3>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                    <div class="swiper-slide">
                        <a href="<?php echo home_url('/protocolos-e-selos'); ?>" class="card-rotate card-rotate-cta">
                            <div class="content-text">
                                <h3>Conheça nossos protocolos</h3>
                            </div>
                            <div class="content-button">
                                <?php echo icon('arrow-right-01', 'btn-cta-icon'); ?>
                                <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline btn-cta-base">
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>