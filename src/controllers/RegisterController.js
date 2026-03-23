/**
 * RegisterController - Controlador de registro
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de registro
 * - MVC: Coordina View
 * - KISS: Implementación simple
 */

import { RegisterView } from '../views/index.js';

export class RegisterController {
    constructor() {
        this.view = null;
    }

    index() {
        this.view = new RegisterView();
        return this.view;
    }
}
