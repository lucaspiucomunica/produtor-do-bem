<?php
/**
 * CTA Section - Global
 *
 * @package Produtor_do_Bem
 */

$style = $args['style'] ?? '';
$style_class = $style ? 'cta-1--' . $style : '';
?>

<section id="cta" class="<?php echo get_class_section(); ?> cta-1 <?php echo $style_class; ?>">
    <div class="container">
        <div class="flex justify-center">
            <div class="content-cta">
                <div class="content-text">
                    <h2><span class="title">Quero a</span> <span class="destaque">certificação</span></h2>
                </div>
                <div class="content-button">
                    <a href="<?php echo home_url('/fale-conosco'); ?>" class="btn-cta">
                        <?php echo icon('arrow-right-01', 'btn-cta-icon'); ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" class="svg-inline btn-cta-base">
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>