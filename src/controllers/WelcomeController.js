/**
 * WelcomeController - Controlador de la vista Welcome
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de la página welcome
 * - MVC: Coordina Model y View
 * - KISS: Implementación simple
 */

import { WelcomeView } from '../views/index.js';

export class WelcomeController {
    constructor() {
        this.view = null;
    }

    index() {
        this.view = new WelcomeView();
        return this.view;
    }
}
