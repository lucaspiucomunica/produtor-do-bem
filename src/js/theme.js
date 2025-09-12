// Arquivo JavaScript principal do tema

/**
 * Função para verificar se a lista de protocolos precisa do botão "Ver mais"
 * Compara a altura do .card-protocol-list com .card-protocol-list-wrapper
 * e adiciona a classe .card-protocol-more-active quando necessário
 */
function checkProtocolCardHeights() {
    // Seleciona todos os cards de protocolo
    const protocolCards = document.querySelectorAll('.card-protocol');
    
    protocolCards.forEach(card => {
        const listWrapper = card.querySelector('.card-protocol-list-wrapper');
        const list = card.querySelector('.card-protocol-list');
        const moreButton = card.querySelector('.card-protocol-more');
        
        // Verifica se todos os elementos existem
        if (listWrapper && list && moreButton) {
            // Obtém as alturas dos elementos
            const wrapperHeight = listWrapper.offsetHeight;
            const listHeight = list.offsetHeight;
            
            // Se a lista for maior que o wrapper, adiciona a classe ativa
            if (listHeight > wrapperHeight) {
                moreButton.classList.add('card-protocol-more-active');
            } else {
                moreButton.classList.remove('card-protocol-more-active');
            }
        }
    });
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    checkProtocolCardHeights();
});

/**
 * Função para alternar o estado expandido/recolhido de um card de protocolo
 * @param {HTMLElement} card - O elemento .card-protocol
 */
function toggleProtocolCard(card) {
    const button = card.querySelector('.card-protocol-more button span');
    
    if (!button) return;
    
    // Verifica se o card está expandido
    const isExpanded = card.classList.contains('card-protocol-expanded');
    
    if (isExpanded) {
        // Recolher
        card.classList.remove('card-protocol-expanded');
        button.textContent = 'Ver todos';
        card.dataset.expanded = 'false';
    } else {
        // Expandir
        card.classList.add('card-protocol-expanded');
        button.textContent = 'Ocultar';
        card.dataset.expanded = 'true';
    }
}

/**
 * Configura os event listeners para os botões de "Ver mais"
 */
function setupProtocolCardToggle() {
    const protocolCards = document.querySelectorAll('.card-protocol');
    
    protocolCards.forEach(card => {
        const button = card.querySelector('.card-protocol-more button');
        
        if (button) {
            // Remove event listener anterior se existir
            button.removeEventListener('click', button.toggleHandler);
            
            // Cria nova função handler
            button.toggleHandler = function(e) {
                e.preventDefault();
                toggleProtocolCard(card);
            };
            
            // Adiciona o event listener
            button.addEventListener('click', button.toggleHandler);
            
            // Inicializa o estado como recolhido
            card.dataset.expanded = 'false';
        }
    });
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    checkProtocolCardHeights();
    setupProtocolCardToggle();
});

// Recalcula as alturas quando a janela for redimensionada
window.addEventListener('resize', function() {
    checkProtocolCardHeights();
});