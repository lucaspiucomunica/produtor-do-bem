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

function animateProtocolosSelosHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroTitleContentIcon = sectionHero.querySelector('.hero-content .titulo .content-icon');
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
    animateSlideX(tlHero, sectionHeroTitleContentIcon);

    tlHero.from(sectionHeroContentText, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.medium
    }, CONFIG.offset.normal);
}

function animateProtocolosSelosCriteriosSection() {
    const sectionCriterios = document.querySelector('#criterios');
    const sectionCriteriosTitle = sectionCriterios.querySelector('.content-text h2');
    const sectionCriteriosDescription = sectionCriterios.querySelector('.content-text p');
    const sectionCriteriosTimeline = sectionCriterios.querySelector('.timeline-1');
    const sectionCriteriosTimelineLineProgress = sectionCriterios.querySelector('.timeline-1-line-line-progress');
    const sectionCriteriosTimelineDots = sectionCriterios.querySelectorAll('.timeline-1-line-dot');
    const sectionCriteriosTimelineItems = sectionCriterios.querySelectorAll('.timeline-1-item');

    const tlCriterios = createScrollTimeline(sectionCriterios);

    animateTitle(tlCriterios, sectionCriteriosTitle, CONFIG.offset.none);
    animateText(tlCriterios, sectionCriteriosDescription);
    animateText(tlCriterios, sectionCriteriosTimeline);

    sectionCriteriosTimelineItems.forEach((item, index) => {
        const dot = sectionCriteriosTimelineDots[index];

        ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            onEnter: () => {
                item.classList.add('item-active');
                dot.classList.add('item-active');
            },
        });
    });

    if (sectionCriteriosTimelineItems.length > 0) {
        const firstItem = sectionCriteriosTimelineItems[0];
        const lastItem = sectionCriteriosTimelineItems[sectionCriteriosTimelineItems.length - 1];

        const progressTween = gsap.to(sectionCriteriosTimelineLineProgress, {
            height: '100%',
            ease: 'none',
            paused: true
        });

        let maxProgress = 0;

        ScrollTrigger.create({
            trigger: firstItem,
            start: 'top 60%',
            endTrigger: lastItem,
            end: 'top 60%',
            onUpdate: self => {
                if (self.progress > maxProgress) {
                    maxProgress = self.progress;
                    progressTween.progress(maxProgress);
                }
            }
        });
    }
}

function animateProtocolosSelosMetodoSection() {
    const sectionMetodo = document.querySelector('#metodo');
    const sectionMetodoTitle = sectionMetodo.querySelector('.content-text h2');
    const sectionMetodoNavigation = sectionMetodo.querySelector('.navigation-carrossel');
    const sectionMetodoCards = sectionMetodo.querySelectorAll('.card-rotate');

    const tlMetodo = createScrollTimeline(sectionMetodo);

    animateTitleLines(tlMetodo, sectionMetodoTitle, CONFIG.offset.none);

    tlMetodo.from(sectionMetodoNavigation, {
        opacity: 0,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);

    tlMetodo.from(sectionMetodoCards, {
        opacity: 0,
        rotate: CONFIG.transform.rotate.medium,
        x: 400,
        duration: 0.6,
        ease: 'ease.inOut',
        stagger: CONFIG.stagger.medium,
    }, CONFIG.offset.normal);
}

function animateProtocolosSelosComunicacaoSection() {
    const sectionComunicacao = document.querySelector('#comunicacao');
    const sectionComunicacaoContent = sectionComunicacao.querySelector('.sections-protocolos-selos-comunicacao-content');
    const sectionComunicacaoTitle = sectionComunicacao.querySelector('.content-text h2');
    const sectionComunicacaoDescription = sectionComunicacao.querySelector('.content-text p');
    const sectionComunicacaoCards = sectionComunicacao.querySelector('.cards-connection-1');

    animateScaleWithScrub(sectionComunicacaoContent, sectionComunicacao);

    const tlComunicacao = gsap.timeline({
        scrollTrigger: {
            trigger: sectionComunicacao,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    animateTitle(tlComunicacao, sectionComunicacaoTitle, CONFIG.offset.none);
    animateText(tlComunicacao, sectionComunicacaoDescription);
    animateText(tlComunicacao, sectionComunicacaoCards);
}

function animateProtocolosSelosCTASection() {
    const sectionCTA = document.querySelector('#cta');
    const sectionCTATitle = sectionCTA.querySelector('.animate-1');
    const sectionCTADestination = sectionCTA.querySelector('.animate-2');

    const tlCTASection = createScrollTimeline(sectionCTA, 'early');

    tlCTASection.from(sectionCTATitle, {
        opacity: 0,
        y: CONFIG.distance.large,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    });

    tlCTASection.from(sectionCTADestination, {
        opacity: 0,
        y: CONFIG.distance.large,
        scale: CONFIG.transform.scale.small,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);
}

function animateProtocolosSelosAuditoriasSection() {
    const sectionAuditoria = document.querySelector('#auditorias');
    const sectionAuditoriaTitle = sectionAuditoria.querySelector('.content-text h2');
    const sectionAuditoriaText = sectionAuditoria.querySelectorAll('.content-text p');
    const sectionAuditoriaImage1 = sectionAuditoria.querySelector('.animate-1');
    const sectionAuditoriaImage2 = sectionAuditoria.querySelector('.animate-2');

    const tlAuditoria = createScrollTimeline(sectionAuditoria, 'early');

    animateTitle(tlAuditoria, sectionAuditoriaTitle, CONFIG.offset.none);
    animateText(tlAuditoria, sectionAuditoriaText);

    tlAuditoria.from(sectionAuditoriaImage1, {
        opacity: 0,
        scale: CONFIG.transform.scale.small,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);

    tlAuditoria.from(sectionAuditoriaImage2, {
        opacity: 0,
        scale: CONFIG.transform.scale.small,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);
}

function animateProtocolosSelosProtocolosSection() {
    const sectionProtocolos = document.querySelector('#protocolos');
    const sectionProtocolosContent = sectionProtocolos.querySelector('.sections-protocolos-selos-protocolos-content');
    const sectionProtocolosTitle = sectionProtocolos.querySelector('.content-text h2');
    const sectionProtocolosCards = sectionProtocolos.querySelectorAll('.card-protocolo-link-wrapper');

    animateScaleWithScrub(sectionProtocolosContent, sectionProtocolos);

    const tlProtocolos = createScrollTimeline(sectionProtocolos, 'early');

    animateTitle(tlProtocolos, sectionProtocolosTitle, CONFIG.offset.none);

    tlProtocolos.from(sectionProtocolosCards, {
        opacity: 0,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.fast,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.normal,
    }, CONFIG.offset.tight);
}

function initProtocolosSelosAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateProtocolosSelosHeroSection();
    });

    // Demais seções animam normalmente com scroll
    animateProtocolosSelosCriteriosSection();
    animateProtocolosSelosMetodoSection();
    animateProtocolosSelosComunicacaoSection();
    animateProtocolosSelosCTASection();
    animateProtocolosSelosAuditoriasSection();
    animateProtocolosSelosProtocolosSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initProtocolosSelosAnimations();
});
