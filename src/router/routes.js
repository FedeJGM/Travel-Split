/**
 * Routes - Definición de rutas de la aplicación
 * 
 * Principios aplicados:
 * - SoC: Configuración separada de la lógica del router
 * - DRY: Definición centralizada de rutas
 * - KISS: Configuración simple y clara
 */

// Las vistas y controladores se importarán en app.js
// Aquí solo exportamos la configuración de rutas

/**
 * Configuración de rutas de la aplicación
 * Cada ruta tiene: path, name, component (lazy loaded)
 */
export const routes = [
    {
        path: '/',
        name: 'home',
        title: 'TravelSplit | Inicio'
    },
    {
        path: '/crear-viaje',
        name: 'crear-viaje',
        title: 'Crear Viaje | TravelSplit'
    },
    {
        path: '/mis-viajes',
        name: 'mis-viajes',
        title: 'Mis Viajes | TravelSplit'
    },
    {
        path: '/viaje/:id',
        name: 'viaje-detalle',
        title: 'Detalles del Viaje | TravelSplit'
    },
    {
        path: '/viaje/:id/nuevo-gasto',
        name: 'nuevo-gasto',
        title: 'Nuevo Gasto | TravelSplit'
    },
    {
        path: '/unirse-viaje',
        name: 'unirse-viaje',
        title: 'Unirse a Viaje | TravelSplit'
    }
];

/**
 * Obtiene una ruta por nombre
 * @param {string} name - Nombre de la ruta
 * @returns {Object|null} - Configuración de la ruta
 */
export function getRouteByName(name) {
    return routes.find(route => route.name === name) || null;
}

/**
 * Genera un path con parámetros
 * @param {string} name - Nombre de la ruta
 * @param {Object} params - Parámetros de la ruta
 * @returns {string} - Path generado
 * 
 * @example
 * generatePath('viaje-detalle', { id: 'ABC123' }) // '/viaje/ABC123'
 */
export function generatePath(name, params = {}) {
    const route = getRouteByName(name);
    
    if (!route) {
        console.warn(`Ruta "${name}" no encontrada`);
        return '/';
    }

    let path = route.path;

    // Reemplazar parámetros en el path
    Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`:${key}`, value);
    });

    return path;
}

/**
 * Valida si un path coincide con una ruta definida
 * @param {string} path - Path a validar
 * @returns {boolean}
 */
export function isValidRoute(path) {
    return routes.some(route => {
        const pattern = route.path
            .replace(/\//g, '\\/')
            .replace(/:(\w+)/g, '([^\\/]+)');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(path);
    });
}

/**
 * Navega a una ruta por nombre (helper)
 * @param {string} name - Nombre de la ruta
 * @param {Object} params - Parámetros de la ruta
 */
export function navigateToRoute(name, params = {}) {
    const path = generatePath(name, params);
    window.location.hash = path;
}

// Exportar constantes de nombres de rutas para evitar typos
export const ROUTE_NAMES = {
    HOME: 'home',
    CREAR_VIAJE: 'crear-viaje',
    MIS_VIAJES: 'mis-viajes',
    VIAJE_DETALLE: 'viaje-detalle',
    NUEVO_GASTO: 'nuevo-gasto',
    UNIRSE_VIAJE: 'unirse-viaje'
};
