document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: false,
        ignoreMobileResize: false,
        preventDefault: true
    });

    function refreshAll() {
        if (smoother) {
            smoother.refresh();
        }
        ScrollTrigger.refresh();
    }

    window.refreshScrollSmoother = refreshAll;

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

    const debouncedRefresh = ThemeUtils.debounce(refreshAll, 250);

    window.addEventListener('resize', debouncedRefresh);
    window.addEventListener('load', refreshAll);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refreshAll);
    }
});
