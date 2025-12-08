import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    animateTitle,
    animateText,
    elementExists,
    createScrollTimeline,
    waitForTransition,
    signalHeroComplete,
    HERO_ANIMATION_COMPLETE
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

    // Restaura visibilidade dos itens (ocultados em initFaqSection)
    gsap.set(faqItems, { opacity: 1 });

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
        }, CONFIG.offset.tight);
    }
}

/**
 * Inicializa animação da seção FAQ com ocultação de elementos
 */
function initFaqSection() {
    const searchWrapper = document.querySelector('.faq-search-wrapper');
    const faqItems = document.querySelectorAll('.faq-item:not(.faq-item-hidden)');

    if (!searchWrapper) return;

    const threshold = 0.6;
    const rect = searchWrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * threshold;
    const isInInitialViewport = rect.top < triggerPoint;

    if (isInInitialViewport) {
        // Oculta ambos os elementos enquanto aguarda Hero
        gsap.set(searchWrapper, { opacity: 0 });
        gsap.set(faqItems, { opacity: 0 });

        document.addEventListener(HERO_ANIMATION_COMPLETE, () => {
            gsap.set(searchWrapper, { opacity: 1 });
            animateFaqSection();
        }, { once: true });
    } else {
        animateFaqSection();
    }
}

function initFAQAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateFAQHeroSection();
    });

    // Inicializa seção FAQ (oculta ambos search e items, aguarda Hero)
    initFaqSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initFAQAnimations();
});
