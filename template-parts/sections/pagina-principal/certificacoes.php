<?php
/**
 * Certificações Section - Página Principal
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$certificacoes_titulo = get_field('certificacoes_titulo');
$certificacoes_texto = get_field('certificacoes_texto');
$certificacoes_botao = get_field('certificacoes_botao');
?>

<section id="certificacoes" class="p-section <?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            <div class="w-full">
                <div class="cta-certificacoes">
                    <div class="content-text titulo">
                        <h2><?php echo $certificacoes_titulo; ?></h2>
                    </div>

                    <div class="content-text texto">
                        <?php echo $certificacoes_texto; ?>
                    </div>

                    <div class="ilustracoes">
                        <div class="ilustracao ilustracao--1">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/ilustracao-certificacoes-campo.svg" alt="Ilustração Certificações Campo">
                        </div>
                        <div class="ilustracao ilustracao--2">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/ilustracao-certificacoes-mesa.svg" alt="Ilustração Certificações Mesa">
                        </div>
                    </div>

                    <?php if ($certificacoes_botao && !empty($certificacoes_botao['link'])): ?>
                        <div class="botao">
                            <a href="<?php echo esc_url($certificacoes_botao['link']); ?>" 
                               class="btn btn-secondary"
                               <?php echo $certificacoes_botao['blank'] ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
                                <?php echo esc_html($certificacoes_botao['texto']); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>