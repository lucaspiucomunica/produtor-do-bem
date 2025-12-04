import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    animateTitle,
    animateText,
    elementExists,
    createScrollTimeline,
    waitForTransition
} from './animations-utils.js';

function animateFAQHeroSection() {
    const sectionFAQ = document.querySelector('#hero');
    const sectionFAQTitle = sectionFAQ.querySelector('.content-text h1');
    const sectionFAQContentText = sectionFAQ.querySelectorAll('.content-text p');

    const tlHero = gsap.timeline();

    animateTitle(tlHero, sectionFAQTitle, CONFIG.offset.none);
    animateText(tlHero, sectionFAQContentText);
}

/**
 * Anima campo de busca do FAQ
 */
function animateFaqSearch() {
    const searchWrapper = document.querySelector('.faq-search-wrapper');

    if (!elementExists(searchWrapper)) return;

    const timeline = createScrollTimeline(searchWrapper);

    timeline.from(searchWrapper, {
        opacity: 0,
        y: CONFIG.distance.small,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.none);
}

/**
 * Anima items do accordion (apenas os 8 primeiros visíveis)
 */
function animateFaqItems() {
    const faqItems = document.querySelectorAll('.faq-item:not(.faq-item-hidden)');

    if (!elementExists(faqItems) || faqItems.length === 0) return;

    const timeline = createScrollTimeline(faqItems[0]);

    timeline.from(faqItems, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        stagger: CONFIG.stagger.fast,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.none);
}

function initFAQAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateFAQHeroSection();
    });

    // Animar seção de busca e items do accordion
    animateFaqSearch();
    animateFaqItems();
}

document.addEventListener('DOMContentLoaded', () => {
    initFAQAnimations();
});
