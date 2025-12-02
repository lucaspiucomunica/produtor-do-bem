<?php
/**
 * Serviços Section - Outros Serviços
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$servicos = get_field('servicos');

if (!$servicos) {
    return;
}
?>

<section id="servicos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <?php 
        $total = count($servicos);
        $index = 0;
        foreach ($servicos as $servico) : 
            $index++;
            $is_last = ($index === $total);
            $padding_class = $is_last ? 'p-section-top p-section-bottom' : 'p-section-top';
            $flex_direction = ($index % 2 === 0) ? 'flex-row-reverse' : 'flex-row';
        ?>
            <div class="flex <?php echo $flex_direction; ?> max-w-6xl mx-auto gap-20 items-center <?php echo $padding_class; ?>">
                <div class="w-1/2">
                    <div class="content-text">
                        <?php echo $servico['conteudo']; ?>
                    </div>
                    <?php if ($servico['cta']) : ?>
                        <div class="content-btn">
                            <a href="<?php echo $servico['cta']['url']; ?>" class="btn btn-secondary mt-8">
                                <span><?php echo $servico['cta']['title']; ?></span>
                            </a>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="w-1/2">
                    <div class="content-group-image-icon-floating">
                        <div class="content-image content-image--square content-image--rounded-8xl">
                            <img src="<?php echo $servico['imagem']['url']; ?>" alt="<?php echo $servico['imagem']['alt']; ?>">
                        </div>
                        <div class="content-icon content-icon--primario content-icon--bigger">
                            <?php echo icon($servico['icone']); ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>