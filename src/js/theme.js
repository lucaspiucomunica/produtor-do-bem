const ProtocolCards = {
    checkHeights() {
        const protocolCards = document.querySelectorAll('.card-protocol');

        protocolCards.forEach(card => {
            const listWrapper = card.querySelector('.card-protocol-list-wrapper');
            const list = card.querySelector('.card-protocol-list');
            const moreButton = card.querySelector('.card-protocol-more');

            if (listWrapper && list && moreButton) {
                const wrapperHeight = listWrapper.offsetHeight;
                const listHeight = list.offsetHeight;

                moreButton.classList.toggle('card-protocol-more-active', listHeight > wrapperHeight);
            }
        });
    },

    toggle(card) {
        const button = card.querySelector('.card-protocol-more button span');
        if (!button) return;

        const isExpanded = card.classList.contains('card-protocol-expanded');

        card.classList.toggle('card-protocol-expanded');
        button.textContent = isExpanded ? 'Ver todos' : 'Ocultar';
        card.dataset.expanded = !isExpanded;
    },

    init() {
        const container = document.querySelector('.card-protocol')?.parentElement;
        if (!container) return;

        container.addEventListener('click', (e) => {
            const button = e.target.closest('.card-protocol-more button');
            if (button) {
                e.preventDefault();
                const card = button.closest('.card-protocol');
                this.toggle(card);
            }
        });

        document.querySelectorAll('.card-protocol').forEach(card => {
            card.dataset.expanded = 'false';
        });

        this.checkHeights();
    }
};

document.addEventListener('DOMContentLoaded', () => ProtocolCards.init());
window.addEventListener('resize', ThemeUtils.debounce(() => ProtocolCards.checkHeights(), 250));