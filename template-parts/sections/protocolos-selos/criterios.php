<?php
/**
 * Critérios Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$criterios_titulo = get_field('criterios_titulo');
$criterio_conteudo = get_field('criterio_conteudo');
$criterio_itens = get_field('criterio_itens');

if (!$criterios_titulo) {
    return;
}
?>

<section id="criterios" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex items-end gap-10 mb-20">
            <div class="content-text max-w-[480px]">
                <h2><?php echo $criterios_titulo; ?></h2>
            </div>
            
            <div class="content-text">
                <?php echo $criterio_conteudo; ?>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="timeline-1 max-w-[876px]">
                <div class="timeline-1-line">
                    <div class="timeline-1-line-dots">
                        <?php $count = 0; foreach ($criterio_itens as $criterio_item) : $count++; ?>
                            <div class="timeline-1-line-dot <?php echo ($count <= 3) ? 'item-active' : ''; ?>"></div>
                        <?php endforeach; ?>
                    </div>
                    <div class="timeline-1-line-line">
                        <div class="timeline-1-line-line-progress"></div>
                    </div>
                </div>
                <div class="timeline-1-items">
                    <?php $count = 0; foreach ($criterio_itens as $criterio_item) : $count++; ?>
                        <div class="timeline-1-item <?php echo ($count <= 3) ? 'item-active' : ''; ?>">
                            <div class="timeline-1-item-count">
                                <div class="timeline-1-item-count-number">
                                    <?php echo $count; ?>
                                </div>
                                <div class="timeline-1-item-count-icon">
                                    <?php echo icon($criterio_item['icone']); ?>
                                </div>
                            </div>
                            <div class="timeline-1-item-content">
                                <div class="content-text">
                                    <h3><strong><?php echo $criterio_item['titulo']; ?></strong> <?php echo $criterio_item['texto']; ?></h3>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>