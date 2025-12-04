<?php
/**
 * FAQ Section - FAQ
 *
 * @package Produtor_do_Bem
 */

$faq_items = get_field('faq');

if (!$faq_items || empty($faq_items)) {
    return;
}
?>

<section id="faq" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <!-- Search Field -->
        <div class="faq-search-wrapper">
            <div class="faq-search">
                <span class="faq-search-icon">
                    <?php echo icon('search-normal'); ?>
                </span>
                <input
                    type="text"
                    id="faq-search-input"
                    class="faq-search-input"
                    placeholder="Digite sua dúvida"
                    aria-label="Buscar perguntas frequentes"
                />
            </div>
        </div>

        <!-- Accordion Container -->
        <div class="faq-accordion" id="faq-accordion">
            <?php foreach ($faq_items as $index => $item) :
                $item_id = 'faq-item-' . ($index + 1);
                $is_initially_visible = ($index < 8);
                $search_text = strtolower($item['pergunta'] . ' ' . wp_strip_all_tags($item['resposta']));
            ?>
                <div
                    class="faq-item <?php echo !$is_initially_visible ? 'faq-item-hidden' : ''; ?>"
                    data-faq-index="<?php echo $index; ?>"
                    data-search-text="<?php echo esc_attr($search_text); ?>"
                >
                    <button
                        class="faq-item-header"
                        aria-expanded="false"
                        aria-controls="<?php echo $item_id; ?>"
                        data-faq-toggle
                    >
                        <h3 class="faq-item-title">
                            <?php echo esc_html($item['pergunta']); ?>
                        </h3>
                        <span class="faq-item-icon" aria-hidden="true">
                            <?php echo icon('arrow-circle-down'); ?>
                        </span>
                    </button>

                    <div
                        id="<?php echo $item_id; ?>"
                        class="faq-item-content"
                        role="region"
                        aria-hidden="true"
                    >
                        <div class="faq-item-body">
                            <div class="content-text">
                                <?php echo $item['resposta']; ?>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Empty State (hidden by default) -->
        <div class="faq-empty-state" id="faq-empty-state" style="display: none;">
            <p class="faq-empty-message">Nenhuma pergunta encontrada. Tente outro termo de busca.</p>
        </div>

        <!-- "Ver Mais" Footer with Gradient -->
        <?php if (count($faq_items) > 8) : ?>
            <div class="faq-footer" id="faq-footer">
                <button class="btn" id="faq-load-more">
                    Ver mais
                </button>
            </div>
        <?php endif; ?>
    </div>
</section>
