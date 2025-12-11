import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import {
    elementExists,
    createScrollTimeline,
    animateTitleLines,
    animateTitle,
    animateText,
    waitForTransition,
    initSectionAnimation,
    animateButton,
    animateCards,
    signalHeroComplete,
    animateOnScroll,
    animateScaleWithScrub,
    animateScale
} from './animations-utils.js';

function animateSouProdutorHeroSection() {
    const sectionHero = document.querySelector('#hero');
    const sectionHeroTitle = sectionHero.querySelector('.hero-content .titulo h1 .title');
    const sectionHeroTitleDestaque = sectionHero.querySelector('.hero-content .titulo h1 .destaque');
    const sectionHeroContentText = sectionHero.querySelector('.hero-content .content-text');
    const sectionHeroButton = sectionHero.querySelector('.hero-content .content-button');
    const sectionHeroBgImage = sectionHero.querySelector('.hero-bg-image img');

    const tlHero = gsap.timeline({
        onComplete: signalHeroComplete
    });

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

    if (elementExists(sectionHeroButton)) {
        animateButton(tlHero, sectionHeroButton, CONFIG.offset.normal);
    }
}

function animateSouProdutorIntroSection() {
    const sectionIntro = document.querySelector('#introducao');
    const sectionIntroTitle = sectionIntro.querySelector('.content-text h2');
    const sectionIntroCards = sectionIntro.querySelectorAll('.card');

    const tlIntro = createScrollTimeline(sectionIntro);

    animateTitleLines(tlIntro, sectionIntroTitle, CONFIG.offset.none);
    animateCards(tlIntro, sectionIntroCards, CONFIG.offset.normal);
}

function animateSouProdutorPdbSection() {
    const sectionPdb = document.querySelector('#produtor-do-bem');
    const sectionPdbTitle = sectionPdb.querySelector('.content-text h2');
    const sectionPdbItems = sectionPdb.querySelectorAll('.lista-itens-icones-imagens-item');

    const tlPdb = createScrollTimeline(sectionPdb, 'veryEarly');

    animateTitle(tlPdb, sectionPdbTitle, CONFIG.offset.none);

    sectionPdbItems.forEach(item => {
        animateOnScroll(item, item, 'item');
    });
}

function buildGridDataStructure() {
    const section = document.querySelector('.sections-sou-produtor-conectamos');
    if (!section) return [];

    const cards = Array.from(section.querySelectorAll('.item'));
    const gridRows = Array.from(section.querySelectorAll('.grid-conexoes > *'));

    return cards.map((card, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        return {
            element: card,
            row,
            col,
            icon: card.querySelector('.svg-inline'),
            title: card.querySelector('h3'),
            connectors: findAdjacentConnectors(row, col, gridRows)
        };
    });
}

function findAdjacentConnectors(row, col, gridRows) {
    const connectors = { top: null, bottom: null, left: null, right: null };

    // Conectores verticais (esquerda/direita) na mesma linha
    const currentRowIndex = row * 2;
    if (currentRowIndex < gridRows.length) {
        const currentRowElement = gridRows[currentRowIndex];
        const rowItems = currentRowElement.querySelectorAll('.item, .conector-coluna');

        if (col > 0) {
            connectors.left = rowItems[col * 2 - 1] || null;
        }
        if (col < 2) {
            connectors.right = rowItems[col * 2 + 1] || null;
        }
    }

    // Conectores horizontais (cima/baixo)
    if (row > 0) {
        const topConnectorRowIndex = row * 2 - 1;
        if (topConnectorRowIndex >= 0 && topConnectorRowIndex < gridRows.length) {
            const topConnectorRow = gridRows[topConnectorRowIndex];
            const topConnectors = topConnectorRow.querySelectorAll('.conector-linha');
            connectors.top = topConnectors[col] || null;
        }
    }

    if (row < 2) {
        const bottomConnectorRowIndex = row * 2 + 1;
        if (bottomConnectorRowIndex < gridRows.length) {
            const bottomConnectorRow = gridRows[bottomConnectorRowIndex];
            const bottomConnectors = bottomConnectorRow.querySelectorAll('.conector-linha');
            connectors.bottom = bottomConnectors[col] || null;
        }
    }

    return connectors;
}

function setConnectorActive(cardData, isActive) {
    Object.values(cardData.connectors).forEach((connector) => {
        if (connector) {
            if (isActive) {
                connector.classList.add('active');
            } else {
                connector.classList.remove('active');
            }
        }
    });
}

function setupCardHover(cardData) {
    cardData.element.addEventListener('mouseenter', () => {
        setConnectorActive(cardData, true);
    });

    cardData.element.addEventListener('mouseleave', () => {
        setConnectorActive(cardData, false);
    });
}

function initConectamosHoverEffect() {
    const section = document.querySelector('.sections-sou-produtor-conectamos');
    if (!section) return;

    const gridData = buildGridDataStructure();
    if (gridData.length === 0) return;

    gridData.forEach(cardData => {
        setupCardHover(cardData);
    });
}

function animateSouProdutorConectamosSection() {
    const sectionConectamos = document.querySelector('#conectamos');
    const sectionConectamosBox = sectionConectamos.querySelector('#conectamos .box');
    const sectionConectamosTitle = sectionConectamos.querySelector('.content-text h2');
    const sectionConectamosText = sectionConectamos.querySelectorAll('.content-text p');
    const sectionConectamosGrid = sectionConectamos.querySelector('.grid-conexoes');

    animateScaleWithScrub(sectionConectamosBox, sectionConectamos);

    const tlConectamos = gsap.timeline({
        scrollTrigger: {
            trigger: sectionConectamos,
            start: "0% 70%",
            end: "50% 50%",
        }
    });

    animateTitle(tlConectamos, sectionConectamosTitle, CONFIG.offset.none);
    animateText(tlConectamos, sectionConectamosText, CONFIG.offset.normal);
    animateScale(tlConectamos, sectionConectamosGrid, CONFIG.transform.scale.medium, CONFIG.offset.normal);
}

function initSouProdutorAnimations() {
    // Aguarda transição completar antes de animar hero section
    waitForTransition(() => {
        animateSouProdutorHeroSection();
    });

    // Usa initSectionAnimation para aguardar Hero se visível na viewport inicial
    initSectionAnimation('#introducao', animateSouProdutorIntroSection);
    initSectionAnimation('#produtor-do-bem', animateSouProdutorPdbSection);
    initSectionAnimation('#conectamos', animateSouProdutorConectamosSection);

    // Inicializa efeito de hover na seção Conectamos
    initConectamosHoverEffect();
}

document.addEventListener('DOMContentLoaded', () => {
    initSouProdutorAnimations();
});
