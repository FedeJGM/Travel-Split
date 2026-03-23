/**
 * LoaderView - Componente de loader/spinner
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza loaders
 * - DRY: Componente reutilizable
 * - KISS: Implementación minimalista
 */

export class LoaderView {
    /**
     * Renderiza un loader simple
     * @param {string} message - Mensaje opcional
     * @returns {string} - HTML del loader
     */
    static render(message = 'Cargando...') {
        return `
            <div class="loader-container" style="text-align: center; padding: 3rem;">
                <div class="loader-spinner">
                    <i class="fas fa-circle-notch fa-spin" style="font-size: 3rem; color: var(--primary);"></i>
                </div>
                <p style="color: var(--gray); margin-top: 1rem;">
                    ${this.escapeHTML(message)}
                </p>
            </div>
        `;
    }

    /**
     * Renderiza un loader inline (más pequeño)
     * @returns {string}
     */
    static renderInline() {
        return `
            <span class="loader-inline">
                <i class="fas fa-circle-notch fa-spin"></i>
            </span>
        `;
    }

    /**
     * Renderiza un loader de página completa
     * @param {string} message
     * @returns {string}
     */
    static renderFullPage(message = 'Cargando...') {
        return `
            <div class="loader-fullpage" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">
                <div style="text-align: center;">
                    <i class="fas fa-circle-notch fa-spin" style="font-size: 4rem; color: var(--primary);"></i>
                    <p style="color: var(--dark); margin-top: 1rem; font-size: 1.2rem;">
                        ${this.escapeHTML(message)}
                    </p>
                </div>
            </div>
        `;
    }

    /**
     * Muestra un loader (inserta en el DOM)
     * @param {string} selector - Selector del contenedor
     * @param {string} message - Mensaje
     */
    static show(selector, message = 'Cargando...') {
        const container = document.querySelector(selector);
        if (container) {
            container.innerHTML = this.render(message);
        }
    }

    /**
     * Oculta el loader
     * @param {string} selector - Selector del contenedor
     */
    static hide(selector) {
        const container = document.querySelector(selector);
        if (container) {
            const loader = container.querySelector('.loader-container');
            if (loader) {
                loader.remove();
            }
        }
    }

    /**
     * Escapa HTML
     * @private
     * @param {string} text
     * @returns {string}
     */
    static escapeHTML(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }
}
 
