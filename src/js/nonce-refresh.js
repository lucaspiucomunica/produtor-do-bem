/**
 * Atualiza nonces dos formulários via AJAX
 * 
 * Soluciona problemas de cache de página onde nonces ficam inválidos
 */

(function() {
    async function refreshNonces() {
        if (typeof pdb_ajax === 'undefined') {
            console.warn('pdb_ajax não definido - nonces não serão atualizados');
            return;
        }

        try {
            const response = await fetch(pdb_ajax.ajax_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'get_form_nonces'
                })
            });

            const data = await response.json();

            if (data.success && data.data) {
                // Atualizar nonces nos objetos globais
                if (typeof window.contact_form_ajax !== 'undefined') {
                    window.contact_form_ajax.nonce = data.data.multi_step_form_nonce;
                }
                if (typeof window.denuncia_ajax !== 'undefined') {
                    window.denuncia_ajax.nonce = data.data.denuncia_form_nonce;
                }
                if (typeof window.newsletter_ajax !== 'undefined') {
                    window.newsletter_ajax.nonce = data.data.newsletter_form_nonce;
                }
                if (typeof window.download_protocolo_ajax !== 'undefined') {
                    window.download_protocolo_ajax.nonce = data.data.download_protocolo_form_nonce;
                }

                console.log('Nonces atualizados com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar nonces:', error);
        }
    }

    // Atualizar nonces quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshNonces);
    } else {
        refreshNonces();
    }
})();

