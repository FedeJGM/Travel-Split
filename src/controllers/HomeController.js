/**
 * HomeController - Controlador de la vista Home
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de la página home
 * - MVC: Coordina Model y View
 * - KISS: Implementación simple
 */

import { HomeView } from '../views/index.js';

export class HomeController {
    /**
     * Constructor del controlador home
     */
    constructor() {
        this.view = null;
    }

    /**
     * Acción index - Muestra la página principal
     * @returns {HomeView}
     */
    index() {
        this.view = new HomeView();
        return this.view;
    }
}
 
