<?php
/**
 * Modal - Denúncia
 *
 * @package Produtor_do_Bem
 */
?>

<div id="modal-denuncia" class="modal-overlay hidden">
    <div class="modal-container">
        <button type="button" class="modal-close btn btn-icon btn-small" aria-label="Fechar modal">
            <?php echo icon('close-circle'); ?>
        </button>

        <div class="modal-content">
            <!-- Form State -->
            <div class="modal-state modal-state-form">
                <div class="modal-header">
                    <div class="content-icon content-icon--danger content-icon--large">
                        <?php echo icon('warning-2'); ?>
                    </div>
                    <div class="modal-header-content">
                        <h2 class="modal-title">Denúncia</h2>
                        <p class="modal-description">Utilize este espaço para fazer uma denúncia. Você pode fazê-la de forma anônima.</p>
                    </div>
                </div>

                <div class="modal-body">
                    <form id="form-denuncia" class="denuncia-form">
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="denuncia-nome">Seu nome:</label>
                                <input type="text" id="denuncia-nome" name="nome" placeholder="Digite seu nome (opcional)">
                            </div>

                            <div class="form-group">
                                <label for="denuncia-email">Seu e-mail:</label>
                                <input type="email" id="denuncia-email" name="email" placeholder="seu@email.com (opcional)">
                            </div>

                            <div class="form-group">
                                <label for="denuncia-telefone">Seu telefone:</label>
                                <input type="tel" id="denuncia-telefone" name="telefone" placeholder="(00) 00000-0000 (opcional)">
                            </div>

                            <div class="form-group">
                                <label for="denuncia-mensagem">Sua denúncia: *</label>
                                <textarea id="denuncia-mensagem" name="mensagem" rows="6" placeholder="Descreva sua denúncia com o máximo de detalhes possível"></textarea>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-danger">
                                Enviar denúncia
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Loading State -->
            <div class="modal-state modal-state-loading hidden">
                <div class="modal-header">
                    <div class="content-icon content-icon--danger content-icon--large">
                        <div class="loading-icon">
                            <?php echo icon('3-dots-more'); ?>
                        </div>
                    </div>
                    <div class="modal-header-content">
                        <h2 class="modal-title">Enviando denúncia...</h2>
                        <p class="modal-description">Aguarde um momento, estamos processando sua denúncia</p>
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
                        <h2 class="modal-title">Denúncia enviada!</h2>
                        <p class="modal-description">Sua denúncia foi recebida e será analisada pela nossa equipe.</p>
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
                        <h2 class="modal-title">Erro no envio</h2>
                        <p class="modal-description">Não foi possível enviar sua denúncia. Tente novamente.</p>
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
