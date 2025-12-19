<?php
/**
 * Modal - Critérios
 *
 * @package Produtor_do_Bem
 */
?>

<div id="modal-criterios" class="modal-overlay hidden">
    <div class="modal-container modal-fullview">
        <button type="button" class="modal-close btn btn-icon btn-small" aria-label="Fechar modal">
            <?php echo icon('close-circle'); ?>
        </button>

        <div class="modal-content">
            <div class="slide-criterios">
                <div class="slide-criterios-texts">
                    <?php 
                    $count = 0;
                    $criterio_itens = get_field('criterios_itens');
                    if ($criterio_itens) :
                        foreach ($criterio_itens as $index => $criterio_item) :
                            $count++;
                    ?>
                        <div class="slide-criterios-item" data-index="<?php echo $index; ?>">
                            <div class="criterio-item">
                                <div class="criterio-item-content">
                                    <div class="criterio-item-content-header">
                                        <div class="criterio-item-content-header-content">
                                            <div class="criterio-item-content-header-content-icon">
                                                <div class="criterio-item-content-number">
                                                    <?php echo $count; ?>
                                                </div>
                                                <div class="criterio-item-content-icon">
                                                    <?php echo icon($criterio_item['criterio']['icone']); ?>
                                                </div>  
                                            </div>
                                            <div class="criterio-item-content-text">
                                                <div class="criterio-item-content-title">
                                                    <h2><?php echo $criterio_item['criterio']['nome']; ?></h2>
                                                </div>
                                                <div class="tag-1 tag-1--primario-principal tag-1-small">
                                                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                                                    <span>Domínio <?php echo $count; ?> de <?php echo count($criterio_itens); ?></span>
                                                </div>
                                            </div>
                                        </div>

                                        <?php if ($criterio_item['criterio']['descricao']) : ?>
                                        <div class="criterio-item-content-header-description">
                                            <?php echo icon('star'); ?>
                                            <?php echo $criterio_item['criterio']['descricao']; ?>
                                        </div>
                                        <?php endif; ?>
                                    </div>

                                    <div class="criterio-item-content-caracteristicas">
                                        <div class="criterio-item-content-caracteristicas-header">
                                            <h3>Características:</h3>
                                        </div>
                                        <div class="criterio-item-content-caracteristicas-list">
                                            <div class="criterio-item-content-caracteristicas-list-item criterio-item-content-caracteristicas-list-item-positivo">
                                                <div class="criterio-item-content-caracteristicas-list-item-content">
                                                    <h4>Positivas:</h4>
                                                    <ul>
                                                        <?php if ($criterio_item['criterio']['positivas']) : ?>
                                                            <?php foreach ($criterio_item['criterio']['positivas'] as $positiva) : ?>
                                                                <li>
                                                                    <?php echo icon('tick-circle'); ?>
                                                                    <span><?php echo $positiva['item']; ?></span>
                                                                </li>
                                                            <?php endforeach; ?>
                                                        <?php endif; ?>
                                                    </ul>
                                                </div>
                                                <?php if ($criterio_item['criterio']['resultado_positivo']) : ?>
                                                <div class="criterio-item-content-caracteristicas-list-item-content-result">
                                                    <div class="criterio-item-content-caracteristicas-list-item-content-result-title">
                                                        <?php echo icon('happy');?>
                                                        <h5><?php echo $criterio_item['criterio']['resultado_positivo']['titulo']; ?></h5>
                                                    </div>
                                                    <?php if ($criterio_item['criterio']['resultado_positivo']['texto']) : ?>
                                                        <div class="criterio-item-content-caracteristicas-list-item-content-result-text">
                                                            <p><?php echo $criterio_item['criterio']['resultado_positivo']['texto']; ?></p>
                                                        </div>
                                                    <?php endif; ?>
                                                </div>
                                                <?php endif; ?>
                                            </div>

                                            <div class="criterio-item-content-caracteristicas-list-item criterio-item-content-caracteristicas-list-item-negativo">
                                                <div class="criterio-item-content-caracteristicas-list-item-content">
                                                    <h4>Negativas:</h4>
                                                    <ul>
                                                    <?php if ($criterio_item['criterio']['negativas']) : ?>
                                                            <?php foreach ($criterio_item['criterio']['negativas'] as $negativa) : ?>
                                                                <li>
                                                                    <?php echo icon('close-circle'); ?>
                                                                    <span><?php echo $negativa['item']; ?></span>
                                                                </li>
                                                            <?php endforeach; ?>
                                                        <?php endif; ?>
                                                    </ul>
                                                </div>
                                                <?php if ($criterio_item['criterio']['resultado_negativo']) : ?>
                                                <div class="criterio-item-content-caracteristicas-list-item-content-result">
                                                    <div class="criterio-item-content-caracteristicas-list-item-content-result-title">
                                                        <?php echo icon('emoji-sad');?>
                                                        <h5><?php echo $criterio_item['criterio']['resultado_negativo']['titulo']; ?></h5>
                                                    </div>
                                                    <?php if ($criterio_item['criterio']['resultado_negativo']['texto']) : ?>
                                                        <div class="criterio-item-content-caracteristicas-list-item-content-result-text">
                                                            <p><?php echo $criterio_item['criterio']['resultado_negativo']['texto']; ?></p>
                                                        </div>
                                                    <?php endif; ?>
                                                </div>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="criterio-item-navigation modal-navigation">
                                        <div class="scroll-indicator">
                                            <?php echo icon('arrow-down-02'); ?>
                                            <span>Role para ver mais</span>
                                        </div>

                                        <button type="button" class="btn btn-outline btn-secondary btn-small btn-nav btn-prev" aria-label="Critério anterior">
                                            <?php echo icon('arrow-left-01'); ?>
                                            <span>Anterior</span>
                                        </button>

                                        <button type="button" class="btn btn-secondary btn-small btn-nav btn-next" aria-label="Próximo critério">
                                            <span>Próximo</span>
                                            <?php echo icon('arrow-right-01'); ?>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php 
                        endforeach;
                    endif;
                    ?>
                </div>

                <div class="slide-criterios-images">
                    <?php
                    $criterio_itens = get_field('criterios_itens');
                    if ($criterio_itens) :
                        foreach ($criterio_itens as $index => $criterio_item) :
                            $tipo = $criterio_item['criterio']['imagem_ou_lottie'] ?? 'imagem';
                    ?>
                        <div class="slide-criterios-image" data-index="<?php echo $index; ?>">
                            <?php if ($tipo === 'lottie') : ?>
                                <div class="lottie-container"
                                     data-lottie-path="<?php echo $criterio_item['criterio']['lottie']['url']; ?>"
                                     data-lottie-index="<?php echo $index; ?>">
                                </div>
                            <?php else : ?>
                                <img src="<?php echo $criterio_item['criterio']['imagem']['url']; ?>" alt="<?php echo $criterio_item['criterio']['imagem']['alt']; ?>">
                            <?php endif; ?>
                        </div>
                    <?php
                        endforeach;
                    endif;
                    ?>
                </div>
            </div>

            
        </div>
    </div>
</div>