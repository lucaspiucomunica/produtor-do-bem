// Funções helper para animações reutilizáveis
function animateIcon(timeline, element) {
    if (element) {
        timeline.from(element, {
            opacity: 0,
            x: -80,
            rotate: -10,
            duration: 0.8,
            ease: 'power2.inOut',
        });
    }
}

function animateTitle(timeline, element, offset = "-=0.6") {
    if (element) {
        const splitTitle = new SplitText(element, { type: "words" });
        timeline.from(splitTitle.words, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.inOut',
        }, offset);
    }
}

function animateText(timeline, element, offset = "-=0.6") {
    if (element) {
        timeline.from(element, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.inOut',
        }, offset);
    }
}

function animateSlideX(timeline, element, distance = 40, offset = "-=0.6") {
    if (element) {
        timeline.from(element, {
            opacity: 0,
            x: distance,
            duration: 0.8,
            ease: 'power2.inOut',
        }, offset);
    }
}

function animateSlideY(timeline, element, distance = 40, offset = "-=0.6", stagger = 0.2) {
    if (element) {
        timeline.from(element, {
            opacity: 0,
            y: distance,
            duration: 0.8,
            stagger: stagger,
            ease: 'power2.inOut',
        }, offset);
    }
}

function heroProtocoloAnimation() {
    const hero = document.querySelector('.sections-cpt-protocolo-hero');

    if (hero) {
        const timeline = gsap.timeline();

        animateIcon(timeline, hero.querySelector('.hero-header-icon'));
        animateTitle(timeline, hero.querySelector('.content-text h1'));
        animateText(timeline, hero.querySelectorAll('.content-text p'));
        animateTitle(timeline, hero.querySelector('.hero-destaques-subtitulo .content-text h2'));
        
        const heroDestaques = hero.querySelectorAll('.hero-destaque');
        if (heroDestaques.length) {
            timeline.from(heroDestaques, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.inOut',
            }, "-=0.6");
        }
        
        const heroInfosExtras = hero.querySelector('.hero-infos-extras');
        if (heroInfosExtras) {
            timeline.from(heroInfosExtras, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.inOut',
            }, "-=0.6");
        }
    }
}

function heroEmBreveProtocoloAnimation() {
    const heroEmBreve = document.querySelector('.sections-cpt-protocolo-hero-em-breve');

    if (heroEmBreve) {
        const timeline = gsap.timeline();

        animateIcon(timeline, heroEmBreve.querySelector('.hero-header-icon'));
        animateSlideX(timeline, heroEmBreve.querySelector('.content-text .tag-1'));
        animateTitle(timeline, heroEmBreve.querySelector('.content-text h1'));
        animateText(timeline, heroEmBreve.querySelectorAll('.content-text p'));
        animateText(timeline, heroEmBreve.querySelector('.content-text .btn-wrapper'));
    }
}

function protocoloAnimation() {
    const protocolo = document.querySelector('#protocolo');

    if(protocolo) {
        const tlProtocolo = gsap.timeline({
            scrollTrigger: {
                trigger: protocolo,
                start: "top 60%",
                end: "bottom 20%",
                // markers: true,
            }
        });

        animateTitle(tlProtocolo, protocolo.querySelector('.protocolo-content .content-text h2'), 0);
        animateText(tlProtocolo, protocolo.querySelectorAll('.protocolo-content .content-text p'));
        animateSlideY(tlProtocolo, protocolo.querySelector('.protocolo-relation'));
        animateSlideY(tlProtocolo, protocolo.querySelectorAll('.protocolo-cards .card-protocol-nivel'));
        
        const listFontes = protocolo.querySelector('.list-fontes');
        if(listFontes) {
            gsap.from(listFontes.querySelectorAll('li'), {
                scrollTrigger: {
                    trigger: listFontes,
                    start: "top 90%",
                    end: "bottom 20%",
                    // markers: true,
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.inOut',
                stagger: 0.2,
            });
        }
    }
}

function apendiceBccEccAnimation() {
    const apendiceBccEcc = document.querySelector('#apendice');

    if(apendiceBccEcc) {
        const tlApendiceBccEcc = gsap.timeline({
            scrollTrigger: {
                trigger: apendiceBccEcc,
                start: "top 80%",
                end: "bottom 20%",
                // markers: true,
            }
        });

        animateSlideY(tlApendiceBccEcc, apendiceBccEcc.querySelector('.sections-cpt-protocolo-apendice-bcc-ecc-content'), 40, 0);
    }
}

function initProtocoloAnimations() {
    heroProtocoloAnimation();
    heroEmBreveProtocoloAnimation();
    protocoloAnimation();
    apendiceBccEccAnimation();
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicia as animações
    initProtocoloAnimations();
});