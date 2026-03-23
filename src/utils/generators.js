/**
 * Generators - Funciones de generación
 * 
 * Principios aplicados:
 * - SRP (Single Responsibility): Cada función genera un tipo específico
 * - DRY: Lógica de generación centralizada
 * - KISS: Implementaciones simples y eficientes
 * - Alta cohesión: Todas las funciones generan identificadores/códigos únicos
 */

/**
 * Genera un ID único basado en timestamp y random
 * @returns {string} ID único alfanumérico
 * 
 * @example
 * generateId() // "lj3k8m2n9p"
 */
export const generateId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 9);
    return timestamp + randomStr;
};

/**
 * Genera un código de viaje único (más corto y legible)
 * @param {number} length - Longitud del código (default: 6)
 * @returns {string} Código único en mayúsculas
 * 
 * @example
 * generateTravelCode() // "ABC123"
 * generateTravelCode(8) // "XY7K9M2N"
 */
export const generateTravelCode = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    
    return code;
};

/**
 * Genera un UUID v4 simplificado
 * @returns {string} UUID simplificado
 * 
 * @example
 * generateUUID() // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 */
export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

/**
 * Genera un slug a partir de un texto (URL-friendly)
 * @param {string} text - Texto a convertir en slug
 * @returns {string} Slug generado
 * 
 * @example
 * generateSlug('Viaje a Cancún 2025') // "viaje-a-cancun-2025"
 */
export const generateSlug = (text) => {
    if (typeof text !== 'string') {
        return '';
    }
    
    return text
        .toLowerCase()
        .normalize('NFD') // Normaliza caracteres Unicode
        .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
        .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
        .trim()
        .replace(/\s+/g, '-') // Reemplaza espacios con guiones
        .replace(/-+/g, '-'); // Elimina guiones duplicados
};

/**
 * Genera un color aleatorio en formato hexadecimal
 * @returns {string} Color hex
 * 
 * @example
 * generateRandomColor() // "#3a7bd5"
 */
export const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Genera un número aleatorio entre min y max (inclusive)
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Número aleatorio
 * 
 * @example
 * generateRandomNumber(1, 10) // 7
 */
export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Genera una clave temporal (para reset de password, etc.)
 * @param {number} length - Longitud de la clave (default: 8)
 * @returns {string} Clave temporal
 * 
 * @example
 * generateTemporaryKey() // "aB3dE7fH"
 */
export const generateTemporaryKey = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return key;
};
 
