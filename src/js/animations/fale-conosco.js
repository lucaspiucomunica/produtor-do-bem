import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import { animateTitle, animateText, animateScale, waitForTransition } from './animations-utils.js';

function animateFaleConoscoHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.content-text h1');
    const sectionHeroContentText = sectionHero.querySelectorAll('.content-text p');
    const sectionForm = document.querySelector('#form');

    const tlHero = gsap.timeline();

    animateTitle(tlHero, sectionHeroTitle, CONFIG.offset.none);
    animateText(tlHero, sectionHeroContentText);
    animateScale(tlHero, sectionForm);
}

function initFaleConoscoAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateFaleConoscoHeroSection();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFaleConoscoAnimations();
});
