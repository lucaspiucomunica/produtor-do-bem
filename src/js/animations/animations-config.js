/**
 * Configurações centralizadas para animações GSAP
 */

export const ANIMATION_CONFIG = {
    // Durações padrão
    duration: {
        fast: 0.4,
        normal: 0.8,
        slow: 1.0,
    },

    // Easings padrão
    easing: {
        default: 'power2.inOut',
        in: 'power2.in',
        out: 'power2.out',
        smooth: 'power3',
    },

    // Distâncias de movimento
    distance: {
        small: 20,
        medium: 40,
        large: 80,
    },

    // Offsets para sequenciamento de timeline
    offset: {
        none: 0,
        tight: '-=0.8',
        normal: '-=0.6',
        loose: '-=0.4',
    },

    // Valores de stagger
    stagger: {
        veryFast: 0.02,
        fast: 0.05,
        normal: 0.1,
        medium: 0.2,
        slow: 0.4,
    },

    // Configurações de ScrollTrigger
    scrollTrigger: {
        default: {
            start: "top 60%",
            end: "bottom 20%",
        },
        hero: {
            start: "top 0%",
            end: "bottom 0%",
        },
        early: {
            start: "top 70%",
            end: "bottom 20%",
        },
        late: {
            start: "top 50%",
            end: "bottom 20%",
        },
        veryEarly: {
            start: "top 80%",
            end: "bottom 20%",
        },
        scale: {
            start: "0% 90%",
            end: "50% 50%",
        },
        item: {
            start: "top 90%",
            once: true,
        }
    },

    // Valores de transformação
    transform: {
        scale: {
            small: 0.5,
            medium: 0.8,
            default: 1,
            large: 1.2,
        },
        rotate: {
            small: 5,
            medium: 10,
            large: 20,
        }
    }
};
