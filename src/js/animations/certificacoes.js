import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    animateTitle,
    animateText,
    animateButton,
    animateScaleWithScrub,
    animateOnScroll,
    waitForTransition,
    initSectionAnimation,
    signalHeroComplete
} from './animations-utils.js';

function animateCertificacoesHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelectorAll('.hero-content .content-text p');
    const sectionHeroButton = sectionHero.querySelector('.hero-content .content-button');
    const sectionHeroIlustracao1 = sectionHero.querySelector('.hero-ilustracoes .hero-ilustracao--1');
    const sectionHeroIlustracao2 = sectionHero.querySelector('.hero-ilustracoes .hero-ilustracao--2');

    const tlHero = gsap.timeline({
        onComplete: signalHeroComplete
    });

    animateTitleLines(tlHero, sectionHeroTitle, CONFIG.offset.none, CONFIG.duration.slow);
    animateTitleLines(tlHero, sectionHeroTitleDestaque, CONFIG.offset.tight);
    animateText(tlHero, sectionHeroContentText, CONFIG.offset.loose);
    animateButton(tlHero, sectionHeroButton, CONFIG.offset.loose);

    tlHero.from(sectionHeroIlustracao1, {
        opacity: 0,
        x: -CONFIG.distance.medium,
        y: CONFIG.distance.medium,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.loose);

    tlHero.from(sectionHeroIlustracao2, {
        opacity: 0,
        x: CONFIG.distance.medium,
        y: CONFIG.distance.medium,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.loose);
}

function animateCertificacoesMetodoSection() {
    const sectionMetodo = document.querySelector('#metodo');
    const sectionMetodoTitle = sectionMetodo.querySelector('.content-text h2');
    const sectionMetodoContent = sectionMetodo.querySelector('.content-text p');
    const sectionMetodoNavigation = sectionMetodo.querySelector('.navigation-carrossel');
    const sectionMetodoCards = sectionMetodo.querySelectorAll('.card-rotate');

    const tlMetodo = createScrollTimeline(sectionMetodo);

    animateTitleLines(tlMetodo, sectionMetodoTitle, CONFIG.offset.none);
    animateText(tlMetodo, sectionMetodoContent);

    tlMetodo.from(sectionMetodoNavigation, {
        opacity: 0,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);

    tlMetodo.from(sectionMetodoCards, {
        opacity: 0,
        rotate: CONFIG.transform.rotate.medium,
        x: 400,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.slow,
    }, CONFIG.offset.normal);
}

function animateCertificacoesNiveisSection() {
    const sectionNiveis = document.querySelector('#niveis');
    const sectionNiveisTitle = sectionNiveis.querySelector('.content-text h2');
    const sectionNiveisContent = sectionNiveis.querySelector('.content-text p');
    const sectionNiveisCards = sectionNiveis.querySelectorAll('.card-nivel-certificacao');

    const tlNiveis = createScrollTimeline(sectionNiveis);

    animateTitleLines(tlNiveis, sectionNiveisTitle, CONFIG.offset.none);
    animateText(tlNiveis, sectionNiveisContent);

    tlNiveis.from(sectionNiveisCards, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.slow,
    }, CONFIG.offset.normal);
}

function animateCertificacoesCertificacoesSection() {
    const sectionCertificacoes = document.querySelector('#certificacoes');
    const sectionCertificacoesTitle = sectionCertificacoes.querySelector('.content-text h2');
    const sectionCertificacoesContent = sectionCertificacoes.querySelector('.sections-certificacoes-certificacoes-content');

    animateScaleWithScrub(sectionCertificacoesContent, sectionCertificacoes);

    const tlCertificacoes = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCertificacoes,
            start: "top 50%",
            end: "bottom 20%",
        }
    });

    animateTitle(tlCertificacoes, sectionCertificacoesTitle, CONFIG.offset.none);

    const listBigLinkRows = sectionCertificacoes.querySelectorAll('.list-big-link-row');

    listBigLinkRows.forEach(row => {
        const listBigLinkRowTitle = row.querySelector('.list-big-link-row-header h3');
        const listBigLinkRowItems = row.querySelectorAll('.list-big-link-row ul li');

        listBigLinkRowItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.zIndex = 10;
            });
            item.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    item.style.zIndex = '';
                }, 300);
            });
        });

        const tlListBigLinkRow = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 90%",
                end: "bottom 20%",
            }
        });

        if (listBigLinkRowTitle) {
            animateTitle(tlListBigLinkRow, listBigLinkRowTitle, CONFIG.offset.none);
        }

        if (listBigLinkRowItems.length > 0) {
            tlListBigLinkRow.from(listBigLinkRowItems, {
                opacity: 0,
                y: CONFIG.distance.medium,
                duration: CONFIG.duration.normal,
                stagger: CONFIG.stagger.fast,
                ease: CONFIG.easing.default,
            }, "-=0.5");
        }
    });
}

function animateCertificacoesComoObterSection() {
    const sectionComoObter = document.querySelector('#como-obter');
    const sectionComoObterTitle = sectionComoObter.querySelector('.content-text h2');
    const sectionComoObterItems = sectionComoObter.querySelectorAll('.passo-a-passo-1-item');

    const tlComoObter = createScrollTimeline(sectionComoObter, 'veryEarly');

    animateTitle(tlComoObter, sectionComoObterTitle, CONFIG.offset.none);

    sectionComoObterItems.forEach(item => {
        animateOnScroll(item, item, 'item');
    });
}

function initCertificacoesAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateCertificacoesHeroSection();
    });

    // Usa initSectionAnimation para aguardar Hero se visível na viewport inicial
    initSectionAnimation('#metodo', animateCertificacoesMetodoSection);
    initSectionAnimation('#niveis', animateCertificacoesNiveisSection);
    initSectionAnimation('#certificacoes', animateCertificacoesCertificacoesSection);
    initSectionAnimation('#como-obter', animateCertificacoesComoObterSection);
}

document.addEventListener('DOMContentLoaded', () => {
    initCertificacoesAnimations();
});
