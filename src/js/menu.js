function setSubMenuPosition() {
    const siteHeader = document.querySelector('.site-header');
    const subMenus = document.querySelectorAll('.sub-menu-wrapper');

    if (siteHeader && subMenus.length > 0) {
        const headerHeight = siteHeader.offsetHeight;
        const topValue = headerHeight + 12;

        subMenus.forEach(subMenu => {
            subMenu.style.top = `${topValue}px`;
        });
    }
}

function initSubmenuToggle() {
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            const submenu = this.nextElementSibling;

            // Fechar outros submenus
            submenuToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    const otherSubmenu = otherToggle.nextElementSibling;
                    const otherParentLi = otherToggle.closest('li');
                    if (otherSubmenu && otherSubmenu.classList.contains('sub-menu-wrapper')) {
                        otherSubmenu.classList.remove('active');
                    }
                    if (otherParentLi) {
                        otherParentLi.classList.remove('active');
                    }
                }
            });

            // Toggle no submenu atual
            const parentLi = this.closest('li');
            this.classList.toggle('active');
            if (submenu && submenu.classList.contains('sub-menu-wrapper')) {
                submenu.classList.toggle('active');
            }
            if (parentLi) {
                parentLi.classList.toggle('active');
            }
        });
    });

    // Fechar submenu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.submenu-toggle') && !e.target.closest('.sub-menu-wrapper')) {
            submenuToggles.forEach(toggle => {
                toggle.classList.remove('active');
                const submenu = toggle.nextElementSibling;
                const parentLi = toggle.closest('li');
                if (submenu && submenu.classList.contains('sub-menu-wrapper')) {
                    submenu.classList.remove('active');
                }
                if (parentLi) {
                    parentLi.classList.remove('active');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setSubMenuPosition();
    initSubmenuToggle();
});
window.addEventListener('resize', setSubMenuPosition);