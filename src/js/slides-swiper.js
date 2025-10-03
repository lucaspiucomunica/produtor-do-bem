// O QUE FAZEMOS

document.addEventListener('DOMContentLoaded', function() {
    const swiperOqueFazemos = new Swiper('.swiper-o-que-fazemos', {
        speed: 400,
        spaceBetween: 40,
        slidesPerView: 3,
        navigation: {
            nextEl: '.swiper-carrossel-o-que-fazemos-navigation .navigation-carrossel .navigation-item--next',
            prevEl: '.swiper-carrossel-o-que-fazemos-navigation .navigation-carrossel .navigation-item--prev',
        },
    });
});

// O QUE SIGNIFICA

document.addEventListener('DOMContentLoaded', function() {
    const swiperOqueSignifica = new Swiper(".swiper-o-que-significa", {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 1.25,
        freeMode: {
            enabled: true,
            minimumVelocity: 0.01,
        },
        grabCursor: true,
        pagination: {
            el: ".carrossel-o-que-significa .progress-carrossel",
            type: "progressbar",
        },
        allowTouchMove: true, // Desabilita controle por toque/mouse inicialmente
        navigation: {
            nextEl: '.swiper-carrossel-o-que-significa-navigation .navigation-carrossel .navigation-item--next',
            prevEl: '.swiper-carrossel-o-que-significa-navigation .navigation-carrossel .navigation-item--prev',
        }
    });
});

// CARDS ROTATE

document.addEventListener('DOMContentLoaded', function() {
    const swiperCardsRotate = new Swiper('.swiper-cards-rotate', {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: 3,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-cards-rotate-navigation .navigation-carrossel .navigation-item--next',
            prevEl: '.swiper-cards-rotate-navigation .navigation-carrossel .navigation-item--prev',
        },
    });
});