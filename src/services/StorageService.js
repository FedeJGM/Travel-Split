/**
 * StorageService - Servicio de almacenamiento
 * 
 * Principios aplicados:
 * - SRP: Solo maneja operaciones de localStorage
 * - Encapsulamiento: Abstrae la complejidad de localStorage
 * - DRY: Métodos reutilizables para CRUD
 * - SoC: Separación entre persistencia y lógica de negocio
 * - Alta cohesión: Todas las operaciones relacionadas con storage
 */

import { Travel } from '../models/index.js';

export class StorageService {
    /**
     * Constructor del servicio
     * @param {string} storageKey - Clave principal para localStorage
     */
    constructor(storageKey = 'travelsplit_viajes') {
        this.STORAGE_KEY = storageKey;
        this.initStorage();
    }

    /**
     * Inicializa el storage si no existe
     * @private
     */
    initStorage() {
        if (!this.existe()) {
            this.guardar([]);
        }
    }

    /**
     * Verifica si existe la clave en localStorage
     * @returns {boolean}
     */
    existe() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    /**
     * Guarda datos en localStorage
     * @private
     * @param {Array} data - Array de datos a guardar
     * @returns {boolean} - true si se guardó correctamente
     */
    guardar(data) {
        try {
            const jsonString = JSON.stringify(data);
            
            // Verificar límite de localStorage (aproximadamente 5-10MB)
            if (jsonString.length > 5000000) {
                console.warn('Los datos son muy grandes para localStorage');
                throw new Error('Límite de almacenamiento excedido');
            }

            localStorage.setItem(this.STORAGE_KEY, jsonString);
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error('Cuota de localStorage excedida');
                this.limpiarDatosAntiguos();
            } else {
                console.error('Error al guardar en localStorage:', error);
            }
            return false;
        }
    }

    /**
     * Obtiene todos los viajes del storage
     * @returns {Array} - Array de objetos de viaje
     */
    obtenerTodos() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error al leer de localStorage:', error);
            return [];
        }
    }

    /**
     * Obtiene un viaje específico por ID
     * @param {string} id - ID del viaje
     * @returns {Object|null} - Objeto del viaje o null si no existe
     */
    obtenerPorId(id) {
        const viajes = this.obtenerTodos();
        return viajes.find(viaje => viaje.id === id) || null;
    }

    /**
     * Agrega un nuevo viaje al storage
     * @param {Travel|Object} viaje - Instancia de Travel o objeto
     * @returns {boolean} - true si se agregó correctamente
     */
    agregar(viaje) {
        try {
            const viajes = this.obtenerTodos();
            
            // Convertir a objeto plano si es instancia de Travel
            const viajeData = viaje instanceof Travel ? viaje.toJSON() : viaje;
            
            // Verificar que no exista ya (por ID)
            if (viajes.some(v => v.id === viajeData.id)) {
                console.warn('Ya existe un viaje con ese ID');
                return false;
            }

            viajes.push(viajeData);
            return this.guardar(viajes);
        } catch (error) {
            console.error('Error al agregar viaje:', error);
            return false;
        }
    }

    /**
     * Actualiza un viaje existente
     * @param {string} id - ID del viaje
     * @param {Object} datosActualizados - Datos a actualizar
     * @returns {boolean} - true si se actualizó correctamente
     */
    actualizar(id, datosActualizados) {
        try {
            const viajes = this.obtenerTodos();
            const index = viajes.findIndex(viaje => viaje.id === id);

            if (index === -1) {
                console.warn('Viaje no encontrado');
                return false;
            }

            // Actualizar manteniendo el ID original
            viajes[index] = {
                ...viajes[index],
                ...datosActualizados,
                id: id // Asegurar que no se cambie el ID
            };

            return this.guardar(viajes);
        } catch (error) {
            console.error('Error al actualizar viaje:', error);
            return false;
        }
    }

    /**
     * Elimina un viaje por ID
     * @param {string} id - ID del viaje
     * @returns {boolean} - true si se eliminó correctamente
     */
    eliminar(id) {
        try {
            const viajes = this.obtenerTodos();
            const viajesFiltrados = viajes.filter(viaje => viaje.id !== id);

            if (viajes.length === viajesFiltrados.length) {
                console.warn('Viaje no encontrado');
                return false;
            }

            return this.guardar(viajesFiltrados);
        } catch (error) {
            console.error('Error al eliminar viaje:', error);
            return false;
        }
    }

    /**
     * Busca viajes por nombre (búsqueda parcial)
     * @param {string} termino - Término de búsqueda
     * @returns {Array} - Array de viajes que coinciden
     */
    buscarPorNombre(termino) {
        const viajes = this.obtenerTodos();
        const terminoLower = termino.toLowerCase();
        
        return viajes.filter(viaje => 
            viaje.nombre.toLowerCase().includes(terminoLower)
        );
    }

    /**
     * Obtiene estadísticas generales
     * @returns {Object} - Objeto con estadísticas
     */
    obtenerEstadisticas() {
        const viajes = this.obtenerTodos();
        
        return {
            totalViajes: viajes.length,
            totalGastado: viajes.reduce((sum, v) => sum + (v.totalGastado || 0), 0),
            totalParticipantes: new Set(
                viajes.flatMap(v => v.participantes || [])
            ).size
        };
    }

    /**
     * Limpia datos antiguos (por ejemplo, viajes de hace más de 1 año)
     * @private
     */
    limpiarDatosAntiguos() {
        const viajes = this.obtenerTodos();
        const unAñoAtras = new Date();
        unAñoAtras.setFullYear(unAñoAtras.getFullYear() - 1);

        const viajesRecientes = viajes.filter(viaje => {
            const fechaCreacion = new Date(viaje.fechaCreacion);
            return fechaCreacion > unAñoAtras;
        });

        this.guardar(viajesRecientes);
        console.log(`Limpiados ${viajes.length - viajesRecientes.length} viajes antiguos`);
    }

    /**
     * Exporta todos los datos como JSON
     * @returns {string} - JSON string de todos los viajes
     */
    exportarDatos() {
        const viajes = this.obtenerTodos();
        return JSON.stringify(viajes, null, 2);
    }

    /**
     * Importa datos desde JSON
     * @param {string} jsonString - String JSON con datos
     * @returns {boolean} - true si se importó correctamente
     */
    importarDatos(jsonString) {
        try {
            const datos = JSON.parse(jsonString);
            
            if (!Array.isArray(datos)) {
                throw new Error('Los datos deben ser un array');
            }

            return this.guardar(datos);
        } catch (error) {
            console.error('Error al importar datos:', error);
            return false;
        }
    }

    /**
     * Limpia completamente el storage
     * @returns {boolean}
     */
    limpiarTodo() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            this.initStorage();
            return true;
        } catch (error) {
            console.error('Error al limpiar storage:', error);
            return false;
        }
    }
}

// Exportar instancia singleton por defecto
export default new StorageService();
 
