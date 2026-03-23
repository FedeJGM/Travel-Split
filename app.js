/**
 * TravelSplit - Aplicación Principal
 * 
 * Punto de entrada de la aplicación MVC + SPA
 * 
 * Arquitectura:
 * - Models: Lógica de negocio (Travel, Expense, Participant)
 * - Views: Presentación (HomeView, TravelListView, etc.)
 * - Controllers: Coordinación (AppController, TravelController, ExpenseController)
 * - Router: Navegación SPA basada en hash
 * - Services: Persistencia y validación (StorageService, ValidationService)
 * - Utils: Funciones auxiliares (formatters, generators)
 * 
 * Principios aplicados:
 * - SRP: Cada módulo tiene una responsabilidad única
 * - SoC: Separación clara entre capas
 * - DRY: Código reutilizable
 * - KISS: Implementación simple y clara
 * - MVC Puro: Patrón Model-View-Controller estricto
 */

import { AppController } from './src/controllers/index.js';
import { updateHeaderNavigation } from './src/utils/navigationHelper.js';

/**
 * Clase principal de la aplicación
 */
class TravelSplitApp {
    constructor() {
        this.appController = null;
        this.isInitialized = false;
    }
    
    /**
     * Inicializa la aplicación
     */
    init() {
        if (this.isInitialized) {
            console.warn('La aplicación ya está inicializada');
            return;
        }

        try {
            console.log('Iniciando TravelSplit...');
            
            // Verificar que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.bootstrap();
                });
            } else {
                this.bootstrap();
            }
        } catch (error) {
            console.error('Error crítico al inicializar la aplicación:', error);
            this.showCriticalError(error);
        }
    }

    /**
     * Bootstrap de la aplicación
     * @private
     */
    bootstrap() {
        try {
            // Verificar que el contenedor principal exista
            const appContainer = document.getElementById('app');
            
            if (!appContainer) {
                throw new Error('No se encontró el contenedor #app en el DOM');
            }
            // Verificar soporte de localStorage
            this.checkLocalStorageSupport();

            // Verificar soporte de ES6 modules 
            this.checkES6Support();
            
            // Inicializar el controlador principal
            this.appController = new AppController();
            this.appController.init();

            // Inicializar navegación dinámica
            updateHeaderNavigation();
            
            // Marcar como inicializado
            this.isInitialized = true;

            console.log('TravelSplit inicializado correctamente');
            
        } catch (error) {
            console.error('Error en bootstrap:', error);
            this.showCriticalError(error);
        }
    }
    
    /**
     * Verifica soporte de localStorage
     * @private
     */
    checkLocalStorageSupport() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
        } catch (error) {
            throw new Error('Tu navegador no soporta localStorage o está deshabilitado');
        }
    }
    
    /**
     * Verifica soporte de ES6
     * @private
     */
    checkES6Support() {
        if (typeof Symbol === 'undefined') {
            throw new Error('Tu navegador no soporta ES6. Por favor actualiza tu navegador');
        }
    }
    
    /**
     * Muestra un error crítico en la UI
     * @private
     * @param {Error} error
     */
    showCriticalError(error) {
        const appContainer = document.getElementById('app');
        
        if (!appContainer) {
            alert('Error crítico: ' + error.message);
            return;
        }

        appContainer.innerHTML = `
            <div class="card" style="
                max-width: 600px;
                margin: 3rem auto;
                text-align: center;
                padding: 3rem;
                border: 2px solid var(--danger, #ef233c);
            ">
                <i class="fas fa-exclamation-triangle" style="
                    font-size: 4rem;
                    color: var(--danger, #ef233c);
                    margin-bottom: 1rem;
                "></i>
                <h1 style="color: var(--dark, #212529); margin-bottom: 1rem;">
                    Error Crítico
                </h1>
                <p style="color: var(--gray, #6c757d); margin-bottom: 1rem;">
                    No se pudo inicializar la aplicación
                </p>
                <p style="
                    background: rgba(239, 35, 60, 0.1);
                    padding: 1rem;
                    border-radius: 8px;
                    color: var(--danger, #ef233c);
                    font-family: monospace;
                    font-size: 0.9rem;
                ">
                    ${this.escapeHTML(error.message)}
                </p>
                <button 
                    onclick="window.location.reload()" 
                    class="btn btn-primary"
                    style="margin-top: 1.5rem;"
                >
                    <i class="fas fa-sync-alt"></i>
                    Recargar Página
                </button>
            </div>
        `;
    }
    
    /**
     * Escapa HTML para prevenir XSS
     * @private
     * @param {string} text
     * @returns {string}
     */
    escapeHTML(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }
    
    /**
     * Destruye la aplicación (para testing o reinicio)
     */
    destroy() {
        if (this.appController && this.appController.getRouter()) {
            this.appController.getRouter().destroy();
        }
        
        this.appController = null;
        this.isInitialized = false;
        
        console.log('TravelSplit destruido');
    }
    
    /**
     * Obtiene la versión de la aplicación
     * @returns {string}
     */
    getVersion() {
        return '1.0.0';
    }
    
    /**
     * Obtiene información de la aplicación
     * @returns {Object}
     */
    getInfo() {
        return {
            name: 'TravelSplit',
            version: this.getVersion(),
            author: 'Tu Nombre',
            description: 'Aplicación para dividir gastos de viajes',
            architecture: 'MVC + SPA',
            initialized: this.isInitialized
        };
    }
}

/**
 * Crear instancia global de la aplicación
 */
const app = new TravelSplitApp();

/**
 * Inicializar cuando el script se cargue
 */
app.init();

if (typeof window !== 'undefined') {
    window.TravelSplitApp = app;
    
    console.log('%cTravelSplit', 'font-size: 24px; font-weight: bold; color: #4361ee;');
    console.log('%cVersion ' + app.getVersion(), 'color: #6c757d;');
    console.log('%cArquitectura: MVC + SPA', 'color: #38b000;');
    console.log('Para debugging, usa: window.TravelSplitApp');
}

/**
 * Manejo global de errores no capturados
 */
window.addEventListener('error', (event) => {
    console.error('Error no capturado:', event.error);
});

/**
 * Manejo global de promesas rechazadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no manejada:', event.reason);
});

export default app;
