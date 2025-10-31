import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    animateTitle,
    animateText,
    animateCards,
    animateScaleWithScrub,
    animateSlideX,
    waitForTransition
} from './animations-utils.js';

function animateQuemSomosHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelectorAll('.hero-content .content-text p');
    const sectionHeroImageContent = sectionHero.querySelector('.hero-image .hero-image-content');
    const sectionHeroImage = sectionHero.querySelector('.hero-image .hero-image-content img');
    const sectionHeroImageIcons = sectionHero.querySelectorAll('.hero-image .hero-image-icons .hero-image-icon');

    const tlHero = gsap.timeline();

    animateTitleLines(tlHero, sectionHeroTitle, CONFIG.offset.none, CONFIG.duration.slow);
    animateTitleLines(tlHero, sectionHeroTitleDestaque, CONFIG.offset.tight);
    animateText(tlHero, sectionHeroContentText);

    tlHero.from(sectionHeroImageContent, {
        opacity: 0,
        scale: CONFIG.transform.scale.medium,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, CONFIG.offset.normal);

    animateCards(tlHero, sectionHeroImageIcons);

    gsap.set(sectionHeroImage, { scale: 1 });

    gsap.to(sectionHeroImage, {
        scale: CONFIG.transform.scale.large,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        scrollTrigger: {
            trigger: sectionHero,
            start: "top 0%",
            end: "bottom 0%",
            scrub: true,
        }
    });

    gsap.set(sectionHeroImageIcons, { y: 0 });

    gsap.to(sectionHeroImageIcons, {
        y: -CONFIG.distance.large,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.fast,
        scrollTrigger: {
            trigger: sectionHero,
            start: "top 0%",
            end: "bottom 0%",
            scrub: true,
        }
    });
}

