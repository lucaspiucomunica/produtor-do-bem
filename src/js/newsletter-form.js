/**
 * Formulário de Newsletter
 *
 * Gerencia a submissão do formulário de newsletter no footer.
 * Usa o sistema de Toast para feedback de sucesso/erro.
 */

class NewsletterForm extends BaseForm {
    constructor() {
        super('#newsletter-form');

        if (!this.form) {
            ThemeUtils.logError('Formulário de newsletter não encontrado');
            return;
        }

        this.emailInput = this.form.querySelector('#newsletter-email');
        this.submitButton = this.form.querySelector('.btn-submit-newsletter');

        if (!this.emailInput) {
            ThemeUtils.logError('Campo de e-mail não encontrado no formulário de newsletter');
            return;
        }

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Submit do formulário
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        // Submit ao clicar no botão
        if (this.submitButton) {
            this.submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }
    }

    submitForm() {
        ThemeUtils.log('Newsletter form - Iniciando submissão');

        if (!this.validateForm()) {
            ThemeUtils.log('Newsletter form - Validação falhou');
            return;
        }

        this.sendFormData();
    }

    validateForm() {
        this.clearErrors();

        // Validar e-mail
        const isValid = this.validateEmail(this.emailInput, 'Por favor, digite um e-mail válido');

        return isValid;
    }

    async sendFormData() {
        // Desabilitar botão durante envio
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        }

        try {
            const formData = this.collectFormData();

            ThemeUtils.log('Newsletter form - Enviando dados:', formData);

            await this.sendAjaxRequest(
                window.newsletter_ajax,
                'submit_newsletter',
                formData
            );

            // Sucesso
            ThemeUtils.log('Newsletter form - Enviado com sucesso');
            this.handleSuccess();
        } catch (error) {
            // Erro
            ThemeUtils.logError('Newsletter form - Erro ao enviar:', error);
            this.handleError(error);
        } finally {
            // Reabilitar botão
            if (this.submitButton) {
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }

    collectFormData() {
        return {
            email: this.emailInput.value.trim()
        };
    }

    handleSuccess() {
        // Mostrar toast de sucesso
        if (typeof Toast !== 'undefined') {
            Toast.show(
                'success',
                'Inscrição realizada com sucesso!',
                8000 // 8 segundos para mensagem de sucesso
            );
        } else {
            ThemeUtils.logError('Toast não está disponível');
            alert('Inscrição realizada com sucesso!');
        }

        // Limpar formulário
        this.resetForm();
    }

    handleError(error) {
        // Mostrar toast de erro
        const errorMessage = error.message || 'Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.';

        if (typeof Toast !== 'undefined') {
            Toast.show(
                'error',
                errorMessage,
                8000 // 8 segundos para mensagem de erro
            );
        } else {
            ThemeUtils.logError('Toast não está disponível');
            alert(errorMessage);
        }
    }

    resetForm() {
        super.resetForm();
        ThemeUtils.log('Newsletter form - Formulário resetado');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new NewsletterForm();
});
