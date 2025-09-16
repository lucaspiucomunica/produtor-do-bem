<?php
/**
 * Protocolo Section - CPT Protocolo
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$protocolo = get_field('conheca');

if (!$protocolo) {
    return;
}
?>

<section id="protocolo" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="content-text">
                <h2><?php echo $protocolo['titulo']; ?></h2>
            </div>
            
            <div class="content-text">
               <p> <?php echo $protocolo['descricao']; ?></p>
            </div>
        </div>

        <div class="flex mb-6">
            <div class="content-text">
                <p><?php echo $protocolo['relacao']; ?></p>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6 items-start">
            <?php foreach ($protocolo['protocolos'] as $index => $item) :
                $tag_class = ($index === 0) ? 'tag-1--primario-principal' : 'tag-1--primario-variacao-' . $index;
            ?>
                <div class="card-protocol-nivel">
                    <div class="card-protocol-nivel-header">
                        <h3 class="sr-only"><?php echo $item['nome_protocolo']; ?></h3>
                        <div class="tag-1 <?php echo $tag_class; ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                            <span><?php echo $item['nome_protocolo']; ?></span>
                        </div>
                    </div>
                    <div class="card-protocol-nivel-selo">
                        <img src="<?php echo $item['selo']['url']; ?>" alt="<?php echo $item['selo']['alt']; ?>">
                    </div>
                    <ul class="card-protocol-nivel-lista">
                        <?php foreach ($item['lista'] as $item_item) : ?>
                            <li>
                                <span class="card-protocol-nivel-lista-tag"><?php echo $item_item['tag']; ?></span>
                                <span class="card-protocol-nivel-lista-texto"><?php echo $item_item['texto']; ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <div class="card-protocol-nivel-atributos">
                        <?php $index_atributos = 0; foreach ($item['atributos'] as $item_item) : $index_atributos++; ?>
                            <div class="card-protocol-nivel-atributos-item card-protocol-nivel-atributos-item-<?php echo $index_atributos; ?>">
                                <?php echo icon('hierarchy-3'); ?>
                                <ul class="card-protocol-nivel-atributos-lista">
                                    <?php foreach ($item_item['lista'] as $item_item_item) : ?>
                                        <li>
                                            <span class="card-protocol-nivel-atributos-lista-texto"><?php echo $item_item_item['texto']; ?></span>
                                            <span class="card-protocol-nivel-atributos-lista-descricao"><?php echo $item_item_item['descricao']; ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>