class ModalDownloadProtocolo extends BaseForm {
    constructor() {
        super('#form-download-protocolo');

        this.modal = document.getElementById('modal-download-protocolo');
        this.openButtons = document.querySelectorAll('[data-modal="download-protocolo"]');
        this.closeButtons = this.modal?.querySelectorAll('.modal-close, .btn-close-modal');

        if (!this.modal || !this.form) return;

        this.selectors = {
            nome: '#download-protocolo-nome',
            email: '#download-protocolo-email',
            telefone: '#download-protocolo-telefone',
            euSou: 'input[name="eu-sou"]'
        };

        this.downloadUrl = null;
        this.currentVariant = null;

        // Textos padrão e por variante
        this.defaultTexts = {
            title: 'Protocolo',
            description: 'Preencha o formulário abaixo para fazer o download do protocolo completo.'
        };

        this.variantTexts = {
            'apendice-bcc-ecc': {
                title: 'Protocolo BCC/ECC',
                description: 'Preencha o formulário abaixo para fazer o download do protocolo completo.'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupRadioOptions();
    }

    setupEventListeners() {
        // Botões de abrir modal
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(button);
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

        // Link de download manual
        const downloadLink = this.modal.querySelector('#manual-download-link');
        if (downloadLink) {
            downloadLink.addEventListener('click', (e) => {
                if (this.downloadUrl) {
                    e.preventDefault();
                    this.initiateDownload();
                }
            });
        }
    }

    setupRadioOptions() {
        const radioGroups = this.form?.querySelectorAll('.form-field-radio-group');

        radioGroups?.forEach(group => {
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

    openModal(button) {
        // Capturar variante do botão
        this.currentVariant = button?.dataset?.modalVariant || null;
        
        // Atualizar textos do modal
        this.updateModalTexts();
        
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.showModalState('form');
    }

    updateModalTexts() {
        const texts = this.currentVariant && this.variantTexts[this.currentVariant]
            ? this.variantTexts[this.currentVariant]
            : this.defaultTexts;

        const formState = this.modal.querySelector('.modal-state-form');
        const title = formState?.querySelector('.modal-title');
        const description = formState?.querySelector('.modal-description');

        if (title) title.textContent = texts.title;
        if (description) description.textContent = texts.description;
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
        this.resetForm();
        this.downloadUrl = null;
        this.currentVariant = null;
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
        const nomeInput = this.form.querySelector(this.selectors.nome);
        const emailInput = this.form.querySelector(this.selectors.email);
        const euSouInputs = this.form.querySelectorAll(this.selectors.euSou);

        this.clearErrors();

        let isValid = true;

        // Validar nome (obrigatório)
        if (!this.validateRequiredField(nomeInput, 'Por favor, digite seu nome')) {
            isValid = false;
        }

        // Validar email (obrigatório)
        if (!this.validateEmail(emailInput, 'Por favor, digite um e-mail válido')) {
            isValid = false;
        }

        // Validar radio group "eu-sou" (obrigatório)
        const euSouChecked = Array.from(euSouInputs).some(input => input.checked);
        if (!euSouChecked) {
            const radioGroup = this.form.querySelector('.form-field-radio-group');
            if (radioGroup) {
                this.showGroupError(radioGroup.closest('.form-field-wrapper'), 'Por favor, selecione uma opção');
            }
            isValid = false;
        }

        return isValid;
    }

    async sendFormData() {
        try {
            const formData = this.collectFormData();
            const response = await this.sendAjaxRequest(
                window.download_protocolo_ajax,
                'submit_download_protocolo',
                formData
            );

            // Armazenar URL do arquivo
            this.downloadUrl = response.data?.arquivo_url;

            // Iniciar download automático
            if (this.downloadUrl) {
                this.initiateDownload();
                this.updateDownloadLink();
            }

            this.showModalState('success');
        } catch (error) {
            this.showModalState('error');
            this.updateErrorMessage({ details: error.message });
        }
    }

    collectFormData() {
        const euSouInput = this.form.querySelector(`${this.selectors.euSou}:checked`);

        return {
            nome: this.form.querySelector(this.selectors.nome)?.value || '',
            email: this.form.querySelector(this.selectors.email)?.value || '',
            telefone: this.form.querySelector(this.selectors.telefone)?.value || '',
            'eu-sou': euSouInput?.value || '',
            post_id: window.download_protocolo_ajax?.post_id || '',
            protocolo: window.download_protocolo_ajax?.post_title || '',
            variant: this.currentVariant || ''
        };
    }

    initiateDownload() {
        if (!this.downloadUrl) return;

        // Criar link temporário para download
        const link = document.createElement('a');
        link.href = this.downloadUrl;
        link.download = '';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    updateDownloadLink() {
        const downloadLink = this.modal.querySelector('#manual-download-link');
        if (downloadLink && this.downloadUrl) {
            downloadLink.href = this.downloadUrl;
            downloadLink.style.display = 'inline';
        }
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
    new ModalDownloadProtocolo();
});
