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
                spaceBetween: 40,
                slidesPerView: 3,
                navigation: {
                    nextEl: '.swiper-carrossel-o-que-fazemos-navigation .navigation-carrossel .navigation-item--next',
                    prevEl: '.swiper-carrossel-o-que-fazemos-navigation .navigation-carrossel .navigation-item--prev',
                }
            }
        },
        oQueSignifica: {
            selector: '.swiper-o-que-significa',
            options: {
                spaceBetween: 32,
                slidesPerView: 1.25,
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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa imediatamente para calcular dimensões corretas
    SwiperSlides.init();
});