class ModalDenuncia extends BaseForm {
    constructor() {
        super('#form-denuncia');

        this.modal = document.getElementById('modal-denuncia');
        this.openButtons = document.querySelectorAll('[data-modal="denuncia"]');
        this.closeButtons = this.modal?.querySelectorAll('.modal-close, .btn-close-modal');

        if (!this.modal || !this.form) return;

        this.selectors = {
            nome: '#denuncia-nome',
            email: '#denuncia-email',
            telefone: '#denuncia-telefone',
            mensagem: '#denuncia-mensagem'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Botões de abrir modal
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        // Botões de fechar modal
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Fechar ao clicar no overlay
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });

        // Submit do formulário
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        // Botão de retry
        const retryButton = this.modal.querySelector('.btn-retry');
        if (retryButton) {
            retryButton.addEventListener('click', () => {
                this.showModalState('form');
            });
        }
    }

    openModal() {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.showModalState('form');
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
        this.resetForm();
    }

    showModalState(state) {
        const states = this.modal.querySelectorAll('.modal-state');
        states.forEach(stateEl => stateEl.classList.add('hidden'));

        const activeState = this.modal.querySelector(`.modal-state-${state}`);
        if (activeState) {
            activeState.classList.remove('hidden');
        }
    }

    submitForm() {
        if (!this.validateForm()) return;

        this.showModalState('loading');
        this.sendFormData();
    }

    validateForm() {
        const mensagemInput = this.form.querySelector(this.selectors.mensagem);
        const emailInput = this.form.querySelector(this.selectors.email);

        this.clearErrors();

        let isValid = this.validateRequiredField(mensagemInput, 'Por favor, escreva sua denúncia');

        if (emailInput.value.trim()) {
            if (!ThemeUtils.validateEmail(emailInput.value)) {
                this.showFieldError(emailInput, 'Por favor, digite um e-mail válido');
                isValid = false;
            }
        }

        return isValid;
    }

    async sendFormData() {
        try {
            const formData = this.collectFormData();
            await this.sendAjaxRequest(
                window.denuncia_ajax,
                'submit_denuncia',
                formData
            );
            this.showModalState('success');
        } catch (error) {
            this.showModalState('error');
            this.updateErrorMessage({ details: error.message });
        }
    }

    collectFormData() {
        return {
            nome: this.form.querySelector(this.selectors.nome)?.value || '',
            email: this.form.querySelector(this.selectors.email)?.value || '',
            telefone: this.form.querySelector(this.selectors.telefone)?.value || '',
            mensagem: this.form.querySelector(this.selectors.mensagem)?.value || ''
        };
    }

    updateErrorMessage(errorData) {
        if (!errorData?.details) return;

        const errorState = this.modal.querySelector('.modal-state-error');
        const errorDescription = errorState?.querySelector('.modal-description');

        if (errorDescription) {
            errorDescription.textContent = `Erro: ${errorData.details}`;
        }
    }

    resetForm() {
        super.resetForm();
        this.showModalState('form');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalDenuncia();
});
