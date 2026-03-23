/**
 * Router - Exportador central
 * 
 * Principios aplicados:
 * - SoC: Punto único de acceso al sistema de routing
 * - Encapsulamiento: Abstracción de la implementación
 * - DRY: Importación centralizada
 */

// Exportar clase Router
export { Router } from './Router.js';

// Exportar configuración de rutas y utilidades
export {
    routes,
    getRouteByName,
    generatePath,
    isValidRoute,
    navigateToRoute,
    ROUTE_NAMES
} from './routes.js';

// Exportar instancia singleton del router (opcional)
let routerInstance = null;

/**
 * Obtiene o crea la instancia singleton del router
 * @param {string} containerId - ID del contenedor
 * @returns {Router}
 */
export function getRouter(containerId = 'app') {
    if (!routerInstance) {
        routerInstance = new Router(containerId);
    }
    return routerInstance;
}

/**
 * Reinicia la instancia del router
 */
export function resetRouter() {
    if (routerInstance) {
        routerInstance.destroy();
        routerInstance = null;
    }
}
