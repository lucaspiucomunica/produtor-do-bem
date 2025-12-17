import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    animateTitle,
    waitForTransition,
    initSectionAnimation,
    animateText,
    animateButton,
    animateCards,
    signalHeroComplete,
    animateOnScroll,
    animateScaleWithScrub,
    animateScale,
    animateSlideY,
    applyHeroFinalState,
    hasUrlHash
} from './animations-utils.js';

function animateSouConsumidorHeroSection() {
    const sectionHero = document.querySelector('#hero');

    // Se há hash na URL, pular animação do hero
    if (hasUrlHash()) {
        applyHeroFinalState(sectionHero);
        signalHeroComplete();
        return;
    }

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

    if (elementExists(sectionHeroButton)) {
        animateButton(tlHero, sectionHeroButton, CONFIG.offset.normal);
    }
}

function animateSouConsumidorPdbSection() {
    const sectionPdb = document.querySelector('#produtor-do-bem');
    const sectionPdbTitle = sectionPdb.querySelector('.content-text h2');
    const sectionPdbItems = sectionPdb.querySelectorAll('.lista-itens-icones-imagens-item');

    const tlPdb = createScrollTimeline(sectionPdb, 'veryEarly');

    animateTitle(tlPdb, sectionPdbTitle, CONFIG.offset.none);

    sectionPdbItems.forEach(item => {
        animateOnScroll(item, item, 'item');
    });
}

function animateSouConsumidorSelosSection() {
    const sectionSelos = document.querySelector('#selos');
    const sectionSelosBox = sectionSelos.querySelector('#selos .box');
    const sectionSelosTitle = sectionSelos.querySelector('.content-text h2');
    const sectionSelosItems = sectionSelos.querySelectorAll('.selo');

    animateScaleWithScrub(sectionSelosBox, sectionSelos);

    const tlSelos = gsap.timeline({
        scrollTrigger: {
            trigger: sectionSelos,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    animateTitle(tlSelos, sectionSelosTitle, CONFIG.offset.none);
    animateCards(tlSelos, sectionSelosItems, CONFIG.offset.normal);
}

function animateSouConsumidorOutrasCertificacoesSection() {
    const sectionOutrasCertificacoes = document.querySelector('#outras-certificacoes');
    const sectionOutrasCertificacoesTitle = sectionOutrasCertificacoes.querySelector('.content-text h2');
    const sectionOutrasCertificacoesItems = sectionOutrasCertificacoes.querySelector('.items');
    const sectionOutrasCertificacoesButton = sectionOutrasCertificacoes.querySelector('.content-btn-icons');

    const tlOutrasCertificacoes = createScrollTimeline(sectionOutrasCertificacoes);

    animateTitle(tlOutrasCertificacoes, sectionOutrasCertificacoesTitle, CONFIG.offset.none);
    animateSlideY(tlOutrasCertificacoes, sectionOutrasCertificacoesItems, CONFIG.offset.normal);
    animateScale(tlOutrasCertificacoes, sectionOutrasCertificacoesButton, CONFIG.offset.normal);
}

function initSouConsumidorAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateSouConsumidorHeroSection();
    });

    // Usa initSectionAnimation para aguardar Hero se visível na viewport inicial
    initSectionAnimation('#produtor-do-bem', animateSouConsumidorPdbSection);
    initSectionAnimation('#selos', animateSouConsumidorSelosSection);
    initSectionAnimation('#outras-certificacoes', animateSouConsumidorOutrasCertificacoesSection);
}

document.addEventListener('DOMContentLoaded', () => {
    initSouConsumidorAnimations();
});
