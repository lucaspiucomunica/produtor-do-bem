const SubMenu = {
    setPosition() {
        const contentHeader = document.querySelector('.site-header .content-header');
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

document.addEventListener('DOMContentLoaded', () => SubMenu.init());
window.addEventListener('resize', ThemeUtils.debounce(() => SubMenu.setPosition(), 250));