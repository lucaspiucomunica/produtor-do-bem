<?php
/**
 * Comunicação Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$comunicacao_titulo = get_field('comunicacao_titulo');
$comunicacao_conteudo = get_field('comunicacao_conteudo');
$comunicacao_cards = get_field('comunicacao_cards');

if (!$comunicacao_titulo) {
    return;
}
?>

<section id="comunicacao" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="<?php echo get_class_section(); ?>-content">
                <div class="flex mb-10">
                    <div class="content-text content-text--light text-center">
                        <h2><?php echo $comunicacao_titulo; ?></h2>
                        <div class="max-w-[600px] mx-auto">
                            <?php echo $comunicacao_conteudo; ?>
                        </div>
                    </div>
                </div>

                <div class="flex lg-plus:flex-row flex-col cards-connection-1">
                    <?php foreach ($comunicacao_cards as $index => $comunicacao_card) : ?>
                        <div class="lg-plus:w-1/3 w-full">
                            <div class="card-image-1">
                                <div class="content-image">
                                    <img src="<?php echo $comunicacao_card['imagem']['url']; ?>" alt="<?php echo $comunicacao_card['imagem']['alt']; ?>">
                                </div>
                                <div class="content-text text-center">
                                    <h3><?php echo $comunicacao_card['texto']; ?></h3>
                                </div>
                            </div>
                        </div>
                        <?php if ($index < count($comunicacao_cards) - 1) : ?>
                            <div class="card-connection-1">
                                <div class="rounded-top">
                                    <div class="rounded-item rounded-item--1"></div>
                                </div>
                                <div class="fill"></div>
                                <div class="rounded-bottom">
                                    <div class="rounded-item rounded-item--1"></div>
                                </div>
                            </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>