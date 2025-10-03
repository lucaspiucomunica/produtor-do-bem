class ModalDenuncia {
    constructor() {
        this.modal = document.getElementById('modal-denuncia');
        this.form = document.getElementById('form-denuncia');
        this.openButtons = document.querySelectorAll('[data-modal="denuncia"]');
        this.closeButtons = this.modal?.querySelectorAll('.modal-close, .btn-close-modal');

        if (!this.modal || !this.form) return;

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
                this.showState('form');
            });
        }
    }

    openModal() {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.showState('form');
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
        this.resetForm();
    }

    showState(state) {
        const states = this.modal.querySelectorAll('.modal-state');
        states.forEach(stateEl => {
            stateEl.classList.add('hidden');
        });

        const activeState = this.modal.querySelector(`.modal-state-${state}`);
        if (activeState) {
            activeState.classList.remove('hidden');
        }
    }

    submitForm() {
        if (!this.validateForm()) {
            return;
        }

        this.showState('loading');
        this.sendFormData();
    }

    validateForm() {
        const mensagemInput = this.form.querySelector('#denuncia-mensagem');
        const emailInput = this.form.querySelector('#denuncia-email');

        // Limpar erros anteriores
        this.clearErrors();

        let isValid = true;

        // Validar mensagem (obrigatória)
        if (!mensagemInput.value.trim()) {
            this.showFieldError(mensagemInput, 'Por favor, escreva sua denúncia');
            isValid = false;
        }

        // Validar e-mail se preenchido
        if (emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                this.showFieldError(emailInput, 'Por favor, digite um e-mail válido');
                isValid = false;
            }
        }

        return isValid;
    }

    showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }

    clearErrors() {
        const errors = this.form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    sendFormData() {
        // Verificar se variáveis AJAX estão disponíveis
        if (typeof denuncia_ajax === 'undefined') {
            console.error('Modal denúncia - denuncia_ajax não está definido');
            this.showState('error');
            return;
        }

        console.log('Modal denúncia - Variáveis AJAX:', denuncia_ajax);

        // Coletar dados do formulário
        const formData = this.collectFormData();
        console.log('Modal denúncia - Dados coletados:', formData);

        const requestData = {
            action: 'submit_denuncia',
            nonce: denuncia_ajax.nonce,
            ...formData
        };

        console.log('Modal denúncia - Dados sendo enviados:', requestData);

        // Enviar via AJAX
        fetch(denuncia_ajax.ajax_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(requestData)
        })
        .then(response => {
            console.log('Modal denúncia - Resposta HTTP:', response);
            return response.json();
        })
        .then(data => {
            console.log('Modal denúncia - Dados da resposta:', data);

            if (data.success) {
                console.log('Modal denúncia - Sucesso:', data.data);
                this.showState('success');
            } else {
                console.error('Modal denúncia - Erro do servidor:', data.data);
                this.showState('error');
                this.updateErrorMessage(data.data);
            }
        })
        .catch(error => {
            console.error('Modal denúncia - Erro na requisição:', error);
            this.showState('error');
        });
    }

    collectFormData() {
        return {
            nome: this.form.querySelector('#denuncia-nome')?.value || '',
            email: this.form.querySelector('#denuncia-email')?.value || '',
            telefone: this.form.querySelector('#denuncia-telefone')?.value || '',
            mensagem: this.form.querySelector('#denuncia-mensagem')?.value || ''
        };
    }

    updateErrorMessage(errorData) {
        if (!errorData || !errorData.details) return;

        const errorState = this.modal.querySelector('.modal-state-error');
        const errorDescription = errorState?.querySelector('.modal-description');

        if (errorDescription) {
            errorDescription.textContent = `Erro: ${errorData.details}`;
        }
    }

    resetForm() {
        this.form.reset();
        this.clearErrors();
        this.showState('form');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalDenuncia();
});
