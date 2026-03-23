/**
 * TravelDetailView - Vista de detalles del viaje
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza detalles del viaje
 * - DRY: Reutiliza utilidades de formateo
 * - SoC: Separación clara de presentación
 */

import { BaseView } from './BaseView.js';
import { formatCurrency, formatDate } from '../utils/index.js';

export class TravelDetailView extends BaseView {
    constructor() {
        super();
        this.viaje = null;
    }

    render() {
        if (!this.viaje) {
            return this.renderError();
        }

        this.setTitle(`${this.viaje.nombre}`);

        return `
            <section class="animated">
                <div class="card viaje-header-detail">
                    <div class="header-content">
                        <h1>${this.escapeHTML(this.viaje.nombre)}</h1>
                        <p>
                            Código del viaje: 
                            <span class="viaje-codigo">${this.viaje.id}</span>
                        </p>
                    </div>
                </div>

                <div class="resumen-section">
                    <div class="card resumen-card">
                        <h2><i class="fas fa-chart-bar"></i> Resumen del Viaje</h2>
                        <div class="resumen-grid">
                            <div class="resumen-item">
                                <h3>Total Gastado</h3>
                                <div class="monto">
                                    ${formatCurrency(this.viaje.totalGastado, this.viaje.divisa)}
                                </div>
                            </div>
                            <div class="resumen-item">
                                <h3>Participantes</h3>
                                <div class="monto">${this.viaje.participantes.length}</div>
                            </div>
                            <div class="resumen-item">
                                <h3>Gastos Registrados</h3>
                                <div class="monto">${this.viaje.gastos.length}</div>
                            </div>
                            <div class="resumen-item">
                                <h3>Promedio por Persona</h3>
                                <div class="monto">
                                    ${formatCurrency(this.getPromedio(), this.viaje.divisa)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-container">
                    <div class="card participantes-section">
                        <h2><i class="fas fa-users"></i> Participantes</h2>
                        <ul id="lista-participantes">
                            ${this.renderParticipantes()}
                        </ul>
                    </div>

                    <div class="card gastos-section">
                        <div class="gastos-header">
                            <h2><i class="fas fa-receipt"></i> Gastos</h2>
                            <a href="#/viaje/${this.viaje.id}/nuevo-gasto" class="btn btn-primary btn-small">
                                <i class="fas fa-plus"></i> Nuevo Gasto
                            </a>
                        </div>
                        <div id="lista-gastos">
                            ${this.renderGastos()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Establece el viaje actual
     * @param {Object} viaje - Datos del viaje
     */
    setViaje(viaje) {
        this.viaje = viaje;
    }

    /**
     * Calcula el promedio por persona
     * @private
     * @returns {number}
     */
    getPromedio() {
        if (!this.viaje || this.viaje.participantes.length === 0) {
            return 0;
        }
        return this.viaje.totalGastado / this.viaje.participantes.length;
    }

    /**
     * Renderiza la lista de participantes
     * @private
     * @returns {string}
     */
    renderParticipantes() {
        if (!this.viaje || !this.viaje.participantes.length) {
            return '<li style="color: var(--gray);">No hay participantes</li>';
        }

        return this.viaje.participantes
            .map(p => `<li>${this.escapeHTML(p)}</li>`)
            .join('');
    }

    /**
     * Renderiza la lista de gastos
     * @private
     * @returns {string}
     */
    renderGastos() {
        if (!this.viaje || !this.viaje.gastos.length) {
            return '<p class="empty-state" style="text-align: center; padding: 2rem; color: var(--gray);">No hay gastos registrados todavía</p>';
        }

        return this.viaje.gastos
            .map(gasto => `
                <div class="gasto-item">
                    <div class="gasto-info">
                        <h4>${this.escapeHTML(gasto.descripcion)}</h4>
                        <div class="gasto-meta">
                            <span><i class="fas fa-user"></i> ${this.escapeHTML(gasto.pagador)}</span>
                            <span><i class="fas fa-calendar"></i> ${gasto.fecha}</span>
                            <span><i class="fas fa-users"></i> ${gasto.participantes.length} personas</span>
                        </div>
                    </div>
                    <div class="gasto-monto">
                        ${formatCurrency(gasto.monto, this.viaje.divisa)}
                    </div>
                </div>
            `)
            .join('');
    }

    /**
     * Renderiza mensaje de error
     * @private
     * @returns {string}
     */
    renderError() {
        return `
            <div class="card error-page" style="text-align: center; padding: 3rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                <h2>Viaje no encontrado</h2>
                <p style="color: var(--gray); margin: 1rem 0;">
                    El viaje que buscas no existe o fue eliminado
                </p>
                <a href="#/mis-viajes" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i> Volver a Mis Viajes
                </a>
            </div>
        `;
    }

    afterRender() {
        console.log('TravelDetailView renderizada');
    }
}
 
