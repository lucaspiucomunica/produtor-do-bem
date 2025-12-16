<?php
/**
 * Como Ser Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$como_ser_titulo = get_field('como_ser_titulo');
$como_ser_itens = get_field('como_ser_itens');
$como_ser_disclaimer = get_field('como_ser_disclaimer');

if (!$como_ser_titulo) {
    return;
}
?>

<section id="como-ser" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex pb-10">
            <div class="content-text content-text--light text-center">
                <h2><?php echo $como_ser_titulo; ?></h2>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="timeline-1 max-w-[876px]">
                <div class="timeline-1-line">
                    <div class="timeline-1-line-dots">
                        <?php foreach ($como_ser_itens as $como_ser_item) : ?>
                            <div class="timeline-1-line-dot"></div>
                        <?php endforeach; ?>
                    </div>
                    <div class="timeline-1-line-line">
                        <div class="timeline-1-line-line-progress" style="height: 0%"></div>
                    </div>
                </div>
                <div class="timeline-1-items">
                    <?php $count = 0; foreach ($como_ser_itens as $como_ser_item) : $count++; ?>
                        <div class="timeline-1-item">
                            <div class="timeline-1-item-count">
                                <div class="timeline-1-item-count-number">
                                    <?php echo $count; ?>
                                </div>
                                <div class="timeline-1-item-count-icon">
                                    <?php echo icon($como_ser_item['icone']); ?>
                                </div>
                            </div>
                            <div class="timeline-1-item-content">
                                <div class="content-text">
                                    <h3><?php echo $como_ser_item['texto']; ?></h3>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-10 mt-10">
            <div class="disclaimer max-w-[876px]">
                <?php echo icon('warning-2'); ?>
                <div class="content-text content-text--light content-text--small">
                    <p><?php echo $como_ser_disclaimer; ?></p>
                </div>
            </div>
            <a href="/fale-conosco" class="btn btn-secondary">
                <span>Seja um Produtor do Bem certificado</span>
            </a>
        </div>
    </div>
</section>