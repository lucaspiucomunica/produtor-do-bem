import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import { elementExists, createScrollTimeline, animateTitleLines, animateTitle, animateButton } from './animations-utils.js';

function animateCursor() {
    const cursor = document.querySelector('.cursor');

    if (!elementExists(cursor)) return;

    gsap.set(".cursor", {
        xPercent: -50,
        yPercent: -50
    });

    let hasAnimatedIn = false;

    const xTo = gsap.quickTo(".cursor", "x", {
        duration: .6,
        ease: CONFIG.easing.smooth
    });
    const yTo = gsap.quickTo(".cursor", "y", {
        duration: .6,
        ease: CONFIG.easing.smooth
    });

    window.addEventListener("mousemove", (e => {
        if (!hasAnimatedIn) {
            gsap.set(".cursor", {
                x: e.clientX,
                y: e.clientY
            });

            gsap.to(".cursor", {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.7)"
            });

            hasAnimatedIn = true;
        } else {
            xTo(e.clientX);
            yTo(e.clientY);
        }
    }));

    const interactiveElements = document.querySelectorAll("a, button, .cursor-hover, .btn");

    interactiveElements.forEach((element => {
        if (!element.classList.contains("no-clickable")) {
            element.addEventListener("mouseover", (() => gsap.to(".cursor", {
                scale: 2,
                duration: .2,
                ease: "power2.out"
            })));
            element.addEventListener("mouseout", (() => gsap.to(".cursor", {
                scale: 1,
                duration: .2,
                ease: "power2.in"
            })))
        }
    }))
}

function animateCTA1() {
    const cta1 = document.querySelector('.cta-1');
    const cta1Title = document.querySelector('.cta-1 h2 .title');
    const cta1Destaque = document.querySelector('.cta-1 h2 .destaque');
    const cta1Button = document.querySelector('.cta-1 .content-button');

    if (!elementExists(cta1)) return;

    const tlCTA1 = createScrollTimeline(cta1);

    animateTitleLines(tlCTA1, cta1Title, CONFIG.offset.none);
    animateTitle(tlCTA1, cta1Destaque);
    animateButton(tlCTA1, cta1Button);
}

function initGlobalsAnimations() {
    animateCursor();
    animateCTA1();
}

document.addEventListener('DOMContentLoaded', () => {
    initGlobalsAnimations();
});