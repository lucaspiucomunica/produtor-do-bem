/**
 * Transitions Bundle Entry
 * Inclui: page-transition, anchor-handler, animations-config, animations-utils, globals
 */

// Re-exportar tudo de page-transition
export * from '../page-transition.js';

// Importar anchor-handler para navegação por hash
import '../anchor-handler.js';

// Re-exportar configurações e utils
export * from '../animations/animations-config.js';
export * from '../animations/animations-utils.js';

// Importar globals para inicialização
import '../animations/globals.js';

