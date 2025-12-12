/**
 * Funções utilitárias reutilizáveis para animações GSAP
 */

import { ANIMATION_CONFIG as CONFIG } from './animations-config.js';
import { waitForTransition } from '../page-transition.js';

/**
 * Marca o body como pronto para animações (previne FOUC)
 * 
 * USO: Apenas para elementos GLOBAIS que não dependem de transições de página
 * Exemplos: cursor customizado, elementos fixos, modais
 * 
 * IMPORTANTE: Para páginas normais, NÃO use esta função!
 * O sistema de transição de página adiciona 'animations-ready' automaticamente
 */
export function setAnimationsReady() {
    document.body.classList.add('animations-ready');
}

/**
 * @deprecated Esta função não é mais necessária
 * O sistema de transição agora adiciona 'animations-ready' automaticamente
 * Use apenas waitForTransition() para aguardar o fim da transição
 */
export function setAnimationsReadyAfterTransition() {
    waitForTransition(() => {
        document.body.classList.add('animations-ready');
    });
}

/**
 * Verifica se um elemento existe antes de animar
 */
export function elementExists(element) {
    return element && element !== null;
}

/**
 * Cria uma timeline GSAP com ScrollTrigger
 */
export function createScrollTimeline(trigger, configKey = 'default') {
    const config = CONFIG.scrollTrigger[configKey] || CONFIG.scrollTrigger.default;

    return gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            ...config
        }
    });
}

/**
 * Anima texto usando SplitText (words)
 */
