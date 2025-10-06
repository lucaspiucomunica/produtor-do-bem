/**
 * Sistema de transição de página
 * Gerencia a animação de entrada/saída ao carregar páginas
 */

// Variável global para controlar status da transição
window.pageTransitionComplete = false;

// Evento customizado para sinalizar fim da transição
export const PAGE_TRANSITION_COMPLETE = 'pageTransitionComplete';

/**
 * Define cookie de visita (expira ao fechar o navegador)
 */
function setVisitedCookie() {
    document.cookie = 'pdb_has_visited=true; path=/; SameSite=Lax';
}

/**
 * Verifica se é primeira visita baseado no atributo data do PHP
 */
function isFirstVisit() {
    const wrapper = document.querySelector('.page-transition-wrapper');
    return wrapper?.dataset.firstVisit === 'true';
}

/**
 * Transição de primeira visita
 */
function firstVisitTransition() {
    const overlay = document.querySelector('.page-transition-first-visit');
    const pingo = overlay.querySelector('.transition-pingo');
    const iconsContainer = overlay.querySelector('.transition-icons');

    // Define cookie para marcar que já visitou
    setVisitedCookie();

    // Timeline principal
    const tl = gsap.timeline({
        onComplete: () => {
            // Remove overlay da DOM
            overlay.remove();

            // Revela as barras e posiciona fora da tela (acima) para transitionOut
            const bars = document.querySelectorAll('.page-transition-bar');
            if (bars.length > 0) {
                const barsContainer = document.querySelector('.page-transition-bars');
                gsap.set(barsContainer, { opacity: 1, visibility: 'visible' });
                gsap.set(bars, { yPercent: -100 });
            }

            // Remove classe ativa do body
            document.body.classList.remove('page-transition-active');

            // IMPORTANTE: Adiciona animations-ready APÓS transição terminar
            // Isso libera os elementos para serem animados
            document.body.classList.add('animations-ready');

            // Marca transição como completa e dispara evento
            window.pageTransitionComplete = true;
            document.dispatchEvent(new CustomEvent(PAGE_TRANSITION_COMPLETE));
        }
    });

    // Animar pingo entrando
    tl.to(pingo, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    });

    // Animar ícones alternando (similar ao hero da home)
    const icons = iconsContainer.querySelectorAll('.icon');
    if (icons.length > 0) {
        // Animar primeiro ícone aparecendo
        tl.to(icons[0], {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.2');

        // Timeline de rotação dos ícones
        const displayDuration = 0.4;
        const transitionDuration = 0.3;

        icons.forEach((icon, index) => {
            const nextIndex = (index + 1) % icons.length;
            const nextIcon = icons[nextIndex];

            tl.to(icon, {
                opacity: 0,
                scale: 0.8,
                duration: transitionDuration,
                ease: 'power2.inOut'
            }, `+=${displayDuration}`)
            .to(nextIcon, {
                opacity: 1,
                scale: 1,
                duration: transitionDuration,
                ease: 'power2.inOut'
            }, `-=${transitionDuration}`);
        });
    }

    // Animar saída do overlay
    tl.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
    }, '+=0.3');
}

/**
 * Transição de entrada (ao carregar página)
 * Barras sobem de baixo para cima revelando o conteúdo
 */
function transitionIn() {
    const bars = document.querySelectorAll('.page-transition-bar');

    if (bars.length === 0) return Promise.resolve();

    return new Promise((resolve) => {
        // Resetar posição inicial (barras cobrindo a tela de cima para baixo)
        gsap.set(bars, { yPercent: 0 });

        // Timeline de entrada (barras sobem revelando conteúdo de baixo para cima)
        const tl = gsap.timeline({
            onComplete: () => {
                // IMPORTANTE: Adiciona animations-ready APÓS barras terminarem
                // Agora elementos podem animar com GSAP
                document.body.classList.add('animations-ready');
                resolve();
            }
        });

        tl.to(bars, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power2.inOut',
            stagger: {
                each: 0.05,
                from: 'start'
            }
        });
    });
}

/**
 * Transição de saída (ao clicar em link)
 * Barras descem de cima para baixo cobrindo o conteúdo
 */
function transitionOut() {
    const bars = document.querySelectorAll('.page-transition-bar');

    if (bars.length === 0) return Promise.resolve();

    return new Promise((resolve) => {
        // Resetar posição inicial (barras fora da tela, acima)
        gsap.set(bars, { yPercent: -100 });

        // Adicionar classe ativa no body
        document.body.classList.add('page-transition-active');

        // Timeline de saída (barras descem de cima para baixo cobrindo conteúdo)
        const tl = gsap.timeline({
            onComplete: () => {
                resolve();
            }
        });

        tl.to(bars, {
            yPercent: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            stagger: {
                each: 0.05,
                from: 'start'
            }
        });
    });
}

/**
 * Inicializa a transição de página (entrada)
 */
function initPageTransition() {
    const transitionContainer = document.querySelector('.page-transition-wrapper');

    if (!transitionContainer) {
        // Se não houver transição, marca como completo imediatamente
        window.pageTransitionComplete = true;
        document.dispatchEvent(new CustomEvent(PAGE_TRANSITION_COMPLETE));
        return;
    }

    // Adicionar classe ativa no body
    document.body.classList.add('page-transition-active');

    // Verifica se é primeira visita (baseado no PHP)
    if (isFirstVisit()) {
        firstVisitTransition();
    } else {
        // Todas as outras situações usam transição de barras
        transitionIn().then(() => {
            document.body.classList.remove('page-transition-active');
            window.pageTransitionComplete = true;
            document.dispatchEvent(new CustomEvent(PAGE_TRANSITION_COMPLETE));
        });
    }
}

/**
 * Intercepta cliques em links para fazer transição de saída
 */
function setupLinkInterception() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        // Ignora se não for um link ou se for link especial
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Ignora links especiais
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('tel:') || 
            href.startsWith('mailto:') || 
            link.target === '_blank' ||
            link.hasAttribute('download') ||
            e.ctrlKey || 
            e.shiftKey || 
            e.metaKey) {
            return;
        }

        // Verifica se é link interno
        const currentDomain = window.location.hostname;
        let targetDomain;
        
        try {
            targetDomain = new URL(href, window.location.origin).hostname;
        } catch {
            return;
        }

        if (targetDomain !== currentDomain) return;

        // Previne navegação padrão
        e.preventDefault();

        // Executa transição de saída e navega
        transitionOut().then(() => {
            window.location.href = href;
        });
    });
}

/**
 * Aguarda a transição completar antes de executar callback
 */
export function waitForTransition(callback) {
    if (window.pageTransitionComplete) {
        callback();
    } else {
        document.addEventListener(PAGE_TRANSITION_COMPLETE, callback, { once: true });
    }
}

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initPageTransition();
    setupLinkInterception();
});
