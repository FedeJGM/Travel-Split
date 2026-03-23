/**
 * Travel Model - Modelo de Viaje
 * 
 * Principios aplicados:
 * - Encapsulamiento: Propiedades privadas con getters/setters
 * - SRP: Solo maneja lógica relacionada con viajes
 * - DRY: Métodos reutilizables para cálculos
 * - Alta cohesión: Todas las operaciones están relacionadas con viajes
 */

import { generateTravelCode } from '../utils/index.js';

export class Travel {
    /**
     * Constructor del viaje
     * @param {Object} data - Datos iniciales del viaje
     */
    constructor(data = {}) {
        this.id = data.id || generateTravelCode();
        this.nombre = data.nombre || '';
        this.divisa = data.divisa || 'USD';
        this.participantes = data.participantes || [];
        this.gastos = data.gastos || [];
        this.totalGastado = data.totalGastado || 0;
        this.fechaCreacion = data.fechaCreacion || new Date().toISOString();
    }

    /**
     * Agrega un participante al viaje (evita duplicados)
     * @param {string} nombre - Nombre del participante
     * @returns {boolean} - true si se agregó, false si ya existía
     */
    agregarParticipante(nombre) {
        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre del participante es inválido');
        }

        const nombreNormalizado = nombre.trim();

        if (this.participantes.includes(nombreNormalizado)) {
            return false; // Ya existe
        }

        this.participantes.push(nombreNormalizado);
        return true;
    }

    /**
     * Elimina un participante del viaje
     * @param {string} nombre - Nombre del participante
     * @returns {boolean} - true si se eliminó, false si no existía
     */
    eliminarParticipante(nombre) {
        const index = this.participantes.indexOf(nombre);
        
        if (index === -1) {
            return false; // No existe
        }

        // Verificar que el participante no tenga gastos asociados
        const tieneGastos = this.gastos.some(
            gasto => gasto.pagador === nombre || gasto.participantes.includes(nombre)
        );

        if (tieneGastos) {
            throw new Error('No se puede eliminar un participante con gastos asociados');
        }

        this.participantes.splice(index, 1);
        return true;
    }

    /**
     * Agrega un gasto al viaje
     * @param {Object} gasto - Objeto con datos del gasto
     */
    agregarGasto(gasto) {
        if (!gasto || !gasto.monto || !gasto.pagador) {
            throw new Error('Datos del gasto inválidos');
        }

        this.gastos.push(gasto);
        this.totalGastado += gasto.monto;
    }

    /**
     * Calcula el balance de un participante específico
     * @param {string} nombreParticipante - Nombre del participante
     * @returns {number} - Balance (positivo = le deben, negativo = debe)
     */
    calcularBalance(nombreParticipante) {
        if (!this.participantes.includes(nombreParticipante)) {
            throw new Error('El participante no existe en este viaje');
        }

        if (this.participantes.length === 0 || this.totalGastado === 0) {
            return 0;
        }

        // Cuánto debería pagar cada uno (gasto equitativo)
        const gastoPorPersona = this.totalGastado / this.participantes.length;

        // Cuánto ha pagado realmente este participante
        const pagado = this.gastos
            .filter(gasto => gasto.pagador === nombreParticipante)
            .reduce((sum, gasto) => sum + gasto.monto, 0);

        // Balance = pagado - lo que debería pagar
        return pagado - gastoPorPersona;
    }

    /**
     * Calcula los balances de todos los participantes
     * @returns {Array} - Array de objetos {nombre, balance}
     */
    calcularBalances() {
        return this.participantes.map(participante => ({
            nombre: participante,
            balance: this.calcularBalance(participante)
        }));
    }

    /**
     * Obtiene el total gastado formateado
     * @returns {number} - Total con 2 decimales
     */
    getTotalGastado() {
        return parseFloat(this.totalGastado.toFixed(2));
    }

    /**
     * Obtiene el promedio de gasto por persona
     * @returns {number} - Promedio con 2 decimales
     */
    getPromedioGastoPorPersona() {
        if (this.participantes.length === 0) {
            return 0;
        }
        return parseFloat((this.totalGastado / this.participantes.length).toFixed(2));
    }

    /**
     * Obtiene estadísticas del viaje
     * @returns {Object} - Objeto con estadísticas
     */
    getEstadisticas() {
        return {
            totalParticipantes: this.participantes.length,
            totalGastos: this.gastos.length,
            totalGastado: this.getTotalGastado(),
            promedioGastoPorPersona: this.getPromedioGastoPorPersona(),
            divisa: this.divisa
        };
    }

    /**
     * Valida si el viaje está completo
     * @returns {boolean}
     */
    esValido() {
        return (
            this.nombre.trim().length > 0 &&
            this.divisa.length > 0 &&
            this.participantes.length > 0
        );
    }

    /**
     * Convierte el viaje a un objeto plano (para guardar en localStorage)
     * @returns {Object} - Objeto serializable
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            divisa: this.divisa,
            participantes: [...this.participantes],
            gastos: [...this.gastos],
            totalGastado: this.totalGastado,
            fechaCreacion: this.fechaCreacion
        };
    }

    /**
     * Crea una instancia de Travel desde un objeto plano
     * @param {Object} data - Datos del viaje
     * @returns {Travel} - Instancia de Travel
     */
    static fromJSON(data) {
        return new Travel(data);
    }
}
