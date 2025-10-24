---
name: implementar-toast
description: Utiliza o sistema global de notificações toast para exibir mensagens de sucesso, erro e informações com animações GSAP e design responsivo.
---

# Implementar Toast

Utiliza o sistema global de notificações toast para exibir mensagens de sucesso, erro e informações com animações GSAP e design responsivo.

## Como Utilizar

### 1. Uso Básico

```javascript
// Exibir toast de sucesso
Toast.show('success', 'Operação realizada com sucesso!', 4000);

// Exibir toast de erro
Toast.show('error', 'Ocorreu um erro inesperado!', 8000);

// Toast com duração customizada
Toast.show('success', 'Mensagem rápida', 2000);
```

### 2. Integração com Formulários

```javascript
// Newsletter - Sucesso
handleSuccess() {
    Toast.show('success', 'Inscrição realizada com sucesso!', 8000);
}

// Newsletter - Erro
handleError(error) {
    const errorMessage = error.message || 'Erro ao processar inscrição';
    Toast.show('error', errorMessage, 8000);
}

// Contact Form - Sucesso
Toast.show('success', 'Mensagem enviada com sucesso!', 6000);

// Contact Form - Validação
Toast.show('error', 'Por favor, preencha todos os campos obrigatórios.', 5000);
```

### 3. Controle Manual

```javascript
// Armazenar referência do toast
const toast = Toast.show('success', 'Mensagem importante');

// Fechar toast específico
Toast.hide(toast);

// Fechar todos os toasts
Toast.hideAll();
```

### 4. Tipos Disponíveis

- **`success`** - Operações bem-sucedidas (ícone: tick-circle, cor: primário)
- **`error`** - Erros e falhas (ícone: info-circle, cor: danger)

### 5. Características Automáticas

- **Animações GSAP**: Entrada e saída suaves
- **Auto-close**: Fecha automaticamente após duração especificada
- **Empilhamento**: Múltiplos toasts simultâneos
- **Progress bar**: Barra de progresso visual
- **Responsivo**: Adaptação automática para mobile
- **Acessibilidade**: Botão de fechar com aria-label

## Exemplos Práticos

### Newsletter Form
```javascript
class NewsletterForm extends BaseForm {
    handleSuccess() {
        Toast.show('success', 'Inscrição realizada com sucesso!', 8000);
        this.resetForm();
    }

    handleError(error) {
        Toast.show('error', error.message || 'Erro ao processar inscrição', 8000);
    }
}
```

### Contact Form
```javascript
class MultiStepForm extends BaseForm {
    handleSuccess() {
        Toast.show('success', 'Mensagem enviada com sucesso!', 6000);
    }

    showValidationError(message) {
        Toast.show('error', message, 5000);
    }
}
```

### Validação de Campos
```javascript
// Validar e-mail
if (!this.validateEmail(this.emailInput, 'E-mail inválido')) {
    Toast.show('error', 'Por favor, digite um e-mail válido', 5000);
    return false;
}

// Campo obrigatório
if (!this.nomeInput.value.trim()) {
    Toast.show('error', 'O nome é obrigatório', 5000);
    return false;
}
```

## Troubleshooting

### Toast não aparece
1. Verificar se `toast.js` está carregado
2. Verificar console para erros JavaScript
3. Verificar se GSAP está disponível (fallback CSS será usado)

### Animações não funcionam
1. Verificar se GSAP está carregado
2. Sistema usa fallback CSS automaticamente
3. Verificar se `toast.css` está importado

### Ícones não aparecem
1. Verificar se ícones existem em `src/img/iconpdb/`
2. Verificar caminho dos ícones
3. Verificar se `iconpdb-tick-circle.svg` e `iconpdb-info-circle.svg` existem

### Debug
```javascript
// Verificar se Toast está disponível
console.log(typeof Toast); // deve retornar 'function'

// Verificar container
console.log(Toast.container); // deve retornar elemento DOM

// Verificar toasts ativos
console.log(Toast.toasts); // deve retornar array
```
