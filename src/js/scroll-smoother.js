document.addEventListener('DOMContentLoaded', function() {
    // Registra os plugins necessários do GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Configuração do ScrollSmoother
    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,   // Intensidade da suavização (0.1 a 2)
        effects: true, // Permite efeitos baseados em data attributes
        smoothTouch: 0.1, // Suavização em dispositivos touch (menor valor para melhor performance)
        normalizeScroll: false, // Normaliza o scroll entre diferentes navegadores
        ignoreMobileResize: true, // Ignora redimensionamento mobile para melhor performance
        preventDefault: true, // Previne o scroll padrão
        
        // Callbacks opcionais
        onUpdate: (self) => {
            // console.log('Scroll position:', self.scrollTop());
        },
        
        onStop: () => {
            // console.log('Scroll stopped');
        },
        
        onRefresh: () => {
            // console.log('ScrollSmoother refreshed');
        }
    });

    // Função para refresh do ScrollSmoother (útil quando conteúdo dinâmico é adicionado)
    window.refreshScrollSmoother = function() {
        if (smoother) {
            smoother.refresh();
        }
    };

    // Função para pausar/retomar o ScrollSmoother
    window.toggleScrollSmoother = function(enabled = true) {
        if (smoother) {
            if (enabled) {
                smoother.paused(false);
            } else {
                smoother.paused(true);
            }
        }
    };

    // Função para scroll suave para elemento específico
    window.scrollToElement = function(selector, position = 0) {
        if (smoother) {
            // Se position é string (ex: "top center"), usa diretamente
            if (typeof position === 'string') {
                smoother.scrollTo(selector, true, position);
            } else {
                // Se é número, trata como offset em pixels
                smoother.scrollTo(selector, true, `top ${position}px`);
            }
        }
    };

    // Auto-refresh em mudanças de viewport (útil para responsivo)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (smoother) {
                smoother.refresh();
            }
        }, 250);
    });

    // Refresh automático após carregamento de imagens
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (smoother) {
                smoother.refresh();
            }
        }, 100);
    });
});