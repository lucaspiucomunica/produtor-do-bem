const ThemeUtils = {
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    log(...args) {
        if (window.THEME_DEBUG === true) {
            console.log(...args);
        }
    },

    logError(...args) {
        if (window.THEME_DEBUG === true) {
            console.error(...args);
        }
    }
};
