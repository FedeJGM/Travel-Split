/**
 * ExpenseItemView - Componente de item de gasto
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza items de gasto
 * - DRY: Componente reutilizable
 * - Encapsulamiento: Lógica de renderizado aislada
 */

import { formatCurrency } from '../../utils/index.js';

export class ExpenseItemView {
    /**
     * Renderiza un item de gasto
     * @param {Object} gasto - Datos del gasto
     * @param {string} divisa - Divisa del viaje
     * @returns {string} - HTML del item
     */
    static render(gasto, divisa = 'USD') {
        return `
            <div class="gasto-item">
                <div class="gasto-info">
                    <h4>${this.escapeHTML(gasto.descripcion)}</h4>
                    <div class="gasto-meta">
                        <span>
                            <i class="fas fa-user"></i>
                            ${this.escapeHTML(gasto.pagador)}
                        </span>
                        <span>
                            <i class="fas fa-calendar"></i>
                            ${gasto.fecha}
                        </span>
                        <span>
                            <i class="fas fa-users"></i>
                            ${gasto.participantes?.length || 0} personas
                        </span>
                    </div>
                </div>
                <div class="gasto-monto">
                    ${formatCurrency(gasto.monto, divisa)}
                </div>
            </div>
        `;
    }

    /**
     * Renderiza una lista de gastos
     * @param {Array} gastos - Array de gastos
     * @param {string} divisa - Divisa
     * @returns {string} - HTML de la lista
     */
    static renderList(gastos, divisa = 'USD') {
        if (!gastos || gastos.length === 0) {
            return this.renderEmpty();
        }

        return gastos.map(gasto => this.render(gasto, divisa)).join('');
    }

    /**
     * Renderiza estado vacío
     * @private
     * @returns {string}
     */
    static renderEmpty() {
        return `
            <div class="empty-state" style="text-align: center; padding: 2rem; color: var(--gray);">
                <i class="fas fa-receipt" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>No hay gastos registrados todavía</p>
            </div>
        `;
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
 
