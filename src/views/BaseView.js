/**
 * BaseView - Vista base abstracta
 * 
 * Principios aplicados:
 * - SRP: Solo maneja operaciones comunes de vistas
 * - DRY: Funcionalidad compartida entre todas las vistas
 * - Encapsulamiento: Métodos reutilizables
 * - Template Method Pattern: Define estructura común
 */

export class BaseView {
    constructor() {
        if (this.constructor === BaseView) {
            throw new Error('BaseView es una clase abstracta y no puede ser instanciada directamente');
        }
    }

    /**
     * Método abstracto que debe ser implementado por las clases hijas
     * @returns {string} - HTML de la vista
     */
    render() {
        throw new Error('El método render() debe ser implementado por la clase hija');
    }

    /**
     * Hook que se ejecuta después de renderizar
     * Las clases hijas pueden sobrescribirlo
     */
    afterRender() {
        // Implementar en clases hijas si es necesario
    }

    /**
     * Encuentra un elemento en el DOM
     * @param {string} selector - Selector CSS
     * @returns {Element|null}
     */
    $(selector) {
        return document.querySelector(selector);
    }

    /**
     * Encuentra múltiples elementos en el DOM
     * @param {string} selector - Selector CSS
     * @returns {NodeList}
     */
    $$(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Agrega un event listener a un elemento
     * @param {string} selector - Selector CSS
     * @param {string} event - Nombre del evento
     * @param {Function} handler - Manejador del evento
     */
    on(selector, event, handler) {
        const element = this.$(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message - Mensaje de error
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Muestra un mensaje de éxito
     * @param {string} message - Mensaje de éxito
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Muestra una notificación
     * @param {string} message - Mensaje
     * @param {string} type - Tipo (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Por ahora usa alert, pero puede mejorarse con toasts
        const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        alert(`${icon} ${message}`);
    }

    /**
     * Limpia el contenido de un elemento
     * @param {string} selector - Selector CSS
     */
    clearContent(selector) {
        const element = this.$(selector);
        if (element) {
            element.innerHTML = '';
        }
    }

    /**
     * Actualiza el título de la página
     * @param {string} title - Título
     */
    setTitle(title) {
        document.title = `${title} | TravelSplit`;
    }

    /**
     * Sanitiza HTML para prevenir XSS
     * @param {string} html - HTML a sanitizar
     * @returns {string}
     */
    sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }

    /**
     * Escapa caracteres especiales en HTML
     * @param {string} text - Texto a escapar
     * @returns {string}
     */
    escapeHTML(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
 
