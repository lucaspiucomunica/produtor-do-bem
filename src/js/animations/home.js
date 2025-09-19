function animateHeroSection() {
    const siteHeader = document.querySelector('.site-header');
    const sectionHero = document.querySelector('#hero');
    const sectionHeroContent = sectionHero.querySelector('.hero-content');
    const sectionHeroBgVideo = sectionHero.querySelector('.hero-bg-video');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroSubtitle = sectionHero.querySelector('.hero-content .subtitulo');
    const sectionHeroIcons = sectionHero.querySelectorAll('.hero-content .subtitulo .icon');
    const sectionHeroButton = sectionHero.querySelector('.hero-content .botao');
    
    const tlHero = gsap.timeline();
    let tlHeroIcons;

    // Código para animar o hero
    
    const sectionHeroTitleSplit = new SplitText(sectionHeroTitle, { type: "lines" });
    tlHero.from(sectionHeroTitleSplit.lines, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.2
    });

    const sectionHeroTitleDestaqueSplit = new SplitText(sectionHeroTitleDestaque, { type: "words" });
    tlHero.from(sectionHeroTitleDestaqueSplit.words, {
        opacity: 0,
        y: 80,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    }, '-=0.4');

    tlHero.from(sectionHeroSubtitle, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            if (tlHeroIcons) {
                tlHeroIcons.play();
            }
        }
    }, '-=0.6');

    if (sectionHeroIcons.length > 1) {
        // Define estado inicial: primeiro ícone visível, demais ocultos
        sectionHeroIcons.forEach((icon, index) => {
            gsap.set(icon, { 
                opacity: index === 0 ? 1 : 0,
                scale: index === 0 ? 1 : 0.8
            });
        });

        // Timeline infinito para alternância dos ícones
        tlHeroIcons = gsap.timeline({ repeat: -1, paused: true });
        const displayDuration = 1.5;
        const transitionDuration = 0.5;

        sectionHeroIcons.forEach((icon, index) => {
            const nextIndex = (index + 1) % sectionHeroIcons.length;
            const nextIcon = sectionHeroIcons[nextIndex];

            tlHeroIcons
                .to(icon, {
                    opacity: 0,
                    scale: 0.8,
                    duration: transitionDuration,
                    ease: 'power2.inOut'
                }, `+=${displayDuration}`)
                .to(nextIcon, {
                    opacity: 1,
                    scale: 1,
                    duration: transitionDuration,
                    ease: 'power2.inOut'
            });
        });
    }
    
    tlHero.from(sectionHeroButton, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');

    tlHero.from(siteHeader, {
        y: -120,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');
}

function animateSobreSection() {
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
    
    const tlSobre = gsap.timeline({
        scrollTrigger: {
            trigger: sectionSobre,
            start: "top 60%",
            end: "bottom 20%",
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
            start: "top 70%",
            end: "80% 60%",
            scrub: true,
            once: true
        }
    });

    gsap.from(sectionSobreEngajamentoImage, {
        opacity: 0,
        scale:0.5,
        x: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionSobreEngajamento,
            start: "top 70%",
            end: "80% 60%",
            scrub: true,
            once: true
        }
    });
}

function animateCertificacoesSection() {
    const sectionCertificacoes = document.querySelector('#certificacoes');
    const sectionCertificacoesContent = sectionCertificacoes.querySelector('.cta-certificacoes');
    const sectionCertificacoesTitle = sectionCertificacoes.querySelector('.cta-certificacoes .titulo h2');
    const sectionCertificacoesText = sectionCertificacoes.querySelectorAll('.cta-certificacoes .texto p');
    const sectionCertificacoesIlustracao1 = sectionCertificacoes.querySelector('.cta-certificacoes .ilustracoes .ilustracao--1');
    const sectionCertificacoesIlustracao2 = sectionCertificacoes.querySelector('.cta-certificacoes .ilustracoes .ilustracao--2');
    const sectionCertificacoesButton = sectionCertificacoes.querySelector('.cta-certificacoes .botao');

    gsap.from(sectionCertificacoesContent, {
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionCertificacoes,
            start: "0% 90%",
            end: "50% 50%",
            scrub: true,
            once: true
        }
    });

    const tlCertificacoes = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCertificacoes,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    const splitTitleCertificacoes = new SplitText(sectionCertificacoesTitle, { type: "words" });
    tlCertificacoes.from(splitTitleCertificacoes.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
    });

    tlCertificacoes.from(sectionCertificacoesText, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2,
    }, '-=0.6');

    tlCertificacoes.from(sectionCertificacoesButton, {
        scale: 0.8,
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlCertificacoes.from(sectionCertificacoesIlustracao1, {
        opacity: 0,
        x: -40,
        y: 40,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlCertificacoes.from(sectionCertificacoesIlustracao2, {
        opacity: 0,
        x: 40,
        y: 40,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
}

/**
 * Função principal que inicializa todas as animações da página.
 */
function initHomeAnimations() {
    animateHeroSection();
    animateSobreSection();
    animateCertificacoesSection();
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicia as animações
    initHomeAnimations();
});