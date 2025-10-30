<?php
/**
 * Content Footer
 * 
 * @package Produtor_do_Bem
 */

//  Campos ACF

$redes_sociais = get_field('redes_sociais', 'option');
$endereco = get_field('endereco', 'option');
$email = get_field('email', 'option');
$titulo_newsletter = get_field('titulo_newsletter', 'option');
$disclaimer_newsletter = get_field('disclaimer_newsletter', 'option');
$nome_e_cnpj = get_field('nome_e_cnpj', 'option');
?>

<footer class="site-footer" id="site-footer">
    <div class="content-footer">
        <div class="flex lg:flex-row flex-col-reverse items-stretch gap-10">
            <div class="w-full">
                <div class="content-footer-left">
                    <div class="content-footer-logo">
                        <h2 class="sr-only">Produtor do Bem</h2>
                        <a href="<?php echo home_url(); ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/img/logo-produtor-do-bem-branco.svg" alt="Logo" class="svg-inline">
                        </a>
                    </div>

                    <div class="content-info">
                        <div class="content-redes-sociais">
                            <h3>Siga-nos nas redes sociais</h3>
                            <div class="content-redes-sociais-list">
                            <?php foreach ($redes_sociais as $rede_social) : ?>
                                <a href="<?php echo $rede_social['url']; ?>" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-secondary">
                                    <?php echo icon($rede_social['icone']); ?>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="content-endereco-contato">
                            <h3 class="sr-only">Endereço e contato</h3>
                            <div class="endereco">
                                <div class="icon">
                                    <?php echo icon('map'); ?>
                                </div>

                                <div class="content">
                                    <a href="<?php echo $endereco['link_google_maps']; ?>" target="_blank" rel="noopener noreferrer">
                                        <span><?php echo $endereco['logradouro']; ?></span>
                                        <span><?php echo $endereco['bairro_cidade_estado']; ?></span>
                                        <span><?php echo substr($endereco['cep'], 0, -3) . '-' . substr($endereco['cep'], -3); ?></span>
                                    </a>
                                </div>
                            </div>

                            <div class="email">
                                <div class="icon">
                                    <?php echo icon('sms'); ?>
                                </div>

                                <div class="content">
                                    <a href="mailto:<?php echo $email; ?>" title="E-mail de contato da Produtor do Bem"><?php echo $email; ?></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-menu">
                        <h3 class="sr-only">Menu</h3>
                        <?php
                        wp_nav_menu(
                            array(
                                'theme_location' => 'menu-footer',
                            )
                        );
                        ?>
                    </div>

                    <div class="content-extra">
                        <button class="btn btn-danger btn-small" data-modal="denuncia">
                            <?php echo icon('warning-2'); ?>
                            <span>Quero fazer uma denúncia</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-full lg:max-w-[540px] max-w-full">
                <div class="content-footer-newsletter">
                    <div class="content-footer-newsletter-title">
                        <h3>Assine nossa newsletter e fique por dentro das novidades sobre produção sustentável e a Produtor do Bem</h3>
                        <div class="content-icon content-icon--secundario">
                            <?php echo icon('direct-notification'); ?>
                        </div>
                    </div>
                    <div class="content-footer-newsletter-form">
                        <form id="newsletter-form" class="content-footer-newsletter-form-wrapper">
                            <div class="form-group form-field-wrapper">
                                <input type="email" id="newsletter-email" name="email" placeholder="Digite aqui seu e-mail" required class="form-field-input form-field-input--dark">
                            </div>
                            <button type="submit" class="btn btn-primary btn-submit-newsletter">
                                Assinar newsletter
                            </button>
                        </form>
                    </div>
                    <div class="content-footer-newsletter-disclaimer">
                        <p>Ao assinar, autorizo o envio de newsletter e novos conteúdos sobre produção sustentável e a Produtor do Bem</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content-copyright">
        <div class="flex">
            <div class="w-full flex justify-between gap-10">
                <p>&copy; <?php echo date('Y'); ?> Produtor do Bem. Todos os direitos reservados.</p>
                <p>Produtor do Bem Certificação de Sustentabilidade Ltda. 48.054.375/0001-60</p>
            </div>
        </div>
    </div>
</footer>