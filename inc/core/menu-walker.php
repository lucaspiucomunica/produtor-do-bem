<?php

/**
 * Custom Walker para personalização do menu principal
 *
 * Adiciona botão com ícone para itens que possuem submenu.
 */

class Produtor_Do_Bem_Menu_Walker extends Walker_Nav_Menu {

    /**
     * Inicia a lista antes do primeiro elemento
     */
    public function start_lvl( &$output, $depth = 0, $args = null ) {
        $indent = str_repeat( "\t", $depth );
        $output .= "\n$indent<div class=\"sub-menu-wrapper\"><ul class=\"sub-menu\">\n";
    }

    /**
     * Termina a lista após o último elemento
     */
    public function end_lvl( &$output, $depth = 0, $args = null ) {
        $indent = str_repeat( "\t", $depth );
        $output .= "$indent</ul></div>\n";
    }

    /**
     * Inicia o elemento da lista
     */
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $args = (object) $args;

        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        // Verifica se tem submenu
        $has_children = in_array( 'menu-item-has-children', $classes );

        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names .'>';

        $attributes = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
        $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
        $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

        $item_output = isset( $args->before ) ? $args->before : '';
        $item_output .= '<a' . $attributes . '>';

        // Verifica se é item de menu do tipo protocolo e busca o ícone ACF
        $protocolo_icon = '';
        if ( $item->object === 'protocolo' && $item->type === 'post_type' && $item->object_id ) {
            $protocolo_icon = get_field( 'icone', $item->object_id );
        }

        // Adiciona ícone do protocolo se existir
        if ( $protocolo_icon ) {
            $item_output .= '<span class="menu-item-icon">' . icon( $protocolo_icon, 'protocolo-icon' ) . '</span>';
        }

        $item_output .= '<span class="menu-item-text">';
        $item_output .= ( isset( $args->link_before ) ? $args->link_before : '' ) . apply_filters( 'the_title', $item->title, $item->ID ) . ( isset( $args->link_after ) ? $args->link_after : '' );
        $item_output .= '</span>';
        $item_output .= '</a>';

        // Adiciona botão com ícone se tem submenu
        if ( $has_children ) {
            $item_output .= '<button class="submenu-toggle" type="button" aria-expanded="false" aria-label="Expandir submenu">';
            $item_output .= icon('arrow-down-02', 'submenu-icon');
            $item_output .= '</button>';
        }

        $item_output .= isset( $args->after ) ? $args->after : '';

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }

    /**
     * Termina o elemento da lista
     */
    public function end_el( &$output, $item, $depth = 0, $args = null ) {
        $output .= "</li>\n";
    }
}

/**
 * Custom Walker para menu mobile - Apenas Páginas
 *
 * Filtra e exibe apenas páginas normais (exclui protocolos)
 */
class Produtor_Do_Bem_Menu_Walker_Pages extends Produtor_Do_Bem_Menu_Walker {

    /**
     * Filtra os itens do menu para exibir apenas páginas (não protocolos)
     */
    public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        // Ignora itens do tipo protocolo
        if ( $element->object === 'protocolo' && $element->type === 'post_type' ) {
            return;
        }

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }
}

/**
 * Custom Walker para menu mobile - Apenas Protocolos
 *
 * Filtra e exibe apenas protocolos com seus ícones ACF
 */
class Produtor_Do_Bem_Menu_Walker_Protocolos extends Produtor_Do_Bem_Menu_Walker {

    /**
     * Filtra os itens do menu para exibir apenas protocolos
     */
    public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        // Exibe apenas itens do tipo protocolo
        if ( $element->object !== 'protocolo' || $element->type !== 'post_type' ) {
            return;
        }

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }
}