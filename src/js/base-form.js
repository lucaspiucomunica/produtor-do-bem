class BaseForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.states = {
            loading: '.loading-state',
            success: '.success-state',
            error: '.error-state'
        };
    }

    validateRequiredField(input, errorMessage) {
        if (!input) return true;

        const isValid = input.value.trim() !== '';

        if (!isValid) {
            this.showFieldError(input, errorMessage);
        } else {
            this.clearFieldError(input);
        }

        return isValid;
    }

    validateEmail(input, errorMessage) {
        const isRequired = this.validateRequiredField(input, errorMessage);

        if (isRequired && input.value) {
            if (!ThemeUtils.validateEmail(input.value)) {
                this.showFieldError(input, errorMessage || 'Por favor, digite um e-mail válido');
                return false;
            }
        }

        return isRequired;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        const formGroup = input.closest('.form-group') || input.parentElement;
        formGroup.appendChild(errorElement);
    }

    clearFieldError(input) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showGroupError(formGroup, message) {
        this.clearGroupError(formGroup);

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        formGroup.appendChild(errorElement);
    }

    clearGroupError(formGroup) {
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearErrors() {
        const errors = this.form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    showState(state, container = this.form) {
        const states = container.querySelectorAll('.loading-state, .success-state, .error-state');
        states.forEach(stateEl => stateEl.classList.add('hidden'));

        const activeState = container.querySelector(`.${state}-state`);
        if (activeState) {
            activeState.classList.remove('hidden');
        }
    }

    async sendAjaxRequest(ajaxVars, action, formData) {
        if (typeof ajaxVars === 'undefined') {
            ThemeUtils.logError(`${action} - Variáveis AJAX não definidas`);
            throw new Error('Variáveis AJAX não disponíveis');
        }

        ThemeUtils.log(`${action} - Dados:`, formData);

        const requestData = {
            action: action,
            nonce: ajaxVars.nonce,
            ...formData
        };

        const response = await fetch(ajaxVars.ajax_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(requestData)
        });

        ThemeUtils.log(`${action} - Resposta:`, response);

        const data = await response.json();
        ThemeUtils.log(`${action} - Dados da resposta:`, data);

        if (!data.success) {
            ThemeUtils.logError(`${action} - Erro:`, data.data);
            throw new Error(data.data?.message || 'Erro ao enviar formulário');
        }

        return data;
    }

    resetForm() {
        this.form.reset();
        this.clearErrors();

        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'radio') {
                input.checked = false;
                input.closest('label')?.classList.remove('selected');
            }
        });
    }
}

// Expor globalmente para uso em outros scripts
window.BaseForm = BaseForm;