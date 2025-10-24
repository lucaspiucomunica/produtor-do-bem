class MultiStepForm extends BaseForm {
    constructor() {
        super('.multi-step-form-container');

        this.currentStep = 1;
        this.totalSteps = 4;

        this.formContainer = this.form;
        this.progressBar = document.querySelector('.progress-line-fill');
        this.progressSteps = document.querySelectorAll('.progress-step');
        this.formSteps = document.querySelectorAll('.form-step');

        if (!this.formContainer) return;

        this.selectors = {
            step5: '.form-step[data-step="5"]',
            nome: '#nome',
            email: '#email',
            telefone: '#telefone',
            mensagem: '#mensagem'
        };

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
        const radioGroups = this.formContainer.querySelectorAll('.form-field-radio-group');

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

    async sendFormData() {
        this.showLoadingState();

        try {
            const formData = this.collectFormData();
            await this.sendAjaxRequest(
                window.contact_form_ajax,
                'submit_multi_step_form',
                formData
            );
            this.showSuccessState();
        } catch (error) {
            this.showErrorState({ details: error.message });
        }
    }

    collectFormData() {
        return {
            nome: document.querySelector(this.selectors.nome)?.value || '',
            email: document.querySelector(this.selectors.email)?.value || '',
            telefone: document.querySelector(this.selectors.telefone)?.value || '',
            'eu-sou': document.querySelector('input[name="eu-sou"]:checked')?.value || '',
            motivo: document.querySelector('input[name="motivo"]:checked')?.value || '',
            mensagem: document.querySelector(this.selectors.mensagem)?.value || ''
        };
    }

    showLoadingState() {
        const step5 = this.formContainer.querySelector(this.selectors.step5);
        if (step5) this.showState('loading', step5);
    }

    showSuccessState() {
        const step5 = this.formContainer.querySelector(this.selectors.step5);
        if (!step5) return;

        this.showState('success', step5);

        const newMessageButton = step5.querySelector('.btn-new-message');
        if (newMessageButton) {
            newMessageButton.onclick = () => this.resetMultiStepForm();
        }
    }

    showErrorState(errorData = null) {
        const step5 = this.formContainer.querySelector(this.selectors.step5);
        if (!step5) return;

        this.showState('error', step5);

        if (errorData?.details) {
            ThemeUtils.log('Multi-step form - Detalhes do erro:', errorData.details);

            const errorDescription = step5.querySelector('.step-description');
            if (errorDescription) {
                errorDescription.textContent = `Erro: ${errorData.details}`;
            }
        }

        const retryButton = step5.querySelector('.btn-retry');
        const newMessageButton = step5.querySelector('.btn-new-message');

        if (retryButton) {
            retryButton.onclick = () => this.sendFormData();
        }

        if (newMessageButton) {
            newMessageButton.onclick = () => this.resetMultiStepForm();
        }
    }

    clearErrors() {
        if (!this.formContainer) return;
        const errors = this.formContainer.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    resetMultiStepForm() {
        this.clearErrors();

        const inputs = this.formContainer.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = false;
                input.closest('label')?.classList.remove('selected');
            } else {
                input.value = '';
            }
        });

        const formGroups = this.formContainer.querySelectorAll('.form-group');
        formGroups.forEach(group => this.clearGroupError(group));

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
        const nameInput = step.querySelector(this.selectors.nome);
        return this.validateRequiredField(nameInput, 'Por favor, digite seu nome');
    }

    validateStep2(step) {
        const emailInput = step.querySelector(this.selectors.email);
        return this.validateEmail(emailInput, 'Por favor, digite um e-mail válido');
    }

    validateStep3(step) {
        const radioGroups = step.querySelectorAll('.form-field-radio-group');
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
        const messageInput = step.querySelector(this.selectors.mensagem);
        return this.validateRequiredField(messageInput, 'Por favor, digite sua mensagem');
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