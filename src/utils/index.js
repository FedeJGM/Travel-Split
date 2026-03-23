/**
 * Utils - Exportador central
 */

// Exportar todas las funciones de formatters
export {
    formatCurrency,
    formatDate,
    formatDateTime,
    formatNumber,
    formatPercentage,
    truncateText,
    capitalize
} from './formatters.js';

// Exportar todas las funciones de generators
export {
    generateId,
    generateTravelCode,
    generateUUID,
    generateSlug,
    generateRandomColor,
    generateRandomNumber,
    generateTemporaryKey
} from './generators.js';
 
