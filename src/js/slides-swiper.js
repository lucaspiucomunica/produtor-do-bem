document.addEventListener('DOMContentLoaded', function() {
    const swiperOqueFazemos = new Swiper('.swiper-o-que-fazemos', {
        speed: 400,
        spaceBetween: 40,
        slidesPerView: 3,
        navigation: {
            nextEl: '.carrossel-o-que-fazemos .navigation-carrossel .navigation-item--next',
            prevEl: '.carrossel-o-que-fazemos .navigation-carrossel .navigation-item--prev',
        },
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const swiperOqueSignifica = new Swiper(".swiper-o-que-significa", {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 1.25,
        freeMode: {
            enabled: true,
            minimumVelocity: 0.01,
        },
        grabCursor: true,
        pagination: {
            el: ".carrossel-o-que-significa .progress-carrossel",
            type: "progressbar",
        },
        allowTouchMove: true, // Desabilita controle por toque/mouse inicialmente
        // on: {
        //     progress: function(swiper, progress) {
        //         // Atualiza a barra de progresso manualmente quando controlado via scroll
        //         if (swiper.pagination && swiper.pagination.el) {
        //             const progressBar = swiper.pagination.el.querySelector('.swiper-pagination-progressbar-fill');
        //             if (progressBar) {
        //                 progressBar.style.transform = `translate3d(0px, 0px, 0px) scaleX(${progress}) scaleY(1)`;
        //             }
        //         }
        //     }
        // }
    });

    // // Implementação do controle via scroll com GSAP e ScrollSmoother
    // const carrosselElement = document.querySelector('.carrossel-o-que-significa');
    // if (carrosselElement) {
    //     let isScrollingCarousel = false;
    //     let targetTranslate = 0;
    //     let currentTranslate = 0;
    //     let isAtFirstSlide = true;
    //     let isAtLastSlide = false;
    //     let hasStoppedAtExtreme = false; // Flag para controlar se já parou no extremo
        
    //     const swiperWrapper = swiperOqueSignifica.wrapperEl;
    //     const totalSlides = swiperOqueSignifica.slides.length;
        
    //     // Calcula o máximo de translação baseado no número de slides
    //     const slideWidth = swiperOqueSignifica.slides[0].offsetWidth + 32; // largura + spaceBetween
    //     const maxTranslate = -(slideWidth * (totalSlides - 1.25)); // 1.25 é o slidesPerView

    //     // ScrollTrigger para detectar quando o carrossel está no meio da tela
    //     gsap.registerPlugin(ScrollTrigger);

    //     // Animação GSAP para suavizar o movimento
    //     let animationTween = gsap.to({ translate: 0 }, {
    //         duration: 0,
    //         onUpdate: function() {
    //             currentTranslate = this.targets()[0].translate;
    //             swiperWrapper.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
                
    //             // Atualiza o progresso da barra
    //             const progress = Math.abs(currentTranslate) / Math.abs(maxTranslate);
    //             swiperOqueSignifica.setProgress(progress);
                
    //             // Atualiza flags de posição
    //             isAtFirstSlide = currentTranslate >= -10; // Margem de erro de 10px
    //             isAtLastSlide = currentTranslate <= (maxTranslate + 10);
    //         }
    //     });

    //     // Função para parar o ScrollSmoother temporariamente
    //     const pauseScrollSmoother = () => {
    //         if (window.toggleScrollSmoother) {
    //             window.toggleScrollSmoother(false);
    //         }
    //     };

    //     // Função para retomar o ScrollSmoother
    //     const resumeScrollSmoother = () => {
    //         if (window.toggleScrollSmoother) {
    //             window.toggleScrollSmoother(true);
    //         }
    //     };

    //     // Função para centralizar o carrossel precisamente
    //     const centerCarousel = () => {
    //         if (window.scrollToElement) {
    //             // Usa ScrollSmoother para posicionar o centro do elemento no centro da viewport
    //             window.scrollToElement(carrosselElement, `center center`);
    //         } else {
    //             // Fallback: calcula posição manual
    //             const rect = carrosselElement.getBoundingClientRect();
    //             const windowHeight = window.innerHeight;
    //             const elementCenter = rect.top + (rect.height / 2);
    //             const targetScroll = window.scrollY + elementCenter - (windowHeight / 2);
                
    //             window.scrollTo({
    //                 top: targetScroll,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     };

    //     // Variáveis para controle de debounce
    //     let isEntering = false;
    //     let enterTimeout = null;
    //     let snapTimeout = null;

    //     ScrollTrigger.create({
    //         trigger: carrosselElement,
    //         start: "center-=100 center", // Começa um pouco antes
    //         end: "center+=100 center",   // Termina um pouco depois
    //         onEnter: () => {
    //             if (isEntering) return;
    //             isEntering = true;
                
    //             // Cancela timeouts anteriores
    //             if (enterTimeout) clearTimeout(enterTimeout);
    //             if (snapTimeout) clearTimeout(snapTimeout);
                
    //             // Para o ScrollSmoother imediatamente
    //             pauseScrollSmoother();
                
    //             // Centraliza precisamente
    //             snapTimeout = setTimeout(() => {
    //                 centerCarousel();
                    
    //                 // Aguarda a centralização e então ativa o modo carrossel
    //                 enterTimeout = setTimeout(() => {
    //                     isScrollingCarousel = true;
    //                     swiperOqueSignifica.allowTouchMove = false;
    //                     hasStoppedAtExtreme = false;
    //                     isEntering = false;
    //                 }, 400); // Tempo suficiente para a animação de centralização
    //             }, 50);
    //         },
    //         onLeave: () => {
    //             // Sempre libera o scroll ao sair, independente do estado
    //             isScrollingCarousel = false;
    //             resumeScrollSmoother();
    //             swiperOqueSignifica.allowTouchMove = true;
    //             hasStoppedAtExtreme = false;
                
    //             // Cancela timeouts pendentes
    //             if (enterTimeout) clearTimeout(enterTimeout);
    //             if (snapTimeout) clearTimeout(snapTimeout);
    //             isEntering = false;
    //         },
    //         onEnterBack: () => {
    //             if (isEntering) return;
    //             isEntering = true;
                
    //             // Cancela timeouts anteriores
    //             if (enterTimeout) clearTimeout(enterTimeout);
    //             if (snapTimeout) clearTimeout(snapTimeout);
                
    //             // Para o ScrollSmoother imediatamente
    //             pauseScrollSmoother();
                
    //             // Centraliza precisamente
    //             snapTimeout = setTimeout(() => {
    //                 centerCarousel();
                    
    //                 // Aguarda a centralização e então ativa o modo carrossel
    //                 enterTimeout = setTimeout(() => {
    //                     isScrollingCarousel = true;
    //                     swiperOqueSignifica.allowTouchMove = false;
    //                     hasStoppedAtExtreme = false;
    //                     isEntering = false;
    //                 }, 400); // Tempo suficiente para a animação de centralização
    //             }, 50);
    //         },
    //         onLeaveBack: () => {
    //             // Sempre libera o scroll ao sair para trás, independente do estado
    //             isScrollingCarousel = false;
    //             resumeScrollSmoother();
    //             swiperOqueSignifica.allowTouchMove = true;
    //             hasStoppedAtExtreme = false;
                
    //             // Cancela timeouts pendentes
    //             if (enterTimeout) clearTimeout(enterTimeout);
    //             if (snapTimeout) clearTimeout(snapTimeout);
    //             isEntering = false;
    //         }
    //     });

    //     // Controla o scroll personalizado com movimento suave
    //     let wheelHandler = (e) => {
    //         if (!isScrollingCarousel) return;
            
    //         e.preventDefault();
    //         e.stopPropagation();

    //         const delta = e.deltaY;
    //         const sensitivity = 2;
            
    //         // Se está no último slide e tentando ir para frente
    //         if (isAtLastSlide && delta > 0) {
    //             if (!hasStoppedAtExtreme) {
    //                 hasStoppedAtExtreme = true;
    //                 return; // Para no último slide na primeira tentativa
    //             } else {
    //                 // Segunda tentativa - continua o scroll da página
    //                 isScrollingCarousel = false;
    //                 resumeScrollSmoother();
    //                 swiperOqueSignifica.allowTouchMove = true;
    //                 hasStoppedAtExtreme = false;
                    
    //                 setTimeout(() => {
    //                     if (window.scrollToElement) {
    //                         // Usa o ScrollSmoother para continuar suavemente
    //                         const nextSection = carrosselElement.nextElementSibling;
    //                         if (nextSection) {
    //                             window.scrollToElement(nextSection, 0);
    //                         } else {
    //                             window.scrollBy(0, delta * 10);
    //                         }
    //                     } else {
    //                         window.scrollBy(0, delta * 10);
    //                     }
    //                 }, 50);
    //                 return;
    //             }
    //         }
            
    //         // Se está no primeiro slide e tentando voltar
    //         if (isAtFirstSlide && delta < 0) {
    //             if (!hasStoppedAtExtreme) {
    //                 hasStoppedAtExtreme = true;
    //                 return; // Para no primeiro slide na primeira tentativa
    //             } else {
    //                 // Segunda tentativa - continua o scroll da página
    //                 isScrollingCarousel = false;
    //                 resumeScrollSmoother();
    //                 swiperOqueSignifica.allowTouchMove = true;
    //                 hasStoppedAtExtreme = false;
                    
    //                 setTimeout(() => {
    //                     if (window.scrollToElement) {
    //                         const prevSection = carrosselElement.previousElementSibling;
    //                         if (prevSection) {
    //                             window.scrollToElement(prevSection, 0);
    //                         } else {
    //                             window.scrollBy(0, delta * 10);
    //                         }
    //                     } else {
    //                         window.scrollBy(0, delta * 10);
    //                     }
    //                 }, 50);
    //                 return;
    //             }
    //         }
            
    //         // Reset da flag quando não está nos extremos
    //         if (!isAtFirstSlide && !isAtLastSlide) {
    //             hasStoppedAtExtreme = false;
    //         }
            
    //         // Atualiza o target de translação baseado no scroll
    //         targetTranslate -= delta * sensitivity;
    //         targetTranslate = Math.max(maxTranslate, Math.min(0, targetTranslate));

    //         // Anima suavemente para a nova posição usando GSAP
    //         animationTween.kill();
    //         animationTween = gsap.to({ translate: currentTranslate }, {
    //             translate: targetTranslate,
    //             duration: 0.3,
    //             ease: "power2.out",
    //             onUpdate: function() {
    //                 currentTranslate = this.targets()[0].translate;
    //                 swiperWrapper.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
                    
    //                 // Atualiza o progresso da barra
    //                 const progress = Math.abs(currentTranslate) / Math.abs(maxTranslate);
    //                 swiperOqueSignifica.setProgress(progress);
                    
    //                 // Atualiza flags de posição
    //                 isAtFirstSlide = currentTranslate >= -10;
    //                 isAtLastSlide = currentTranslate <= (maxTranslate + 10);
    //             }
    //         });
    //     };

    //     // Adiciona o listener de scroll
    //     window.addEventListener('wheel', wheelHandler, { passive: false });

    //     // Controle via teclado (opcional) - também com movimento suave
    //     document.addEventListener('keydown', (e) => {
    //         if (!isScrollingCarousel) return;

    //         const keyScrollAmount = 100; // Quantidade de pixels por tecla

    //         if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    //             e.preventDefault();
                
    //             // Verifica se está no último slide
    //             if (isAtLastSlide) {
    //                 if (!hasStoppedAtExtreme) {
    //                     hasStoppedAtExtreme = true;
    //                     return;
    //                 } else {
    //                     // Sai do modo carrossel
    //                     isScrollingCarousel = false;
    //                     resumeScrollSmoother();
    //                     swiperOqueSignifica.allowTouchMove = true;
    //                     hasStoppedAtExtreme = false;
    //                     return;
    //                 }
    //             }
                
    //             targetTranslate -= keyScrollAmount;
    //             targetTranslate = Math.max(maxTranslate, targetTranslate);
                
    //             // Anima suavemente usando GSAP
    //             animationTween.kill();
    //             animationTween = gsap.to({ translate: currentTranslate }, {
    //                 translate: targetTranslate,
    //                 duration: 0.5,
    //                 ease: "power2.out",
    //                 onUpdate: function() {
    //                     currentTranslate = this.targets()[0].translate;
    //                     swiperWrapper.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
                        
    //                     const progress = Math.abs(currentTranslate) / Math.abs(maxTranslate);
    //                     swiperOqueSignifica.setProgress(progress);
                        
    //                     // Atualiza flags de posição
    //                     isAtFirstSlide = currentTranslate >= -10;
    //                     isAtLastSlide = currentTranslate <= (maxTranslate + 10);
    //                 }
    //             });
                
    //         } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    //             e.preventDefault();
                
    //             // Verifica se está no primeiro slide
    //             if (isAtFirstSlide) {
    //                 if (!hasStoppedAtExtreme) {
    //                     hasStoppedAtExtreme = true;
    //                     return;
    //                 } else {
    //                     // Sai do modo carrossel
    //                     isScrollingCarousel = false;
    //                     resumeScrollSmoother();
    //                     swiperOqueSignifica.allowTouchMove = true;
    //                     hasStoppedAtExtreme = false;
    //                     return;
    //                 }
    //             }
                
    //             targetTranslate += keyScrollAmount;
    //             targetTranslate = Math.min(0, targetTranslate);
                
    //             // Anima suavemente usando GSAP
    //             animationTween.kill();
    //             animationTween = gsap.to({ translate: currentTranslate }, {
    //                 translate: targetTranslate,
    //                 duration: 0.5,
    //                 ease: "power2.out",
    //                 onUpdate: function() {
    //                     currentTranslate = this.targets()[0].translate;
    //                     swiperWrapper.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
                        
    //                     const progress = Math.abs(currentTranslate) / Math.abs(maxTranslate);
    //                     swiperOqueSignifica.setProgress(progress);
                        
    //                     // Atualiza flags de posição
    //                     isAtFirstSlide = currentTranslate >= -10;
    //                     isAtLastSlide = currentTranslate <= (maxTranslate + 10);
    //                 }
    //             });
    //         }
            
    //         // Reset da flag quando não está nos extremos
    //         if (!isAtFirstSlide && !isAtLastSlide) {
    //             hasStoppedAtExtreme = false;
    //         }
    //     });
    // }
});