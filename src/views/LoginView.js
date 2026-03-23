/**
 * LoginView - Vista de inicio de sesión
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza la página de login
 * - KISS: Implementación simple
 * - DRY: Reutiliza BaseView
 */

import { BaseView } from './BaseView.js';

export class LoginView extends BaseView {
    constructor() {
        super();
        this.setTitle('Iniciar Sesión');
    }

    render() {
        return `
            <div class="login-page">
                <div class="login-container">
                    <div class="login-card">
                        <div class="login-logo">
                            <i class="fas fa-plane-departure"></i>
                        </div>
                        
                        <h1 class="login-title">Inicia sesión en TravelSplit</h1>
                        
                        <form id="login-form" class="login-form" novalidate>
                            <div class="form-group-login">
                                <label for="email">Dirección de correo electrónico</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    class="form-control-login"
                                    required
                                    autocomplete="email"
                                >
                                <span class="error-message" id="email-error"></span>
                            </div>

                            <div class="form-group-login">
                                <label for="password">Contraseña</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    class="form-control-login"
                                    required
                                    autocomplete="current-password"
                                >
                                <span class="error-message" id="password-error"></span>
                                <div class="password-requirements">
                                    <p class="requirements-title">Tu contraseña debe tener:</p>
                                    <ul class="requirements-list">
                                        <li id="req-length" class="requirement-item">
                                            <i class="fas fa-circle"></i>
                                            <span>Al menos 8 caracteres</span>
                                        </li>
                                        <li id="req-uppercase" class="requirement-item">
                                            <i class="fas fa-circle"></i>
                                            <span>Una letra mayúscula (A-Z)</span>
                                        </li>
                                        <li id="req-lowercase" class="requirement-item">
                                            <i class="fas fa-circle"></i>
                                            <span>Una letra minúscula (a-z)</span>
                                        </li>
                                        <li id="req-number" class="requirement-item">
                                            <i class="fas fa-circle"></i>
                                            <span>Un número (0-9)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <button type="submit" class="btn-login-primary">
                                Iniciar sesión
                            </button>
                        </form>

                        <div class="login-divider">
                            <span>o</span>
                        </div>

                        <button type="button" class="btn-login-google">
                            <i class="fab fa-google"></i>
                            Continúa con Google
                        </button>

                        <div class="login-footer">
                            <p>¿Eres nuevo en TravelSplit? <a href="#/registro">Crea una cuenta.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        this.setupFormListener();
        this.setupPasswordValidation();
        this.setupEmailValidation();
        console.log('LoginView renderizada');
    }

    setupFormListener() {
        const form = document.getElementById('login-form');
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    setupEmailValidation() {
        const emailInput = document.getElementById('email');
        
        if (!emailInput) return;

        emailInput.addEventListener('blur', () => {
            this.validateEmail(emailInput.value.trim());
        });

        emailInput.addEventListener('input', () => {
            const errorElement = document.getElementById('email-error');
            if (errorElement.textContent) {
                this.validateEmail(emailInput.value.trim());
            }
            this.updateInputStyle(emailInput, this.isEmailValid(emailInput.value.trim()));
        });
    }

    setupPasswordValidation() {
        const passwordInput = document.getElementById('password');
        
        if (!passwordInput) return;

        passwordInput.addEventListener('input', () => {
            const isValid = this.validatePasswordRequirements(passwordInput.value);
            this.updateInputStyle(passwordInput, isValid);
            
            const errorElement = document.getElementById('password-error');
            if (errorElement.textContent && isValid) {
                errorElement.textContent = '';
            }
        });

        passwordInput.addEventListener('blur', () => {
            this.validatePasswordOnBlur(passwordInput.value);
        });
    }

    updateInputStyle(input, isValid) {
        if (!input) return;
        
        input.classList.remove('input-error', 'input-valid');
        
        if (input.value.length > 0) {
            if (isValid) {
                input.classList.add('input-valid');
            } else {
                input.classList.add('input-error');
            }
        }
    }

    validatePasswordRequirements(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password)
        };

        this.updateRequirementStatus('req-length', requirements.length);
        this.updateRequirementStatus('req-uppercase', requirements.uppercase);
        this.updateRequirementStatus('req-lowercase', requirements.lowercase);
        this.updateRequirementStatus('req-number', requirements.number);

        return Object.values(requirements).every(Boolean);
    }

    updateRequirementStatus(elementId, isValid) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const icon = element.querySelector('i');
        
        if (isValid) {
            element.classList.add('requirement-valid');
            element.classList.remove('requirement-invalid');
            icon.className = 'fas fa-check-circle';
        } else {
            element.classList.remove('requirement-valid');
            element.classList.add('requirement-invalid');
            icon.className = 'fas fa-circle';
        }
    }

    validatePasswordOnBlur(password) {
        const errorElement = document.getElementById('password-error');
        const passwordInput = document.getElementById('password');
        
        if (!password) {
            errorElement.textContent = 'La contraseña es obligatoria';
            this.updateInputStyle(passwordInput, false);
            return false;
        }

        if (!this.validatePasswordRequirements(password)) {
            errorElement.textContent = 'La contraseña no cumple con todos los requisitos';
            this.updateInputStyle(passwordInput, false);
            return false;
        }

        errorElement.textContent = '';
        this.updateInputStyle(passwordInput, true);
        return true;
    }

    isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email && emailRegex.test(email);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById('email-error');
        const emailInput = document.getElementById('email');

        if (!email) {
            errorElement.textContent = 'El correo electrónico es obligatorio';
            this.updateInputStyle(emailInput, false);
            return false;
        }

        if (!emailRegex.test(email)) {
            errorElement.textContent = 'Por favor, ingresa un correo electrónico válido';
            this.updateInputStyle(emailInput, false);
            return false;
        }

        errorElement.textContent = '';
        this.updateInputStyle(emailInput, true);
        return true;
    }

    handleLogin() {
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;

        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePasswordOnBlur(password);

        if (!isEmailValid || !isPasswordValid) {
            this.showError('Por favor, corrige los errores antes de continuar');
            return;
        }

        console.log('Intento de login:', { email });
        
        this.showSuccess('Iniciando sesión...');
        
        setTimeout(() => {
            window.location.hash = '/home';
        }, 500);
    }
}
