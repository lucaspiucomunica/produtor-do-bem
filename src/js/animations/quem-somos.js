function animateQuemSomosHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelectorAll('.hero-content .content-text p');
    const sectionHeroImageContent = sectionHero.querySelector('.hero-image .hero-image-content');
    const sectionHeroImage = sectionHero.querySelector('.hero-image .hero-image-content img');
    const sectionHeroImageIcons = sectionHero.querySelectorAll('.hero-image .hero-image-icons .hero-image-icon');

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
    }, '-=0.6');

    tlHero.from(sectionHeroImageContent, {
        opacity: 0,
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
    }, '-=0.6');

    tlHero.from(sectionHeroImageIcons, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2
    }, '-=0.6');


    gsap.set(sectionHeroImage, {
        scale: 1,
    });

    gsap.to(sectionHeroImage, {
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionHero,
            start: "top 0%",
            end: "bottom 0%",
            scrub: true,
        }
    });

    gsap.set(sectionHeroImageIcons, {
        y: 0,
    });
    
    gsap.to(sectionHeroImageIcons, {
        y: -80,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
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
    const sectionOQueFazemosCarrosselSignificaNavigation = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .swiper-carrossel-o-que-significa-navigation');
    const sectionOQueFazemosSwiper = sectionOQueFazemos.querySelector('.swiper-o-que-fazemos');
    const sectionOQueFazemosCarrosselSignifica = sectionOQueFazemos.querySelector('.carrossel-o-que-significa');
    const sectionOQueFazemosCarrosselSignificaTitle = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .content-text h3');
    const sectionOQueFazemosCarrosselSignificaDescription = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .content-text p');
    const sectionOQueFazemosCarrosselSignificaProgress = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .progress-carrossel');
    const sectionOQueFazemosCarrosselSignificaSwiper = sectionOQueFazemos.querySelector('.carrossel-o-que-significa .swiper-o-que-significa');

    const tlOQueFazemos = gsap.timeline({
        scrollTrigger: {
            trigger: sectionOQueFazemos,
            start: "top 60%",
            end: "bottom 20%",
        }
    });

    const splitTitle = new SplitText(sectionOQueFazemosTitle, { type: "words" });
    tlOQueFazemos.from(splitTitle.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    });

    tlOQueFazemos.from(sectionOQueFazemosDescription, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');

    tlOQueFazemos.from(sectionOQueFazemosCarrosselSignificaNavigation, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.4');
    
    tlOQueFazemos.from(sectionOQueFazemosSwiper, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');

    gsap.from(sectionOQueFazemosCarrosselSignifica, {
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionOQueFazemosCarrosselSignifica,
            start: "0% 90%",
            end: "50% 50%",
            scrub: true,
            once: true,
        }
    });

    const tlOQueFazemosCarrosselSignifica = gsap.timeline({
        scrollTrigger: {
            trigger: sectionOQueFazemosCarrosselSignifica,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    const splitTitleOQueFazemosCarrosselSignifica = new SplitText(sectionOQueFazemosCarrosselSignificaTitle, { type: "words" });
    tlOQueFazemosCarrosselSignifica.from(splitTitleOQueFazemosCarrosselSignifica.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
    });

    tlOQueFazemosCarrosselSignifica.from(sectionOQueFazemosCarrosselSignificaDescription, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');

    tlOQueFazemosCarrosselSignifica.from(sectionOQueFazemosCarrosselSignificaProgress, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');

    tlOQueFazemosCarrosselSignifica.from(sectionOQueFazemosCarrosselSignificaSwiper, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');
}

function animateQuemSomosProdutoresEEmpresasSection() {
    const sectionProdutoresEEmpresas = document.querySelector('#produtores-e-empresas');
    const sectionProdutoresEEmpresasTitle = sectionProdutoresEEmpresas.querySelector('.content-text h2');
    const sectionProdutoresEEmpresasIconeLogo = sectionProdutoresEEmpresas.querySelector('.icone-logo');
    const sectionProdutoresEEmpresasLogos = sectionProdutoresEEmpresas.querySelectorAll('.item-logo img');

    const tlProdutoresEEmpresas = gsap.timeline({
        scrollTrigger: {
            trigger: sectionProdutoresEEmpresas,
            start: "top 60%",
            end: "bottom 20%",
        }
    });

    tlProdutoresEEmpresas.from(sectionProdutoresEEmpresasIconeLogo, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
    });

    const splitTitleProdutoresEEmpresas = new SplitText(sectionProdutoresEEmpresasTitle, { type: "lines" });
    tlProdutoresEEmpresas.from(splitTitleProdutoresEEmpresas.lines, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    }, '-=0.6');

    tlProdutoresEEmpresas.from(sectionProdutoresEEmpresasLogos, {
        opacity: 0,
        y: 40,
        scale: 0.6,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2
    }, '-=0.6');
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
        scale: 0.8,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: sectionCTConsultivo,
            start: "0% 90%",
            end: "20% 50%",
            scrub: true,
            once: true,
        }
    });
    
    const tlCTConsultivo = gsap.timeline({
        scrollTrigger: {
            trigger: sectionCTConsultivo,
            start: "0% 60%",
            end: "20% 50%",
        }
    });

    const splitTitleCTConsultivo = new SplitText(sectionCTConsultivoTitle, { type: "words" });
    tlCTConsultivo.from(splitTitleCTConsultivo.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05
    });

    tlCTConsultivo.from(sectionCTConsultivoDescription, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');
    
    tlCTConsultivo.from(sectionCTConsultivoEquipeTitle, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.6');

    tlCTConsultivo.from(sectionCTConsultivoEquipePDB, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
    }, '-=0.6');

    gsap.from(sectionCTConsultivoProtocolosCards, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.2,
        scrollTrigger: {
            trigger: sectionCTConsultivoProtocolos,
            start: "0% 90%",
            end: "20% 50%",
        }
    }, '-=0.6');
}

/**
 * Função principal que inicializa todas as animações da página.
 */
function initQuemSomosAnimations() {
    animateQuemSomosHeroSection();
    animateQuemSomosOQueFazemosSection();
    animateQuemSomosProdutoresEEmpresasSection();
    animateQuemSomosCTConsultivoSection();
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicia as animações
    initQuemSomosAnimations();
});