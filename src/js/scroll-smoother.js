document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: false,
        ignoreMobileResize: true,
        preventDefault: true
    });

    window.refreshScrollSmoother = function() {
        if (smoother) {
            smoother.refresh();
        }
    };

    window.toggleScrollSmoother = function(enabled = true) {
        if (smoother) {
            smoother.paused(!enabled);
        }
    };

    window.scrollToElement = function(selector, position = 0) {
        if (!smoother) return;

        const scrollPosition = typeof position === 'string'
            ? position
            : `top ${position}px`;
        smoother.scrollTo(selector, true, scrollPosition);
    };

    const refreshSmoother = ThemeUtils.debounce(() => {
        if (smoother) {
            smoother.refresh();
        }
    }, 250);

    window.addEventListener('resize', refreshSmoother);
    window.addEventListener('load', () => setTimeout(refreshSmoother, 100));
});