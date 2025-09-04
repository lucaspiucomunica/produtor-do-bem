<?php
/**
 * Comitê Técnico Consultivo Section - Quem Somos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$ct_consultivo_titulo = get_field('ct_consultivo_titulo');
$ct_consultivo_descricao = get_field('ct_consultivo_descricao');
$ct_consultivo_equipe_pdb = get_field('ct_consultivo_equipe_pdb');
$ct_consultivo_equipe_pdb_titulo = 'Equipe Produtor do Bem';
?>

<section id="ct-consultivo" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="section-content">
            <div class="flex gap-10 px-10 mb-20">
                <div class="w-auto">
                    <div class="content-text content-text--light">
                        <h2 class="text-nowrap"><?php echo $ct_consultivo_titulo; ?></h2>
                    </div>
                </div>
                <div class="w-full">
                    <div class="content-text content-text--light">
                        <p><?php echo $ct_consultivo_descricao; ?></p>
                    </div>
                </div>
            </div>

            <div class="flex px-10 mb-10">
                <div class="w-full">
                    <div class="content-text content-text--light">
                        <h3><?php echo $ct_consultivo_equipe_pdb_titulo; ?></h3>
                    </div>
                </div>
            </div>

            <div class="flex px-10 mb-20">
                <div class="w-full">
                    <div class="grid grid-cols-7 gap-6">
                        <?php foreach ($ct_consultivo_equipe_pdb as $item) : ?>
                            <div class="w-full">
                                <div class="card-people">
                                    <div class="image">
                                        <img src="<?php echo $item['imagem']['url']; ?>" alt="<?php echo $item['imagem']['alt']; ?>">
                                    </div>
                                    <div class="text">
                                        <h4><?php echo $item['nome']; ?></h4>
                                        <p><?php echo $item['cargo']; ?></p>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <div class="flex px-3 pb-3">
                <div class="w-full">

                </div>
            </div>
        </div>
    </div>
</section>