function animateQuemSomosOQueFazemosSection() {
    const sectionOQueFazemos = document.querySelector('#o-que-fazemos');
    const sectionOQueFazemosTitle = sectionOQueFazemos.querySelector('.content-text h2');
    const sectionOQueFazemosDescription = sectionOQueFazemos.querySelector('.content-text p');
    const sectionOQueFazemosCarrosselNavigation = sectionOQueFazemos.querySelector('.swiper-carrossel-o-que-fazemos-navigation');
    const sectionOQueFazemosCarrosselSignificaNavigation = sectionOQueFazemos.querySelector('.swiper-carrossel-o-que-significa-navigation');
    const sectionOQueFazemosSwiper = sectionOQueFazemos.querySelector('.swiper-o-que-fazemos');
    const sectionOQueFazemosCarrosselSignifica = sectionOQueFazemos.querySelector('.carrossel-o-que-significa');
    const sectionOQueFazemosCarrosselSignificaTitle = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .content-text h3');
    const sectionOQueFazemosCarrosselSignificaDescription = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .content-text p');
    const sectionOQueFazemosCarrosselSignificaProgress = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .progress-carrossel');
    const sectionOQueFazemosCarrosselSignificaSwiper = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .swiper-o-que-significa');

    const tlOQueFazemos = createScrollTimeline(sectionOQueFazemos);

    animateTitle(tlOQueFazemos, sectionOQueFazemosTitle, CONFIG.offset.none);
    animateText(tlOQueFazemos, sectionOQueFazemosDescription);

    tlOQueFazemos.from(sectionOQueFazemosCarrosselNavigation, {
        opacity: 0,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default
    }, CONFIG.offset.loose);

    animateSlideX(tlOQueFazemos, sectionOQueFazemosSwiper);

    animateScaleWithScrub(sectionOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignifica);

    const tlOQueFazemosCarrosselSignifica = gsap.timeline({
        scrollTrigger: {
            trigger: sectionOQueFazemosCarrosselSignifica,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    const isMobile = window.innerWidth < 1024;

    animateTitle(tlOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignificaTitle, CONFIG.offset.none);
    animateText(tlOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignificaDescription);

    if (isMobile) {
        // Mobile: anima swiper antes dos controles
        animateSlideX(tlOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignificaSwiper);
        tlOQueFazemosCarrosselSignifica.from(sectionOQueFazemosCarrosselSignificaNavigation, {
            opacity: 0,
            duration: CONFIG.duration.normal,
            ease: CONFIG.easing.default
        }, CONFIG.offset.loose);
        animateText(tlOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignificaProgress);

    } else {
        // Desktop: ordem original
        tlOQueFazemosCarrosselSignifica.from(sectionOQueFazemosCarrosselSignificaNavigation, {
            opacity: 0,
            duration: CONFIG.duration.normal,
            ease: CONFIG.easing.default
        }, CONFIG.offset.loose);

        animateText(tlOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignificaProgress);
        animateSlideX(tlOQueFazemosCarrosselSignifica, sectionOQueFazemosCarrosselSignificaSwiper);
    }
}

function animateQuemSomosProdutoresEEmpresasSection() {
    const sectionProdutoresEEmpresas = document.querySelector('#produtores-e-empresas');
    const sectionProdutoresEEmpresasTitle = sectionProdutoresEEmpresas.querySelector('.content-text h2');
    const sectionProdutoresEEmpresasIconeLogo = sectionProdutoresEEmpresas.querySelector('.icone-logo');
    const sectionProdutoresEEmpresasLogos = sectionProdutoresEEmpresas.querySelectorAll('.item-logo img');

    const tlProdutoresEEmpresas = createScrollTimeline(sectionProdutoresEEmpresas);

    tlProdutoresEEmpresas.from(sectionProdutoresEEmpresasIconeLogo, {
        scale: CONFIG.transform.scale.medium,
        opacity: 0,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    });

    animateTitleLines(tlProdutoresEEmpresas, sectionProdutoresEEmpresasTitle);

    tlProdutoresEEmpresas.from(sectionProdutoresEEmpresasLogos, {
        opacity: 0,
        y: CONFIG.distance.medium,
        scale: 0.6,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.medium
    }, CONFIG.offset.normal);
}

function animateQuemSomosCTConsultivoSection() {
    const sectionCTConsultivo = document.querySelector('#ct-consultivo');
    const sectionCTConsultivoContent = sectionCTConsultivo.querySelector('.section-content');
    const sectionCTConsultivoTitle = sectionCTConsultivo.querySelector('.animate-1 .content-text h2');
    const sectionCTConsultivoDescription = sectionCTConsultivo.querySelector('.animate-1 .content-text p');
    const sectionCTConsultivoEquipeTitle = sectionCTConsultivo.querySelector('.animate-2 .content-text h3');
    const sectionCTConsultivoEquipePDB = sectionCTConsultivo.querySelectorAll('.animate-3 .card-people');
    const sectionCTConsultivoProtocolos = sectionCTConsultivo.querySelector('.animate-4');
    const sectionCTConsultivoProtocolosCards = sectionCTConsultivo.querySelectorAll('.animate-4 .card-protocol');

    gsap.from(sectionCTConsultivoContent, {
        scale: CONFIG.transform.scale.medium,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        scrollTrigger: {
            trigger: sectionCTConsultivo,
            start: "0% 90%",
            end: "20% 50%",
            scrub: true,
            once: true,
        }
    });

    const tlCTConsultivo = createScrollTimeline(sectionCTConsultivo);

    animateTitle(tlCTConsultivo, sectionCTConsultivoTitle, CONFIG.offset.none);
    animateText(tlCTConsultivo, sectionCTConsultivoDescription);
    animateText(tlCTConsultivo, sectionCTConsultivoEquipeTitle);
    animateCards(tlCTConsultivo, sectionCTConsultivoEquipePDB, CONFIG.offset.normal, CONFIG.stagger.fast);

    gsap.from(sectionCTConsultivoProtocolosCards, {
        opacity: 0,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.medium,
        scrollTrigger: {
            trigger: sectionCTConsultivoProtocolos,
            start: "0% 90%",
            end: "20% 50%",
        }
    });
}

function initQuemSomosAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateQuemSomosHeroSection();
    });

    // Demais seções animam normalmente com scroll
    animateQuemSomosOQueFazemosSection();
    animateQuemSomosProdutoresEEmpresasSection();
    animateQuemSomosCTConsultivoSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initQuemSomosAnimations();
});
