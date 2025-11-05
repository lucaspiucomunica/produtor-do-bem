const SwiperSlides = {
    defaultConfig: {
        speed: 400,
        grabCursor: true,
        observer: true,
        observeParents: true
    },

    configs: {
        oQueFazemos: {
            selector: '.swiper-o-que-fazemos',
            options: {
                spaceBetween: 16,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-carrossel-o-que-fazemos-navigation .navigation-carrossel .navigation-item--next',
                    prevEl: '.swiper-carrossel-o-que-fazemos-navigation .navigation-carrossel .navigation-item--prev',
                },
                breakpoints: {
                    1024: {
                        spaceBetween: 40,
                        slidesPerView: 3,
                    },
                    768: {
                        spaceBetween: 32,
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    340: {
                        spaceBetween: 24,
                        slidesPerView: 1,
                    }
                }
            }
        },
        oQueSignifica: {
            selector: '.swiper-o-que-significa',
            options: {
                spaceBetween: 16,
                slidesPerView: 1,
                freeMode: {
                    enabled: true,
                    minimumVelocity: 0.01,
                },
                pagination: {
                    el: '.carrossel-o-que-significa .progress-carrossel',
                    type: 'progressbar',
                },
                allowTouchMove: true,
                navigation: {
                    nextEl: '.swiper-carrossel-o-que-significa-navigation .navigation-carrossel .navigation-item--next',
                    prevEl: '.swiper-carrossel-o-que-significa-navigation .navigation-carrossel .navigation-item--prev',
                },
                breakpoints: {
                    1024: {
                        spaceBetween: 40,
                        slidesPerView: 1.25,
                    },
                    768: {
                        spaceBetween: 32,
                        slidesPerView: 1.25,
                    },
                    640: {
                        spaceBetween: 24,
                        slidesPerView: 1.25,
                    },
                    480: {
                        spaceBetween: 24,
                        slidesPerView: 1.15,
                    },
                    340: {
                        spaceBetween: 24,
                        slidesPerView: 1,
                    }
                }
            }
        },
        cardsRotate: {
            selector: '.swiper-cards-rotate',
            options: {
                spaceBetween: 0,
                slidesPerView: 3,
                navigation: {
                    nextEl: '.swiper-cards-rotate-navigation .navigation-carrossel .navigation-item--next',
                    prevEl: '.swiper-cards-rotate-navigation .navigation-carrossel .navigation-item--prev',
                }
            }
        }
    },

    init() {
        Object.values(this.configs).forEach(config => {
            const element = document.querySelector(config.selector);
            if (element) {
                new Swiper(config.selector, {
                    ...this.defaultConfig,
                    ...config.options
                });
            }
        });

        // Inicializa reorganização do layout para mobile
        this.handleOQueSignificaLayout();
    },

    handleOQueSignificaLayout() {
        const navigationEl = document.querySelector('.carrossel-o-que-significa .swiper-carrossel-o-que-significa-navigation');
        const progressbarEl = document.querySelector('.carrossel-o-que-significa .swiper-pagination-progressbar');
        const targetContainer = document.querySelector('.sections-quem-somos-o-que-fazemos .carrossel-o-que-significa .right');
        const swiperEl = document.querySelector('.sections-quem-somos-o-que-fazemos .carrossel-o-que-significa .swiper-o-que-significa');

        if (!navigationEl || !progressbarEl || !targetContainer || !swiperEl) return;

        const isMobile = window.innerWidth < 1024;
        let groupWrapper = document.querySelector('.group-swiper-navigation-progressbar');

        if (isMobile) {
            // Agrupa elementos no mobile
            if (!groupWrapper) {
                groupWrapper = document.createElement('div');
                groupWrapper.className = 'group-swiper-navigation-progressbar';

                // Salva as posições originais como data attributes
                navigationEl.dataset.originalParent = navigationEl.parentElement.className;
                progressbarEl.dataset.originalParent = progressbarEl.parentElement.className;

                // Agrupa os elementos
                groupWrapper.appendChild(navigationEl);
                groupWrapper.appendChild(progressbarEl);

                // Insere depois do swiper
                swiperEl.insertAdjacentElement('afterend', groupWrapper);
            }
        } else {
            // Retorna elementos para posição original no desktop
            if (groupWrapper) {
                const originalNavParent = document.querySelector(`.${navigationEl.dataset.originalParent}`);
                const originalProgressParent = document.querySelector(`.${progressbarEl.dataset.originalParent}`);

                if (originalNavParent) originalNavParent.appendChild(navigationEl);
                if (originalProgressParent) originalProgressParent.appendChild(progressbarEl);

                groupWrapper.remove();
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa imediatamente para calcular dimensões corretas
    SwiperSlides.init();

    // Listener para reorganizar layout no resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            SwiperSlides.handleOQueSignificaLayout();
        }, 150);
    });
});