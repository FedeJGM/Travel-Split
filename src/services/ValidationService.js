/**
 * ValidationService - Servicio de validación
 * 
 * Principios aplicados:
 * - SRP: Solo maneja validaciones
 * - DRY: Validaciones reutilizables
 * - KISS: Validaciones simples y claras
 * - Alta cohesión: Todas las funciones relacionadas con validación
 */

export class ValidationService {
    /**
     * Valida datos de un viaje
     * @param {Object} data - Datos del viaje a validar
     * @returns {Object} - {valido: boolean, errores: string[]}
     */
    static validarViaje(data) {
        const errores = [];

        // Validar nombre
        if (!data.nombre || typeof data.nombre !== 'string') {
            errores.push('El nombre del viaje es obligatorio');
        } else if (data.nombre.trim().length < 3) {
            errores.push('El nombre del viaje debe tener al menos 3 caracteres');
        } else if (data.nombre.trim().length > 50) {
            errores.push('El nombre del viaje no puede exceder 50 caracteres');
        }

        // Validar divisa
        const divisasPermitidas = ['USD', 'EUR', 'MXN', 'ARS', 'COP', 'CLP', 'BRL', 'PEN'];
        if (!data.divisa || !divisasPermitidas.includes(data.divisa)) {
            errores.push('La divisa seleccionada no es válida');
        }

        // Validar participantes
        if (!data.participantes || !Array.isArray(data.participantes)) {
            errores.push('Debe proporcionar una lista de participantes');
        } else if (data.participantes.length === 0) {
            errores.push('Debe agregar al menos un participante');
        } else if (data.participantes.length > 50) {
            errores.push('No se pueden agregar más de 50 participantes');
        }

        // Validar participantes duplicados
        if (data.participantes) {
            const participantesUnicos = new Set(data.participantes.map(p => p.toLowerCase()));
            if (participantesUnicos.size !== data.participantes.length) {
                errores.push('Existen participantes duplicados');
            }
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Valida datos de un gasto
     * @param {Object} data - Datos del gasto a validar
     * @returns {Object} - {valido: boolean, errores: string[]}
     */
    static validarGasto(data) {
        const errores = [];

        // Validar descripción
        if (!data.descripcion || typeof data.descripcion !== 'string') {
            errores.push('La descripción es obligatoria');
        } else if (data.descripcion.trim().length < 3) {
            errores.push('La descripción debe tener al menos 3 caracteres');
        } else if (data.descripcion.trim().length > 100) {
            errores.push('La descripción no puede exceder 100 caracteres');
        }

        // Validar monto
        if (data.monto === undefined || data.monto === null) {
            errores.push('El monto es obligatorio');
        } else if (typeof data.monto !== 'number' || isNaN(data.monto)) {
            errores.push('El monto debe ser un número válido');
        } else if (data.monto <= 0) {
            errores.push('El monto debe ser mayor a 0');
        } else if (data.monto > 1000000) {
            errores.push('El monto no puede exceder 1,000,000');
        }

        // Validar pagador
        if (!data.pagador || typeof data.pagador !== 'string') {
            errores.push('Debe especificar quién pagó');
        } else if (data.pagador.trim().length === 0) {
            errores.push('El nombre del pagador no puede estar vacío');
        }

        // Validar participantes
        if (!data.participantes || !Array.isArray(data.participantes)) {
            errores.push('Debe especificar los participantes del gasto');
        } else if (data.participantes.length === 0) {
            errores.push('Debe incluir al menos un participante en el gasto');
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Valida un nombre de participante
     * @param {string} nombre - Nombre a validar
     * @returns {Object} - {valido: boolean, errores: string[]}
     */
    static validarParticipante(nombre) {
        const errores = [];

        if (!nombre || typeof nombre !== 'string') {
            errores.push('El nombre es obligatorio');
        } else {
            const nombreTrim = nombre.trim();
            
            if (nombreTrim.length === 0) {
                errores.push('El nombre no puede estar vacío');
            } else if (nombreTrim.length < 2) {
                errores.push('El nombre debe tener al menos 2 caracteres');
            } else if (nombreTrim.length > 30) {
                errores.push('El nombre no puede exceder 30 caracteres');
            }

            // Validar caracteres permitidos (letras, espacios, guiones)
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/.test(nombreTrim)) {
                errores.push('El nombre solo puede contener letras, espacios y guiones');
            }
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Valida un código de viaje
     * @param {string} codigo - Código a validar
     * @returns {Object} - {valido: boolean, errores: string[]}
     */
    static validarCodigo(codigo) {
        const errores = [];

        if (!codigo || typeof codigo !== 'string') {
            errores.push('El código es obligatorio');
        } else {
            const codigoTrim = codigo.trim().toUpperCase();
            
            if (codigoTrim.length === 0) {
                errores.push('El código no puede estar vacío');
            } else if (!/^[A-Z0-9]+$/.test(codigoTrim)) {
                errores.push('El código solo puede contener letras y números');
            } else if (codigoTrim.length < 4 || codigoTrim.length > 12) {
                errores.push('El código debe tener entre 4 y 12 caracteres');
            }
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Valida un email
     * @param {string} email - Email a validar
     * @returns {Object} - {valido: boolean, errores: string[]}
     */
    static validarEmail(email) {
        const errores = [];

        if (!email || typeof email !== 'string') {
            errores.push('El email es obligatorio');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                errores.push('El formato del email no es válido');
            }
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Valida un número positivo
     * @param {number} numero - Número a validar
     * @param {number} min - Valor mínimo permitido
     * @param {number} max - Valor máximo permitido
     * @returns {boolean}
     */
    static esNumeroPositivo(numero, min = 0, max = Infinity) {
        return (
            typeof numero === 'number' &&
            !isNaN(numero) &&
            numero > min &&
            numero <= max
        );
    }

    /**
     * Sanitiza un string (elimina espacios extras, caracteres peligrosos)
     * @param {string} texto - Texto a sanitizar
     * @returns {string} - Texto sanitizado
     */
    static sanitizar(texto) {
        if (typeof texto !== 'string') {
            return '';
        }

        return texto
            .trim()
            .replace(/\s+/g, ' ') // Reemplazar múltiples espacios por uno solo
            .replace(/[<>]/g, ''); // Eliminar < y > para prevenir XSS básico
    }

    /**
     * Valida que un array no tenga duplicados
     * @param {Array} array - Array a validar
     * @returns {boolean}
     */
    static noDuplicados(array) {
        if (!Array.isArray(array)) {
            return false;
        }
        return new Set(array).size === array.length;
    }
}

// Exportar por defecto
export default ValidationService;
 
