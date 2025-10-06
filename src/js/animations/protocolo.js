import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateIcon,
    animateTitle,
    animateText,
    animateSlideX,
    animateSlideY,
    waitForTransition
} from './animations-utils.js';

function heroProtocoloAnimation() {
    const hero = document.querySelector('.sections-cpt-protocolo-hero');

    if (!elementExists(hero)) return;

    const timeline = gsap.timeline();

    animateIcon(timeline, hero.querySelector('.hero-header-icon'));
    animateTitle(timeline, hero.querySelector('.content-text h1'));
    animateText(timeline, hero.querySelectorAll('.content-text p'));
    animateTitle(timeline, hero.querySelector('.hero-destaques-subtitulo .content-text h2'));

    const heroDestaques = hero.querySelectorAll('.hero-destaque');
    if (heroDestaques.length) {
        timeline.from(heroDestaques, {
            opacity: 0,
            y: CONFIG.distance.medium,
            duration: CONFIG.duration.normal,
            stagger: CONFIG.stagger.medium,
            ease: CONFIG.easing.default,
        }, CONFIG.offset.normal);
    }

    const heroInfosExtras = hero.querySelector('.hero-infos-extras');
    if (elementExists(heroInfosExtras)) {
        animateText(timeline, heroInfosExtras);
    }
}

function heroEmBreveProtocoloAnimation() {
    const heroEmBreve = document.querySelector('.sections-cpt-protocolo-hero-em-breve');

    if (!elementExists(heroEmBreve)) return;

    const timeline = gsap.timeline();

    animateIcon(timeline, heroEmBreve.querySelector('.hero-header-icon'));
    animateSlideX(timeline, heroEmBreve.querySelector('.content-text .tag-1'));
    animateTitle(timeline, heroEmBreve.querySelector('.content-text h1'));
    animateText(timeline, heroEmBreve.querySelectorAll('.content-text p'));
    animateText(timeline, heroEmBreve.querySelector('.content-text .btn-wrapper'));
}

function protocoloAnimation() {
    const protocolo = document.querySelector('#protocolo');

    if (!elementExists(protocolo)) return;

    const tlProtocolo = createScrollTimeline(protocolo);

    animateTitle(tlProtocolo, protocolo.querySelector('.protocolo-content .content-text h2'), CONFIG.offset.none);
    animateText(tlProtocolo, protocolo.querySelectorAll('.protocolo-content .content-text p'));
    animateSlideY(tlProtocolo, protocolo.querySelector('.protocolo-relation'));
    animateSlideY(tlProtocolo, protocolo.querySelectorAll('.protocolo-cards .card-protocol-nivel'));

    const listFontes = protocolo.querySelector('.list-fontes');
    if (elementExists(listFontes)) {
        gsap.from(listFontes.querySelectorAll('li'), {
            scrollTrigger: {
                trigger: listFontes,
                start: "top 90%",
                end: "bottom 20%",
            },
            opacity: 0,
            y: CONFIG.distance.medium,
            duration: CONFIG.duration.normal,
            ease: CONFIG.easing.default,
            stagger: CONFIG.stagger.medium,
        });
    }
}

function apendiceBccEccAnimation() {
    const apendiceBccEcc = document.querySelector('#apendice');

    if (!elementExists(apendiceBccEcc)) return;

    const tlApendiceBccEcc = createScrollTimeline(apendiceBccEcc, 'veryEarly');

    animateSlideY(tlApendiceBccEcc, apendiceBccEcc.querySelector('.sections-cpt-protocolo-apendice-bcc-ecc-content'), CONFIG.distance.medium, CONFIG.offset.none);
}

function initProtocoloAnimations() {
    // Aguarda transição completar antes de animar hero sections
    waitForTransition(() => {
        heroProtocoloAnimation();
        heroEmBreveProtocoloAnimation();
    });

    // Demais seções animam normalmente com scroll
    protocoloAnimation();
    apendiceBccEccAnimation();
}

document.addEventListener('DOMContentLoaded', () => {
    initProtocoloAnimations();
});
