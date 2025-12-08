import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    animateTitle,
    animateText,
    elementExists,
    createScrollTimeline,
    waitForTransition,
    initSectionAnimation,
    signalHeroComplete
} from './animations-utils.js';

function animateFAQHeroSection() {
    const sectionFAQ = document.querySelector('#hero');
    const sectionFAQTitle = sectionFAQ.querySelector('.content-text h1');
    const sectionFAQContentText = sectionFAQ.querySelectorAll('.content-text p');

    const tlHero = gsap.timeline({
        onComplete: signalHeroComplete
    });

    animateTitle(tlHero, sectionFAQTitle, CONFIG.offset.none);
    animateText(tlHero, sectionFAQContentText);
}

/**
 * Anima campo de busca e items do FAQ em uma única timeline
 */
function animateFaqSection() {
    const searchWrapper = document.querySelector('.faq-search-wrapper');
    const faqItems = document.querySelectorAll('.faq-item:not(.faq-item-hidden)');

    if (!elementExists(searchWrapper)) return;

    const timeline = createScrollTimeline(searchWrapper);

    timeline.from(searchWrapper, {
        opacity: 0,
        y: CONFIG.distance.small,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.none);

    if (faqItems.length > 0) {
        timeline.from(faqItems, {
            opacity: 0,
            y: CONFIG.distance.medium,
            duration: CONFIG.duration.normal,
            stagger: CONFIG.stagger.fast,
            ease: CONFIG.easing.default,
        }, CONFIG.offset.small);
    }
}

function initFAQAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateFAQHeroSection();
    });

    // Usa initSectionAnimation para aguardar Hero se visível na viewport inicial
    initSectionAnimation('.faq-search-wrapper', animateFaqSection);
}

document.addEventListener('DOMContentLoaded', () => {
    initFAQAnimations();
});
