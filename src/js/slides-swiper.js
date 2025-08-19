document.addEventListener('DOMContentLoaded', function() {
    const swiperOqueFazemos = new Swiper('.swiper-o-que-fazemos', {
        speed: 400,
        spaceBetween: 40,
        slidesPerView: 3,
        navigation: {
            nextEl: '.swiper-o-que-fazemos-wrapper .navigation-carrossel .navigation-item--next',
            prevEl: '.swiper-o-que-fazemos-wrapper .navigation-carrossel .navigation-item--prev',
        },
    });
});