<?php
/**
 * Google Tag Manager - Carrega apenas em produção
 */

if (!defined('ABSPATH')) exit;

// Só carrega GTM se WP_DEBUG estiver desativado
if (defined('WP_DEBUG') && WP_DEBUG === true) {
    return;
}

define('GTM_CONTAINER_ID', 'GTM-NBFJDMN8'); // Substituir pelo seu ID

// Script no <head>
function pdb_gtm_head() {
    ?>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','<?php echo GTM_CONTAINER_ID; ?>');</script>
    <!-- End Google Tag Manager -->
    <?php
}
add_action('wp_head', 'pdb_gtm_head', 1);

// Noscript após <body>
function pdb_gtm_body() {
    ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo GTM_CONTAINER_ID; ?>"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php
}
add_action('wp_body_open', 'pdb_gtm_body', 1);

