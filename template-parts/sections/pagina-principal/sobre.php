<?php
/**
 * Sobre Section - Página Principal
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$sobre_titulo = get_field('sobre_titulo');
$sobre_descricao = get_field('sobre_descricao');
$sobre_cards = get_field('sobre_cards');
$sobre_texto_engajamento = get_field('sobre_texto_engajamento');

$card_1_texto = $sobre_cards['card_1_texto'] ?? '';
$card_1_ilustracao = $sobre_cards['card_1_ilustracao'] ?? null;

$card_2_texto = $sobre_cards['card_2_texto'] ?? '';
$card_2_ilustracao = $sobre_cards['card_2_ilustracao'] ?? null;

$card_3_texto = $sobre_cards['card_3_texto'] ?? '';
$card_3_icone = $sobre_cards['card_3_icone'] ?? null;

$card_4_texto = $sobre_cards['card_4_texto'] ?? '';
$card_4_icone = $sobre_cards['card_4_icone'] ?? null;

$card_5_texto = $sobre_cards['card_5_texto'] ?? '';
$card_5_imagem = $sobre_cards['card_5_imagem'] ?? null;

$card_6_texto = $sobre_cards['card_6_texto'] ?? '';
$card_6_icones = $sobre_cards['card_6_icones'] ?? [];

$card_7_texto = $sobre_cards['card_7_texto'] ?? '';
$card_7_imagens = $sobre_cards['card_7_imagens'] ?? [];

if (!$sobre_titulo) {
    return;
}
?>

<section id="sobre" class="p-section-top <?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex justify-center mb-10">
            <div class="w-10/12">
                <div class="content-text text-center">
                    <h2><?php echo $sobre_titulo; ?></h2>
                    <p><?php echo $sobre_descricao; ?></p>
                </div>
            </div>
        </div>

        <div class="flex items-stretch gap-6 mb-6">
            <div class="w-full">
                <div class="card card-1">
                    <?php if ($card_1_texto || $card_1_ilustracao): ?>                  
                        <?php if ($card_1_texto): ?>
                            <div class="card-1-text">
                                <h3><?php echo wp_kses_post($card_1_texto); ?></h3>
                            </div>
                        <?php endif; ?>

                        <?php if ($card_1_ilustracao): ?>
                            <div class="card-1-illustration">
                                <img 
                                src="<?php echo esc_url($card_1_ilustracao['url']); ?>" 
                                alt="<?php echo esc_attr($card_1_ilustracao['alt'] ?: ''); ?>"
                                class="svg-inline" >
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>

            <div class="w-full max-w-[320px]">
                <div class="card card-2">
                    <?php if ($card_2_texto || $card_2_ilustracao): ?>                  
                        <?php if ($card_2_texto): ?>
                            <div class="card-2-text">
                                <h3><?php echo wp_kses_post($card_2_texto); ?></h3>
                            </div>
                        <?php endif; ?>

                        <?php if ($card_2_ilustracao): ?>
                            <div class="card-2-illustration">
                                <img 
                                src="<?php echo esc_url($card_2_ilustracao['url']); ?>" 
                                alt="<?php echo esc_attr($card_2_ilustracao['alt'] ?: ''); ?>"
                                class="svg-inline" >
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>

            <div class="w-full max-w-[320px]">
                <div class="cards-vertical">
                    <div class="card card-3">
                        <?php if ($card_3_texto || $card_3_icone): ?>                  
                            <?php if ($card_3_icone): ?>
                                <div class="card-3-icon">
                                    <div class="content-icon content-icon--primario">
                                        <?php echo icon($card_3_icone, 'fill-primario-principal'); ?>
                                    </div>
                                </div>
                            <?php endif; ?>

                            <?php if ($card_3_texto): ?>
                                <div class="card-3-text">
                                    <h3><?php echo wp_kses_post($card_3_texto); ?></h3>
                                </div>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>

                    <div class="card card-3">
                        <?php if ($card_4_texto || $card_4_icone): ?>                                              
                            <?php if ($card_4_icone): ?>
                                <div class="card-3-icon">
                                    <div class="content-icon content-icon--primario">
                                        <?php echo icon($card_4_icone, 'fill-primario-principal'); ?>
                                    </div>
                                </div>
                            <?php endif; ?>

                            <?php if ($card_4_texto): ?>
                                <div class="card-3-text">
                                    <h3><?php echo wp_kses_post($card_4_texto); ?></h3>
                                </div>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-stretch gap-6">
            <div class="w-1/3">
                <div class="card card-5">
                    <?php if ($card_5_texto || $card_5_imagem): ?>                  
                        <?php if ($card_5_texto): ?>
                            <div class="card-5-text">
                                <h3><?php echo wp_kses_post($card_5_texto); ?></h3>
                            </div>
                        <?php endif; ?>

                        <?php if ($card_5_imagem): ?>
                            <div class="card-5-image">
                                <img 
                                src="<?php echo esc_url($card_5_imagem['url']); ?>" 
                                alt="<?php echo esc_attr($card_5_imagem['alt'] ?: ''); ?>" >
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>

            <div class="w-1/3">
                <div class="card card-6">
                    <?php if ($card_6_texto || $card_6_icones): ?>                  
                        <?php if ($card_6_texto): ?>
                            <div class="card-6-text">
                                <h3><?php echo wp_kses_post($card_6_texto); ?></h3>
                            </div>
                        <?php endif; ?>

                        <?php if ($card_6_icones): ?>
                            <div class="card-6-icons">
                                <?php foreach ($card_6_icones as $item): ?>
                                    <?php if (!empty($item['icone'])): ?>
                                        <div class="card-6-icon">
                                            <?php echo icon($item['icone'], 'fill-primario-principal'); ?>
                                        </div>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>

            <div class="w-1/3">
                <div class="card card-7">
                    <?php if ($card_7_texto || $card_7_imagens): ?>                  
                        <?php if ($card_7_texto): ?>
                            <div class="card-7-text">
                                <h3><?php echo wp_kses_post($card_7_texto); ?></h3>
                            </div>
                        <?php endif; ?>

                        <?php if ($card_7_imagens): ?>
                            <div class="card-7-images flex flex-row gap-6">
                                <?php foreach ($card_7_imagens as $item): ?>
                                    <div class="card-7-image">
                                        <img 
                                        src="<?php echo esc_url($item['url']); ?>" 
                                        alt="<?php echo esc_attr($item['alt'] ?: ''); ?>" >
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>