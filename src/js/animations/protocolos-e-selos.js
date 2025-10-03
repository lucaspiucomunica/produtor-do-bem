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
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.inOut',
    });

    const sectionHeroTitleSplit = new SplitText(sectionHeroTitle, { type: "lines" });
    tlHero.from(sectionHeroTitleSplit.lines, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.2
    }, '-=0.6');

    const sectionHeroTitleDestaqueSplit = new SplitText(sectionHeroTitleDestaque, { type: "words" });
    tlHero.from(sectionHeroTitleDestaqueSplit.words, {
        opacity: 0,
        y: 80,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    }, '-=0.8');
    
    tlHero.from(sectionHeroTitleContentIcon, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlHero.from(sectionHeroContentText, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2
    }, '-=0.6');    
}

function animateProtocolosSelosCriteriosSection() {
    const sectionCriterios = document.querySelector('#criterios');
    const sectionCriteriosTitle = sectionCriterios.querySelector('.content-text h2');
    const sectionCriteriosDescription = sectionCriterios.querySelector('.content-text p');
    const sectionCriteriosTimeline = sectionCriterios.querySelector('.timeline-1');
    const sectionCriteriosTimelineLineProgress = sectionCriterios.querySelector('.timeline-1-line-line-progress');
    const sectionCriteriosTimelineDots = sectionCriterios.querySelectorAll('.timeline-1-line-dot');
    const sectionCriteriosTimelineItems = sectionCriterios.querySelectorAll('.timeline-1-item');
    
    const tlCriterios = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCriterios,
            start: "top 60%",
            end: "bottom 20%",
        }
    });

    const splitTitleCriterios = new SplitText(sectionCriteriosTitle, { type: "words" });
    tlCriterios.from(splitTitleCriterios.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
    });

    tlCriterios.from(sectionCriteriosDescription, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlCriterios.from(sectionCriteriosTimeline, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

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

        // Cria a animação da barra de progresso, mas a deixa pausada
        const progressTween = gsap.to(sectionCriteriosTimelineLineProgress, {
            height: '100%',
            ease: 'none',
            paused: true
        });

        // Variável para armazenar o progresso máximo alcançado
        let maxProgress = 0;

        // Cria o ScrollTrigger para controlar a animação manualmente
        ScrollTrigger.create({
            trigger: firstItem,
            start: 'top 60%',
            endTrigger: lastItem,
            end: 'top 60%',
            onUpdate: self => {
                // Atualiza o progresso máximo apenas se o progresso atual for maior
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

    const tlMetodo = gsap.timeline({
        scrollTrigger: {
            trigger: sectionMetodo,
            start: "top 60%",
            end: "bottom 20%",
        }
    });

    const splitTitleMetodo = new SplitText(sectionMetodoTitle, { type: "lines" });
    tlMetodo.from(splitTitleMetodo.lines, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.inOut',
    });

    tlMetodo.from(sectionMetodoNavigation, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlMetodo.from(sectionMetodoCards, {
        opacity: 0,
        rotate: 10,
        x: 400,
        duration: 0.6,
        ease: 'ease.inOut',
        stagger: 0.2,
    }, '-=0.6');
}

function animateProtocolosSelosComunicacaoSection() {
    const sectionComunicacao = document.querySelector('#comunicacao')
    const sectionComunicacaoContent = sectionComunicacao.querySelector('.sections-protocolos-selos-comunicacao-content');
    const sectionComunicacaoTitle = sectionComunicacao.querySelector('.content-text h2');
    const sectionComunicacaoDescription = sectionComunicacao.querySelector('.content-text p');
    const sectionComunicacaoCards = sectionComunicacao.querySelector('.cards-connection-1');

    gsap.from(sectionComunicacaoContent, {
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionComunicacao,
            start: "0% 90%",
            end: "50% 50%",
            scrub: true,
            once: true,
        }
    });

    const tlComunicacao = gsap.timeline({
        scrollTrigger: {
            trigger: sectionComunicacao,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    const splitTitleComunicacao = new SplitText(sectionComunicacaoTitle, { type: "words" });
    tlComunicacao.from(splitTitleComunicacao.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
    });

    tlComunicacao.from(sectionComunicacaoDescription, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlComunicacao.from(sectionComunicacaoCards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
}

function animateProtocolosSelosCTASection() {
    const sectionCTA = document.querySelector('#cta');
    const sectionCTATitle = sectionCTA.querySelector('.animate-1');
    const sectionCTADestination = sectionCTA.querySelector('.animate-2');

    const tlCTASection = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCTA,
            start: "top 70%",
            end: "bottom 20%",
        }
    });

    tlCTASection.from(sectionCTATitle, {
        opacity: 0,
        y: 80,
        duration: 0.8,
        ease: 'power2.inOut',
    });
    
    tlCTASection.from(sectionCTADestination, {
        opacity: 0,
        y: 80,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
}

function animateProtocolosSelosAuditoriasSection() {
    const sectionAuditoria = document.querySelector('#auditorias');
    const sectionAuditoriaTitle = sectionAuditoria.querySelector('.content-text h2');
    const sectionAuditoriaText = sectionAuditoria.querySelectorAll('.content-text p');
    const sectionAuditoriaImage1 = sectionAuditoria.querySelector('.animate-1');
    const sectionAuditoriaImage2 = sectionAuditoria.querySelector('.animate-2');

    const tlAuditoria = gsap.timeline({
        scrollTrigger: {
            trigger: sectionAuditoria,
            start: "top 70%",
            end: "bottom 20%",
        }
    });

    const splitTitleAuditoria = new SplitText(sectionAuditoriaTitle, { type: "words" });
    tlAuditoria.from(splitTitleAuditoria.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    });

    tlAuditoria.from(sectionAuditoriaText, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2,
    }, '-=0.6');

    tlAuditoria.from(sectionAuditoriaImage1, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
    
    tlAuditoria.from(sectionAuditoriaImage2, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
}

function animateProtocolosSelosProtocolosSection() {
    const sectionProtocolos = document.querySelector('#protocolos');
    const sectionProtocolosContent = sectionProtocolos.querySelector('.sections-protocolos-selos-protocolos-content');
    const sectionProtocolosTitle = sectionProtocolos.querySelector('.content-text h2');
    const sectionProtocolosCards = sectionProtocolos.querySelectorAll('.card-protocolo-link-wrapper');

    gsap.from(sectionProtocolosContent, {
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionProtocolos,
            start: "0% 90%",
            end: "50% 50%",
            scrub: true,
            once: true,
        }
    });

    const tlProtocolos = gsap.timeline({
        scrollTrigger: {
            trigger: sectionProtocolos,
            start: "top 70%",
            end: "bottom 20%",
        }
    });

    const splitTitleProtocolos = new SplitText(sectionProtocolosTitle, { type: "words" });
    tlProtocolos.from(splitTitleProtocolos.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.inOut',
    });

    tlProtocolos.from(sectionProtocolosCards, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.inOut',
        stagger: 0.1,
    }, '-=0.8');
}

function initProtocolosSelosAnimations() {
    animateProtocolosSelosHeroSection();
    animateProtocolosSelosCriteriosSection();
    animateProtocolosSelosMetodoSection();
    animateProtocolosSelosComunicacaoSection();
    animateProtocolosSelosCTASection();
    animateProtocolosSelosAuditoriasSection();
    animateProtocolosSelosProtocolosSection();
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicia as animações
    initProtocolosSelosAnimations();
});