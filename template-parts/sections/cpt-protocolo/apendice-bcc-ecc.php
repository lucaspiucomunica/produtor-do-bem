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
                    <div class="flex md:flex-row flex-col items-start gap-10 justify-between">
                        <div class="content-left">
                            <div class="content-text content-text--light">
                                <h2>Apêndice BCC/ECC</h2>
                            </div>
                        </div>

                        <div class="content-right">
                            <div class="content-text content-text--light mb-6">
                                <?php echo $protocolo['conteudo_apendice']; ?>
                            </div>

                            <div class="content-button">
                                <button id="download-apendice-bcc-ecc" class="btn btn-outline btn-secondary" data-modal="download-protocolo" data-modal-variant="apendice-bcc-ecc">
                                    <span class="text-nowrap">Saiba mais</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>