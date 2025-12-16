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

function animateSouVarejistaHeroSection() {
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

function animateSouVarejistaIntroSection() {
    const sectionIntro = document.querySelector('#introducao');
    const sectionIntroTitle = sectionIntro.querySelector('.content-text h2');
    const sectionIntroCards = sectionIntro.querySelectorAll('.card');

    const tlIntro = createScrollTimeline(sectionIntro);

    animateTitleLines(tlIntro, sectionIntroTitle, CONFIG.offset.none);
    animateCards(tlIntro, sectionIntroCards, CONFIG.offset.normal);
}

function animateSouVarejistaPdbSection() {
    const sectionPdb = document.querySelector('#produtor-do-bem');
    const sectionPdbTitle = sectionPdb.querySelector('.content-text h2');
    const sectionPdbItems = sectionPdb.querySelectorAll('.lista-itens-icones-imagens-item');

    const tlPdb = createScrollTimeline(sectionPdb, 'veryEarly');

    animateTitle(tlPdb, sectionPdbTitle, CONFIG.offset.none);

    sectionPdbItems.forEach(item => {
        animateOnScroll(item, item, 'item');
    });
}

function animateSouVarejistaSelosSection() {
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

function animateSouVarejistaOutrasCertificacoesSection() {
    const sectionOutrasCertificacoes = document.querySelector('#outras-certificacoes');
    const sectionOutrasCertificacoesTitle = sectionOutrasCertificacoes.querySelector('.content-text h2');
    const sectionOutrasCertificacoesItems = sectionOutrasCertificacoes.querySelector('.items');
    const sectionOutrasCertificacoesButton = sectionOutrasCertificacoes.querySelector('.content-btn-icons');

    const tlOutrasCertificacoes = createScrollTimeline(sectionOutrasCertificacoes);

    animateTitle(tlOutrasCertificacoes, sectionOutrasCertificacoesTitle, CONFIG.offset.none);
    animateSlideY(tlOutrasCertificacoes, sectionOutrasCertificacoesItems, CONFIG.offset.normal);
    animateScale(tlOutrasCertificacoes, sectionOutrasCertificacoesButton, CONFIG.offset.normal);
}

function animateSouVarejistaComoTerSection() {
    const sectionComoTer = document.querySelector('#como-ter');
    const sectionComoTerBox = sectionComoTer.querySelector('.box');
    const sectionComoTerContentTitle = sectionComoTer.querySelector('.content-text h2');
    const sectionComoTerContentText = sectionComoTer.querySelectorAll('.content-text p');

    animateScaleWithScrub(sectionComoTerBox, sectionComoTer);

    const tlComoTer = gsap.timeline({
        scrollTrigger: {
            trigger: sectionComoTer,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    animateTitle(tlComoTer, sectionComoTerContentTitle, CONFIG.offset.none);
    animateText(tlComoTer, sectionComoTerContentText, CONFIG.offset.normal);
}

function initSouVarejistaAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateSouVarejistaHeroSection();
    });

    // Usa initSectionAnimation para aguardar Hero se visível na viewport inicial
    initSectionAnimation('#introducao', animateSouVarejistaIntroSection);
    initSectionAnimation('#produtor-do-bem', animateSouVarejistaPdbSection);
    initSectionAnimation('#selos', animateSouVarejistaSelosSection);
    initSectionAnimation('#outras-certificacoes', animateSouVarejistaOutrasCertificacoesSection);
    initSectionAnimation('#como-ter', animateSouVarejistaComoTerSection);
}

document.addEventListener('DOMContentLoaded', () => {
    initSouVarejistaAnimations();
});
