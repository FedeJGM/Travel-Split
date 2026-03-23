/**
 * AppController - Controlador principal de la aplicación
 * 
 * Principios aplicados:
 * - SRP: Solo coordina la inicialización de la app
 * - SoC: Orquesta router, servicios y vistas
 * - Bajo acoplamiento: No contiene lógica de negocio
 */

import { Router } from '../router/index.js';
import { HomeController } from './HomeController.js';
import { TravelController } from './TravelController.js';
import { ExpenseController } from './ExpenseController.js';
import { WelcomeController } from './WelcomeController.js';
import { LoginController } from './LoginController.js';
import { RegisterController } from './RegisterController.js';

export class AppController {
    /**
     * Constructor del controlador principal
     */
    constructor() {
        this.router = new Router('app');
        this.welcomeController = new WelcomeController();
        this.loginController = new LoginController();
        this.registerController = new RegisterController();
        this.homeController = new HomeController();
        this.travelController = new TravelController();
        this.expenseController = new ExpenseController();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('Iniciando TravelSplit...');
        
        // Configurar rutas
        this.setupRoutes();
        
        // Configurar hooks del router
        this.setupRouterHooks();
        
        // Inicializar router
        this.router.init();
        
        console.log('TravelSplit inicializado correctamente');
    }

    /**
     * Configura las rutas de la aplicación
     * @private
     */
    setupRoutes() {

        // Ruta raíz - Welcome/Landing
        this.router.addRoute('/', () => {
            return this.welcomeController.index();
        });

        // Ruta login
        this.router.addRoute('/login', () => {
            return this.loginController.index();
        });

        // Ruta registro
        this.router.addRoute('/registro', () => {
            return this.registerController.index();
        });

        // Ruta principal - Home (después de "registro")
        this.router.addRoute('/home', () => {
            return this.homeController.index();
        });

        // Ruta crear viaje
        this.router.addRoute('/crear-viaje', () => {
            return this.travelController.create();
        });

        // Ruta listar viajes
        this.router.addRoute('/mis-viajes', () => {
            return this.travelController.index();
        });

        // Ruta detalles de viaje
        this.router.addRoute('/viaje/:id', (params) => {
            return this.travelController.show(params.id);
        });

        // Ruta nuevo gasto
        this.router.addRoute('/viaje/:id/nuevo-gasto', (params) => {
            return this.expenseController.create(params.id);
        });

        // Ruta unirse a viaje
        this.router.addRoute('/unirse-viaje', () => {
            return this.travelController.join();
        });

        // Configurar página 404
        this.router.setNotFoundHandler(() => {
            document.getElementById('app').innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--danger); margin-bottom: 1rem;"></i>
                    <h1 style="font-size: 3rem; color: var(--gray);">404</h1>
                    <p style="color: var(--gray); margin: 1rem 0;">Página no encontrada</p>
                    <a href="#/" class="btn btn-primary">
                        <i class="fas fa-home"></i> Volver al inicio
                    </a>
                </div>
            `;
        });
    }

    /**
     * Configura hooks del router
     * @private
     */
    setupRouterHooks() {
        // Hook antes de cada navegación
        this.router.beforeEach((to, from, next) => {
            console.log(`Navegando de ${from.path} a ${to.path}`);
            next();
        });

        // Hook después de cada navegación
        this.router.afterEach((to, from) => {
            console.log(`Navegación completada: ${to.path}`);
        });
    }

    /**
     * Obtiene la instancia del router
     * @returns {Router}
     */
    getRouter() {
        return this.router;
    }
}
 
