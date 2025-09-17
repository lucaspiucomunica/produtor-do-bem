<?php
/**
 * Certificações Section - Certificações
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$como_obter_titulo = get_field('como_obter_titulo');
$como_obter_passo_a_passo = get_field('como_obter_passo_a_passo');

if (!$como_obter_titulo) {
    return;
}
?>

<section id="como-obter" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="content-text">
                <h2><?php echo $como_obter_titulo; ?></h2>
            </div>
        </div>

        <div class="flex">
            <div class="passo-a-passo-1">
                <?php $count = 0; foreach ($como_obter_passo_a_passo as $passo) : $count++; ?>
                    <div class="passo-a-passo-1-item">
                        <div class="passo-a-passo-1-item-count">
                            <div class="number">
                                <?php echo $count; ?>
                            </div>
                            <?php if($passo['icone_ou_imagem'] == 'icone') : ?>
                                <div class="icon">
                                    <?php echo icon($passo['icone']); ?>
                                </div>
                            <?php else : ?>
                                <div class="image">
                                    <img src="<?php echo $passo['imagem']['url']; ?>" alt="<?php echo $passo['imagem']['alt']; ?>">
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="passo-a-passo-1-item-content">
                            <div class="content-text">
                                <?php echo $passo['conteudo']; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>