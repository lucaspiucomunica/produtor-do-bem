import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import { animateTitle, animateText, waitForTransition } from './animations-utils.js';

function animateFAQHeroSection() {
    const sectionFAQ = document.querySelector('#hero');
    const sectionFAQTitle = sectionFAQ.querySelector('.content-text h1');
    const sectionFAQContentText = sectionFAQ.querySelectorAll('.content-text p');

    const tlHero = gsap.timeline();

    animateTitle(tlHero, sectionFAQTitle, CONFIG.offset.none);
    animateText(tlHero, sectionFAQContentText);
}

function initFAQAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateFAQHeroSection();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFAQAnimations();
});
