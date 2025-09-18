<?php
/**
 * Transition 1 - Transição de página
 * 
 * @package Produtor_do_Bem
 */
?>

<div class="transition-1">
    <div class="transition-1-inner-1"></div>
    <div class="transition-1-inner-2"></div>
    <div class="transition-1-inner-3"></div>
    <div class="transition-1-inner-4"></div>
</div>

<style>
    .transition-1 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        background-color: #FFFFFF;
    }
</style>