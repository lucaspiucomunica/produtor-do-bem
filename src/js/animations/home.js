/**
 * Animações da página principal do site
 */

// Hero

const siteHeader = document.querySelector('.site-header');
const sectionHero = document.querySelector('#hero');
const sectionHeroContent = sectionHero.querySelector('.hero-content');
const sectionHeroBgVideo = sectionHero.querySelector('.hero-bg-video');
const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1');
const sectionHeroSubtitle = sectionHero.querySelector('.hero-content .subtitulo');
const sectionHeroButton = sectionHero.querySelector('.hero-content .botao');

const tlHero = gsap.timeline();

// Código para animar o hero

// Sobre
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
const sectionSobreEngajamentoImage = sectionSobre.querySelector('.animate-2 .svg-inline');

// Código para animar o sobre
const tlSobre = gsap.timeline({
    scrollTrigger: {
        trigger: sectionSobre,
        start: "top 60%",
        end: "bottom 20%",
        // markers: true
    }
});

const splitTitle = new SplitText(sectionSobreTitle, { type: "words" });

tlSobre.from(splitTitle.words, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut',
    stagger: 0.05
});

tlSobre.from(sectionSobreDescription, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut'
}, '-=0.6');

tlSobre.from(sectionSobreCard1, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut',
}, '-=0.6');

tlSobre.from(sectionSobreCard2, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut',
}, '-=0.6');

tlSobre.from(sectionSobreCards3, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.06,
    ease: 'power2.inOut',
}, '-=0.6');

tlSobre.from(sectionSobreCard5, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut',
}, '-=0.6');

tlSobre.from(sectionSobreCard6, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.05,
    ease: 'power2.inOut',
}, '-=0.6');

tlSobre.from(sectionSobreCard7, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut',
}, '-=0.6');

// Animação da seção de engajamento

const splitEngajamentoTitle = new SplitText(sectionSobreEngajamentoTitle, { type: "words" });

gsap.from(splitEngajamentoTitle.words, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.inOut',
    stagger: 0.08,
    scrollTrigger: {
        trigger: sectionSobreEngajamento,
        start: "20% 80%",
        end: "50% 50%",
        markers: true,
        scrub: true,
        once: true
    }
});