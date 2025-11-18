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

        // Inicializar slides (esconder todos)
        const slideTexts = this.modal.querySelectorAll('.slide-criterios-item');
        const slideImages = this.modal.querySelectorAll('.slide-criterios-image');

        slideTexts.forEach((slide, i) => {
            if (i !== index) {
                slide.classList.add('hidden');
                gsap.set(slide, { opacity: 1, x: 0, scale: 1, rotate: 0 });
            } else {
                slide.classList.remove('hidden');
                gsap.set(slide, { opacity: 1, x: 0, scale: 1, rotate: 0 });
            }
        });

        slideImages.forEach((img, i) => {
            if (i !== index) {
                img.classList.add('hidden');
                gsap.set(img, { opacity: 1, x: 0, scale: 1 });
            } else {
                img.classList.remove('hidden');
                gsap.set(img, { opacity: 1, x: 0, scale: 1 });
            }
        });

        this.currentSlide = index;
        this.updateNavigationButtons();
        this.checkScrollOnCurrentSlide();
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    goToSlide(index) {
        // Se já estamos no slide, não fazer nada
        if (this.currentSlide === index) {
            return;
        }

        const slideTexts = this.modal.querySelectorAll('.slide-criterios-item');
        const slideImages = this.modal.querySelectorAll('.slide-criterios-image');

        const direction = index > this.currentSlide ? 1 : -1;
        const currentText = slideTexts[this.currentSlide];
        const nextText = slideTexts[index];
        const currentImage = slideImages[this.currentSlide];
        const nextImage = slideImages[index];

        // Verificar se os elementos existem
        if (!currentText || !nextText || !currentImage || !nextImage) {
            return;
        }

        // Resetar scroll de todas as áreas de características
        const scrollableAreas = this.modal.querySelectorAll('.criterio-item-content-caracteristicas');
        scrollableAreas.forEach(area => {
            area.scrollTop = 0;
        });

        // Timeline GSAP
        const tl = gsap.timeline();

        // Animar saída do texto atual
        tl.to(currentText, {
            opacity: 0,
            x: -140 * direction,
            scale: 0.8,
            rotate: -10 * direction,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                currentText.classList.add('hidden');
            }
        });

        // Animar saída da imagem atual (em paralelo)
        tl.to(currentImage, {
            opacity: 0,
            duration: 0.3,
            scale: 1.2,
            ease: 'power2.in',
            onComplete: () => {
                currentImage.classList.add('hidden');
            }
        }, '<');

        // Preparar próximos elementos (remover hidden ANTES do set)
        tl.call(() => {
            nextText.classList.remove('hidden');
            nextImage.classList.remove('hidden');
        });

        // Configurar estado inicial do próximo texto
        tl.set(nextText, {
            opacity: 0,
            scale: 0.8,
            rotate: 10 * direction,
            x: 140 * direction
        });

        // Configurar estado inicial da próxima imagem
        tl.set(nextImage, {
            opacity: 0,
            scale: 1.2
        });

        // Animar entrada do próximo texto
        tl.to(nextText, {
            opacity: 1,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'power2.out'
        });

        // Animar entrada da próxima imagem (em paralelo com o texto)
        tl.to(nextImage, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        }, '<');

        this.currentSlide = index;
        this.updateNavigationButtons();

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
        this.btnsPrev?.forEach(btn => {
            const textElement = btn.querySelector('span');
            if (this.currentSlide === 0) {
                textElement.textContent = 'Sair';
            } else {
                textElement.textContent = 'Anterior';
            }
        });

        this.btnsNext?.forEach(btn => {
            const textElement = btn.querySelector('span');
            if (this.currentSlide === this.totalSlides - 1) {
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

    // GSAP
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalCriterios();
});
