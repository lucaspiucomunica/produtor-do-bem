function animateCursor() {
    const cursor = document.querySelector('.cursor');

    if (!cursor) return;

    gsap.set(".cursor", {
        xPercent: -50,
        yPercent: -50
    });
    
    const xTo = gsap.quickTo(".cursor", "x", {
        duration: .6,
        ease: "power3"
    });
    const yTo = gsap.quickTo(".cursor", "y", {
        duration: .6,
        ease: "power3"
    });

    window.addEventListener("mousemove", (e => {
        xTo(e.clientX);
        yTo(e.clientY)
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
    
    const tlCTA1 = gsap.timeline({
        scrollTrigger: {
            trigger: cta1,
            start: "top 60%",
            end: "bottom 20%",
        }
    });

    const cta1TitleSplit = new SplitText(cta1Title, { type: "lines" });
    tlCTA1.from(cta1TitleSplit.lines, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    });

    const cta1DestaqueSplit = new SplitText(cta1Destaque, { type: "words" });
    tlCTA1.from(cta1DestaqueSplit.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    }, '-=0.6');

    tlCTA1.from(cta1Button, {
        opacity: 0,
        y: 40,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
}

function initGlobalsAnimations() {
    animateCursor();
    animateCTA1();
}

document.addEventListener('DOMContentLoaded', () => {
    initGlobalsAnimations();
});