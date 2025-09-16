<?php
/**
 * Certificações Section - Certificações
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$certificacoes_titulo = get_field('certificacoes_titulo');
$certificacoes_bem_estar_animal = get_field('certificacoes_bem_estar_animal');
$certificacoes_outras = get_field('certificacoes_outras');

if (!$certificacoes_titulo) {
    return;
}
?>

<section id="certificacoes" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="<?php echo get_class_section(); ?>-content">
                <header class="px-10">
                    <div class="content-text content-text--light">
                        <h2><?php echo $certificacoes_titulo; ?></h2>
                    </div>
                </header>

                <div class="list-big-link-row">
                    <div class="list-big-link-row-header">
                        <h3>Certificações de bem-estar animal</h3>
                    </div>
                    <ul>
                        <?php foreach ($certificacoes_bem_estar_animal as $certificacao) : ?>
                            <li>
                                <a href="<?php echo $certificacao['destino']; ?>">
                                    <h4><?php echo $certificacao['titulo']; ?></h4>
                                    <p><?php echo $certificacao['descricao']; ?></p>
                                    <div class="list-big-link-row-image">
                                        <?php if ($certificacao['escolha_imagem'] === 'foto') : ?>
                                            <div class="foto">
                                                <img src="<?php echo $certificacao['foto']['url']; ?>" alt="<?php echo $certificacao['foto']['alt']; ?>">
                                            </div>
                                        <?php elseif ($certificacao['escolha_imagem'] === 'imagem') : ?>
                                            <div class="produto">
                                                <img src="<?php echo $certificacao['produto']['url']; ?>" alt="<?php echo $certificacao['produto']['alt']; ?>">
                                                <div class="forma-pingo"></div>
                                            </div>
                                        <?php endif; ?>
                                    </div>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div class="list-big-link-row">
                    <div class="list-big-link-row-header">
                        <h3>Outras certificações</h3>
                    </div>
                    <ul>
                        <?php foreach ($certificacoes_outras as $certificacao) : ?>
                            <li>
                                <a href="<?php echo $certificacao['destino']; ?>">
                                    <h4><?php echo $certificacao['titulo']; ?></h4>
                                    <p><?php echo $certificacao['descricao']; ?></p>
                                    <div class="list-big-link-row-image">
                                        <?php if ($certificacao['escolha_imagem'] === 'foto') : ?>
                                            <div class="foto">
                                                <img src="<?php echo $certificacao['foto']['url']; ?>" alt="<?php echo $certificacao['foto']['alt']; ?>">
                                            </div>
                                        <?php elseif ($certificacao['escolha_imagem'] === 'imagem') : ?>
                                            <div class="produto">
                                                <img src="<?php echo $certificacao['produto']['url']; ?>" alt="<?php echo $certificacao['produto']['alt']; ?>">
                                                <div class="forma-pingo"></div>
                                            </div>
                                        <?php endif; ?>
                                    </div>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>