export function animateTitle(timeline, element, offset = CONFIG.offset.normal) {
    if (!elementExists(element)) return;

    const splitText = new SplitText(element, { type: "words" });
    timeline.from(splitText.words, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        stagger: CONFIG.stagger.fast,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima texto usando SplitText (lines)
 */
export function animateTitleLines(timeline, element, offset = CONFIG.offset.normal, duration = CONFIG.duration.slow) {
    if (!elementExists(element)) return;

    const splitText = new SplitText(element, { type: "lines" });
    timeline.from(splitText.lines, {
        opacity: 0,
        y: CONFIG.distance.large,
        duration: duration,
        stagger: CONFIG.stagger.medium,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima parágrafo ou texto simples (fade in + slide up)
 */
export function animateText(timeline, element, offset = CONFIG.offset.normal, stagger = CONFIG.stagger.medium) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        stagger: stagger,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima elemento com slide horizontal
 */
export function animateSlideX(timeline, element, distance = CONFIG.distance.medium, offset = CONFIG.offset.normal) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        x: distance,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima elemento com slide vertical
 */
export function animateSlideY(timeline, element, distance = CONFIG.distance.medium, offset = CONFIG.offset.normal, stagger = CONFIG.stagger.medium) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        y: distance,
        duration: CONFIG.duration.normal,
        stagger: stagger,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima elemento com fade in (apenas opacity)
 */
export function animateFadeIn(timeline, element, offset = CONFIG.offset.normal, stagger = CONFIG.stagger.medium) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        duration: CONFIG.duration.normal,
        stagger: stagger,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima ícone (fade + slide + rotate)
 */
export function animateIcon(timeline, element, offset = CONFIG.offset.none) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        x: -CONFIG.distance.large,
        rotate: -CONFIG.transform.rotate.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima botão (fade + slide + scale)
 */
export function animateButton(timeline, element, offset = CONFIG.offset.normal) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        y: CONFIG.distance.medium,
        scale: CONFIG.transform.scale.small,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima elemento com scale (zoom in)
 */
export function animateScale(timeline, element, scale = CONFIG.transform.scale.medium, offset = CONFIG.offset.normal) {
    if (!elementExists(element)) return;

    timeline.from(element, {
        opacity: 0,
        scale: scale,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    }, offset);
}

/**
 * Anima container com scale e scrub (efeito parallax)
 */
export function animateScaleWithScrub(element, trigger, configKey = 'scale') {
    if (!elementExists(element)) return;

    const config = CONFIG.scrollTrigger[configKey];

    gsap.from(element, {
        scale: CONFIG.transform.scale.medium,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        scrollTrigger: {
            trigger: trigger,
            start: config.start,
            end: config.end,
            scrub: true,
            once: true,
        }
    });
}

/**
 * Anima cards em stagger (múltiplos elementos)
 */
export function animateCards(timeline, elements, offset = CONFIG.offset.normal, stagger = CONFIG.stagger.medium) {
    if (!elementExists(elements) || elements.length === 0) return;

    timeline.from(elements, {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: stagger,
    }, offset);
}

/**
 * Anima cards com scale em stagger
 */
export function animateCardsWithScale(timeline, elements, offset = CONFIG.offset.normal, stagger = CONFIG.stagger.medium) {
    if (!elementExists(elements) || elements.length === 0) return;

    timeline.from(elements, {
        opacity: 0,
        y: CONFIG.distance.medium,
        scale: CONFIG.transform.scale.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
        stagger: stagger,
    }, offset);
}

/**
 * Cria animação standalone com ScrollTrigger (não usa timeline)
 */
export function animateOnScroll(element, trigger, configKey = 'item', animationProps = {}) {
    if (!elementExists(element)) return;

    const config = CONFIG.scrollTrigger[configKey];
    const defaultProps = {
        opacity: 0,
        y: CONFIG.distance.medium,
        duration: CONFIG.duration.normal,
        ease: CONFIG.easing.default,
    };

    gsap.from(element, {
        ...defaultProps,
        ...animationProps,
        scrollTrigger: {
            trigger: trigger || element,
            ...config,
        }
    });
}

/**
 * Aguarda a transição de página completar antes de executar animações
 */
export { waitForTransition };

// Evento para sinalizar fim da animação do Hero
export const HERO_ANIMATION_COMPLETE = 'heroAnimationComplete';

/**
 * Sinaliza que a animação do Hero terminou
 */
export function signalHeroComplete() {
    document.dispatchEvent(new CustomEvent(HERO_ANIMATION_COMPLETE));
}

// Flags capturadas APENAS no carregamento inicial da página
// Isso diferencia "página carregou com hash" de "clicou em âncora na mesma página"
const initialPageLoadWithHash = !!window.location.hash;
let initialHashTargetElement = null;

// Capturar elemento alvo do hash no carregamento inicial
if (initialPageLoadWithHash) {
    const targetId = window.location.hash.substring(1);
    // Usar setTimeout para garantir que o DOM está pronto
    setTimeout(() => {
        initialHashTargetElement = document.getElementById(targetId);
    }, 0);
}

/**
 * Verifica se a página foi carregada com hash na URL
 * Retorna false para cliques em âncoras na mesma página
 */
export function hasUrlHash() {
    return initialPageLoadWithHash;
}

/**
 * Aplica estado final do hero sem animar (para navegação com hash)
 */
export function applyHeroFinalState(heroSection) {
    if (!heroSection) return;

    // Aplicar estado final em todos os elementos do hero
    const heroElements = heroSection.querySelectorAll('[class*="hero-"]');
    gsap.set(heroElements, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        clearProps: 'all'
    });
}

/**
 * Verifica se uma seção está ANTES do elemento alvo do hash no DOM
 * Usa flags capturadas no carregamento inicial (não verifica hash atual)
 */
export function isBeforeHashTarget(sectionElement) {
    // Usa flags de carregamento inicial para diferenciar de cliques em âncoras
    if (!initialPageLoadWithHash) return false;

    // Capturar elemento alvo se ainda não foi capturado
    if (!initialHashTargetElement) {
        const targetId = window.location.hash.substring(1);
        initialHashTargetElement = document.getElementById(targetId);
    }

    if (!initialHashTargetElement) return false;

    // Comparar posição no DOM usando compareDocumentPosition
    const position = sectionElement.compareDocumentPosition(initialHashTargetElement);

    // DOCUMENT_POSITION_FOLLOWING (4) = hashTarget vem depois
    return (position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}

/**
 * Aplica estado final de uma seção sem animar (para navegação com hash)
 */
export function applySectionFinalState(section) {
    if (!section) return;

    // Aplicar estado final em todos os elementos filhos
    const elements = section.querySelectorAll('*');
    gsap.set(elements, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        clearProps: 'all'
    });
}

/**
 * Inicializa animação de seção com sequenciamento inteligente
 * Se a seção está na viewport inicial, aguarda o Hero completar
 */
export function initSectionAnimation(sectionSelector, animationFn, options = {}) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    // Se seção está antes do hash alvo, aplicar estado final sem animar
    if (isBeforeHashTarget(section)) {
        applySectionFinalState(section);
        return;
    }

    const threshold = options.viewportThreshold || 0.6;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * threshold;
    const isInInitialViewport = rect.top < triggerPoint;

    if (isInInitialViewport) {
        // Mantém seção invisível enquanto aguarda Hero (previne FOUC)
        gsap.set(section, { opacity: 0 });

        document.addEventListener(HERO_ANIMATION_COMPLETE, () => {
            // Restaura visibilidade e executa animação
            gsap.set(section, { opacity: 1 });
            animationFn();
        }, { once: true });
    } else {
        animationFn();
    }
}
