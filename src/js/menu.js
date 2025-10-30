const SubMenu = {
    setPosition() {
        const contentHeader = document.querySelector('.site-header .site-header-content');
        const subMenus = document.querySelectorAll('.sub-menu-wrapper');

        if (contentHeader && subMenus.length > 0) {
            const topValue = contentHeader.offsetHeight + contentHeader.offsetTop;
            subMenus.forEach(subMenu => {
                subMenu.style.top = `${topValue}px`;
            });
        }
    },

    closeSubmenu(toggle) {
        const parentLi = toggle.closest('li');
        const submenu = parentLi?.querySelector('.sub-menu-wrapper');

        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');

        if (submenu) {
            submenu.classList.remove('active');
        }
        if (parentLi) {
            parentLi.classList.remove('active');
        }
    },

    closeAllSubmenus() {
        const submenuToggles = document.querySelectorAll('.submenu-toggle');
        submenuToggles.forEach(toggle => this.closeSubmenu(toggle));
    },

    toggleSubmenu(toggle) {
        const parentLi = toggle.closest('li');
        const submenu = parentLi?.querySelector('.sub-menu-wrapper');
        const isActive = toggle.classList.contains('active');

        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', !isActive);

        if (submenu) {
            submenu.classList.toggle('active');
        }
        if (parentLi) {
            parentLi.classList.toggle('active');
        }
    },

    init() {
        const submenuToggles = document.querySelectorAll('.submenu-toggle');

        if (submenuToggles.length === 0) {
            console.warn('Nenhum .submenu-toggle encontrado');
            return;
        }

        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Fechar outros submenus
                submenuToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        this.closeSubmenu(otherToggle);
                    }
                });

                this.toggleSubmenu(toggle);
            });
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-header nav')) {
                this.closeAllSubmenus();
            }
        });

        this.setPosition();
    }
};

const MobileMenu = {
    wrapper: null,
    openBtn: null,
    closeBtn: null,
    isOpen: false,
    scrollbarWidth: 0,

    calculateScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    },

    lockScroll() {
        this.scrollbarWidth = this.calculateScrollbarWidth();
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    },

    unlockScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    },

    open() {
        if (this.isOpen || !this.wrapper) return;

        this.isOpen = true;
        this.lockScroll();

        this.wrapper.classList.remove('site-menu-mobile-wrapper-hidden');

        gsap.fromTo(this.wrapper,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            }
        );
    },

    close() {
        if (!this.isOpen || !this.wrapper) return;

        this.isOpen = false;

        gsap.to(this.wrapper, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                this.wrapper.classList.add('site-menu-mobile-wrapper-hidden');
                this.unlockScroll();
            }
        });
    },

    init() {
        this.wrapper = document.querySelector('.site-menu-mobile-wrapper');
        this.openBtn = document.querySelector('#menu-mobile-open');
        this.closeBtn = document.querySelector('#menu-mobile-close');

        if (!this.wrapper || !this.openBtn || !this.closeBtn) {
            console.warn('Elementos do menu mobile não encontrados');
            return;
        }

        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });

        this.closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.close();
        });

        const menuLinks = this.wrapper.querySelectorAll('a, button');
        menuLinks.forEach(link => {
            if (link.id !== 'menu-mobile-close') {
                link.addEventListener('click', () => {
                    this.close();
                });
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SubMenu.init();
    MobileMenu.init();
});
window.addEventListener('resize', ThemeUtils.debounce(() => SubMenu.setPosition(), 250));