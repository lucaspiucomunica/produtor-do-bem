function animateFaleConoscoHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.content-text h1');
    const sectionHeroContentText = sectionHero.querySelectorAll('.content-text p');
    const sectionForm = document.querySelector('#form');

    const tlHero = gsap.timeline();

    const sectionHeroTitleSplit = new SplitText(sectionHeroTitle, { type: "words" });
    tlHero.from(sectionHeroTitleSplit.words, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.2
    });

    tlHero.from(sectionHeroContentText, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlHero.from(sectionForm, {
        opacity: 0,
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
}

function initFaleConoscoAnimations() {
    animateFaleConoscoHeroSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initFaleConoscoAnimations();
});