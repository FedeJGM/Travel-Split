/**
 * Router - Sistema de enrutamiento SPA
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de routing (navegación)
 * - SoC: Separación entre definición de rutas y lógica del router
 * - Encapsulamiento: Complejidad del routing oculta
 * - KISS: Implementación simple basada en hash
 * - Alta cohesión: Todas las operaciones relacionadas con navegación
 */

export class Router {
    /**
     * Constructor del router
     * @param {string} containerId - ID del contenedor donde renderizar
     */
    constructor(containerId = 'app') {
        this.container = document.getElementById(containerId);
        this.routes = new Map();
        this.notFoundHandler = null;
        this.currentRoute = null;
        this.currentParams = {};
        this.beforeEachHook = null;
        this.afterEachHook = null;
    }

    /**
     * Agrega una nueva ruta
     * @param {string} path - Ruta (ej: '/viaje/:id')
     * @param {Function} handler - Función que retorna la vista
     */
    addRoute(path, handler) {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            throw new Error('Path debe ser string y handler debe ser función');
        }

        this.routes.set(path, {
            pattern: this.pathToRegex(path),
            handler: handler,
            paramNames: this.extractParamNames(path)
        });
    }

    /**
     * Convierte un path en expresión regular
     * @private
     * @param {string} path - Path a convertir
     * @returns {RegExp}
     * 
     * @example
     * '/viaje/:id' -> /^\/viaje\/([^\/]+)$/
     */
    pathToRegex(path) {
        const pattern = path
            .replace(/\//g, '\\/')
            .replace(/:(\w+)/g, '([^\\/]+)');
        return new RegExp(`^${pattern}$`);
    }

    /**
     * Extrae nombres de parámetros del path
     * @private
     * @param {string} path - Path con parámetros
     * @returns {string[]} - Array de nombres de parámetros
     * 
     * @example
     * '/viaje/:id/gasto/:gastoId' -> ['id', 'gastoId']
     */
    extractParamNames(path) {
        const matches = path.match(/:(\w+)/g);
        return matches ? matches.map(m => m.substring(1)) : [];
    }

    /**
     * Define el handler para rutas no encontradas
     * @param {Function} handler - Función para 404
     */
    setNotFoundHandler(handler) {
        if (typeof handler !== 'function') {
            throw new Error('Handler debe ser una función');
        }
        this.notFoundHandler = handler;
    }

    /**
     * Hook que se ejecuta antes de cada navegación
     * @param {Function} hook - Función hook (to, from, next)
     */
    beforeEach(hook) {
        this.beforeEachHook = hook;
    }

    /**
     * Hook que se ejecuta después de cada navegación
     * @param {Function} hook - Función hook (to, from)
     */
    afterEach(hook) {
        this.afterEachHook = hook;
    }

    /**
     * Navega a una ruta específica
     * @param {string} path - Ruta destino
     * @param {boolean} replace - Si true, reemplaza en lugar de agregar al historial
     */
    navigate(path, replace = false) {
        if (replace) {
            window.location.replace(`#${path}`);
        } else {
            window.location.hash = path;
        }
    }

    /**
     * Navega hacia atrás en el historial
     */
    back() {
        window.history.back();
    }

    /**
     * Navega hacia adelante en el historial
     */
    forward() {
        window.history.forward();
    }

    /**
     * Obtiene la ruta actual del hash
     * @returns {string}
     */
    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }

    /**
     * Obtiene los parámetros de la ruta actual
     * @returns {Object}
     */
    getCurrentParams() {
        return { ...this.currentParams };
    }

    /**
     * Obtiene query parameters de la URL
     * @returns {Object}
     */
    getQueryParams() {
        const hash = window.location.hash;
        const queryStart = hash.indexOf('?');
        
        if (queryStart === -1) return {};
        
        const queryString = hash.substring(queryStart + 1);
        const params = new URLSearchParams(queryString);
        
        return Object.fromEntries(params);
    }

    /**
     * Resuelve y renderiza la ruta actual
     * @private
     */
    async resolve() {
        const currentPath = this.getCurrentPath();
        const previousRoute = this.currentRoute;

        // Limpiar query params del path
        const cleanPath = currentPath.split('?')[0];

        // Buscar ruta coincidente
        for (const [routePath, routeConfig] of this.routes) {
            const match = cleanPath.match(routeConfig.pattern);
            
            if (match) {
                // Extraer parámetros de la URL
                const params = {};
                routeConfig.paramNames.forEach((paramName, index) => {
                    params[paramName] = match[index + 1];
                });

                this.currentParams = params;

                // Ejecutar hook beforeEach
                if (this.beforeEachHook) {
                    let shouldContinue = true;
                    const next = (cancel = false) => {
                        shouldContinue = !cancel;
                    };
                    
                    await this.beforeEachHook(
                        { path: currentPath, params }, 
                        { path: previousRoute }, 
                        next
                    );

                    if (!shouldContinue) return;
                }

                try {
                    // Ejecutar handler y obtener resultado
                    const result = await routeConfig.handler(params);
                    
                    // Si el handler retorna HTML string, renderizarlo
                    if (typeof result === 'string') {
                        this.render(result);
                    }
                    // Si retorna un objeto con método render
                    else if (result && typeof result.render === 'function') {
                        this.render(result.render());
                        
                        // Llamar afterRender si existe
                        if (typeof result.afterRender === 'function') {
                            setTimeout(() => result.afterRender(), 0);
                        }
                    }

                    this.currentRoute = routePath;

                    // Ejecutar hook afterEach
                    if (this.afterEachHook) {
                        this.afterEachHook(
                            { path: currentPath, params },
                            { path: previousRoute }
                        );
                    }

                    return;
                } catch (error) {
                    console.error('Error al ejecutar handler de ruta:', error);
                    this.handleError(error);
                    return;
                }
            }
        }

        // No se encontró la ruta - ejecutar 404
        this.handle404();
    }

    /**
     * Renderiza contenido en el contenedor
     * @private
     * @param {string} html - HTML a renderizar
     */
    render(html) {
        if (!this.container) {
            console.error('Contenedor del router no encontrado');
            return;
        }
        this.container.innerHTML = html;
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }

    /**
     * Maneja el caso de ruta no encontrada
     * @private
     */
    handle404() {
        if (this.notFoundHandler) {
            this.notFoundHandler();
        } else {
            this.render(`
                <div class="error-page" style="text-align: center; padding: 3rem;">
                    <h1 style="font-size: 4rem; color: var(--gray);">404</h1>
                    <p style="color: var(--gray); margin: 1rem 0;">Página no encontrada</p>
                    <a href="#/" class="btn btn-primary">
                        <i class="fas fa-home"></i> Volver al inicio
                    </a>
                </div>
            `);
        }
    }

    /**
     * Maneja errores durante la navegación
     * @private
     * @param {Error} error - Error capturado
     */
    handleError(error) {
        this.render(`
            <div class="error-page" style="text-align: center; padding: 3rem;">
                <h1 style="font-size: 3rem; color: var(--danger);">Error</h1>
                <p style="color: var(--gray); margin: 1rem 0;">
                    Ocurrió un error al cargar la página
                </p>
                <p style="color: var(--gray); font-size: 0.9rem;">
                    ${error.message}
                </p>
                <a href="#/" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-home"></i> Volver al inicio
                </a>
            </div>
        `);
    }

    /**
     * Inicializa el router
     */
    init() {
        // Resolver ruta inicial
        this.resolve();

        // Escuchar cambios en el hash
        window.addEventListener('hashchange', () => {
            this.resolve();
        });

        // Interceptar clicks en enlaces con hash
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('href').substring(1);
                this.navigate(path);
            }
        });

        console.log('Router inicializado correctamente');
    }

    /**
     * Destruye el router (limpia event listeners)
     */
    destroy() {
        window.removeEventListener('hashchange', this.resolve);
        console.log('Router destruido');
    }
}
