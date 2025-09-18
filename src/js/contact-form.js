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