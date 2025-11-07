<?php
/**
 * Protocolo Section - CPT Protocolo
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$protocolo = get_field('conheca');
$icone = get_field('icone');

if (empty($protocolo) || empty($protocolo['protocolos'])) {
    return;
}
?>

<section id="protocolo" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10 gap-10 protocolo-content">
            <div class="content-text max-w-[540px]">
                <h2><?php echo $protocolo['titulo']; ?></h2>
            </div>
            
            <div class="content-text">
               <p> <?php echo $protocolo['descricao']; ?></p>
            </div>
        </div>

        <div class="flex mb-6 protocolo-relation">
            <div class="content-text">
                <div class="relation">
                    <?php echo icon('hierarchy-3'); ?>
                    <?php echo $protocolo['relacao']; ?>
                </div>
            </div>
        </div>

        <div class="lg:hidden flex protocolo-tabs lg:max-w-full max-w-[620px] mx-auto" data-tabs-type="scroll">
            <div class="tabs">
                <div class="tabs-wrapper">
                    <div class="tabs-items">
                        <?php foreach ($protocolo['protocolos'] as $tab_index => $tab_item) :
                            $active_class = ($tab_index === 0) ? 'tab-button--active' : '';
                        ?>
                            <button class="tab-button <?php echo $active_class; ?>">
                                <span><?php echo $tab_item['nome_protocolo'];?></span>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid lg:grid-cols-3 grid-cols-1 gap-6 items-start protocolo-cards lg:max-w-full max-w-[620px] mx-auto">
            <?php foreach ($protocolo['protocolos'] as $index => $item) :
                $tag_class = ($index === 0) ? 'tag-1--primario-principal' : 'tag-1--primario-variacao-' . $index;
            ?>
                <div class="card-protocol-nivel" data-tab-index="<?php echo $index; ?>">
                    <div class="card-protocol-nivel-header">
                        <h3 class="sr-only"><?php echo $item['nome_protocolo']; ?></h3>
                        <div class="tag-1 <?php echo $tag_class; ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                            <span><?php echo $item['nome_protocolo']; ?><?php if (!empty($item['fonte'])) : ?><sup><?php echo $item['fonte']; ?></sup><?php endif; ?></span>
                        </div>
                    </div>
                    <div class="card-protocol-nivel-selo">
                        <img src="<?php echo $item['selo']['url']; ?>" alt="<?php echo $item['selo']['alt']; ?>">
                    </div>
                    <ul class="card-protocol-nivel-lista">
                        <?php foreach ($item['lista'] as $item_item) : ?>
                            <li>
                                <span class="card-protocol-nivel-lista-tag"><?php echo $item_item['tag']; ?></span>
                                <?php foreach ($item_item['textos'] as $texto_item) : ?>
                                    <span class="card-protocol-nivel-lista-texto"><?php echo $texto_item['texto']; ?><?php if (!empty($texto_item['fonte'])) : ?><sup><?php echo $texto_item['fonte']; ?></sup><?php endif; ?></span>
                                <?php endforeach; ?>
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

        <?php if (!empty($protocolo['fontes'])) : ?>
            <div class="flex mt-6">
                <ul class="list-fontes">
                    <?php $i = 0; foreach ($protocolo['fontes'] as $fonte) : $i++; ?>
                        <li>
                            <span class="number"><?php echo $i; ?></span>
                            <span class="text"><?php echo $fonte['texto']; ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <?php if ($protocolo['cta_option']) : ?>
            <div class="cta-2-fixed">
                <div class="container">
                    <div class="cta-2">
                        <div class="content-left">
                            <div class="content-icon content-icon--primario">
                                <?php echo icon($icone); ?>
                            </div>
                            <div class="content-text">
                                <h3 class="content-text-title">Baixe o protocolo completo</h3>
                                <p class="content-text-description">Tenha acesso a todos os detalhes técnicos, critérios de avaliação e diretrizes para implementação do protocolo.</p>
                            </div>
                        </div>
                        <div class="content-right">
                            <div class="content-button">
                                <button id="download-protocolo" class="btn btn-is-icon" data-modal="download-protocolo">
                                    <span class="text-nowrap">Baixar protocolo</span>
                                    <?php echo icon('document-download'); ?>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section>