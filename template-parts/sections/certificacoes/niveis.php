<?php
/**
 * Níveis Section - Certificações
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$niveis_titulo = get_field('niveis_titulo');
$niveis_conteudo = get_field('niveis_conteudo');
$niveis_cards = get_field('niveis_cards');

if (!$niveis_titulo) {
    return;
}
?>

<section id="niveis" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="content-text text-center max-w-[1000px] mx-auto">
                <h2><?php echo $niveis_titulo; ?></h2>
                <?php echo $niveis_conteudo; ?>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <?php foreach ($niveis_cards as $niveis_card) : ?>
                <div class="card-nivel-certificacao">
                    <div class="card-nivel-certificacao-header">
                        <div class="tag-1">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                            <span><?php echo $niveis_card['tag']; ?></span>
                        </div>
                    </div>
                    <div class="card-nivel-certificacao-content">
                        <div class="card-nivel-certificacao-selo">
                            <img src="<?php echo $niveis_card['selo']['url']; ?>" alt="<?php echo $niveis_card['selo']['alt']; ?>">
                        </div>
                        <div class="content-text text-center">
                            <p><?php echo $niveis_card['texto']; ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>