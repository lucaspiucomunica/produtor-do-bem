/**
 * Sistema de Accordion FAQ
 *
 * Componente reutiliz�vel para FAQ accordion com busca e "ver mais/menos".
 * Suporta m�ltiplos items abertos e anima��es GSAP.
 *
 * Uso:
 * Accordion.init();
 */

class Accordion {
    static container = null;
    static items = [];
    static searchInput = null;
    static loadMoreBtn = null;
    static footer = null;
    static emptyState = null;
    static initialized = false;
    static itemsPerPage = 8;
    static currentVisibleCount = 8;
    static totalItems = 0;
    static allItemsVisible = false;

    /**
     * Inicializa o accordion
     */
    static init() {
        if (this.initialized) return;

        this.container = document.getElementById('faq-accordion');
        this.searchInput = document.getElementById('faq-search-input');
        this.loadMoreBtn = document.getElementById('faq-load-more');
        this.footer = document.getElementById('faq-footer');
        this.emptyState = document.getElementById('faq-empty-state');

        if (!this.container) return;

        this.items = Array.from(this.container.querySelectorAll('.faq-item'));
        this.totalItems = this.items.length;

        this.bindEvents();
        this.initialized = true;
    }

    /**
     * Vincula eventos
     */
    static bindEvents() {
        // Toggle accordion items (event delegation)
        this.container.addEventListener('click', (e) => {
            const toggle = e.target.closest('[data-faq-toggle]');
            if (toggle) {
                e.preventDefault();
                this.toggleItem(toggle);
            }
        });

        // Search input (debounced)
        if (this.searchInput) {
            this.searchInput.addEventListener('input',
                ThemeUtils.debounce((e) => {
                    this.handleSearch(e.target.value);
                }, 300)
            );
        }

        // Load more/less button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                if (this.allItemsVisible) {
                    this.showLess();
                } else {
                    this.loadMore();
                }
            });
        }
    }

    /**
     * Toggle item aberto/fechado
     */
    static toggleItem(toggle) {
        const item = toggle.closest('.faq-item');
        const content = item.querySelector('.faq-item-content');
        const icon = item.querySelector('.faq-item-icon');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            this.closeItem(toggle, item, content, icon);
        } else {
            this.openItem(toggle, item, content, icon);
        }
    }

    /**
     * Abre item
     */
    static openItem(toggle, item, content, icon) {
        toggle.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        item.classList.add('faq-item-active');

        // Animar altura do conte�do
        const body = content.querySelector('.faq-item-body');

        if (typeof gsap !== 'undefined') {
            // Definir altura 0 e depois animar para altura real
            gsap.set(content, { height: 0 });
            content.style.display = 'block';

            const height = body.offsetHeight;

            gsap.to(content, {
                height: height,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                    content.style.height = 'auto';
                }
            });

            // Animar opacidade do corpo
            gsap.fromTo(body, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.3,
                delay: 0.1,
                ease: 'power2.out'
            });
        } else {
            content.style.display = 'block';
            content.style.height = 'auto';
        }

        // Animar rota��o do �cone (180deg)
        if (typeof gsap !== 'undefined') {
            gsap.to(icon, {                
                rotation: 180,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }

    /**
     * Fecha item
     */
    static closeItem(toggle, item, content, icon) {
        toggle.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        item.classList.remove('faq-item-active');

        if (typeof gsap !== 'undefined') {
            // Animar altura para 0
            gsap.to(content, {
                height: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    content.style.display = '';
                }
            });
        } else {
            content.style.height = '0';
            content.style.display = 'none';
        }

        // Animar rota��o do �cone de volta
        if (typeof gsap !== 'undefined') {
            gsap.to(icon, {
                rotation: 0,
                duration: 0.4,
                ease: 'power2.in'
            });
        }
    }

    /**
     * Handle search filtering
     */
    static handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        let visibleCount = 0;

        this.items.forEach((item) => {
            const searchText = item.getAttribute('data-search-text');
            const matches = searchTerm === '' || searchText.includes(searchTerm);

            if (matches) {
                item.style.display = '';
                item.classList.remove('faq-item-filtered');
                visibleCount++;
            } else {
                item.style.display = 'none';
                item.classList.add('faq-item-filtered');
                // Fecha item se estava aberto
                const toggle = item.querySelector('[data-faq-toggle]');
                const content = item.querySelector('.faq-item-content');
                const icon = item.querySelector('.faq-item-icon');
                if (toggle.getAttribute('aria-expanded') === 'true') {
                    this.closeItem(toggle, item, content, icon);
                }
            }
        });

        // Mostrar/esconder empty state
        if (visibleCount === 0 && searchTerm !== '') {
            this.emptyState.style.display = 'block';
        } else {
            this.emptyState.style.display = 'none';
        }

        // Esconder footer se est� buscando
        if (this.footer) {
            if (searchTerm !== '') {
                this.footer.style.display = 'none';
            } else {
                this.updateFooterVisibility();
            }
        }
    }

    /**
     * Mostra mais items (+8)
     */
    static loadMore() {
        const newVisibleCount = Math.min(
            this.currentVisibleCount + this.itemsPerPage,
            this.totalItems
        );

        const itemsToShow = this.items.slice(
            this.currentVisibleCount,
            newVisibleCount
        );

        itemsToShow.forEach(item => {
            item.classList.remove('faq-item-hidden');
        });

        // Animar entrada
        if (typeof gsap !== 'undefined') {
            gsap.from(itemsToShow, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }

        this.currentVisibleCount = newVisibleCount;

        // Atualizar estado
        if (this.currentVisibleCount >= this.totalItems) {
            this.allItemsVisible = true;
            this.updateButton();
        }
    }

    /**
     * Recolhe para 8 iniciais e fecha todos
     */
    static showLess() {
        // Fechar todos os items abertos
        this.items.forEach(item => {
            const toggle = item.querySelector('[data-faq-toggle]');
            const content = item.querySelector('.faq-item-content');
            const icon = item.querySelector('.faq-item-icon');

            if (toggle.getAttribute('aria-expanded') === 'true') {
                this.closeItem(toggle, item, content, icon);
            }
        });

        // Esconder items al�m dos 8 iniciais
        this.items.forEach((item, index) => {
            if (index >= this.itemsPerPage) {
                item.classList.add('faq-item-hidden');
            }
        });

        this.currentVisibleCount = this.itemsPerPage;
        this.allItemsVisible = false;
        this.updateButton();

        // Scroll suave para o topo da se��o
        const section = document.getElementById('faq');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Atualiza texto do bot�o
     */
    static updateButton() {
        if (!this.loadMoreBtn) return;

        if (this.allItemsVisible) {
            this.loadMoreBtn.textContent = 'Ver menos';
            if (this.footer) {
                this.footer.classList.add('faq-footer-expanded');
            }
        } else {
            this.loadMoreBtn.textContent = 'Ver mais';
            if (this.footer) {
                this.footer.classList.remove('faq-footer-expanded');
            }
        }
    }

    /**
     * Atualiza visibilidade do footer
     */
    static updateFooterVisibility() {
        if (!this.footer) return;

        const hasHiddenItems = this.currentVisibleCount < this.totalItems;

        if (hasHiddenItems || this.allItemsVisible) {
            this.footer.style.display = '';
        } else {
            this.footer.style.display = 'none';
        }
    }
}

// Expor globalmente
window.Accordion = Accordion;

// Inicializar ao carregar DOM
document.addEventListener('DOMContentLoaded', () => {
    Accordion.init();
});
