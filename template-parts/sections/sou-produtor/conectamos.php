<?php
/**
 * Hero Section - Sou Produtor
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$conectamos_texto = get_field('conectamos_texto');
$conectamos_lista = get_field('conectamos_lista');

if (!$conectamos_texto) {
    return;
}
?>

<section id="conectamos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="box">
            <div class="flex mb-10">
                <div class="content-text">
                    <?php echo $conectamos_texto; ?>
                </div>
            </div>

            <div class="lg-plus:block hidden grid-conexoes grid-conexoes-desktop">
                <?php
                $count = count($conectamos_lista);
                $item_index = 0;

                while ($item_index < $count) : ?>
                    <div class="flex gap-0 mb-0">
                        <?php for ($col = 0; $col < 5; $col++) : ?>
                            <?php if ($col % 2 === 0) : ?>
                                <?php if ($item_index < $count) : ?>
                                    <div class="item">
                                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                                        <h3><?php echo $conectamos_lista[$item_index]['texto']; ?></h3>
                                    </div>
                                    <?php $item_index++; ?>
                                <?php endif; ?>
                            <?php else : ?>
                                <div class="conector-coluna flex-1 flex items-center justify-center">
                                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/conexao-coluna.svg" class="svg-inline" alt="Conector">
                                </div>
                            <?php endif; ?>
                        <?php endfor; ?>
                    </div>

                    <?php if ($item_index < $count) : ?>
                        <div class="grid grid-cols-3 mb-0">
                            <div class="conector-linha flex items-center justify-center">
                                <img src="<?php echo get_template_directory_uri(); ?>/src/img/conexao-linha.svg" class="svg-inline" alt="Conector">
                            </div>
                            <div class="conector-linha flex items-center justify-center">
                                <img src="<?php echo get_template_directory_uri(); ?>/src/img/conexao-linha.svg" class="svg-inline" alt="Conector">
                            </div>
                            <div class="conector-linha flex items-center justify-center">
                                <img src="<?php echo get_template_directory_uri(); ?>/src/img/conexao-linha.svg" class="svg-inline" alt="Conector">
                            </div>
                        </div>
                    <?php endif; ?>
                <?php endwhile; ?>
            </div>

            <div class="lg-plus:hidden flex flex-col grid-conexoes grid-conexoes-mobile">
                <?php foreach ($conectamos_lista as $index => $item) : ?>
                    <div class="item">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                        <h3><?php echo $item['texto']; ?></h3>
                    </div>
                    <?php if ($index < count($conectamos_lista) - 1) : ?>
                        <div class="conector-linha flex items-center justify-center">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/conexao-linha.svg" class="svg-inline" alt="Conector">
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>