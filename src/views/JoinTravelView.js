/**
 * JoinTravelView - Vista para unirse a un viaje
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza formulario de unión
 * - KISS: Implementación simple
 */

import { BaseView } from './BaseView.js';

export class JoinTravelView extends BaseView {
    constructor() {
        super();
        this.setTitle('Unirse a Viaje');
    }

    render() {
        return `
            <section class="join-form-section animated">
                <div class="card">
                    <h2>Unirse a un Viaje Existente</h2>
                    <p style="color: var(--gray); margin-bottom: 1.5rem;">
                        Ingresa el código del viaje que te compartieron
                    </p>
                    
                    <form id="form-unirse-viaje">
                        <div class="form-group">
                            <label for="codigo">
                                <i class="fas fa-key"></i>
                                Código del Viaje
                            </label>
                            <input 
                                type="text" 
                                id="codigo" 
                                name="codigo"
                                class="form-control"
                                placeholder="Ej: ABC123"
                                required
                                style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold;"
                                minlength="4"
                                maxlength="12"
                            >
                            <small class="form-help">
                                <i class="fas fa-info-circle"></i>
                                El código debe tener entre 4 y 12 caracteres
                            </small>
                        </div>

                        <div class="instrucciones">
                            <i class="fas fa-lightbulb"></i>
                            <strong>¿Cómo funciona?</strong>
                            <p style="margin: 0.5rem 0 0 0;">
                                1. Pídele el código a quien creó el viaje<br>
                                2. Ingrésalo en el campo de arriba<br>
                                3. Podrás ver todos los detalles y gastos del viaje
                            </p>
                        </div>

                        <div class="form-actions">
                            <a href="#/" class="btn btn-outline">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-sign-in-alt"></i>
                                Unirse al Viaje
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        `;
    }

    /**
     * Obtiene el código ingresado
     * @returns {string}
     */
    getCodigo() {
        return this.$('#codigo')?.value.trim().toUpperCase() || '';
    }

    afterRender() {
        console.log('JoinTravelView renderizada');
    }
}
 
