/**
 * ExpenseFormView - Vista del formulario de gastos
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza el formulario de gastos
 * - Encapsulamiento: Gestión interna de participantes
 */

import { BaseView } from './BaseView.js';

export class ExpenseFormView extends BaseView {
    constructor() {
        super();
        this.setTitle('Nuevo Gasto');
        this.viaje = null;
    }

    render() {
        if (!this.viaje) {
            return this.renderError();
        }

        return `
            <section class="expense-form-section animated">
                <div class="card">
                    <h2>Registrar Nuevo Gasto</h2>
                    <p style="color: var(--gray); margin-bottom: 1.5rem;">
                        Viaje: <strong>${this.escapeHTML(this.viaje.nombre)}</strong>
                    </p>
                    
                    <form id="form-nuevo-gasto">
                        <div class="form-group">
                            <label for="descripcion">
                                <i class="fas fa-file-alt"></i>
                                Descripción del Gasto
                            </label>
                            <input 
                                type="text" 
                                id="descripcion" 
                                name="descripcion"
                                class="form-control"
                                placeholder="Ej: Cena en restaurante"
                                required
                                minlength="3"
                                maxlength="100"
                            >
                        </div>

                        <div class="form-group">
                            <label for="monto">
                                <i class="fas fa-dollar-sign"></i>
                                Monto
                            </label>
                            <div class="currency-input">
                                <input 
                                    type="number" 
                                    id="monto" 
                                    name="monto"
                                    class="form-control"
                                    placeholder="0.00"
                                    required
                                    min="0.01"
                                    step="0.01"
                                >
                                <span id="divisa-actual">${this.viaje.divisa}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="pagador">
                                <i class="fas fa-user"></i>
                                ¿Quién pagó?
                            </label>
                            <select id="pagador" name="pagador" class="form-control" required>
                                <option value="">Selecciona un participante</option>
                                ${this.renderParticipantesOptions()}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>
                                <i class="fas fa-users"></i>
                                ¿Quiénes participan en este gasto?
                            </label>
                            <div id="participantes-incluidos">
                                ${this.renderParticipantesCheckboxes()}
                            </div>
                            <small class="form-help">
                                <i class="fas fa-info-circle"></i>
                                Selecciona todos los que deben dividir este gasto
                            </small>
                        </div>

                        <div class="form-actions">
                            <a href="#/viaje/${this.viaje.id}" class="btn btn-outline">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Registrar Gasto
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        `;
    }

    /**
     * Establece el viaje actual
     * @param {Object} viaje
     */
    setViaje(viaje) {
        this.viaje = viaje;
    }

    /**
     * Renderiza opciones de participantes para select
     * @private
     * @returns {string}
     */
    renderParticipantesOptions() {
        if (!this.viaje || !this.viaje.participantes) {
            return '';
        }

        return this.viaje.participantes
            .map(p => `<option value="${this.escapeHTML(p)}">${this.escapeHTML(p)}</option>`)
            .join('');
    }

    /**
     * Renderiza checkboxes de participantes
     * @private
     * @returns {string}
     */
    renderParticipantesCheckboxes() {
        if (!this.viaje || !this.viaje.participantes) {
            return '';
        }

        return this.viaje.participantes
            .map(p => `
                <label>
                    <input 
                        type="checkbox" 
                        name="participantes" 
                        value="${this.escapeHTML(p)}"
                        checked
                    >
                    ${this.escapeHTML(p)}
                </label>
            `)
            .join('');
    }

    /**
     * Obtiene los datos del formulario
     * @returns {Object}
     */
    getFormData() {
        const checkboxes = Array.from(this.$$('input[name="participantes"]:checked'));
        
        return {
            descripcion: this.$('#descripcion')?.value.trim(),
            monto: parseFloat(this.$('#monto')?.value),
            pagador: this.$('#pagador')?.value,
            participantes: checkboxes.map(cb => cb.value)
        };
    }

    /**
     * Renderiza mensaje de error
     * @private
     * @returns {string}
     */
    renderError() {
        return `
            <div class="card" style="text-align: center; padding: 3rem;">
                <h2>Error</h2>
                <p style="color: var(--gray);">No se pudo cargar el viaje</p>
                <a href="#/mis-viajes" class="btn btn-primary">
                    Volver a Mis Viajes
                </a>
            </div>
        `;
    }

    afterRender() {
        console.log('ExpenseFormView renderizada');
    }
}
 
