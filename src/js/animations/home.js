import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    animateTitle,
    animateText,
    animateButton,
    animateCards,
    animateScaleWithScrub,
    animateSlideX,
    waitForTransition
} from './animations-utils.js';

function animateHomeHeroSection() {
    const siteHeader = document.querySelector('.site-header');
    const sectionHero = document.querySelector('#hero');
    const sectionHeroVideo = sectionHero.querySelector('.hero-bg-video video');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroSubtitle = sectionHero.querySelector('.hero-content .subtitulo');
    const sectionHeroIcons = sectionHero.querySelectorAll('.hero-content .subtitulo .icon');
    const sectionHeroButton = sectionHero.querySelector('.hero-content .botao');

    const tlHero = gsap.timeline();
    let tlHeroIcons;

    tlHero.from(sectionHeroVideo, {
        opacity: 0,
        scale: CONFIG.transform.scale.large,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    });

    animateTitleLines(tlHero, sectionHeroTitle, CONFIG.offset.none, CONFIG.duration.slow);
    animateTitle(tlHero, sectionHeroTitleDestaque, CONFIG.offset.loose);

    tlHero.from(sectionHeroSubtitle, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.slow,
        ease: CONFIG.easing.default,
        onComplete: () => {
            if (tlHeroIcons) {
                tlHeroIcons.play();
            }
        }
    }, CONFIG.offset.normal);

    if (sectionHeroIcons.length > 1) {
        sectionHeroIcons.forEach((icon, index) => {
            gsap.set(icon, {
                opacity: index === 0 ? 1 : 0,
                scale: index === 0 ? 1 : CONFIG.transform.scale.medium
            });
        });

        tlHeroIcons = gsap.timeline({ repeat: -1, paused: true });
        const displayDuration = 1.5;
        const transitionDuration = 0.5;

        sectionHeroIcons.forEach((icon, index) => {
            const nextIndex = (index + 1) % sectionHeroIcons.length;
            const nextIcon = sectionHeroIcons[nextIndex];

            tlHeroIcons
                .to(icon, {
                    opacity: 0,
                    scale: CONFIG.transform.scale.medium,
                    duration: transitionDuration,
                    ease: CONFIG.easing.default
                }, `+=${displayDuration}`)
                .to(nextIcon, {
                    opacity: 1,
                    scale: 1,
                    duration: transitionDuration,
                    ease: CONFIG.easing.default
            });
        });
    }

    animateText(tlHero, sectionHeroButton, CONFIG.offset.normal, 0);

    tlHero.from(siteHeader, {
        y: -120,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default
    }, CONFIG.offset.normal);
}

function animateHomeSobreSection() {
    const sectionSobre = document.querySelector('#sobre');
    const sectionSobreTitle = sectionSobre.querySelector('.animate-1 h2');
    const sectionSobreDescription = sectionSobre.querySelector('.animate-1 p');
    const sectionSobreCard1 = sectionSobre.querySelector('.card-1');
    const sectionSobreCard2 = sectionSobre.querySelector('.card-2');
    const sectionSobreCards3 = sectionSobre.querySelectorAll('.card-3');
    const sectionSobreCard5 = sectionSobre.querySelector('.card-5');
    const sectionSobreCard6 = sectionSobre.querySelector('.card-6');
    const sectionSobreCard7 = sectionSobre.querySelector('.card-7');
    const sectionSobreEngajamento = sectionSobre.querySelector('.animate-2');
    const sectionSobreEngajamentoTitle = sectionSobre.querySelector('.animate-2 h2');
    const sectionSobreEngajamentoImage = sectionSobre.querySelector('.animate-2 .wrapper-svg');

    const tlSobre = createScrollTimeline(sectionSobre);

    animateTitle(tlSobre, sectionSobreTitle, CONFIG.offset.none);
    animateText(tlSobre, sectionSobreDescription);
    animateText(tlSobre, sectionSobreCard1);
    animateText(tlSobre, sectionSobreCard2);
    animateCards(tlSobre, sectionSobreCards3, CONFIG.offset.normal, CONFIG.stagger.fast);
    animateText(tlSobre, sectionSobreCard5);
    animateText(tlSobre, sectionSobreCard6, CONFIG.offset.normal, CONFIG.stagger.fast);
    animateText(tlSobre, sectionSobreCard7);

    gsap.from(sectionSobreEngajamentoTitle, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        scrollTrigger: {
            trigger: sectionSobreEngajamento,
            start: "top 70%",
            end: "80% 60%",
            scrub: true,
            once: true
        }
    });

    gsap.from(sectionSobreEngajamentoImage, {
        opacity: 0,
        scale: CONFIG.transform.scale.small,
        x: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        scrollTrigger: {
            trigger: sectionSobreEngajamento,
            start: "top 70%",
            end: "80% 60%",
            scrub: true,
            once: true
        }
    });
}

function animateHomeCertificacoesSection() {
    const sectionCertificacoes = document.querySelector('#certificacoes');
    const sectionCertificacoesContent = sectionCertificacoes.querySelector('.cta-certificacoes');
    const sectionCertificacoesTitle = sectionCertificacoes.querySelector('.cta-certificacoes .titulo h2');
    const sectionCertificacoesText = sectionCertificacoes.querySelectorAll('.cta-certificacoes .texto p');
    const sectionCertificacoesIlustracao1 = sectionCertificacoes.querySelector('.cta-certificacoes .ilustracoes .ilustracao--1');
    const sectionCertificacoesIlustracao2 = sectionCertificacoes.querySelector('.cta-certificacoes .ilustracoes .ilustracao--2');
    const sectionCertificacoesButton = sectionCertificacoes.querySelector('.cta-certificacoes .botao');

    animateScaleWithScrub(sectionCertificacoesContent, sectionCertificacoes);

    const tlCertificacoes = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCertificacoes,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    animateTitle(tlCertificacoes, sectionCertificacoesTitle, CONFIG.offset.none);
    animateText(tlCertificacoes, sectionCertificacoesText);

    tlCertificacoes.from(sectionCertificacoesButton, {
        scale: CONFIG.transform.scale.medium,
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);

    tlCertificacoes.from(sectionCertificacoesIlustracao1, {
        opacity: 0,
        x: -CONFIG.distance.medium,
        y: CONFIG.distance.medium,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);

    tlCertificacoes.from(sectionCertificacoesIlustracao2, {
        opacity: 0,
        x: CONFIG.distance.medium,
        y: CONFIG.distance.medium,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);
}

function initHomeAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateHomeHeroSection();
    });

    // Demais seções animam normalmente com scroll
    animateHomeSobreSection();
    animateHomeCertificacoesSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initHomeAnimations();
});
