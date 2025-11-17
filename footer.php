<?php
/**
 * @package Produtor_do_Bem
 */

?>
                    
                <?php get_template_part('template-parts/globals/content-footer'); ?>
            </div>
        </div>
    </div>

    <?php get_template_part('template-parts/modals/modal-denuncia'); ?>
    
    <?php if (is_singular('protocolo')) : ?>
        <?php get_template_part('template-parts/modals/modal-download-protocolo'); ?>
    <?php endif; ?>
    
    <?php if (is_page_template('page-protocolos-selos.php')) : ?>
        <?php get_template_part('template-parts/modals/modal-criterios'); ?>
    <?php endif; ?>

    <?php wp_footer(); ?>

    </body>
</html> 