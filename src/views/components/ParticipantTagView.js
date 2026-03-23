/**
 * ParticipantTagView - Componente de tag de participante
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza tags de participantes
 * - DRY: Componente reutilizable
 * - KISS: Simple y enfocado
 */

export class ParticipantTagView {
    /**
     * Renderiza un tag de participante
     * @param {string} nombre - Nombre del participante
     * @param {boolean} removable - Si se puede eliminar
     * @returns {string} - HTML del tag
     */
    static render(nombre, removable = true) {
        const removeBtn = removable ? `
            <button type="button" class="btn-remove" data-nombre="${this.escapeHTML(nombre)}">
                <i class="fas fa-times"></i>
            </button>
        ` : '';

        return `
            <div class="participante-tag">
                <span>${this.escapeHTML(nombre)}</span>
                ${removeBtn}
            </div>
        `;
    }

    /**
     * Renderiza una lista de tags
     * @param {Array} participantes - Array de nombres
     * @param {boolean} removable - Si se pueden eliminar
     * @returns {string} - HTML de los tags
     */
    static renderList(participantes, removable = true) {
        if (!participantes || participantes.length === 0) {
            return this.renderEmpty();
        }

        return participantes
            .map(nombre => this.render(nombre, removable))
            .join('');
    }

    /**
     * Renderiza estado vacío
     * @private
     * @returns {string}
     */
    static renderEmpty() {
        return `
            <div class="empty-state" style="text-align: center; padding: 1rem; color: var(--gray); font-style: italic;">
                Los participantes aparecerán aquí...
            </div>
        `;
    }

    /**
     * Renderiza lista simple (ul/li)
     * @param {Array} participantes - Array de nombres
     * @returns {string}
     */
    static renderSimpleList(participantes) {
        if (!participantes || participantes.length === 0) {
            return '<li style="color: var(--gray);">No hay participantes</li>';
        }

        return participantes
            .map(nombre => `<li>${this.escapeHTML(nombre)}</li>`)
            .join('');
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
 
