<?php
/**
 * Protocolos Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$protocolos_titulo = get_field('protocolos_titulo');

if (!$protocolos_titulo) {
    return;
}
?>

<section id="protocolos" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="<?php echo get_class_section(); ?>-content">
            <div class="container">
                <div class="flex mb-10">
                    <div class="content-text text-center">
                        <h2><?php echo $protocolos_titulo; ?></h2>
                    </div>
                </div>

                <div class="grid xl-plus:grid-cols-10 grid-cols-12 gap-6">
                    <?php
                    $args = array(
                        'post_type' => 'protocolo',
                        'posts_per_page' => -1,
                        'post_status' => 'publish',
                    );
                    $protocolos_query = new WP_Query($args);
                    $col_spans = array(3, 2, 2, 3, 4, 2, 4, 3, 4, 3);
                    if ($protocolos_query->have_posts()) :
                        $index = 0;
                        while ($protocolos_query->have_posts()) : $protocolos_query->the_post();
                            $col_span = ($index < 10) ? $col_spans[$index] : 6;
                            ?>
                            <div class="card-protocolo-link-wrapper xl-plus:col-span-<?php echo $col_span; ?> lg:col-span-4 md:col-span-6 col-span-12">
                                <a href="<?php the_permalink(); ?>" class="card-protocolo-link">
                                    <h3 class="card-protocolo-link-title"><?php the_title(); ?></h3>
                                    <div class="protocolo-link-card-btn">
                                        <?php echo icon('arrow-right-01'); ?>
                                    </div>
                                </a>
                            </div>
                        <?php
                            $index++;
                        endwhile; ?>
                        <?php wp_reset_postdata(); ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>