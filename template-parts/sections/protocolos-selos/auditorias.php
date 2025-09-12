<?php
/**
 * Auditorias Section - Protocolos e Selos
 * 
 * @package Produtor_do_Bem
 */

// Campos ACF
$auditorias_titulo = get_field('auditorias_titulo');
$auditorias_conteudo = get_field('auditorias_conteudo');
$auditorias_imagem = get_field('auditorias_imagem');

if (!$auditorias_titulo) {
    return;
}
?>

<section id="auditorias" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex">
            
        </div>
    </div>
</section>