<?php
/**
 * Critérios Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$criterios_titulo = get_field('criterios_titulo');
$criterio_conteudo = get_field('criterio_conteudo');
$criterio_itens = get_field('criterios_itens');

if (!$criterios_titulo) {
    return;
}
?>

<section id="criterios" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex lg:flex-row flex-col lg:items-start items-center gap-10">
            <div class="w-full max-w-[548px]">
                <div class="content-text lg:max-w-[480px] max-w-full">
                    <h2><?php echo $criterios_titulo; ?></h2>
                    <?php echo $criterio_conteudo; ?>
                    <p class="flex items-center gap-2">
                        <?php echo icon('mouse-circle', 'fill-primario-variacao-3'); ?>
                        <strong>Clique em cada um para saber mais.</strong>
                    </p>
                </div>
            </div>

            <div class="w-full lg:max-w-full max-w-[648px]">
                <div class="criterios-list">
                    <?php $count = 0; $total = count($criterio_itens); foreach ($criterio_itens as $index => $criterio_item) : $count++; ?>
                        <div class="criterios-list-item <?php echo ($count === $total) ? 'criterios-list-item-destaque' : ''; ?> cursor-hover" data-modal="criterios" data-index="<?php echo $index; ?>">
                            <div class="criterios-list-item-content-header">
                                <div class="criterios-list-item-content-number">
                                    <?php echo $count; ?>
                                </div>
                                <div class="criterios-list-item-content-icon">
                                    <?php echo icon($criterio_item['criterio']['icone']); ?>
                                </div>  
                                <div class="criterios-list-item-content-text">
                                    <div class="criterios-list-item-content-title">
                                        <h3><?php echo $criterio_item['criterio']['nome']; ?></h3>
                                    </div>
                                    <?php if ($criterio_item['criterio']['descricao']) : ?>
                                    <div class="criterios-list-item-content-description">
                                        <?php echo $criterio_item['criterio']['descricao']; ?>
                                    </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="criterios-list-item-content-more">
                                <?php echo icon('maximize-3'); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>