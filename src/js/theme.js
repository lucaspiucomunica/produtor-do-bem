const SvgUniqueIdManager = {
    processedAttr: 'data-svg-ids-sanitized',

    init() {
        const process = () => {
            const svgs = document.querySelectorAll('svg.svg-inline');

            if (!svgs.length) {
                return;
            }

            svgs.forEach((svg) => {
                SvgUniqueIdManager.ensureUniqueIds(svg);
            });
        };

        process();
        window.addEventListener('load', process, { once: true });
    },

    ensureUniqueIds(svg) {
        if (!(svg instanceof SVGElement)) {
            return;
        }

        if (svg.hasAttribute(SvgUniqueIdManager.processedAttr)) {
            return;
        }

        const elementsWithId = svg.querySelectorAll('[id]');

        if (!elementsWithId.length) {
            svg.setAttribute(SvgUniqueIdManager.processedAttr, 'true');
            return;
        }

        const suffix = '-' + Math.random().toString(36).slice(2, 8);
        const idMap = {};

        elementsWithId.forEach((element) => {
            const originalId = element.id;

            if (!originalId) {
                return;
            }

            if (!idMap[originalId]) {
                idMap[originalId] = `${originalId}${suffix}`;
            }

            element.id = idMap[originalId];
        });

        const elements = [svg, ...svg.querySelectorAll('*')];

        elements.forEach((element) => {
            const attributes = element.attributes ? Array.from(element.attributes) : [];

            attributes.forEach((attribute) => {
                const { name } = attribute;
                let { value } = attribute;

                if (!value) {
                    return;
                }

                if (value.includes('url(#')) {
                    value = value.replace(/url\(#([^)]+)\)/g, (match, id) => {
                        return idMap[id] ? `url(#${idMap[id]})` : match;
                    });
                }

                if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
                    const refId = value.slice(1);

                    if (idMap[refId]) {
                        value = `#${idMap[refId]}`;
                    }
                }

                if (name === 'aria-labelledby' || name === 'aria-describedby') {
                    value = value
                        .split(/\s+/)
                        .filter(Boolean)
                        .map((id) => (idMap[id] ? idMap[id] : id))
                        .join(' ');
                }

                if (value !== attribute.value) {
                    element.setAttribute(name, value);
                }
            });
        });

        svg.setAttribute(SvgUniqueIdManager.processedAttr, 'true');
    }
};

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
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.card-protocol-more button');
            if (button) {
                e.preventDefault();
                const card = button.closest('.card-protocol');
                if (card) {
                    this.toggle(card);
                }
            }
        });

        document.querySelectorAll('.card-protocol').forEach(card => {
            card.dataset.expanded = 'false';
        });

        this.checkHeights();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ProtocolCards.init();
    SvgUniqueIdManager.init();
});
window.addEventListener('resize', ThemeUtils.debounce(() => ProtocolCards.checkHeights(), 250));