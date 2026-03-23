/**
 * LoginController - Controlador de inicio de sesión
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de login
 * - MVC: Coordina View
 * - KISS: Implementación simple
 */

import { LoginView } from '../views/index.js';

export class LoginController {
    constructor() {
        this.view = null;
    }

    index() {
        this.view = new LoginView();
        return this.view;
    }
}
