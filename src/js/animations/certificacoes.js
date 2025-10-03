function animateCertificacoesHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelectorAll('.hero-content .content-text p');
    const sectionHeroButton = sectionHero.querySelector('.hero-content .content-button');
    const sectionHeroIlustracao1 = sectionHero.querySelector('.hero-ilustracoes .hero-ilustracao--1');
    const sectionHeroIlustracao2 = sectionHero.querySelector('.hero-ilustracoes .hero-ilustracao--2');

    const tlHero = gsap.timeline();

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
    }, '-=0.8');

    tlHero.from(sectionHeroContentText, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2
    }, '-=0.4');

    tlHero.from(sectionHeroButton, {
        opacity: 0,
        y: 40,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.4');

    tlHero.from(sectionHeroIlustracao1, {
        opacity: 0,
        x: -40,
        y: 40,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.4');
    
    tlHero.from(sectionHeroIlustracao2, {
        opacity: 0,
        x: 40,
        y: 40,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.4');
}

function animateCertificacoesMetodoSection() {
    const sectionMetodo = document.querySelector('#metodo');
    const sectionMetodoTitle = sectionMetodo.querySelector('.content-text h2');
    const sectionMetodoContent = sectionMetodo.querySelector('.content-text p');
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

    tlMetodo.from(sectionMetodoContent, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlMetodo.from(sectionMetodoNavigation, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlMetodo.from(sectionMetodoCards, {
        opacity: 0,
        rotate: 10,
        x: 400,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.4,
    }, '-=0.6');
}

function animateCertificacoesNiveisSection() {
    const sectionNiveis = document.querySelector('#niveis');
    const sectionNiveisTitle = sectionNiveis.querySelector('.content-text h2');
    const sectionNiveisContent = sectionNiveis.querySelector('.content-text p');
    const sectionNiveisCards = sectionNiveis.querySelectorAll('.card-nivel-certificacao');

    const tlNiveis = gsap.timeline({
        scrollTrigger: {
            trigger: sectionNiveis,
            start: "top 60%",
            end: "bottom 20%",
        }
    });

    const splitTitleNiveis = new SplitText(sectionNiveisTitle, { type: "lines" });
    tlNiveis.from(splitTitleNiveis.lines, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.inOut',
    });

    tlNiveis.from(sectionNiveisContent, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');
    
    tlNiveis.from(sectionNiveisCards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.4,
    }, '-=0.6');
}

function animateCertificacoesCertificacoesSection() {
    const sectionCertificacoes = document.querySelector('#certificacoes');
    const sectionCertificacoesTitle = sectionCertificacoes.querySelector('.content-text h2');
    const sectionCertificacoesContent = sectionCertificacoes.querySelector('.sections-certificacoes-certificacoes-content'); 
    
    gsap.from(sectionCertificacoesContent, {
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionCertificacoes,
            start: "0% 90%",
            end: "20% 50%",
            scrub: true,
            once: true,
        }
    });

    const tlCertificacoes = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCertificacoes,
            start: "top 50%",
            end: "bottom 20%",
        }
    });

    const splitTitleCertificacoes = new SplitText(sectionCertificacoesTitle, { type: "words" });
    tlCertificacoes.from(splitTitleCertificacoes.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.inOut',
    });

    const listBigLinkRows = sectionCertificacoes.querySelectorAll('.list-big-link-row');

    listBigLinkRows.forEach(row => {
        const listBigLinkRowTitle = row.querySelector('.list-big-link-row-header h3');
        const listBigLinkRowItems = row.querySelectorAll('.list-big-link-row ul li');

        listBigLinkRowItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.zIndex = 10;
            });
            item.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    item.style.zIndex = '';
                }, 300);
            });
        });

        const tlListBigLinkRow = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 90%",
                end: "bottom 20%",
            }
        });

        if (listBigLinkRowTitle) {
            const splitListBigLinkRowTitle = new SplitText(listBigLinkRowTitle, { type: "words" });
            tlListBigLinkRow.from(splitListBigLinkRowTitle.words, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.inOut',
            });
        }

        if (listBigLinkRowItems.length > 0) {
            tlListBigLinkRow.from(listBigLinkRowItems, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.inOut',
            }, "-=0.5");
        }
    });
}

function animateCertificacoesComoObterSection() {
    const sectionComoObter = document.querySelector('#como-obter');
    const sectionComoObterTitle = sectionComoObter.querySelector('.content-text h2');
    const sectionComoObterItems = sectionComoObter.querySelectorAll('.passo-a-passo-1-item');

    const tlComoObter = gsap.timeline({
        scrollTrigger: {
            trigger: sectionComoObter,
            start: "top 80%",
            end: "bottom 20%",
            // markers: true,
        }
    });

    const splitTitleComoObter = new SplitText(sectionComoObterTitle, { type: "words" });
    tlComoObter.from(splitTitleComoObter.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.inOut',
    });

    sectionComoObterItems.forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true,
            },
        });
    });
}

function initCertificacoesAnimations() {
    animateCertificacoesHeroSection();
    animateCertificacoesMetodoSection();
    animateCertificacoesNiveisSection();
    animateCertificacoesCertificacoesSection();
    animateCertificacoesComoObterSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initCertificacoesAnimations();
});