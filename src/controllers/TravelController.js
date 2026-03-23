/**
 * TravelController - Controlador de viajes
 * 
 * Principios aplicados:
 * - SRP: Solo maneja operaciones de viajes
 * - MVC Puro: Coordina Model (Travel), View y Service (Storage, Validation)
 * - DRY: Métodos reutilizables
 * - SoC: Separación entre presentación y lógica
 */

import { Travel } from '../models/index.js';
import { CreateTravelView, TravelListView, TravelDetailView, JoinTravelView } from '../views/index.js';
import { storageService, ValidationService } from '../services/index.js';

export class TravelController {
    /**
     * Constructor del controlador de viajes
     */
    constructor() {
        this.currentView = null;
    }

    /**
     * Acción index - Lista todos los viajes
     * @returns {TravelListView}
     */
    index() {
        this.currentView = new TravelListView();
        
        // Renderizar y luego cargar datos
        setTimeout(() => {
            this.loadTravels();
            this.setupSearchListener();
        }, 0);
        
        return this.currentView;
    }

    /**
     * Acción create - Muestra formulario de creación
     * @returns {CreateTravelView}
     */
    create() {
        this.currentView = new CreateTravelView();
        
        // Configurar eventos después del render
        setTimeout(() => {
            this.setupCreateFormListeners();
        }, 0);
        
        return this.currentView;
    }

    /**
     * Acción show - Muestra detalles de un viaje
     * @param {string} id - ID del viaje
     * @returns {TravelDetailView}
     */
    show(id) {
        this.currentView = new TravelDetailView();
        
        // Cargar datos del viaje
        const viajeData = storageService.obtenerPorId(id);
        
        if (!viajeData) {
            this.currentView.setViaje(null);
            return this.currentView;
        }
        
        // Convertir a instancia de Travel para usar métodos
        const viaje = Travel.fromJSON(viajeData);
        this.currentView.setViaje(viaje.toJSON());
        
        return this.currentView;
    }

    /**
     * Acción join - Muestra formulario para unirse a viaje
     * @returns {JoinTravelView}
     */
    join() {
        this.currentView = new JoinTravelView();
        
        setTimeout(() => {
            this.setupJoinFormListener();
        }, 0);
        
        return this.currentView;
    }

    /**
     * Carga todos los viajes
     * @private
     */
    loadTravels() {
        const viajes = storageService.obtenerTodos();
        this.currentView.renderViajes(viajes);
    }

    /**
     * Configura listeners del formulario de creación
     * @private
     */
    setupCreateFormListeners() {
        const form = document.getElementById('form-crear-viaje');
        const btnAgregar = document.getElementById('agregar-participante');
        const inputParticipante = document.getElementById('nuevo-participante');

        if (!form || !btnAgregar || !inputParticipante) return;

        // Agregar participante
        btnAgregar.addEventListener('click', () => {
            const nombre = inputParticipante.value.trim();
            
            // Validar participante
            const validacion = ValidationService.validarParticipante(nombre);
            
            if (!validacion.valido) {
                this.currentView.showError(validacion.errores[0]);
                return;
            }

            const agregado = this.currentView.agregarParticipante(nombre);
            
            if (agregado) {
                inputParticipante.value = '';
                inputParticipante.focus();
            }
        });

        // Enter en input de participante
        inputParticipante.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                btnAgregar.click();
            }
        });

        // Eliminar participante
        document.addEventListener('click', (e) => {
            const btnEliminar = e.target.closest('.btn-remove');
            if (btnEliminar) {
                const nombre = btnEliminar.dataset.nombre;
                this.currentView.eliminarParticipante(nombre);
            }
        });

        // Submit del formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateTravel();
        });
    }

    /**
     * Maneja la creación de un viaje
     * @private
     */
    handleCreateTravel() {
        const data = this.currentView.getFormData();

        // Validar datos del viaje
        const validacion = ValidationService.validarViaje(data);

        if (!validacion.valido) {
            this.currentView.showError(validacion.errores.join('\n'));
            return;
        }

        // Crear instancia del modelo Travel
        const nuevoViaje = new Travel(data);

        // Validar que el viaje sea válido
        if (!nuevoViaje.esValido()) {
            this.currentView.showError('El viaje no cumple con los requisitos mínimos');
            return;
        }

        // Guardar en storage
        const guardado = storageService.agregar(nuevoViaje);

        if (!guardado) {
            this.currentView.showError('Error al guardar el viaje');
            return;
        }

        // Mostrar éxito y redirigir
        this.currentView.showSuccess(`¡Viaje creado! Código: ${nuevoViaje.id}`);
        
        setTimeout(() => {
            window.location.hash = `/viaje/${nuevoViaje.id}`;
        }, 1000);
    }

    /**
     * Configura listener del buscador
     * @private
     */
    setupSearchListener() {
        const searchInput = document.getElementById('buscar-viaje');
        
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const termino = e.target.value;
            this.currentView.filtrarViajes(termino);
        });
    }

    /**
     * Configura listener del formulario de unirse
     * @private
     */
    setupJoinFormListener() {
        const form = document.getElementById('form-unirse-viaje');
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleJoinTravel();
        });
    }

    /**
     * Maneja unirse a un viaje
     * @private
     */
    handleJoinTravel() {
        const codigo = this.currentView.getCodigo();

        // Validar código
        const validacion = ValidationService.validarCodigo(codigo);

        if (!validacion.valido) {
            this.currentView.showError(validacion.errores[0]);
            return;
        }

        // Buscar viaje
        const viaje = storageService.obtenerPorId(codigo);

        if (!viaje) {
            this.currentView.showError('No se encontró un viaje con ese código');
            return;
        }

        // Redirigir a detalles del viaje
        this.currentView.showSuccess('¡Viaje encontrado!');
        
        setTimeout(() => {
            window.location.hash = `/viaje/${codigo}`;
        }, 500);
    }
}
 
