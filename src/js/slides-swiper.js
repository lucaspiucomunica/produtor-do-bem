document.addEventListener('DOMContentLoaded', function() {
    const swiperOqueFazemos = new Swiper('.swiper-o-que-fazemos', {
        speed: 400,
        spaceBetween: 40,
        slidesPerView: 3,
        navigation: {
            nextEl: '.carrossel-o-que-fazemos .navigation-carrossel .navigation-item--next',
            prevEl: '.carrossel-o-que-fazemos .navigation-carrossel .navigation-item--prev',
        },
    });

    const swiperOqueSignifica = new Swiper(".swiper-o-que-significa", {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 1.25,
        pagination: {
            el: ".carrossel-o-que-significa .progress-carrossel",
            type: "progressbar",
        },
    });
});