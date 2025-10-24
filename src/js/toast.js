/**
 * Sistema de Toast Global
 *
 * Componente reutilizável para exibir notificações toast.
 * Suporta empilhamento de múltiplos toasts e animações GSAP.
 *
 * Uso:
 * Toast.show('success', 'Mensagem de sucesso!', 4000);
 * Toast.show('error', 'Mensagem de erro!', 8000);
 */

class Toast {
    static container = null;
    static toasts = [];
    static initialized = false;

    /**
     * Inicializa o container de toasts
     */
    static init() {
        if (this.initialized) return;

        // Criar container de toasts
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);

        this.initialized = true;
    }

    /**
     * Exibe um toast
     * @param {string} type - Tipo do toast ('success' ou 'error')
     * @param {string} message - Mensagem a ser exibida
     * @param {number} duration - Duração em milissegundos (padrão: 4000)
     * @returns {HTMLElement} Elemento do toast criado
     */
    static show(type = 'success', message = '', duration = 4000) {
        this.init();

        const toastElement = this.createToastElement(type, message);
        this.container.appendChild(toastElement);
        this.toasts.push(toastElement);

        // Animar entrada
        this.animateIn(toastElement);

        // Iniciar progresso
        this.startProgress(toastElement, duration);

        // Auto-fechar após duração
        const autoCloseTimeout = setTimeout(() => {
            this.hide(toastElement);
        }, duration);

        // Armazenar timeout no elemento para poder cancelar se necessário
        toastElement.dataset.timeout = autoCloseTimeout;

        return toastElement;
    }

    /**
     * Cria o elemento HTML do toast
     * @param {string} type - Tipo do toast
     * @param {string} message - Mensagem
     * @returns {HTMLElement} Elemento do toast
     */
    static createToastElement(type, message) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const config = this.getToastConfig(type);

        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    ${this.getIconSvg(config.icon)}
                </div>
                <div class="toast-message">${message}</div>
                <button class="toast-close" aria-label="Fechar notificação">
                    ${this.getIconSvg('close-circle')}
                </button>
            </div>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;

        // Adicionar evento de fechar
        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', () => {
            this.hide(toast);
        });

        return toast;
    }

    /**
     * Obtém configuração do toast baseado no tipo
     * @param {string} type - Tipo do toast
     * @returns {Object} Configuração
     */
    static getToastConfig(type) {
        const configs = {
            success: {
                icon: 'tick-circle',
                class: 'toast-success'
            },
            error: {
                icon: 'info-circle',
                class: 'toast-error'
            }
        };

        return configs[type] || configs.success;
    }

    /**
     * Obtém SVG do ícone
     * @param {string} iconName - Nome do ícone
     * @returns {string} HTML do SVG
     */
    static getIconSvg(iconName) {
        // Path base dos ícones
        const iconPath = `${window.location.origin}/wp-content/themes/produtor-do-bem/src/img/iconpdb/iconpdb-${iconName}.svg`;

        // Retornar elemento img inline (será substituído por SVG real via CSS ou JavaScript se necessário)
        return `<img src="${iconPath}" alt="${iconName}" class="iconpdb" />`;
    }

    /**
     * Anima entrada do toast
     * @param {HTMLElement} toast - Elemento do toast
     */
    static animateIn(toast) {
        if (typeof gsap !== 'undefined') {
            gsap.from(toast, {
                x: 400,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
        } else {
            toast.style.opacity = '1';
        }
    }

    /**
     * Anima saída do toast
     * @param {HTMLElement} toast - Elemento do toast
     * @returns {Promise} Promise que resolve quando animação termina
     */
    static animateOut(toast) {
        return new Promise((resolve) => {
            if (typeof gsap !== 'undefined') {
                gsap.to(toast, {
                    x: 400,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.in',
                    onComplete: resolve
                });
            } else {
                toast.style.opacity = '0';
                setTimeout(resolve, 300);
            }
        });
    }

    /**
     * Inicia animação da barra de progresso
     * @param {HTMLElement} toast - Elemento do toast
     * @param {number} duration - Duração em milissegundos
     */
    static startProgress(toast, duration) {
        const progressBar = toast.querySelector('.toast-progress-bar');

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(progressBar,
                { width: '0%' },
                {
                    width: '100%',
                    duration: duration / 1000,
                    ease: 'none'
                }
            );
        } else {
            // Fallback CSS animation
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '100%';
        }
    }

    /**
     * Esconde e remove um toast
     * @param {HTMLElement} toast - Elemento do toast
     */
    static async hide(toast) {
        // Cancelar auto-close timeout se existir
        if (toast.dataset.timeout) {
            clearTimeout(parseInt(toast.dataset.timeout));
        }

        // Animar saída
        await this.animateOut(toast);

        // Remover do array
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }

        // Remover do DOM
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }

    /**
     * Remove todos os toasts
     */
    static hideAll() {
        const toastsCopy = [...this.toasts];
        toastsCopy.forEach(toast => this.hide(toast));
    }
}

// Expor Toast globalmente
window.Toast = Toast;
