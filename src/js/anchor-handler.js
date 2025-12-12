/**
 * Anchor Handler
 * Gerencia navegação por âncoras (hash) em URLs com ScrollSmoother
 *
 * Dois cenários:
 * 1. Página carregada com hash na URL: posiciona imediatamente
 * 2. Clique em âncora na mesma página: scroll suave com ScrollSmoother
 */

document.addEventListener('DOMContentLoaded', () => {
    // === PARTE 1: Scroll inicial para hash na URL (carregamento de página) ===
    const initialHash = window.location.hash;
    if (initialHash) {
        const targetId = initialHash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const initAnchorScroll = () => {
                if (!window.ScrollSmoother || !ScrollSmoother.get()) {
                    requestAnimationFrame(initAnchorScroll);
                    return;
                }

                const smoother = ScrollSmoother.get();

                // Posicionar imediatamente (sem animação smooth)
                smoother.scrollTo(targetElement, false);
            };

            requestAnimationFrame(initAnchorScroll);
        }
    }

    // === PARTE 2: Interceptar cliques em âncoras na mesma página ===
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        // Prevenir comportamento padrão do navegador
        e.preventDefault();

        // Usar ScrollSmoother para scroll suave
        const smoother = ScrollSmoother.get();
        if (smoother) {
            smoother.scrollTo(targetElement, true); // true = smooth scroll
        }

        // Atualizar URL sem recarregar página
        history.pushState(null, '', href);
    });
});
