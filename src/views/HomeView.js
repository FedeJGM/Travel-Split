/**
 * HomeView - Vista de la página principal
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza la página home
 * - KISS: Implementación simple y directa
 * - DRY: Reutiliza BaseView
 */

import { BaseView } from './BaseView.js';

export class HomeView extends BaseView {
    constructor() {
        super();
        this.setTitle('Inicio');
    }

    /**
     * Renderiza la vista home
     * @returns {string} - HTML de la vista
     */
    render() {
        return `
            <section class="hero animated">
                <div class="card">
                    <h2>Organiza los gastos de tus viajes</h2>
                    <p class="subtitle">
                        La solución perfecta para dividir gastos entre amigos y familiares.
                        Lleva el control de quién pagó qué y calcula automáticamente los balances.
                    </p>
                    
                    <div class="hero-actions">
                        <a href="#/crear-viaje" class="btn btn-primary btn-large">
                            <i class="fas fa-plus-circle"></i>
                            Crear Nuevo Viaje
                        </a>
                        
                        <a href="#/unirse-viaje" class="btn btn-secondary btn-large">
                            <i class="fas fa-sign-in-alt"></i>
                            Unirse a Viaje
                        </a>
                    </div>

                    <div class="features">
                        <div class="feature-item">
                            <i class="fas fa-users"></i>
                            <h3>Gestión de Grupos</h3>
                            <p>Organiza viajes con amigos y familiares de forma sencilla</p>
                        </div>
                        
                        <div class="feature-item">
                            <i class="fas fa-calculator"></i>
                            <h3>Cálculo Automático</h3>
                            <p>Divide los gastos equitativamente y calcula balances</p>
                        </div>
                        
                        <div class="feature-item">
                            <i class="fas fa-chart-pie"></i>
                            <h3>Reportes Detallados</h3>
                            <p>Visualiza quién debe a quién de forma clara</p>
                        </div>
                    </div>
                </div>
            </section>

            <div class="grid-container" style="margin-top: 2rem;">
                <div class="card animated" style="animation-delay: 0.2s;">
                    <div class="action-card">
                        <div class="icon-wrapper">
                            <i class="fas fa-suitcase"></i>
                        </div>
                        <h3>Mis Viajes</h3>
                        <p>Accede a todos tus viajes activos</p>
                        <a href="#/mis-viajes" class="btn btn-primary">
                            <i class="fas fa-arrow-right"></i>
                            Ver Viajes
                        </a>
                    </div>
                </div>

                <div class="card animated" style="animation-delay: 0.4s;">
                    <div class="action-card">
                        <div class="icon-wrapper">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <h3>¿Cómo funciona?</h3>
                        <p>1. Crea un viaje y comparte el código<br>
                           2. Registra los gastos del grupo<br>
                           3. Revisa quién debe a quién</p>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        console.log('HomeView renderizada');
    }
}
 
