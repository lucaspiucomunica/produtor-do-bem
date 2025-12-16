<?php
/**
 * Produtor do Bem Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$pdb_titulo = get_field('pdb_titulo');
$pdb_lista = get_field('pdb_lista');

if (!$pdb_titulo) {
    return;
}
?>

<section id="produtor-do-bem" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="content-text">
                <h2><?php echo $pdb_titulo; ?></h2>
            </div>
        </div>

        <div class="flex">
            <div class="lista-itens-icones-imagens">
                <?php $count = 0; foreach ($pdb_lista as $item) : $count++; ?>
                    <div class="lista-itens-icones-imagens-item">
                        <div class="lista-itens-icones-imagens-item-count">
                            <?php if($item['icone_ou_imagem'] == 'icone') : ?>
                                <div class="icon">
                                    <?php echo icon($item['icone']); ?>
                                </div>
                            <?php else : ?>
                                <div class="image">
                                    <img src="<?php echo $item['imagem']['url']; ?>" alt="<?php echo $item['imagem']['alt']; ?>">
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="lista-itens-icones-imagens-item-content">
                            <div class="content-text">
                                <?php echo $item['conteudo']; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>