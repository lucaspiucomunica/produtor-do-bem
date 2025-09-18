<?php

/**
 * Funções principais do tema Produtor do Bem
 *
 * Este arquivo carrega todos os componentes necessários para o funcionamento do tema.
 */

// Configurações básicas do tema
require_once('inc/core/setup.php');

// Gerenciamento de assets (CSS, JS, bibliotecas)
require_once('inc/core/assets.php');

// Sistema de gerenciamento de ícones SVG
require_once('inc/core/icons.php');

// Seletor de ícones no painel administrativo
require_once('inc/core/admin-icon-selector.php');

// Hooks e filtros personalizados
require_once('inc/hooks/filters.php');

// Helpers
require_once('inc/hooks/helpers.php');

// AJAX handlers
require_once('inc/ajax/contact-form-handler.php');