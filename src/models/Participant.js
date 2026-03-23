/**
 * Participant Model - Modelo de Participante
 * 
 * Principios aplicados:
 * - Encapsulamiento: Validaciones y propiedades privadas
 * - SRP: Solo maneja lógica de participantes individuales
 * - KISS: Clase simple y enfocada
 * - Alta cohesión: Operaciones relacionadas con participantes
 */

export class Participant {
    /**
     * Constructor del participante
     * @param {string|Object} data - Nombre del participante o objeto con datos
     */
    constructor(data) {
        if (typeof data === 'string') {
            this.nombre = data;
            this.email = '';
            this.avatar = '';
        } else {
            this.nombre = data?.nombre || '';
            this.email = data?.email || '';
            this.avatar = data?.avatar || '';
        }
    }

    /**
     * Valida si el participante tiene datos válidos
     * @returns {boolean}
     */
    esValido() {
        return this.nombre && this.nombre.trim().length > 0;
    }

    /**
     * Obtiene el nombre normalizado (sin espacios extras)
     * @returns {string}
     */
    getNombreNormalizado() {
        return this.nombre.trim();
    }

    /**
     * Obtiene las iniciales del participante
     * @returns {string} - Iniciales en mayúsculas (máx. 2 caracteres)
     */
    getIniciales() {
        const palabras = this.nombre.trim().split(' ');
        
        if (palabras.length === 1) {
            return palabras[0].substring(0, 2).toUpperCase();
        }
        
        return (palabras[0][0] + palabras[palabras.length - 1][0]).toUpperCase();
    }

    /**
     * Obtiene el avatar o genera uno por defecto
     * @returns {string} - URL del avatar o iniciales
     */
    getAvatar() {
        if (this.avatar) {
            return this.avatar;
        }
        return this.getIniciales();
    }

    /**
     * Convierte el participante a objeto plano
     * @returns {Object}
     */
    toJSON() {
        return {
            nombre: this.nombre,
            email: this.email,
            avatar: this.avatar
        };
    }

    /**
     * Crea una instancia desde un objeto plano
     * @param {Object} data
     * @returns {Participant}
     */
    static fromJSON(data) {
        return new Participant(data);
    }

    /**
     * Valida el formato de email
     * @returns {boolean}
     */
    tieneEmailValido() {
        if (!this.email) {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    /**
     * Compara si dos participantes son iguales (por nombre)
     * @param {Participant|string} otro - Otro participante o nombre
     * @returns {boolean}
     */
    esIgualA(otro) {
        const nombreComparar = typeof otro === 'string' ? otro : otro.nombre;
        return this.getNombreNormalizado().toLowerCase() === 
               nombreComparar.trim().toLowerCase();
    }
}
 
