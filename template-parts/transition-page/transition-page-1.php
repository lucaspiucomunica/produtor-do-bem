<?php
/**
 * Transition 1 - Transição de página
 *
 * @package Produtor_do_Bem
 */

// Verifica se é primeira visita (cookie não existe) E se está na home
$has_visited = isset($_COOKIE['pdb_has_visited']);
$is_home = is_front_page() || is_home();
$is_first_visit = !$has_visited && $is_home;
?>

<div class="page-transition-wrapper" data-first-visit="<?php echo $is_first_visit ? 'true' : 'false'; ?>" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; pointer-events: none;">
    <?php if ($is_first_visit) : ?>
        <!-- Transição de Primeira Visita -->
        <div class="page-transition-first-visit active" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0A431F; display: flex; align-items: center; justify-content: center; opacity: 1; visibility: visible; pointer-events: auto; z-index: 2;">
            <div class="transition-pingo" style="position: relative; display: flex; align-items: center; justify-content: center; width: 200px; height: 200px; transform: scale(0); opacity: 0; will-change: transform, opacity;">
                <img src="<?php echo get_template_directory_uri(); ?>/src/img/forma-pingo.svg" alt="Produtor do Bem" style="width: 100%; height: auto;">
            </div>
            <div class="transition-icons" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; width: 80px; height: 80px;">
                <div class="icon" style="position: absolute; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; opacity: 0; transform: scale(0.8); will-change: transform, opacity;">
                    <?php echo icon('cow'); ?>
                </div>
                <div class="icon" style="position: absolute; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; opacity: 0; transform: scale(0.8); will-change: transform, opacity;">
                    <?php echo icon('chicken'); ?>
                </div>
                <div class="icon" style="position: absolute; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; opacity: 0; transform: scale(0.8); will-change: transform, opacity;">
                    <?php echo icon('pig'); ?>
                </div>
                <div class="icon" style="position: absolute; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; opacity: 0; transform: scale(0.8); will-change: transform, opacity;">
                    <?php echo icon('egg'); ?>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <!-- Transições Subsequentes - Barras Coloridas (sempre presentes) -->
    <div class="page-transition-bars" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: row; pointer-events: none; z-index: 1; <?php echo $is_first_visit ? 'opacity: 0; visibility: hidden;' : ''; ?>">
        <div class="page-transition-bar bar-1" style="flex: 1; height: 100%; transform: translateY(0); will-change: transform;"></div>
        <div class="page-transition-bar bar-2" style="flex: 1; height: 100%; transform: translateY(0); will-change: transform;"></div>
        <div class="page-transition-bar bar-3" style="flex: 1; height: 100%; transform: translateY(0); will-change: transform;"></div>
        <div class="page-transition-bar bar-4" style="flex: 1; height: 100%; transform: translateY(0); will-change: transform;"></div>
    </div>
</div>
