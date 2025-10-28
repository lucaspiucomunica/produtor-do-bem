<?php
/**
 * Modal - Download protocolo
 *
 * @package Produtor_do_Bem
 */
?>

<div id="modal-download-protocolo" class="modal-overlay hidden">
    <div class="modal-container">
        <button type="button" class="modal-close btn btn-icon btn-small" aria-label="Fechar modal">
            <?php echo icon('close-circle'); ?>
        </button>

        <div class="modal-content">
            <!-- Form State -->
            <div class="modal-state modal-state-form">
                <div class="modal-header">
                    <div class="content-icon content-icon--primario content-icon--large">
                        <?php echo icon('document-download'); ?>
                    </div>
                    <div class="modal-header-content">
                        <h2 class="modal-title">Protocolo</h2>
                        <p class="modal-description">Preencha o formulário abaixo para fazer o download do protocolo completo.</p>
                    </div>
                </div>

                <div class="modal-body">
                    <form id="form-download-protocolo" class="download-protocolo-form">
                        <div class="form-fields">
                            <div class="form-field-wrapper">
                                <label for="download-protocolo-nome" class="form-field-label">Seu nome: *</label>
                                <input type="text" id="download-protocolo-nome" name="nome" placeholder="Digite seu nome" class="form-field-input">
                            </div>

                            <div class="form-field-wrapper">
                                <label for="download-protocolo-email" class="form-field-label">Seu e-mail: *</label>
                                <input type="email" id="download-protocolo-email" name="email" placeholder="seu@email.com" class="form-field-input">
                            </div>

                            <div class="form-field-wrapper">
                                <label for="download-protocolo-telefone" class="form-field-label">Seu telefone:</label>
                                <input type="tel" id="download-protocolo-telefone" name="telefone" placeholder="(00) 00000-0000 (opcional)" class="form-field-input">
                            </div>

                            <div class="form-field-wrapper">
                                <label class="form-field-label">Eu sou: *</label>
                                <div class="form-field-radio-group">
                                    <label class="form-field-radio-option">
                                        <input type="radio" name="eu-sou" value="produtor">
                                        <span class="form-field-radio-option-title">Produtor</span>
                                    </label>
                                    <label class="form-field-radio-option">
                                        <input type="radio" name="eu-sou" value="varejista">
                                        <span class="form-field-radio-option-title">Varejista</span>
                                    </label>
                                    <label class="form-field-radio-option">
                                        <input type="radio" name="eu-sou" value="consumidor">
                                        <span class="form-field-radio-option-title">Consumidor</span>
                                    </label>
                                    <label class="form-field-radio-option">
                                        <input type="radio" name="eu-sou" value="outro">
                                        <span class="form-field-radio-option-title">Outro</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn">
                                Baixar protocolo
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Loading State -->
            <div class="modal-state modal-state-loading hidden">
                <div class="modal-header">
                    <div class="content-icon content-icon--primario content-icon--large">
                        <div class="loading-icon">
                            <?php echo icon('3-dots-more'); ?>
                        </div>
                    </div>
                    <div class="modal-header-content">
                        <h2 class="modal-title">Baixando protocolo...</h2>
                        <p class="modal-description">Aguarde um momento, estamos processando seu pedido</p>
                    </div>
                </div>
            </div>

            <!-- Success State -->
            <div class="modal-state modal-state-success hidden">
                <div class="modal-header">
                    <div class="content-icon content-icon--primario content-icon--large">
                        <div class="success-icon">
                            <?php echo icon('tick-circle'); ?>
                        </div>
                    </div>
                    <div class="modal-header-content">
                        <h2 class="modal-title">Download iniciado!</h2>
                        <p class="modal-description">O download do protocolo foi iniciado automaticamente. Se o download não iniciar, <a href="#" target="_blank" id="manual-download-link" style="display:none;" class="underline font-semibold text-primario-principal">clique aqui para baixar</a>.</p>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline btn-close-modal">
                        Fechar
                    </button>
                </div>
            </div>

            <!-- Error State -->
            <div class="modal-state modal-state-error hidden">
                <div class="modal-header">
                    <div class="content-icon content-icon--danger content-icon--large">
                        <div class="error-icon">
                            <?php echo icon('close-circle'); ?>
                        </div>
                    </div>
                    <div class="modal-header-content">
                        <h2 class="modal-title">Erro no download</h2>
                        <p class="modal-description">Não foi possível baixar o protocolo. Tente novamente.</p>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-retry">
                        Tentar novamente
                    </button>
                    <button type="button" class="btn btn-outline btn-close-modal">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
