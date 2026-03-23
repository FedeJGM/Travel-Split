/**
 * TravelCardView - Componente de tarjeta de viaje
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza tarjetas de viaje
 * - DRY: Componente reutilizable
 * - KISS: Implementación simple
 */

import { formatCurrency, formatDate } from '../../utils/index.js';

export class TravelCardView {
    /**
     * Renderiza una tarjeta de viaje
     * @param {Object} viaje - Datos del viaje
     * @returns {string} - HTML de la tarjeta
     */
    static render(viaje) {
        return `
            <div class="viaje-card" data-id="${viaje.id}">
                <div class="viaje-header">
                    <h3 class="viaje-title">${this.escapeHTML(viaje.nombre)}</h3>
                    <span class="viaje-badge">${viaje.divisa}</span>
                </div>

                <div class="viaje-meta">
                    <span>
                        <i class="fas fa-users"></i>
                        ${viaje.participantes?.length || 0} personas
                    </span>
                    <span>
                        <i class="fas fa-receipt"></i>
                        ${viaje.gastos?.length || 0} gastos
                    </span>
                </div>

                <div class="viaje-stats">
                    <div class="viaje-stat">
                        <span class="viaje-stat-value">
                            ${formatCurrency(viaje.totalGastado || 0, viaje.divisa)}
                        </span>
                        <span class="viaje-stat-label">Total gastado</span>
                    </div>
                    <div class="viaje-stat">
                        <span class="viaje-stat-value">
                            ${viaje.id}
                        </span>
                        <span class="viaje-stat-label">Código</span>
                    </div>
                </div>

                <div class="viaje-footer">
                    <span class="viaje-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(viaje.fechaCreacion)}
                    </span>
                    <a href="#/viaje/${viaje.id}" class="btn btn-primary btn-small">
                        <i class="fas fa-eye"></i>
                        Ver Detalles
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Escapa HTML para prevenir XSS
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
 
