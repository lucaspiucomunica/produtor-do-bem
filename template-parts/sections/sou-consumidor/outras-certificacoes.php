<?php
/**
 * Outras Certificações Section - Sou Varejista
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$outras_cert_titulo = get_field('outras_cert_titulo');
$outras_cert_certificacoes = get_field('outras_cert_certificacoes');

if (!$outras_cert_titulo) {
    return;
}
?>

<section id="outras-certificacoes" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex mb-10">
            <div class="content-text text-center">
                <h2><?php echo $outras_cert_titulo; ?></h2>
            </div>
        </div>

        <div class="flex lg:max-w-5xl max-w-full mx-auto items">
            <?php
            $total = count($outras_cert_certificacoes);
            $count = 0;
            foreach ($outras_cert_certificacoes as $post) :
                setup_postdata($post);
                $count++;
            ?>
                <a href="<?php echo get_the_permalink(); ?>" class="certificacao">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline">
                    <h3><?php echo get_the_title(); ?></h3>
                </a>
                <?php if ($count < $total) : ?>
                    <div class="conector-coluna flex-1 flex items-center justify-center">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/conexao-coluna.svg" class="svg-inline" alt="Conector">
                    </div>
                <?php endif; ?>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>

        <div class="flex mt-10 items-center justify-center">
            <div class="content-btn-icons">
                <div class="content-icons">
                    <div class="content-icon content-icon--large content-icon--primario">
                        <?php echo icon('pig'); ?>
                    </div>
                    <div class="content-icon content-icon--large content-icon--secundario">
                        <?php echo icon('chicken'); ?>
                    </div>
                    <div class="content-icon content-icon--large content-icon--terciario">
                        <?php echo icon('cow'); ?>
                    </div>
                </div>
                <a href="<?php echo home_url('/protocolos-e-selos'); ?>" class="btn">
                    Saiba mais sobre nossos selos
                </a>
            </div>
        </div>
    </div>
</section>