class ModalCriterios {
    constructor() {
        this.modal = document.getElementById('modal-criterios');
        this.openButtons = document.querySelectorAll('[data-modal="criterios"]');
        this.closeButtons = this.modal?.querySelectorAll('.modal-close, .btn-close-modal');
        this.currentSlide = 0;
        this.btnsPrev = null;
        this.btnsNext = null;
        this.totalSlides = 0;
        this.scrollIndicators = null;

        if (!this.modal) return;

        this.init();
    }

    init() {
        this.btnsPrev = this.modal?.querySelectorAll('.btn-prev');
        this.btnsNext = this.modal?.querySelectorAll('.btn-next');
        this.totalSlides = this.modal?.querySelectorAll('.slide-criterios-item').length || 0;
        this.scrollIndicators = this.modal?.querySelectorAll('.scroll-indicator');
        this.setupEventListeners();
        this.setupScrollDetection();
    }

    setupEventListeners() {
        // Botões de abrir modal
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(button.dataset.index) || 0;
                this.openModal(index);
            });
        });

        // Botões de fechar modal
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Fechar ao clicar no overlay
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Fechar com ESC e navegação com setas
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('hidden')) {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            }
        });

        // Navegação - adicionar listeners em todos os botões
        this.btnsPrev?.forEach(btn => {
            btn.addEventListener('click', () => this.prevSlide());
        });

        this.btnsNext?.forEach(btn => {
            btn.addEventListener('click', () => this.nextSlide());
        });
    }

    openModal(index = 0) {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.goToSlide(index);
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    goToSlide(index) {
        const slideTexts = this.modal.querySelectorAll('.slide-criterios-item');
        const slideImages = this.modal.querySelectorAll('.slide-criterios-image');

        // Resetar scroll de todas as áreas de características
        const scrollableAreas = this.modal.querySelectorAll('.criterio-item-content-caracteristicas');
        scrollableAreas.forEach(area => {
            area.scrollTop = 0;
        });

        // Textos: toggle hidden (slide será feito depois)
        slideTexts.forEach((slide, i) => {
            slide.classList.toggle('hidden', i !== index);
        });

        // Imagens: toggle hidden (fade será adicionado no CSS)
        slideImages.forEach((img, i) => {
            img.classList.toggle('hidden', i !== index);
        });

        this.currentSlide = index;
        this.updateNavigationButtons();

        // Verificar indicador de scroll após trocar de slide
        setTimeout(() => {
            this.checkScrollOnCurrentSlide();
        }, 50);
    }

    nextSlide() {
        if (this.currentSlide === this.totalSlides - 1) {
            this.closeModal();
        } else {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide === 0) {
            this.closeModal();
        } else {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    updateNavigationButtons() {
        this.btnsPrev?.forEach((btn, index) => {
            const textElement = btn.querySelector('span');
            if (index === 0) {
                textElement.textContent = 'Sair';
            } else {
                textElement.textContent = 'Anterior';
            }
        });

        this.btnsNext?.forEach((btn, index) => {
            const textElement = btn.querySelector('span');
            if (index === this.totalSlides - 1) {
                textElement.textContent = 'Sair';
            } else {
                textElement.textContent = 'Próximo';
            }
        });
    }

    setupScrollDetection() {
        // Verificar scroll ao redimensionar a janela
        window.addEventListener('resize', () => {
            this.checkScrollOnCurrentSlide();
        });

        // Adicionar listeners de scroll em cada área de características
        const scrollableAreas = this.modal?.querySelectorAll('.criterio-item-content-caracteristicas');
        scrollableAreas?.forEach(area => {
            area.addEventListener('scroll', () => {
                const parentSlide = area.closest('.slide-criterios-item');
                const indicator = parentSlide?.querySelector('.scroll-indicator');

                if (indicator && area.scrollTop > 10) {
                    indicator.classList.remove('active');
                }
            });
        });
    }

    checkScrollOnCurrentSlide() {
        const currentSlideElement = this.modal.querySelector(`.slide-criterios-item:not(.hidden)`);
        if (!currentSlideElement) return;

        const scrollableContent = currentSlideElement.querySelector('.criterio-item-content-caracteristicas');
        const scrollIndicator = currentSlideElement.querySelector('.scroll-indicator');

        if (!scrollableContent || !scrollIndicator) return;

        // Verificar se o conteúdo tem scrollbar
        const hasScrollbar = scrollableContent.scrollHeight > scrollableContent.clientHeight;

        // Toggle classe active
        scrollIndicator.classList.toggle('active', hasScrollbar);
    }

    // AQUI TAMBÉM FICARÁ ANIMAÇÃO DO GSAP DE ENTRADAS E SAÍDAS
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalCriterios();
});
