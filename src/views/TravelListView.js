/**
 * TravelListView - Vista del listado de viajes
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza el listado
 * - DRY: Métodos reutilizables
 * - KISS: Renderizado simple
 */

import { BaseView } from './BaseView.js';
import { formatCurrency, formatDate } from '../utils/index.js';

export class TravelListView extends BaseView {
    constructor() {
        super();
        this.setTitle('Mis Viajes');
        this.viajes = [];
    }

    render() {
        return `
            <section class="animated">
                <div class="card">
                    <div class="list-header">
                        <h2>Mis Viajes</h2>
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input 
                                type="text" 
                                id="buscar-viaje"
                                class="form-control"
                                placeholder="Buscar viaje..."
                            >
                        </div>
                    </div>
                </div>

                <div id="lista-viajes" class="viajes-grid"></div>
            </section>
        `;
    }

    afterRender() {
        console.log('TravelListView renderizada');
    }

    /**
     * Renderiza la lista de viajes
     * @param {Array} viajes - Array de viajes
     */
    renderViajes(viajes) {
        this.viajes = viajes;
        const container = this.$('#lista-viajes');

        if (!container) return;

        if (viajes.length === 0) {
            container.innerHTML = this.renderEmptyState();
            return;
        }

        container.innerHTML = viajes.map(viaje => this.renderViajeCard(viaje)).join('');
    }

    /**
     * Renderiza un card de viaje
     * @private
     * @param {Object} viaje - Datos del viaje
     * @returns {string}
     */
    renderViajeCard(viaje) {
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
     * Renderiza el estado vacío
     * @private
     * @returns {string}
     */
    renderEmptyState() {
        return `
            <div class="empty-state">
                <i class="fas fa-suitcase" style="font-size: 4rem; color: var(--gray); opacity: 0.5; margin-bottom: 1rem;"></i>
                <h3>No tienes viajes todavía</h3>
                <p>Crea tu primer viaje o únete a uno existente</p>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                    <a href="#/crear-viaje" class="btn btn-primary">
                        <i class="fas fa-plus-circle"></i>
                        Crear Viaje
                    </a>
                    <a href="#/unirse-viaje" class="btn btn-secondary">
                        <i class="fas fa-sign-in-alt"></i>
                        Unirse
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Filtra viajes por término de búsqueda
     * @param {string} termino - Término de búsqueda
     */
    filtrarViajes(termino) {
        const terminoLower = termino.toLowerCase();
        const viajesFiltrados = this.viajes.filter(viaje =>
            viaje.nombre.toLowerCase().includes(terminoLower) ||
            viaje.id.toLowerCase().includes(terminoLower)
        );
        this.renderViajes(viajesFiltrados);
    }
}
 
