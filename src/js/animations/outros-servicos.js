import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    animateTitle,
    animateText,
    animateSlideX,
    animateCardsWithScale,
    animateScaleWithScrub,
    waitForTransition
} from './animations-utils.js';

function animateOutrosServicosHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelector('.hero-content .content-text');
    const sectionHeroBgImage = sectionHero.querySelector('.hero-bg-image img');

    const tlHero = gsap.timeline();

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
}

function initOutrosServicosAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateOutrosServicosHeroSection();
    });

    // Demais seções animam normalmente com scroll
}

document.addEventListener('DOMContentLoaded', () => {
    initOutrosServicosAnimations();
});
