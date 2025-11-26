function initProtocoloTabs() {
    const tabsWrapper = document.querySelector('[data-tabs-type="scroll"]');
    const protocoloCards = document.querySelector('.protocolo-cards');

    if (!tabsWrapper || !protocoloCards) return;

    const tabButtons = tabsWrapper.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('[data-tab-index]');

    if (!tabButtons.length || !tabContents.length) return;

    // Altura dos tabs para calcular offset
    const tabsHeight = tabsWrapper.offsetHeight;

    // Remove classe sticky e adiciona classe fixed
    tabsWrapper.classList.remove('sticky');
    tabsWrapper.classList.add('protocolo-tabs-fixed');

    // Move tabs para fora do #smooth-content para que o position fixed funcione corretamente
    document.body.appendChild(tabsWrapper);

    // Define estado inicial (escondido acima usando transform)
    gsap.set(tabsWrapper, {
        y: '-100%',
        opacity: 0
    });

    // Cria ScrollTrigger para controlar entrada e saída dos tabs
    ScrollTrigger.create({
        trigger: protocoloCards,
        start: `top ${tabsHeight}px`,
        end: `bottom ${+tabsHeight}px`,
        onEnter: () => {
            // Tabs entram de cima para baixo
            gsap.to(tabsWrapper, {
                y: '0%',
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        },
        onLeave: () => {
            // Tabs saem para cima
            gsap.to(tabsWrapper, {
                y: '-100%',
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        },
        onEnterBack: () => {
            // Tabs voltam quando faz scroll para cima
            gsap.to(tabsWrapper, {
                y: '0%',
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        },
        onLeaveBack: () => {
            // Tabs saem para cima quando sai da área de trigger voltando
            gsap.to(tabsWrapper, {
                y: '-100%',
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });

    // Função para rolar tab no container
    function scrollTabIntoView(button, index, totalTabs) {
        const container = tabsWrapper.querySelector('.tabs-items');
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const buttonLeft = button.offsetLeft;
        const buttonWidth = button.offsetWidth;

        let scrollPosition;

        if (index === 0) {
            // Primeira tab: alinha à esquerda
            scrollPosition = 0;
        } else if (index === totalTabs - 1) {
            // Última tab: alinha à direita
            scrollPosition = container.scrollWidth - containerWidth;
        } else {
            // Tabs intermediárias: centraliza
            scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        }

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Função para ativar tab
    function activateTab(index) {
        tabButtons.forEach(btn => btn.classList.remove('tab-button--active'));
        if (tabButtons[index]) {
            tabButtons[index].classList.add('tab-button--active');
            scrollTabIntoView(tabButtons[index], index, tabButtons.length);
        }
    }

    // Cria ScrollTrigger para cada conteúdo de tab
    tabContents.forEach((content, index) => {
        ScrollTrigger.create({
            trigger: content,
            start: `top ${tabsHeight + 1}px`,
            end: `bottom ${tabsHeight - 1}px`,
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
