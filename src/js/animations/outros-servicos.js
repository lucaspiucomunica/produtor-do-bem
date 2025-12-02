import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    waitForTransition
} from './animations-utils.js';

function animateOutrosServicosHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
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

    tlHero.from(sectionHeroContentText, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: CONFIG.stagger.medium
    }, CONFIG.offset.normal);
}

function animateOutrosServicosServicosSection() {
    const sectionServicos = document.querySelector('#servicos');
    if (!elementExists(sectionServicos)) return;

    const sectionServicosItems = sectionServicos.querySelectorAll('.flex');

    // Animar cada item de serviço individualmente
    sectionServicosItems.forEach((item) => {
        // Criar timeline com ScrollTrigger - o trigger é o .flex (container do serviço)
        const tl = createScrollTimeline(item, 'early');

        // Selecionar elementos do item atual
        const title = item.querySelector('.content-text h2');
        const paragraphs = item.querySelectorAll('.content-text p');
        const cta = item.querySelector('.content-btn');
        const image = item.querySelector('.content-image');
        const icon = item.querySelector('.content-icon');

        // 1. Animar título com SplitText (por linhas)
        if (elementExists(title)) {
            const splitTitle = new SplitText(title, { type: "lines" });
            tl.from(splitTitle.lines, {
                opacity: 0,
                y: CONFIG.distance.medium,
                duration: CONFIG.duration.slow,
                ease: CONFIG.easing.default,
                stagger: CONFIG.stagger.medium,
            }, CONFIG.offset.none);
        }

        // 2. Animar parágrafos (surgem de baixo para cima)
        if (paragraphs.length > 0) {
            paragraphs.forEach((paragraph) => {
                if (elementExists(paragraph)) {
                    tl.from(paragraph, {
                        opacity: 0,
                        y: CONFIG.distance.medium,
                        duration: CONFIG.duration.normal,
                        ease: CONFIG.easing.default,
                    }, CONFIG.offset.normal);
                }
            });
        }

        // 3. Animar botão CTA (surge de baixo para cima com scale)
        if (elementExists(cta)) {
            tl.from(cta, {
                opacity: 0,
                y: CONFIG.distance.medium,
                duration: CONFIG.duration.normal,
                ease: CONFIG.easing.default,
            }, CONFIG.offset.normal);
        }

        // 4. Animar imagem (zoom + fade)
        if (elementExists(image)) {
            tl.from(image, {
                opacity: 0,
                scale: CONFIG.transform.scale.medium,
                duration: CONFIG.duration.normal,
                ease: CONFIG.easing.default,
            }, CONFIG.offset.normal);
        }

        // 5. Animar ícone (fade + slide + rotação)
        if (elementExists(icon)) {
            tl.from(icon, {
                opacity: 0,
                x: -CONFIG.distance.large,
                rotate: -CONFIG.transform.rotate.medium,
                duration: CONFIG.duration.normal,
                ease: CONFIG.easing.default,
            }, CONFIG.offset.tight);
        }
    });
}

function initOutrosServicosAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateOutrosServicosHeroSection();
    });

    // Demais seções animam normalmente com scroll
    animateOutrosServicosServicosSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initOutrosServicosAnimations();
});
