/**
 * ExpenseController - Controlador de gastos
 * 
 * Principios aplicados:
 * - SRP: Solo maneja operaciones de gastos
 * - MVC Puro: Coordina Model (Expense), View y Service
 * - DRY: Lógica reutilizable
 */

import { Expense } from '../models/index.js';
import { ExpenseFormView } from '../views/index.js';
import { storageService, ValidationService } from '../services/index.js';

export class ExpenseController {
    /**
     * Constructor del controlador de gastos
     */
    constructor() {
        this.currentView = null;
        this.viajeId = null;
    }

    /**
     * Acción create - Muestra formulario de nuevo gasto
     * @param {string} viajeId - ID del viaje
     * @returns {ExpenseFormView}
     */
    create(viajeId) {
        this.viajeId = viajeId;
        this.currentView = new ExpenseFormView();

        // Cargar viaje
        const viaje = storageService.obtenerPorId(viajeId);

        if (!viaje) {
            this.currentView.setViaje(null);
            return this.currentView;
        }

        this.currentView.setViaje(viaje);

        // Configurar eventos después del render
        setTimeout(() => {
            this.setupExpenseFormListener();
        }, 0);

        return this.currentView;
    }

    /**
     * Configura listener del formulario de gasto
     * @private
     */
    setupExpenseFormListener() {
        const form = document.getElementById('form-nuevo-gasto');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateExpense();
        });
    }

    /**
     * Maneja la creación de un gasto
     * @private
     */
    handleCreateExpense() {
        const data = this.currentView.getFormData();

        // Validar datos del gasto
        const validacion = ValidationService.validarGasto(data);

        if (!validacion.valido) {
            this.currentView.showError(validacion.errores.join('\n'));
            return;
        }

        // Crear instancia del modelo Expense
        const nuevoGasto = new Expense(data);

        // Validar el gasto
        const validacionGasto = nuevoGasto.validar();

        if (!validacionGasto.valido) {
            this.currentView.showError(validacionGasto.errores.join('\n'));
            return;
        }

        // Obtener viaje actual
        const viaje = storageService.obtenerPorId(this.viajeId);

        if (!viaje) {
            this.currentView.showError('Viaje no encontrado');
            return;
        }

        // Agregar gasto al viaje
        if (!viaje.gastos) {
            viaje.gastos = [];
        }

        viaje.gastos.push(nuevoGasto.toJSON());
        viaje.totalGastado = (viaje.totalGastado || 0) + nuevoGasto.monto;

        // Actualizar en storage
        const actualizado = storageService.actualizar(this.viajeId, viaje);

        if (!actualizado) {
            this.currentView.showError('Error al guardar el gasto');
            return;
        }

        // Mostrar éxito y redirigir
        this.currentView.showSuccess('¡Gasto registrado correctamente!');

        setTimeout(() => {
            window.location.hash = `/viaje/${this.viajeId}`;
        }, 1000);
    }
}
 
