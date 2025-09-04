<?php
/**
 * @package Produtor_do_Bem
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> class="overflow-x-hidden">
    <?php wp_body_open(); ?>
    <div id="smooth-wrapper">
        <div id="smooth-content">
            <div class="site">
        <?php 
        // Pega o parâmetro passado para get_header()
        $header_type = get_query_var('header_type', '1');
        
        // Define qual template part usar baseado no tipo
        $header_template = 'template-parts/globals/content-header-' . $header_type;
        
        get_template_part($header_template); 
        ?>
            