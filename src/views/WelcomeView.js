/**
 * WelcomeView - Vista de bienvenida/landing
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza la página de bienvenida
 * - KISS: Implementación simple
 * - DRY: Reutiliza BaseView
 */

import { BaseView } from './BaseView.js';

export class WelcomeView extends BaseView {
    constructor() {
        super();
        this.setTitle('Bienvenido');
    }

    render() {
        return `
            <div class="welcome-page">
                <div class="welcome-content">
                    <div class="welcome-hero">
                        <h1 class="welcome-title">Organiza los gastos de tus viajes</h1>
                        <p class="welcome-subtitle">
                            La solución perfecta para dividir gastos entre amigos y familiares. Lleva el control de quién pagó qué y calcula automáticamente los balances.
                        </p>
                        
                        <div class="welcome-image">
                            <img src="assets/img/95748195-banner-de-viaje-con-puntos-de-referencia-y-avión-alrededor-del-mundo-fondo-de-turismo-ilustración-ve.jpg" alt="Banner de viaje alrededor del mundo">
                        </div>

                        <div class="welcome-features">
                            <div class="welcome-feature">
                                <i class="fas fa-users"></i>
                                <span>Gestión de Grupos</span>
                            </div>
                            <div class="welcome-feature">
                                <i class="fas fa-calculator"></i>
                                <span>Cálculo Automático</span>
                            </div>
                            <div class="welcome-feature">
                                <i class="fas fa-chart-pie"></i>
                                <span>Reportes Detallados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        console.log('WelcomeView renderizada');
    }
}
