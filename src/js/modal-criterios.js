class ModalCriterios {
    // Configurações de animação
    static ANIMATIONS = {
        duration: {
            out: 0.3,
            in: 0.4,
            elements: 0.6,
            stagger: 0.08
        },
        ease: {
            in: 'power2.in',
            out: 'power2.out',
            elastic: 'elastic.out(1, 0.5)'
        },
        transforms: {
            slideX: 140,
            slideScale: { min: 0.8, max: 1.2 },
            slideRotate: 10,
            elementScale: 0,
            elementY: 30,
            elementX: -30
        }
    };

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
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(button.dataset.index) || 0;
                this.openModal(index);
            });
        });

        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

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

        this.btnsPrev?.forEach(btn => {
            btn.addEventListener('click', () => this.prevSlide());
        });

        this.btnsNext?.forEach(btn => {
            btn.addEventListener('click', () => this.nextSlide());
        });
    }

    // Animação de saída do slide
    animateSlideOut(textElement, imageElement, direction) {
        const { duration, ease, transforms } = ModalCriterios.ANIMATIONS;
        const tl = gsap.timeline();

        tl.to(textElement, {
            opacity: 0,
            x: -transforms.slideX * direction,
            scale: transforms.slideScale.min,
            rotate: -transforms.slideRotate * direction,
            duration: duration.out,
            ease: ease.in,
            onComplete: () => {
                textElement.classList.add('hidden');
            }
        });

        tl.to(imageElement, {
            opacity: 0,
            duration: duration.out,
            scale: transforms.slideScale.max,
            ease: ease.in,
            onComplete: () => {
                imageElement.classList.add('hidden');
            }
        }, '<');

        return tl;
    }

    // Animação de entrada do slide
    animateSlideIn(textElement, imageElement, direction) {
        const { duration, ease, transforms } = ModalCriterios.ANIMATIONS;
        const tl = gsap.timeline();

        tl.call(() => {
            textElement.classList.remove('hidden');
            imageElement.classList.remove('hidden');
        });

        tl.set(textElement, {
            opacity: 0,
            scale: transforms.slideScale.min,
            rotate: transforms.slideRotate * direction,
            x: transforms.slideX * direction
        });

        tl.set(imageElement, {
            opacity: 0,
            scale: transforms.slideScale.max
        });

        tl.to(textElement, {
            opacity: 1,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: duration.in,
            ease: ease.out
        });

        tl.to(imageElement, {
            opacity: 1,
            scale: 1,
            duration: duration.in,
            ease: ease.out
        }, '<');

        return tl;
    }

    // Animação dos elementos internos do slide
    animateSlideElements(slideElement) {
        const { duration, ease, transforms } = ModalCriterios.ANIMATIONS;
        const tl = gsap.timeline();

        const number = slideElement.querySelector('.criterio-item-content-number');
        const icon = slideElement.querySelector('.criterio-item-content-icon');
        const title = slideElement.querySelector('.criterio-item-content-title');
        const description = slideElement.querySelector('.criterio-item-content-header-description');
        const tag = slideElement.querySelector('.tag-1');
        const caracteristicasHeader = slideElement.querySelector('.criterio-item-content-caracteristicas-header');
        const caracteristicasItems = slideElement.querySelectorAll('.criterio-item-content-caracteristicas-list-item');

        // Preparar elementos
        gsap.set([number, icon], {
            scale: transforms.elementScale,
            opacity: 0
        });

        if (description) {
            gsap.set(description, {
                opacity: 0
            });
        }

        gsap.set(tag, {
            opacity: 0,
            x: -transforms.elementX
        });

        gsap.set([caracteristicasHeader, ...caracteristicasItems], {
            opacity: 0,
            y: transforms.elementY
        });

        // Number: scale in
        if (number) {
            tl.to(number, {
                scale: 1,
                opacity: 1,
                duration: duration.elements,
                ease: ease.out
            }, 0.1);
        }

        // Icon: scale in
        if (icon) {
            tl.to(icon, {
                scale: 1,
                opacity: 1,
                duration: duration.elements,
                ease: ease.out
            }, 0.2);
        }

        // Title: split text chars
        if (title) {
            const split = new SplitText(title, { type: 'chars' });
            gsap.set(split.chars, { opacity: 0, y: 20 });

            tl.to(split.chars, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.03,
                ease: ease.out
            }, 0.3);
        }

        // Description: fade in
        if (description) {
            tl.to(description, {
                opacity: 1,
                duration: duration.elements,
                ease: ease.out
            }, 0.4);
        }

        // Tag: fade in right
        if (tag) {
            tl.to(tag, {
                opacity: 1,
                x: 0,
                duration: duration.elements,
                ease: ease.out
            }, 0.5);
        }

        // Características header: fade in up
        if (caracteristicasHeader) {
            tl.to(caracteristicasHeader, {
                opacity: 1,
                y: 0,
                duration: duration.elements,
                ease: ease.out
            }, 0.6);
        }

        // Características items: fade in up com stagger
        if (caracteristicasItems.length > 0) {
            tl.to(caracteristicasItems, {
                opacity: 1,
                y: 0,
                duration: duration.elements,
                stagger: ModalCriterios.ANIMATIONS.duration.stagger,
                ease: ease.out
            }, 0.7);
        }

        return tl;
    }

    openModal(index = 0) {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

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

        // Animar elementos internos após o modal abrir
        const currentSlideElement = slideTexts[index];
        if (currentSlideElement) {
            this.animateSlideElements(currentSlideElement);
        }
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    goToSlide(index) {
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

        if (!currentText || !nextText || !currentImage || !nextImage) {
            return;
        }

        const tl = gsap.timeline();

        // Animar saída
        tl.add(this.animateSlideOut(currentText, currentImage, direction));

        // Animar entrada
        tl.add(this.animateSlideIn(nextText, nextImage, direction));

        // Animar elementos internos
        tl.add(this.animateSlideElements(nextText), '-=0.2');

        this.currentSlide = index;
        this.updateNavigationButtons();

        setTimeout(() => {
            this.checkScrollOnCurrentSlide();
        }, 50);

        const scrollableAreas = this.modal.querySelectorAll('.criterio-item-content-caracteristicas');
        scrollableAreas.forEach(area => {
            area.scrollTop = 0;
        });
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
        window.addEventListener('resize', () => {
            this.checkScrollOnCurrentSlide();
        });

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

        const hasScrollbar = scrollableContent.scrollHeight > scrollableContent.clientHeight;
        scrollIndicator.classList.toggle('active', hasScrollbar);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalCriterios();
});
