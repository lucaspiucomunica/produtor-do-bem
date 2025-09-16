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

        <div class="grid grid-cols-3 gap-6">
            <?php foreach ($protocolo['protocolos'] as $item) : ?>
                <div>
                    <h3><?php echo $item['nome_protocolo']; ?></h3>
                    <img src="<?php echo $item['selo']['url']; ?>" alt="<?php echo $item['selo']['alt']; ?>">
                    <ul>
                        <?php foreach ($item['lista'] as $item_item) : ?>
                            <li>
                                <span><?php echo $item_item['tag']; ?></span>
                                <span><?php echo $item_item['texto']; ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <div>
                        <?php foreach ($item['atributos'] as $item_item) : ?>
                            <ul>
                                <?php foreach ($item_item['lista'] as $item_item_item) : ?>
                                    <li>
                                        <span><?php echo $item_item_item['texto']; ?></span>
                                        <span><?php echo $item_item_item['descricao']; ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>