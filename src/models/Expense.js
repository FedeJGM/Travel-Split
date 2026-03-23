/**
 * Expense Model - Modelo de Gasto
 * 
 * Principios aplicados:
 * - Encapsulamiento: Validaciones internas
 * - SRP: Solo maneja lógica de gastos individuales
 * - KISS: Implementación simple y directa
 * - Alta cohesión: Todas las operaciones relacionadas con un gasto
 */

export class Expense {
    /**
     * Constructor del gasto
     * @param {Object} data - Datos del gasto
     */
    constructor(data = {}) {
        this.descripcion = data.descripcion || '';
        this.monto = parseFloat(data.monto) || 0;
        this.pagador = data.pagador || '';
        this.participantes = data.participantes || [];
        this.fecha = data.fecha || new Date().toLocaleDateString('es-MX');
        this.categoria = data.categoria || 'general'; // general, comida, transporte, etc.
    }

    /**
     * Calcula el monto que debe pagar cada participante
     * @returns {number} - Monto por persona
     */
    getMontoPorPersona() {
        if (this.participantes.length === 0) {
            return 0;
        }
        return parseFloat((this.monto / this.participantes.length).toFixed(2));
    }

    /**
     * Verifica si un participante está incluido en el gasto
     * @param {string} nombreParticipante - Nombre del participante
     * @returns {boolean}
     */
    incluyeParticipante(nombreParticipante) {
        return this.participantes.includes(nombreParticipante);
    }

    /**
     * Calcula cuánto debe un participante específico
     * @param {string} nombreParticipante - Nombre del participante
     * @returns {number} - Monto que debe (0 si no está incluido)
     */
    getMontoDebePorParticipante(nombreParticipante) {
        if (!this.incluyeParticipante(nombreParticipante)) {
            return 0;
        }

        // Si es el pagador, no debe nada (ya pagó)
        if (nombreParticipante === this.pagador) {
            return 0;
        }

        return this.getMontoPorPersona();
    }

    /**
     * Valida si el gasto tiene datos válidos
     * @returns {Object} - {valido: boolean, errores: string[]}
     */
    validar() {
        const errores = [];

        if (!this.descripcion || this.descripcion.trim().length === 0) {
            errores.push('La descripción es obligatoria');
        }

        if (this.monto <= 0) {
            errores.push('El monto debe ser mayor a 0');
        }

        if (!this.pagador || this.pagador.trim().length === 0) {
            errores.push('Debe especificar quién pagó');
        }

        if (this.participantes.length === 0) {
            errores.push('Debe haber al menos un participante');
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Convierte el gasto a objeto plano
     * @returns {Object}
     */
    toJSON() {
        return {
            descripcion: this.descripcion,
            monto: this.monto,
            pagador: this.pagador,
            participantes: [...this.participantes],
            fecha: this.fecha,
            categoria: this.categoria
        };
    }

    /**
     * Crea una instancia de Expense desde un objeto plano
     * @param {Object} data - Datos del gasto
     * @returns {Expense}
     */
    static fromJSON(data) {
        return new Expense(data);
    }

    /**
     * Crea un gasto dividido equitativamente entre todos los participantes
     * @param {string} descripcion
     * @param {number} monto
     * @param {string} pagador
     * @param {string[]} participantes
     * @returns {Expense}
     */
    static crearGastoEquitativo(descripcion, monto, pagador, participantes) {
        return new Expense({
            descripcion,
            monto,
            pagador,
            participantes
        });
    }
}
 
