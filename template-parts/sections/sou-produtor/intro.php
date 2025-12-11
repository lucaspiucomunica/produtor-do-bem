<?php
/**
 * Hero Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$intro_titulo = get_field('intro_titulo');
$intro_cards = get_field('intro_cards'); // ACF Group
$card1_icone = $intro_cards['card1_icone']; // ACF Text
$card1_texto = $intro_cards['card1_texto']; // ACF Editor WYSIWYG
$card1_fonte = $intro_cards['card1_fonte']; // ACF Text
$card2_icone = $intro_cards['card2_icone']; // ACF Text
$card2_texto = $intro_cards['card2_texto']; // ACF Editor WYSIWYG
$card2_fonte = $intro_cards['card2_fonte']; // ACF Text
$card3_icones = $intro_cards['card3_icone']; // ACF Repeater
$card3_imagem = $intro_cards['card3_imagem']; // ACF Image
$card3_texto = $intro_cards['card3_texto']; // ACF Editor WYSIWYG
$card3_fonte = $intro_cards['card3_fonte']; // ACF Text

if (!$intro_titulo) {
    return;
}
?>

<section id="introducao" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="content-text text-center">
                <h2><?php echo $intro_titulo; ?></h2>
            </div>
        </div>

        <div class="grid grid-cols-7 gap-6">
            <div class="col-span-2">
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">
                            <div class="content-icon content-icon--primario content-icon--large">
                                <?php echo icon($card1_icone); ?>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <?php echo $card1_texto; ?>
                        </div>
                        <?php if ($card1_fonte) : ?>
                            <div class="card-fonte">
                                <p>Fonte: <?php echo $card1_fonte; ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <div class="col-span-2">
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">
                            <div class="content-icon content-icon--primario content-icon--large">
                                <?php echo icon($card2_icone); ?>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <?php echo $card2_texto; ?>
                        </div>
                        <?php if ($card2_fonte) : ?>
                            <div class="card-fonte">
                                <p>Fonte: <?php echo $card2_fonte; ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <div class="col-span-3">
                <div class="card card-destaque">
                    <div class="card-header">
                        <div class="card-icon">
                            <?php 
                            // Primeiro ícone (order: 0)
                            if (!empty($card3_icones[0])) : 
                                $card3_icone = $card3_icones[0]['icone'];
                            ?>
                                <div class="content-icon content-icon--primario content-icon--large">
                                    <?php echo icon($card3_icone); ?>
                                </div>
                            <?php endif; ?>
                            
                            <!-- Imagem (order: 1) -->
                            <div class="card-image">
                                <img src="<?php echo $card3_imagem['url'];?>" alt="<?php echo $card3_imagem['alt'];?>">
                            </div>
                            
                            <?php 
                            // Demais ícones (order: 2+)
                            if (count($card3_icones) > 1) :
                                for ($i = 1; $i < count($card3_icones); $i++) :
                                    $card3_icone = $card3_icones[$i]['icone'];
                            ?>
                                <div class="content-icon content-icon--primario content-icon--large">
                                    <?php echo icon($card3_icone); ?>
                                </div>
                            <?php 
                                endfor;
                            endif; 
                            ?>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <?php echo $card3_texto; ?>
                        </div>
                        <?php if ($card3_fonte) : ?>
                            <div class="card-fonte">
                                <p>Fonte: <?php echo $card3_fonte; ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>