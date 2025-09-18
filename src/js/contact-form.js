class MultiStepForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;

        this.formContainer = document.querySelector('.multi-step-form-container');
        this.progressBar = document.querySelector('.progress-line-fill');
        this.progressSteps = document.querySelectorAll('.progress-step');
        this.formSteps = document.querySelectorAll('.form-step');

        if (!this.formContainer) return;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupRadioOptions();
        this.updateUI();
    }

    setupEventListeners() {
        const nextButtons = this.formContainer.querySelectorAll('.btn-next');
        const prevButtons = this.formContainer.querySelectorAll('.btn-prev');
        const submitButton = this.formContainer.querySelector('.btn-submit');

        nextButtons.forEach(button => {
            button.addEventListener('click', () => this.nextStep());
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', () => this.prevStep());
        });

        if (submitButton) {
            submitButton.addEventListener('click', () => this.submitForm());
        }
    }

    setupRadioOptions() {
        const radioGroups = this.formContainer.querySelectorAll('.form-group-options');

        radioGroups.forEach(group => {
            const radioInputs = group.querySelectorAll('input[type="radio"]');

            radioInputs.forEach(input => {
                input.addEventListener('change', () => {
                    const labels = group.querySelectorAll('label');
                    labels.forEach(label => label.classList.remove('selected'));

                    if (input.checked) {
                        input.closest('label').classList.add('selected');
                    }
                });
            });
        });
    }

    nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    submitForm() {
        if (!this.validateCurrentStep()) {
            return;
        }

        this.currentStep = 5;
        this.updateUI();
        this.sendFormData();
    }

    sendFormData() {
        // Verificar se variáveis AJAX estão disponíveis
        if (typeof contact_form_ajax === 'undefined') {
            console.error('Multi-step form - contact_form_ajax não está definido');
            this.showErrorState();
            return;
        }

        console.log('Multi-step form - Variáveis AJAX:', contact_form_ajax);

        // Coletar dados do formulário
        const formData = this.collectFormData();
        console.log('Multi-step form - Dados coletados:', formData);

        // Mostrar estado de loading
        this.showLoadingState();

        const requestData = {
            action: 'submit_multi_step_form',
            nonce: contact_form_ajax.nonce,
            ...formData
        };

        console.log('Multi-step form - Dados sendo enviados:', requestData);

        // Enviar via AJAX
        fetch(contact_form_ajax.ajax_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(requestData)
        })
        .then(response => {
            console.log('Multi-step form - Resposta HTTP:', response);
            return response.json();
        })
        .then(data => {
            console.log('Multi-step form - Dados da resposta:', data);

            if (data.success) {
                console.log('Multi-step form - Sucesso:', data.data);
                this.showSuccessState();
            } else {
                console.error('Multi-step form - Erro do servidor:', data.data);
                this.showErrorState(data.data);
            }
        })
        .catch(error => {
            console.error('Multi-step form - Erro na requisição:', error);
            this.showErrorState({ message: 'Erro de conexão', details: error.message });
        });
    }

    collectFormData() {
        return {
            nome: document.getElementById('nome')?.value || '',
            email: document.getElementById('email')?.value || '',
            telefone: document.getElementById('telefone')?.value || '',
            'eu-sou': document.querySelector('input[name="eu-sou"]:checked')?.value || '',
            motivo: document.querySelector('input[name="motivo"]:checked')?.value || '',
            mensagem: document.getElementById('mensagem')?.value || ''
        };
    }

    showLoadingState() {
        const step5 = this.formContainer.querySelector('.form-step[data-step="5"]');
        if (!step5) return;

        const loadingState = step5.querySelector('.loading-state');
        const successState = step5.querySelector('.success-state');
        const errorState = step5.querySelector('.error-state');

        loadingState?.classList.remove('hidden');
        successState?.classList.add('hidden');
        errorState?.classList.add('hidden');
    }

    showSuccessState() {
        const step5 = this.formContainer.querySelector('.form-step[data-step="5"]');
        if (!step5) return;

        const loadingState = step5.querySelector('.loading-state');
        const successState = step5.querySelector('.success-state');
        const errorState = step5.querySelector('.error-state');

        loadingState?.classList.add('hidden');
        successState?.classList.remove('hidden');
        errorState?.classList.add('hidden');

        // Configurar botão de nova mensagem
        const newMessageButton = successState.querySelector('.btn-new-message');
        if (newMessageButton) {
            newMessageButton.onclick = () => this.resetForm();
        }
    }

    showErrorState(errorData = null) {
        const step5 = this.formContainer.querySelector('.form-step[data-step="5"]');
        if (!step5) return;

        const loadingState = step5.querySelector('.loading-state');
        const successState = step5.querySelector('.success-state');
        const errorState = step5.querySelector('.error-state');

        loadingState?.classList.add('hidden');
        successState?.classList.add('hidden');
        errorState?.classList.remove('hidden');

        // Mostrar detalhes do erro se disponível
        if (errorData && errorData.details) {
            console.log('Multi-step form - Detalhes do erro:', errorData.details);

            // Opcional: mostrar erro na interface
            const errorDescription = errorState.querySelector('.step-description');
            if (errorDescription && errorData.details) {
                errorDescription.textContent = `Erro: ${errorData.details}`;
            }
        }

        // Configurar botões de retry
        const retryButton = errorState.querySelector('.btn-retry');
        const newMessageButton = errorState.querySelector('.btn-new-message');

        if (retryButton) {
            retryButton.onclick = () => this.sendFormData();
        }

        if (newMessageButton) {
            newMessageButton.onclick = () => this.resetForm();
        }
    }

    resetForm() {
        // Limpar todos os campos
        const inputs = this.formContainer.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'radio') {
                input.checked = false;
                input.closest('label')?.classList.remove('selected');
            } else {
                input.value = '';
            }
            this.clearFieldError(input);
        });

        // Limpar erros de grupos
        const formGroups = this.formContainer.querySelectorAll('.form-group');
        formGroups.forEach(group => this.clearGroupError(group));

        // Voltar para o primeiro step
        this.currentStep = 1;
        this.updateUI();
    }

    validateCurrentStep() {
        const currentFormStep = this.formContainer.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        if (!currentFormStep) return true;

        let isValid = true;

        switch (this.currentStep) {
            case 1:
                isValid = this.validateStep1(currentFormStep);
                break;
            case 2:
                isValid = this.validateStep2(currentFormStep);
                break;
            case 3:
                isValid = this.validateStep3(currentFormStep);
                break;
            case 4:
                isValid = this.validateStep4(currentFormStep);
                break;
        }

        return isValid;
    }

    validateStep1(step) {
        const nameInput = step.querySelector('#nome');
        return this.validateRequiredField(nameInput, 'Por favor, digite seu nome');
    }

    validateStep2(step) {
        const emailInput = step.querySelector('#email');
        const isEmailValid = this.validateRequiredField(emailInput, 'Por favor, digite um e-mail válido');

        if (isEmailValid && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                this.showFieldError(emailInput, 'Por favor, digite um e-mail válido');
                return false;
            }
        }

        return isEmailValid;
    }

    validateStep3(step) {
        const radioGroups = step.querySelectorAll('.form-group-options');
        let isValid = true;

        radioGroups.forEach(group => {
            const radioInputs = group.querySelectorAll('input[type="radio"]');
            const hasSelection = Array.from(radioInputs).some(input => input.checked);
            const formGroup = group.parentElement;

            if (!hasSelection) {
                isValid = false;
                let errorMessage = '';

                // Define mensagem baseada no grupo
                const firstRadio = radioInputs[0];
                if (firstRadio && firstRadio.name === 'eu-sou') {
                    errorMessage = 'Por favor, selecione uma opção';
                } else if (firstRadio && firstRadio.name === 'motivo') {
                    errorMessage = 'Por favor, selecione o motivo do contato';
                }

                this.showGroupError(formGroup, errorMessage);
            } else {
                this.clearGroupError(formGroup);
            }
        });

        return isValid;
    }

    validateStep4(step) {
        const messageInput = step.querySelector('#mensagem');
        return this.validateRequiredField(messageInput, 'Por favor, digite sua mensagem');
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

    showFieldError(input, message) {
        // Remove error anterior se existir
        this.clearFieldError(input);

        // Cria novo error-message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        // Insere após o input
        input.parentElement.appendChild(errorElement);
    }

    clearFieldError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showGroupError(formGroup, message) {
        // Remove error anterior se existir
        this.clearGroupError(formGroup);

        // Cria novo error-message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        // Insere no final do form-group
        formGroup.appendChild(errorElement);
    }

    clearGroupError(formGroup) {
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    updateUI() {
        this.updateFormSteps();
        this.updateProgressBar();
        this.updateProgressSteps();
    }

    updateFormSteps() {
        this.formSteps.forEach(step => {
            step.classList.remove('active');
        });

        const activeStep = this.formContainer.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }
    }

    updateProgressBar() {
        if (!this.progressBar) return;

        const progressPercentages = {
            1: '25%',
            2: '50%',
            3: '75%',
            4: '100%',
            5: '100%'
        };

        this.progressBar.style.width = progressPercentages[this.currentStep] || '25%';
    }

    updateProgressSteps() {
        this.progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'checked');

            if (stepNumber < this.currentStep) {
                step.classList.add('checked');
            } else if (stepNumber === this.currentStep && this.currentStep <= this.totalSteps) {
                step.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MultiStepForm();
});