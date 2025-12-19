/**
 * Animações Lottie para Modal de Critérios
 *
 * Gerencia instâncias de animações Lottie dentro do modal,
 * sincronizadas com a navegação de slides.
 */

class ModalCriteriosLottieManager {
    constructor() {
        this.modal = document.getElementById('modal-criterios');
        this.lottieInstances = new Map(); // Map<index, lottieInstance>
        this.currentSlide = null;

        if (!this.modal) {
            console.warn('[ModalCriteriosLottieManager] Modal de critérios não encontrado');
            return;
        }

        if (typeof lottie === 'undefined') {
            console.warn('[ModalCriteriosLottieManager] Biblioteca Lottie não carregada');
            return;
        }

        this.init();
    }

    init() {
        this.initializeLottieContainers();
        this.observeModalState();
    }

    /**
     * Detecta e inicializa todos os containers Lottie no modal
     */
    initializeLottieContainers() {
        const containers = this.modal.querySelectorAll('[data-lottie-path]');

        containers.forEach(container => {
            const path = container.dataset.lottiePath;
            const index = parseInt(container.dataset.lottieIndex);

            if (!path) {
                console.warn('[ModalCriteriosLottieManager] Container Lottie sem data-lottie-path:', container);
                return;
            }

            try {
                // Criar instância Lottie mas não iniciar ainda
                const instance = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: false, // controlamos manualmente
                    path: path
                });

                this.lottieInstances.set(index, instance);

                // Pausar imediatamente após carregar
                instance.addEventListener('DOMLoaded', () => {
                    instance.pause();
                });
            } catch (error) {
                console.error('[ModalCriteriosLottieManager] Erro ao carregar Lottie:', error, { path, index });
            }
        });

        console.log(`[ModalCriteriosLottieManager] Inicializadas ${this.lottieInstances.size} animações Lottie`);
    }

    /**
     * Observa mudanças de slide no modal
     */
    observeModalState() {
        // Observar mudanças de classe 'hidden' nos slides
        const slideObserver = new MutationObserver(() => {
            this.handleSlideChange();
        });

        const slides = this.modal.querySelectorAll('.slide-criterios-image');
        slides.forEach(slide => {
            slideObserver.observe(slide, {
                attributes: true,
                attributeFilter: ['class']
            });
        });

        // Observar abertura/fechamento do modal
        const modalObserver = new MutationObserver(() => {
            this.handleModalToggle();
        });

        modalObserver.observe(this.modal, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /**
     * Lida com mudança de slide
     */
    handleSlideChange() {
        const visibleSlide = this.modal.querySelector('.slide-criterios-image:not(.hidden)');
        if (!visibleSlide) return;

        const newIndex = parseInt(visibleSlide.dataset.index);

        // Pausar slide anterior (se for Lottie)
        if (this.currentSlide !== null && this.lottieInstances.has(this.currentSlide)) {
            const prevInstance = this.lottieInstances.get(this.currentSlide);
            prevInstance.pause();
        }

        // Iniciar slide atual (se for Lottie)
        if (this.lottieInstances.has(newIndex)) {
            const instance = this.lottieInstances.get(newIndex);
            instance.goToAndPlay(0, true); // reinicia do frame 0
        }

        this.currentSlide = newIndex;
    }

    /**
     * Lida com abertura/fechamento do modal
     */
    handleModalToggle() {
        const isHidden = this.modal.classList.contains('hidden');

        if (isHidden) {
            // Modal fechado - pausar todas as animações
            this.pauseAll();
            this.currentSlide = null;
        } else {
            // Modal aberto - iniciar animação do slide visível
            this.handleSlideChange();
        }
    }

    /**
     * Pausa todas as animações Lottie
     */
    pauseAll() {
        this.lottieInstances.forEach(instance => {
            instance.pause();
        });
    }

    /**
     * Destrói todas as instâncias (cleanup)
     */
    destroy() {
        this.lottieInstances.forEach(instance => {
            instance.destroy();
        });
        this.lottieInstances.clear();
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ModalCriteriosLottieManager();
});

export default ModalCriteriosLottieManager;
