import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    waitForTransition,
    initSectionAnimation,
    animateButton,
    signalHeroComplete
} from './animations-utils.js';

function animateSouProdutorHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelector('.hero-content .content-text');
    const sectionHeroButton = sectionHero.querySelector('.hero-content .content-button');
    const sectionHeroBgImage = sectionHero.querySelector('.hero-bg-image img');

    const tlHero = gsap.timeline({
        onComplete: signalHeroComplete
    });

    tlHero.from(sectionHeroBgImage, {
        opacity: 0,
        scale: CONFIG.transform.scale.large,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    });

    animateTitleLines(tlHero, sectionHeroTitle);
    animateTitleLines(tlHero, sectionHeroTitleDestaque, CONFIG.offset.tight);

    tlHero.from(sectionHeroContentText, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.medium
    }, CONFIG.offset.normal);

    animateButton(tlHero, sectionHeroButton, CONFIG.offset.normal);
}

function animateSouProdutorIntroSection() {
    const sectionIntro = document.querySelector('#introducao');
    const sectionIntroTitle = sectionIntro.querySelector('.content-text h2');

    const tlIntro = createScrollTimeline(sectionIntro);

    animateTitleLines(tlIntro, sectionIntroTitle, CONFIG.offset.none);
}

function initSouProdutorAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateSouProdutorHeroSection();
    });

    // Usa initSectionAnimation para aguardar Hero se visível na viewport inicial
    initSectionAnimation('#introducao', animateSouProdutorIntroSection);
}

document.addEventListener('DOMContentLoaded', () => {
    initSouProdutorAnimations();
});
