<?php
/**
 * Apêndice BCC/ECC Section - CPT Protocolo
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$protocolo = get_field('conheca');

if (!$protocolo) {
    return;
}
?>

<?php if($protocolo['apendice_bcc_ecc']) : ?>
    <section id="apendice" class="<?php echo get_class_section(); ?>">
        <div class="container">
            <div class="flex">
                <div class="<?php echo get_class_section(); ?>-content">
                    <div class="flex">
                        <div class="content-left">
                            <div class="content-text content-text--light">
                                <h2>Apêndice BCC/ECC</h2>
                            </div>
                        </div>

                        <div class="content-right">
                            <div class="content-text content-text--light mb-6">
                                <?php echo $protocolo['conteudo_apendice']; ?>
                            </div>

                            <?php if($protocolo['link_apendice']) : ?>
                                <a href="<?php echo $protocolo['link_apendice']['url']; ?>" class="btn btn-secondary btn-outline">
                                    <span><?php echo $protocolo['link_apendice']['title']; ?></span>
                                </a>
                            <?php endif; ?>
                        </div>s
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>