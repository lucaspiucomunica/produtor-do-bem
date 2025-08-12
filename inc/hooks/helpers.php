<?php

/**
 * Helper function para chamar headers específicos
 * 
 * @param string $type Tipo do header '1', '2' | (default, alternativo)
 * 
 */

function pdb_get_header($type = 'default') {
    set_query_var('header_type', $type);
    get_header();
}