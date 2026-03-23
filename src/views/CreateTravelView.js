/**
 * CreateTravelView - Vista para crear un viaje
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza el formulario de creación
 * - SoC: No contiene lógica de negocio (eso va en el Controller)
 * - Encapsulamiento: Métodos auxiliares privados
 */

import { BaseView } from './BaseView.js';

export class CreateTravelView extends BaseView {
    constructor() {
        super();
        this.setTitle('Crear Viaje');
        this.participantes = [];
    }

    render() {
        return `
            <section class="travel-form-section animated">
                <div class="card">
                    <h2>Crear Nuevo Viaje</h2>
                    
                    <form id="form-crear-viaje">
                        <div class="form-group">
                            <label for="nombre">
                                <i class="fas fa-suitcase"></i>
                                Nombre del Viaje
                            </label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre"
                                class="form-control"
                                placeholder="Ej: Viaje a la playa 2025"
                                required
                                minlength="3"
                                maxlength="50"
                            >
                            <small class="form-help">
                                <i class="fas fa-info-circle"></i>
                                Mínimo 3 caracteres, máximo 50
                            </small>
                        </div>

                        <div class="form-group">
                            <label for="divisa">
                                <i class="fas fa-money-bill-wave"></i>
                                Divisa Principal
                            </label>
                            <select id="divisa" name="divisa" class="form-control" required>
                                <option value="">Selecciona una divisa</option>
                                <option value="USD">USD - Dólar estadounidense</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="MXN" selected>MXN - Peso mexicano</option>
                                <option value="ARS">ARS - Peso argentino</option>
                                <option value="COP">COP - Peso colombiano</option>
                                <option value="CLP">CLP - Peso chileno</option>
                                <option value="BRL">BRL - Real brasileño</option>
                                <option value="PEN">PEN - Sol peruano</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>
                                <i class="fas fa-users"></i>
                                Participantes
                            </label>
                            <div class="add-participant">
                                <input 
                                    type="text" 
                                    id="nuevo-participante"
                                    class="form-control"
                                    placeholder="Nombre del participante"
                                    maxlength="30"
                                >
                                <button type="button" id="agregar-participante" class="btn btn-secondary">
                                    <i class="fas fa-plus"></i>
                                    Agregar
                                </button>
                            </div>
                            <div id="lista-participantes" class="participantes-list"></div>
                            <small class="form-help">
                                <i class="fas fa-info-circle"></i>
                                Agrega al menos un participante
                            </small>
                        </div>

                        <div class="form-actions">
                            <a href="#/" class="btn btn-outline">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Crear Viaje
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        `;
    }

    afterRender() {
        this.renderParticipantes();
        console.log('CreateTravelView renderizada');
    }

    /**
     * Renderiza la lista de participantes
     */
    renderParticipantes() {
        const container = this.$('#lista-participantes');
        
        if (!container) return;

        if (this.participantes.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = this.participantes.map(nombre => `
            <div class="participante-tag">
                <span>${this.escapeHTML(nombre)}</span>
                <button type="button" class="btn-remove" data-nombre="${this.escapeHTML(nombre)}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    /**
     * Agrega un participante a la lista
     * @param {string} nombre - Nombre del participante
     * @returns {boolean}
     */
    agregarParticipante(nombre) {
        const nombreNormalizado = nombre.trim();

        if (!nombreNormalizado) {
            this.showError('El nombre no puede estar vacío');
            return false;
        }

        if (this.participantes.includes(nombreNormalizado)) {
            this.showError('Este participante ya está agregado');
            return false;
        }

        this.participantes.push(nombreNormalizado);
        this.renderParticipantes();
        return true;
    }

    /**
     * Elimina un participante de la lista
     * @param {string} nombre - Nombre del participante
     */
    eliminarParticipante(nombre) {
        this.participantes = this.participantes.filter(p => p !== nombre);
        this.renderParticipantes();
    }

    /**
     * Obtiene los datos del formulario
     * @returns {Object}
     */
    getFormData() {
        return {
            nombre: this.$('#nombre')?.value.trim(),
            divisa: this.$('#divisa')?.value,
            participantes: [...this.participantes]
        };
    }

    /**
     * Limpia el formulario
     */
    limpiarFormulario() {
        const form = this.$('#form-crear-viaje');
        if (form) {
            form.reset();
        }
        this.participantes = [];
        this.renderParticipantes();
    }
}
