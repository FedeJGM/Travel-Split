/**
 * Formatters - Funciones de formateo
 * 
 * Principios aplicados:
 * - SRP (Single Responsibility): Cada función tiene una única responsabilidad
 * - DRY (Don't Repeat Yourself): Lógica de formateo centralizada
 * - KISS (Keep It Simple): Funciones simples y directas
 * - Alta cohesión: Todas las funciones están relacionadas con formateo
 */

/**
 * Formatea un número como moneda según la divisa especificada
 * @param {number} amount - Monto a formatear
 * @param {string} currency - Código de divisa (USD, EUR, MXN, etc.)
 * @returns {string} Monto formateado con símbolo de moneda
 * 
 * @example
 * formatCurrency(1234.56, 'USD') // "$1,234.56"
 * formatCurrency(5000, 'MXN') // "$5,000.00"
 */
export const formatCurrency = (amount, currency = 'USD') => {
    try {
        // Validación de entrada
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0.00';
        }

        // Usar Intl.NumberFormat para formateo internacionalizado
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (error) {
        console.error('Error al formatear moneda:', error);
        return `${amount.toFixed(2)} ${currency}`;
    }
};

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Código de locale (default: 'es-MX')
 * @returns {string} Fecha formateada
 * 
 * @example
 * formatDate(new Date()) // "2 nov 2025"
 * formatDate('2025-11-02') // "2 nov 2025"
 */
export const formatDate = (date, locale = 'es-MX') => {
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        
        if (isNaN(dateObj.getTime())) {
            return 'Fecha inválida';
        }

        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(dateObj);
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
    }
};

/**
 * Formatea una fecha en formato completo con hora
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Código de locale (default: 'es-MX')
 * @returns {string} Fecha y hora formateadas
 * 
 * @example
 * formatDateTime(new Date()) // "2 de noviembre de 2025, 3:25 a.m."
 */
export const formatDateTime = (date, locale = 'es-MX') => {
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        
        if (isNaN(dateObj.getTime())) {
            return 'Fecha inválida';
        }

        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(dateObj);
    } catch (error) {
        console.error('Error al formatear fecha/hora:', error);
        return 'Fecha inválida';
    }
};

/**
 * Formatea un número con separadores de miles
 * @param {number} number - Número a formatear
 * @returns {string} Número formateado
 * 
 * @example
 * formatNumber(1234567) // "1,234,567"
 */
export const formatNumber = (number) => {
    if (typeof number !== 'number' || isNaN(number)) {
        return '0';
    }
    
    return new Intl.NumberFormat('es-MX').format(number);
};

/**
 * Formatea un porcentaje
 * @param {number} value - Valor decimal (0.15 = 15%)
 * @param {number} decimals - Número de decimales (default: 2)
 * @returns {string} Porcentaje formateado
 * 
 * @example
 * formatPercentage(0.1567) // "15.67%"
 * formatPercentage(0.5, 0) // "50%"
 */
export const formatPercentage = (value, decimals = 2) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return '0%';
    }
    
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Trunca un texto y agrega puntos suspensivos
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 * 
 * @example
 * truncateText('Este es un texto muy largo', 10) // "Este es..."
 */
export const truncateText = (text, maxLength) => {
    if (typeof text !== 'string') {
        return '';
    }
    
    if (text.length <= maxLength) {
        return text;
    }
    
    return text.substring(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 * 
 * @example
 * capitalize('hola mundo') // "Hola Mundo"
 */
export const capitalize = (text) => {
    if (typeof text !== 'string') {
        return '';
    }
    
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
 
