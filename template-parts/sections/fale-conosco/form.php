<?php
/**
 * Form Section - Fale Conosco
 * 
 * @package Produtor_do_Bem
 */
?>

<!-- Multi-Step Form Section -->
<section id="form" class="<?php echo get_class_section(); ?>">
    <div class="container">
        <div class="flex flex-col gap-6 max-w-[894px] mx-auto mb-10">

            <!-- Progress Bar -->
            <div class="progress-bar-container">
                <div class="progress-line-wrapper">
                    <div class="progress-line"></div>
                    <div class="progress-line-fill" style="width: 25%"></div>
                </div>

                <div class="progress-steps">
                    <div class="progress-step active" data-step="1">
                        <div class="progress-step-number">
                            <div class="number">1</div>
                            <div class="check">
                                <?php echo icon('tick-circle'); ?>
                            </div>
                        </div>
                        <span class="progress-step-title">Identificação</span>
                    </div>
                    <div class="progress-step" data-step="2">
                        <div class="progress-step-number">
                            <div class="number">2</div>
                            <div class="check">
                                <?php echo icon('tick-circle'); ?>
                            </div>
                        </div>
                        <span class="progress-step-title">Contato</span>
                    </div>
                    <div class="progress-step" data-step="3">
                        <div class="progress-step-number">
                            <div class="number">3</div>
                            <div class="check">
                                <?php echo icon('tick-circle'); ?>
                            </div>
                        </div>
                        <span class="progress-step-title">Categoria</span>
                    </div>
                    <div class="progress-step" data-step="4">
                        <div class="progress-step-number">
                            <div class="number">4</div>
                            <div class="check">
                                <?php echo icon('tick-circle'); ?>
                            </div>
                        </div>
                        <span class="progress-step-title">Mensagem</span>
                    </div>    
                </div>
            </div>

            <!-- Form Container -->
            <div class="multi-step-form-container">

                <!-- Step 1: Identificação -->
                <div class="form-step active" data-step="1">
                    <div class="step-content">
                        <div class="content-header">
                            <div class="content-icon content-icon--primario content-icon--large">
                                <?php echo icon('firstline'); ?>
                            </div>
                            <h2 class="step-title">Vamos nos conhecer!</h2>
                            <p class="step-description">Como podemos te chamar?</p>
                        </div>

                        <div class="form-fields">
                            <div class="form-group">
                                <label for="nome">Seu nome: *</label>
                                <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required>
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn btn-primary btn-next">
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Contato -->
                <div class="form-step" data-step="2">
                    <div class="step-content">
                        <div class="content-header">
                            <div class="content-icon content-icon--primario content-icon--large">
                                <?php echo icon('call'); ?>
                            </div>
                            <h2 class="step-title">Como te contatar?</h2>
                            <p class="step-description">Precisamos dessas informações para responder você</p>
                        </div>

                        <div class="form-fields">
                            <div class="form-group">
                                <label for="email">Seu e-mail: *</label>
                                <input type="email" id="email" name="email" placeholder="seu@email.com" required>
                            </div>

                            <div class="form-group">
                                <label for="telefone">Seu telefone:</label>
                                <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000">
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn btn-outline btn-prev">
                                Voltar
                            </button>
                            <button type="button" class="btn btn-primary btn-next">
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Categoria -->
                <div class="form-step" data-step="3">
                    <div class="step-content">
                        <div class="content-header">
                            <div class="content-icon content-icon--primario content-icon--large">
                                <?php echo icon('personalcard'); ?>
                            </div>
                            <h2 class="step-title">Conte mais sobre você</h2>
                            <p class="step-description">Isso nos ajuda a personalizar o atendimento</p>
                        </div>

                        <div class="form-fields">
                            <div class="form-group">
                                <label>Eu sou:</label>
                                <div class="form-group-options">
                                    <label>
                                        <input type="radio" name="eu-sou" value="produtor">
                                        <span class="form-group-option-title">Produtor</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="eu-sou" value="varejista">
                                        <span class="form-group-option-title">Varejista</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="eu-sou" value="consumidor">
                                        <span class="form-group-option-title">Consumidor</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="eu-sou" value="outro">
                                        <span class="form-group-option-title">Outro</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Motivo do contato:</label>
                                <div class="form-group-options">
                                    <label>
                                        <input type="radio" name="motivo" value="orcamento">
                                        <span class="form-group-option-title">Orçamento</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="motivo" value="orcamento-servico">
                                        <span class="form-group-option-title">Orçamento ou serviço</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="motivo" value="duvidas">
                                        <span class="form-group-option-title">Tenho dúvidas</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="motivo" value="sugestoes">
                                        <span class="form-group-option-title">Tenho sugestões</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="motivo" value="criticas">
                                        <span class="form-group-option-title">Tenho críticas</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="motivo" value="outro-motivo">
                                        <span class="form-group-option-title">Outro motivo</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn btn-outline btn-prev">
                                Voltar
                            </button>
                            <button type="button" class="btn btn-primary btn-next">
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 4: Mensagem -->
                <div class="form-step" data-step="4">
                    <div class="step-content">
                        <div class="content-header">
                            <div class="content-icon content-icon--primario content-icon--large">
                                <?php echo icon('clipboard-text'); ?>
                            </div>
                            <h2 class="step-title">Sua mensagem</h2>
                            <p class="step-description">Conte-nos como podemos te ajudar</p>
                        </div>

                        <div class="form-fields text-area-group">
                            <div class="form-group">
                                <label for="mensagem">Sua mensagem: *</label>
                                <textarea id="mensagem" name="mensagem" rows="6" placeholder="Escreva com o máximo de detalhes possível" required></textarea>
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn btn-outline btn-prev">
                                Voltar
                            </button>
                            <button type="button" class="btn btn-primary btn-submit">
                                Enviar Mensagem
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 5: Feedback -->
                <div class="form-step" data-step="5">
                    <div class="step-content">
                        <div class="content-header">
                            <!-- Loading State -->
                            <div class="loading-state">
                                <div class="content-icon content-icon--primario content-icon--large">
                                    <div class="loading-icon">
                                        <?php echo icon('3-dots-more'); ?>
                                    </div>
                                </div>
                                <h2 class="step-title">Enviando mensagem...</h2>
                                <p class="step-description">Aguarde um momento, estamos processando sua mensagem</p>
                            </div>

                            <!-- Success State -->
                            <div class="success-state hidden">
                                <div class="content-icon content-icon--primario content-icon--large">
                                    <div class="success-icon">
                                        <?php echo icon('tick-circle'); ?>
                                    </div>
                                </div>
                                <h2 class="step-title">Mensagem enviada!</h2>
                                <p class="step-description">Em breve entraremos em contato.</p>
                            </div>

                            <!-- Error State -->
                            <div class="error-state hidden">
                                <div class="content-icon content-icon--primario content-icon--large">
                                    <div class="error-icon">
                                        <?php echo icon('close-circle'); ?>
                                    </div>
                                </div>
                                <h2 class="step-title">Erro no envio</h2>
                                <p class="step-description">Não foi possível enviar sua mensagem. Tente novamente.</p>
    
                                <div class="form-navigation mt-6">
                                    <button type="button" class="btn btn-primary btn-retry">
                                        Tentar Novamente
                                    </button>
                                    <button type="button" class="btn btn-outline btn-new-message">
                                        Nova Mensagem
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center">
            <button class="btn btn-danger">
                <?php echo icon('warning-2'); ?>
                <span>Quero fazer uma denúncia</span>
            </button>
        </div>
    </div>
</section>

<!-- Contact Form 7 Hidden Form -->
<div class="hidden">
    <?php
    // Buscar formulário por título ou usar shortcode direto
    $contact_form = get_posts(array(
        'post_type' => 'wpcf7_contact_form',
        'title' => 'Formulário de contato',
        'post_status' => 'publish',
        'numberposts' => 1
    ));

    if ($contact_form) {
        echo do_shortcode('[contact-form-7 id="' . $contact_form[0]->ID . '"]');
    } else {
        // Fallback case - formulário será processado via AJAX
        echo '<!-- Contact Form 7 não configurado - usando fallback AJAX -->';
    }
    ?>
</div>