function initProtocoloTabs() {
    const tabs = document.querySelector('[data-tabs-type="scroll"]');

    if (!tabs) return;

    const tabButtons = tabs.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('[data-tab-index]');

    if (!tabButtons.length || !tabContents.length) return;

    // Cria placeholder para ocupar o espaço quando tabs estiver fixo
    const placeholder = document.createElement('div');
    placeholder.className = 'protocolo-tabs-placeholder';
    tabs.parentNode.insertBefore(placeholder, tabs);

    let isFixed = false;

    // Encontra o último elemento com data-tab-index
    const lastTabContent = tabContents[tabContents.length - 1];

    // Altura dos tabs para calcular offset
    const tabsHeight = tabs.offsetHeight;

    // Cria ScrollTrigger para controlar comportamento fixo
    ScrollTrigger.create({
        trigger: tabs,
        start: "top top",
        endTrigger: lastTabContent,
        end: `bottom ${tabsHeight - 24}px`,
        onEnter: () => {
            if (isFixed) return;
            isFixed = true;

            // Captura altura antes de mover
            placeholder.style.height = `${tabs.offsetHeight}px`;
            placeholder.style.display = 'block';

            // Move tabs para o body e fixa no topo
            document.body.appendChild(tabs);

            tabs.style.position = 'fixed';
            tabs.style.top = '0';
            tabs.style.left = '0';
            tabs.style.right = '0';
            tabs.style.width = '100%';
            tabs.style.zIndex = '50';
        },
        onLeave: () => {
            // Fixa tabs no final do último elemento quando passar
            const lastContentRect = lastTabContent.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;

            tabs.style.position = 'absolute';
            tabs.style.top = `${lastContentRect.bottom + scrollY - tabsHeight + 24}px`;
        },
        onEnterBack: () => {
            // Volta a fixar no topo quando rolar de volta
            tabs.style.position = 'fixed';
            tabs.style.top = '0';
        },
        onLeaveBack: () => {
            if (!isFixed) return;
            isFixed = false;

            // Retorna tabs para posição original
            placeholder.parentNode.insertBefore(tabs, placeholder);
            placeholder.style.display = 'none';

            tabs.style.position = '';
            tabs.style.top = '';
            tabs.style.left = '';
            tabs.style.right = '';
            tabs.style.width = '';
            tabs.style.zIndex = '';
        }
    });

    // Função para ativar tab
    function activateTab(index) {
        tabButtons.forEach(btn => btn.classList.remove('tab-button--active'));
        if (tabButtons[index]) {
            tabButtons[index].classList.add('tab-button--active');
        }
    }

    // Cria ScrollTrigger para cada conteúdo de tab
    tabContents.forEach((content, index) => {
        ScrollTrigger.create({
            trigger: content,
            start: `top ${tabsHeight + 1}px`,
            end: `bottom ${tabsHeight - 1}px`,
            // markers: true,
            // id: `tab-${index}`,
            onEnter: () => activateTab(index),
            onEnterBack: () => activateTab(index)
        });
    });

    // Adiciona funcionalidade de click nos tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const targetContent = tabContents[index];
            if (!targetContent) return;

            // Pega o smoother globalmente e rola até o elemento
            const smoother = ScrollSmoother.get();
            if (smoother) {
                // Posiciona elemento logo abaixo dos tabs fixos
                smoother.scrollTo(targetContent, true, `top ${tabsHeight}px`);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProtocoloTabs();
});
