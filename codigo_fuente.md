# Código Fuente - Proyecto TravelSplit

## Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Arquitectura](#arquitectura)
3. [Controladores](#controladores)
4. [Modelos](#modelos)
5. [Router](#router)
6. [Servicios](#servicios)
7. [Utilidades](#utilidades)
8. [Vistas](#vistas)
9. [Componentes](#componentes)
10. [Estilos](#estilos)

## Estructura del Proyecto

```
proyecto-viajes/
│
├── app.js                 # Punto de entrada de la aplicación
├── index.html             # HTML principal (SPA)
│
├── assets/                # Recursos estáticos
│   ├── css/               # Estilos CSS
│   └── img/               # Imágenes
│
└── src/                   # Código fuente
    ├── controllers/       # Controladores (MVC)
    ├── models/            # Modelos de datos
    ├── router/            # Enrutamiento SPA
    ├── services/          # Servicios (almacenamiento, validación)
    ├── utils/             # Utilidades
    └── views/             # Vistas (componentes UI)
```
## Estructura del Proyecto con archivos incluidos
C:.
│   app.js
│   index.html
│   README.md
│
├───assets
│   ├───css
│   │   │   main.css
│   │   │
│   │   ├───base
│   │   │       global.css       
│   │   │       reset.css
│   │   │       variables.css
│   │   │
│   │   ├───components
│   │   │       buttons.css
│   │   │       cards.css
│   │   │       forms.css
│   │   │       header.css
│   │   │
│   │   └───pages
│   │           home.css
│   │           travel-detail.css
│   │           travel-form.css
│   │           travel-list.css
│   │
│   └───img
│           
│
└───src
    ├───controllers
    │       AppController.js
    │       ExpenseController.js
    │       HomeController.js
    │       index.js
    │       TravelController.js
    │
    ├───models
    │       Expense.js
    │       index.js
    │       Participant.js
    │       Travel.js
    │
    ├───router
    │       index.js
    │       Router.js
    │       routes.js
    │
    ├───services
    │       index.js
    │       StorageService.js
    │       ValidationService.js
    │
    ├───utils
    │       formatters.js
    │       generators.js
    │       index.js
    │
    └───views
        │   BaseView.js
        │   CreateTravelView.js
        │   ExpenseFormView.js
        │   HomeView.js
        │   index.js
        │   JoinTravelView.js
        │   TravelDetailView.js
        │   TravelListView.js
        │
        └───components
                ExpenseItemView.js
                index.js
                LoaderView.js
                ParticipantTagView.js
                TravelCardView.js

## Arquitectura

La aplicación sigue una arquitectura MVC (Modelo-Vista-Controlador) con una estructura de Single Page Application (SPA). Los componentes principales son:

- **Models**: Gestionan la lógica de negocio y los datos (Travel, Expense, Participant)
- **Views**: Se encargan de la presentación y la interacción del usuario
- **Controllers**: Coordinan entre los modelos y las vistas
- **Router**: Maneja la navegación SPA basada en hash
- **Services**: Proporcionan funcionalidades transversales como almacenamiento y validación
- **Utils**: Funciones auxiliares reutilizables

### Principios de Diseño Aplicados

- **SRP (Single Responsibility Principle)**: Cada módulo tiene una única responsabilidad
- **SoC (Separation of Concerns)**: Separación clara entre capas
- **DRY (Don't Repeat Yourself)**: Código reutilizable
- **KISS (Keep It Simple, Stupid)**: Implementación simple y clara
- **Encapsulamiento**: Ocultamiento de la implementación interna
- **Alta Cohesión**: Componentes con responsabilidades relacionadas

## Punto de Entrada Principal (app.js)

El archivo `app.js` es el punto de entrada principal de la aplicación. Configura e inicia la aplicación, inicializando el controlador principal y configurando los manejadores de eventos globales.

```javascript
/**
 * TravelSplit - Aplicación Principal
 * 
 * Punto de entrada de la aplicación MVC + SPA
 * 
 * Responsabilidades:
 * - Inicializar la aplicación
 * - Configurar manejadores de eventos globales
 * - Manejar errores no capturados
 */

import { AppController } from './src/controllers/index.js';

// Inicialización de la aplicación
const app = {
    /**
     * Inicializa la aplicación
     */
    init() {
        try {
            // Crear instancia del controlador principal
            this.appController = new AppController();
            
            // Configurar manejadores de eventos globales
            this.setupGlobalErrorHandling();
            
            // Inicializar la aplicación
            this.appController.init();
            
            console.log('Aplicación inicializada correctamente');
        } catch (error) {
            console.error('Error al inicializar la aplicación:', error);
        }
    },
    
    /**
     * Configura el manejo de errores globales
     */
    setupGlobalErrorHandling() {
        // Manejar errores no capturados
        window.addEventListener('error', (event) => {
            console.error('Error no capturado:', event.error);
        });
        
        // Manejar promesas rechazadas no manejadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promesa rechazada no manejada:', event.reason);
        });
    }
};

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

export default app;

## Controladores

Los controladores son componentes esenciales de la aplicación que siguen el patrón MVC (Modelo-Vista-Controlador). Coordinan la interacción entre los modelos, las vistas y los servicios, manejando la lógica de negocio y el flujo de la aplicación.

### Estructura de los Controladores

La aplicación utiliza los siguientes controladores principales:

- **AppController**: Controlador principal que orquesta la inicialización de la aplicación y la navegación
- **HomeController**: Gestiona la página de inicio
- **TravelController**: Maneja las operaciones relacionadas con viajes
- **ExpenseController**: Administra las operaciones de gastos

### 3.1 AppController.js

El controlador principal que orquesta la inicialización de la aplicación y gestiona la navegación general.

```javascript
/**
 * AppController - Controlador principal de la aplicación
 * 
 * Principios aplicados:
 * - SRP: Solo coordina la inicialización de la app
 * - SoC: Orquesta router, servicios y vistas
 * - Bajo acoplamiento: No contiene lógica de negocio
 */

import { Router } from '../router/index.js';
import { HomeController } from './HomeController.js';
import { TravelController } from './TravelController.js';
import { ExpenseController } from './ExpenseController.js';

export class AppController {
    /**
     * Constructor del controlador principal
     */
    constructor() {
        this.router = new Router('app');
        this.homeController = new HomeController();
        this.travelController = new TravelController();
        this.expenseController = new ExpenseController();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('Iniciando TravelSplit...');
        
        // Configurar rutas
        this.setupRoutes();
        
        // Configurar hooks del router
        this.setupRouterHooks();
        
        // Inicializar router
        this.router.init();
        
        console.log('TravelSplit inicializado correctamente');
    }

    /**
     * Configura las rutas de la aplicación
     * @private
     */
    setupRoutes() {
        // Ruta principal - Home
        this.router.addRoute('/', () => {
            return this.homeController.index();
        });

        // Rutas de viajes
        this.router.addRoute('/viajes', () => {
            return this.travelController.index();
        });

        this.router.addRoute('/viajes/crear', () => {
            return this.travelController.create();
        });

        // Otras rutas...
    }

    /**
     * Configura los hooks del router
     * @private
     */
    setupRouterHooks() {
        // Hooks de navegación
        this.router.beforeEach((to, from, next) => {
            console.log(`Navegando de ${from} a ${to}`);
            next();
        });

        this.router.afterEach((to, from) => {
            console.log(`Navegación completada a ${to}`);
        });
    }
}
```

### 3.2 HomeController.js

Controla la lógica de la página de inicio de la aplicación.

```javascript
/**
 * HomeController - Controlador de la vista Home
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de la página home
 * - MVC: Coordina Model y View
 * - KISS: Implementación simple
 */

import { HomeView } from '../views/index.js';

export class HomeController {
    /**
     * Constructor del controlador home
     */
    constructor() {
        this.view = null;
    }

    /**
     * Acción index - Muestra la página principal
     * @returns {HomeView} Instancia de la vista de inicio
     */
    index() {
        this.view = new HomeView();
        return this.view;
    }
}
```

### 3.3 TravelController.js

Gestiona toda la lógica relacionada con los viajes en la aplicación.

```javascript
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
     * @returns {TravelListView} Vista de lista de viajes
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
     * @returns {CreateTravelView} Vista de creación de viaje
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
     * Carga los viajes desde el almacenamiento
     * @private
     */
    async loadTravels() {
        try {
            const viajes = storageService.obtenerTodos();
            this.currentView.mostrarViajes(viajes);
        } catch (error) {
            console.error('Error al cargar viajes:', error);
            this.currentView.mostrarError('Error al cargar los viajes');
        }
    }

    /**
     * Configura el listener de búsqueda
     * @private
     */
    setupSearchListener() {
        const searchInput = document.getElementById('search-travels');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.currentView.filtrarViajes(searchTerm);
            });
        }
    }

    /**
     * Configura los listeners del formulario de creación
     * @private
     */
    setupCreateFormListeners() {
        const form = document.getElementById('create-travel-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const travelData = {
                    nombre: formData.get('nombre'),
                    destino: formData.get('destino'),
                    fechaInicio: formData.get('fechaInicio'),
                    fechaFin: formData.get('fechaFin'),
                    descripcion: formData.get('descripcion'),
                    participantes: []
                };

                try {
                    // Validar datos
                    const validation = ValidationService.validarViaje(travelData);
                    if (!validation.valido) {
                        this.currentView.mostrarError(validation.mensaje);
                        return;
                    }

                    // Crear y guardar viaje
                    const nuevoViaje = new Travel({
                        ...travelData,
                        id: this.generarId(),
                        fechaCreacion: new Date().toISOString()
                    });

                    storageService.guardar(nuevoViaje);
                    
                    // Navegar a la lista de viajes
                    window.location.hash = '#/viajes';
                    
                } catch (error) {
                    console.error('Error al crear viaje:', error);
                    this.currentView.mostrarError('Error al crear el viaje');
                }
            });
        }
    }

    /**
     * Genera un ID único para un viaje
     * @returns {string} ID único
     * @private
     */
    generarId() {
        return 'v-' + Math.random().toString(36).substr(2, 9);
    }
}
```

### 3.4 ExpenseController.js

Maneja toda la lógica relacionada con los gastos de los viajes.

```javascript
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
     * @returns {ExpenseFormView} Vista de formulario de gasto
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
     * Configura el listener del formulario de gastos
     * @private
     */
    setupExpenseFormListener() {
        const form = document.getElementById('expense-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const participantes = Array.from(formData.getAll('participantes'));
                
                const expenseData = {
                    concepto: formData.get('concepto'),
                    monto: parseFloat(formData.get('monto')),
                    fecha: formData.get('fecha') || new Date().toISOString().split('T')[0],
                    categoria: formData.get('categoria'),
                    pagadorId: formData.get('pagador'),
                    participantes: participantes,
                    viajeId: this.viajeId
                };

                try {
                    // Validar datos
                    const validation = ValidationService.validarGasto(expenseData);
                    if (!validation.valido) {
                        this.currentView.mostrarError(validation.mensaje);
                        return;
                    }

                    // Obtener el viaje actual
                    const viaje = storageService.obtenerPorId(this.viajeId);
                    if (!viaje) {
                        throw new Error('Viaje no encontrado');
                    }

                    // Crear y guardar gasto
                    const nuevoGasto = new Expense({
                        ...expenseData,
                        id: this.generarId(),
                        fechaCreacion: new Date().toISOString()
                    });

                    // Agregar el gasto al viaje
                    if (!viaje.gastos) {
                        viaje.gastos = [];
                    }
                    viaje.gastos.push(nuevoGasto);
                    
                    // Actualizar el viaje en el almacenamiento
                    storageService.actualizar(viaje);
                    
                    // Navegar de vuelta a los detalles del viaje
                    window.location.hash = `#/viajes/${this.viajeId}`;
                    
                } catch (error) {
                    console.error('Error al guardar el gasto:', error);
                    this.currentView.mostrarError('Error al guardar el gasto');
                }
            });
        }
    }

    /**
     * Genera un ID único para un gasto
     * @returns {string} ID único
     * @private
     */
    generarId() {
        return 'g-' + Math.random().toString(36).substr(2, 9);
    }
}
```

### 3.5 index.js (Exportador de Controladores)

Centraliza la exportación de todos los controladores para facilitar su importación.

```javascript
/**
 * Controllers - Exportador central
 * 
 * Principios aplicados:
 * - SoC: Punto único de acceso a controladores
 * - Encapsulamiento: Abstracción de controladores
 * - DRY: Importación centralizada
 */

// Exportar todos los controladores
export { AppController } from './AppController.js';
export { HomeController } from './HomeController.js';
export { TravelController } from './TravelController.js';
export { ExpenseController } from './ExpenseController.js';

/**
 * Uso recomendado:
 * 
 * // En app.js - Crear instancia del AppController
 * import { AppController } from './controllers/index.js';
 * 
 * const app = new AppController();
 * app.init();
 * 
 * // Los demás controladores se instancian automáticamente
 * // dentro de AppController
 */
```

## Modelos

Los modelos representan los datos y la lógica de negocio de la aplicación. Siguen el patrón de diseño Active Record y son responsables de:

- Gestionar el estado de los datos
- Validar los datos
- Interactuar con la capa de persistencia
- Implementar la lógica de negocio específica de cada entidad
     * Inicializa la aplicación
     */
    init() {
        if (this.isInitialized) {
            console.warn('La aplicación ya está inicializada');
            return;
        }

        try {
            console.log('Iniciando TravelSplit...');
            
            // Verificar que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.bootstrap();
                });
            } else {
                this.bootstrap();
            }
        } catch (error) {
            console.error('Error crítico al inicializar la aplicación:', error);
            this.showCriticalError(error);
        }
    }

    /**
     * Bootstrap de la aplicación
     * @private
     */
    bootstrap() {
        try {
            // Verificar que el contenedor principal exista
            const appContainer = document.getElementById('app');
            
            if (!appContainer) {
                throw new Error('No se encontró el contenedor #app en el DOM');
            }

            // Verificar soporte de localStorage
            this.checkLocalStorageSupport();

            // Verificar soporte de ES6 modules
            this.checkES6Support();

            // Crear e inicializar el controlador principal
            this.appController = new AppController();
            this.appController.init();

            // Marcar como inicializado
            this.isInitialized = true;

            console.log('TravelSplit inicializado correctamente');
            
        } catch (error) {
            console.error('Error en bootstrap:', error);
            this.showCriticalError(error);
        }
    }

    // ... (resto de los métodos de la clase)
    
    /**
     * Obtiene información de la aplicación
     * @returns {Object}
     */
    getInfo() {
        return {
            name: 'TravelSplit',
            version: this.getVersion(),
            author: 'Tu Nombre',
            description: 'Aplicación para dividir gastos de viajes',
            architecture: 'MVC + SPA',
            initialized: this.isInitialized
        };
    }
}

/**
 * Crear instancia global de la aplicación
 */
const app = new TravelSplitApp();

/**
 * Inicializar cuando el script se cargue
 */
app.init();

/**
 * Exponer app globalmente para debugging (solo en desarrollo)
 */
if (typeof window !== 'undefined') {
    window.TravelSplitApp = app;
    
    // Log de bienvenida en consola
    console.log('%cTravelSplit', 'font-size: 24px; font-weight: bold; color: #4361ee;');
    console.log('%cVersion ' + app.getVersion(), 'color: #6c757d;');
    console.log('%cArquitectura: MVC + SPA', 'color: #38b000;');
    console.log('Para debugging, usa: window.TravelSplitApp');
}

/**
 * Manejo global de errores no capturados
 */
window.addEventListener('error', (event) => {
    console.error('Error no capturado:', event.error);
});

/**
 * Manejo global de promesas rechazadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no manejada:', event.reason);
});

export default app;

### 2. Archivo HTML Principal (index.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta Tags Básicos -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Título y Descripción -->
    <title>TravelSplit | Divide gastos de viajes fácilmente</title>
    <meta name="description"
        content="Organiza y divide los gastos de tus viajes con amigos. Calcula automáticamente quién debe a quién de forma justa y equitativa.">
    <meta name="keywords" content="dividir gastos, viajes, gastos compartidos, split expenses, travel">
    <meta name="author" content="TravelSplit">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico">

    <!-- Fuentes de Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer">

    <!-- CSS Principal (importa todos los demás) -->
    <link rel="stylesheet" href="assets/css/main.css">

    <!-- PWA Meta Tags (opcional para futuras mejoras) -->
    <meta name="theme-color" content="#4361ee">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="TravelSplit">

    <!-- Open Graph Meta Tags (para compartir en redes sociales) -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="TravelSplit - Divide gastos de viajes">
    <meta property="og:description"
        content="Organiza y divide los gastos de tus viajes con amigos de forma fácil y equitativa">
    <meta property="og:image" content="assets/img/og-image.png">
    <meta property="og:url" content="https://travelsplit.com">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="TravelSplit - Divide gastos de viajes">
    <meta name="twitter:description" content="Organiza y divide los gastos de tus viajes con amigos">
    <meta name="twitter:image" content="assets/img/twitter-card.png">
</head>

<body>
    <!-- Header Principal -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1>
                    <i class="fas fa-plane-departure"></i>
                    TravelSplit
                </h1>
                <nav>
                    <a href="#/" class="btn btn-outline">
                        <i class="fas fa-home"></i>
                        Inicio
                    </a>
                    <a href="#/mis-viajes" class="btn btn-outline">
                        <i class="fas fa-suitcase"></i>
                        Mis Viajes
                    </a>
                    <a href="#/crear-viaje" class="btn btn-primary">
                        <i class="fas fa-plus-circle"></i>
                        Crear Viaje
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Contenedor Principal de la SPA -->
    <main id="app" class="container">
        <!-- Loader inicial mientras carga la aplicación -->
        <div class="loader-container" style="text-align: center; padding: 5rem;">
            <i class="fas fa-circle-notch fa-spin" style="font-size: 3rem; color: var(--primary);"></i>
            <p style="color: var(--gray); margin-top: 1rem;">Cargando TravelSplit...</p>
        </div>
    </main>

    <!-- Footer (Opcional) -->
    <footer class="home-footer" style="margin-top: 3rem;">
        <div class="container">
            <p>&copy; 2025 TravelSplit. Hecho con <i class="fas fa-heart" style="color: var(--danger);"></i> para
                viajeros.</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem;">
                <a href="#/" style="color: var(--primary); margin: 0 0.5rem;">Inicio</a>
                <a href="#/mis-viajes" style="color: var(--primary); margin: 0 0.5rem;">Mis Viajes</a>
                <a href="#/crear-viaje" style="color: var(--primary); margin: 0 0.5rem;">Crear Viaje</a>
            </p>
        </div>
    </footer>

    <!-- Mensaje para navegadores sin JavaScript -->
    <noscript>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            padding: 2rem;
        ">
            <div style="text-align: center; max-width: 500px;">
                <i class="fas fa-exclamation-triangle"
                    style="font-size: 4rem; color: #ef233c; margin-bottom: 1rem;"></i>
                <h1 style="color: #212529; margin-bottom: 1rem;">JavaScript Requerido</h1>
                <p style="color: #6c757d;">
                    TravelSplit requiere JavaScript para funcionar.
                    Por favor, habilita JavaScript en tu navegador y recarga la página.
                </p>
            </div>
        </div>
    </noscript>

    <!-- Script Principal - ES6 Modules -->
    <script type="module" src="app.js"></script>

    <!-- Fallback para navegadores sin soporte de modules -->
    <script nomodule>
        alert('Tu navegador no soporta ES6 Modules. Por favor actualiza tu navegador a una versión más reciente.');
    </script>

    <!-- Service Worker para PWA (opcional - futuras mejoras) -->
    <script>
        // Registrar Service Worker si está disponible
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker registrado correctamente:', registration);
                    })
                    .catch(error => {
                        console.log('Error al registrar Service Worker:', error);
                    });
            });
        }
    </script>
</body>
</html>

### 3. Controladores (src/controllers/)

#### 3.1 AppController.js
```javascript
/**
 * AppController - Controlador principal de la aplicación
 * 
 * Principios aplicados:
 * - SRP: Solo coordina la inicialización de la app
 * - SoC: Orquesta router, servicios y vistas
 * - Bajo acoplamiento: No contiene lógica de negocio
 */

import { Router } from '../router/index.js';
import { HomeController } from './HomeController.js';
import { TravelController } from './TravelController.js';
import { ExpenseController } from './ExpenseController.js';

export class AppController {
    /**
     * Constructor del controlador principal
     */
    constructor() {
        this.router = new Router('app');
        this.homeController = new HomeController();
        this.travelController = new TravelController();
        this.expenseController = new ExpenseController();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('Iniciando TravelSplit...');
        
        // Configurar rutas
        this.setupRoutes();
        
        // Configurar hooks del router
        this.setupRouterHooks();
        
        // Inicializar router
        this.router.init();
        
        console.log('TravelSplit inicializado correctamente');
    }

    /**
     * Configura las rutas de la aplicación
     * @private
     */
    setupRoutes() {
        // Ruta principal - Home
        this.router.addRoute('/', () => {
            return this.homeController.index();
        });

        // Ruta crear viaje
        this.router.addRoute('/crear-viaje', () => {
            return this.travelController.create();
        });

        // Ruta listar viajes
        this.router.addRoute('/mis-viajes', () => {
            return this.travelController.index();
        });

        // Ruta detalles de viaje
        this.router.addRoute('/viaje/:id', (params) => {
            return this.travelController.show(params.id);
        });

        // Ruta nuevo gasto
        this.router.addRoute('/viaje/:id/nuevo-gasto', (params) => {
            return this.expenseController.create(params.id);
        });

        // Ruta unirse a viaje
        this.router.addRoute('/unirse-viaje', () => {
            return this.travelController.join();
        });

        // Configurar página 404
        this.router.setNotFoundHandler(() => {
            document.getElementById('app').innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--danger); margin-bottom: 1rem;"></i>
                    <h1 style="font-size: 3rem; color: var(--gray);">404</h1>
                    <p style="color: var(--gray); margin: 1rem 0;">Página no encontrada</p>
                    <a href="#/" class="btn btn-primary">
                        <i class="fas fa-home"></i> Volver al inicio
                    </a>
                </div>
            `;
        });
    }

    /**
     * Configura hooks del router
     * @private
     */
    setupRouterHooks() {
        // Hook antes de cada navegación
        this.router.beforeEach((to, from, next) => {
            console.log(`Navegando de ${from.path} a ${to.path}`);
            next();
        });

        // Hook después de cada navegación
        this.router.afterEach((to, from) => {
            console.log(`Navegación completada: ${to.path}`);
        });
    }

    /**
     * Obtiene la instancia del router
     * @returns {Router}
     */
    getRouter() {
        return this.router;
    }
}
```

#### 3.2 TravelController.js
```javascript
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
}
```

#### 3.3 HomeController.js
```javascript
/**
 * HomeController - Controlador de la vista Home
 * 
 * Principios aplicados:
 * - SRP: Solo maneja lógica de la página home
 * - MVC: Coordina Model y View
 * - KISS: Implementación simple
 */

import { HomeView } from '../views/index.js';

export class HomeController {
    /**
     * Constructor del controlador home
     */
    constructor() {
        this.view = null;
    }

    /**
     * Acción index - Muestra la página principal
     * @returns {HomeView}
     */
    index() {
        this.view = new HomeView();
        return this.view;
    }
}
```

#### 4.2 routes.js
```javascript
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
 * Cada ruta tiene: path, name, title
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
 * Obtiene la configuración de una ruta por su nombre
 * @param {string} name - Nombre de la ruta
 * @returns {Object|null} Configuración de la ruta o null si no existe
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
    if (!route) return '/';

    let path = route.path;
    
    // Reemplazar parámetros en la ruta
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
        const pathSegments = path.split('/').filter(Boolean);
        const routeSegments = route.path.split('/').filter(Boolean);
        
        if (pathSegments.length !== routeSegments.length) return false;
        
        return routeSegments.every((segment, index) => {
            return segment.startsWith(':') || segment === pathSegments[index];
        });
    });
}

/**
 * Navega a una ruta por nombre (helper)
 * @param {string} name - Nombre de la ruta
 * @param {Object} params - Parámetros de la ruta
 */
export function navigateToRoute(name, params = {}) {
    const path = generatePath(name, params);
    if (path) {
        window.location.hash = `#${path}`;
    }
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
```

### 5. Services

#### 5.1 StorageService.js
```javascript
/**
 * StorageService - Servicio de almacenamiento local
 * 
 * Principios aplicados:
 * - SRP: Solo maneja operaciones de almacenamiento
 * - Encapsulamiento: Abstrae localStorage
 * - DRY: Métodos reutilizables
 * - KISS: Implementación simple y clara
 */

// Clave para el almacenamiento local
const STORAGE_KEY = 'travelsplit_data';

export class StorageService {
    /**
     * Obtiene todos los viajes
     * @returns {Array} Lista de viajes
     */
    static obtenerTodos() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Guarda todos los viajes
     * @param {Array} viajes - Lista de viajes a guardar
     */
    static guardarTodos(viajes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viajes));
    }

    /**
     * Obtiene un viaje por ID
     * @param {string} id - ID del viaje
     * @returns {Object|null} Viaje encontrado o null
     */
    static obtenerPorId(id) {
        const viajes = this.obtenerTodos();
        return viajes.find(viaje => viaje.id === id) || null;
    }

    /**
     * Guarda un viaje (crea o actualiza)
     * @param {Object} viaje - Datos del viaje a guardar
     * @returns {Object} Viaje guardado
     */
    static guardar(viaje) {
        const viajes = this.obtenerTodos();
        const index = viajes.findIndex(v => v.id === viaje.id);
        
        if (index >= 0) {
            viajes[index] = viaje; // Actualizar
        } else {
            viajes.push(viaje); // Crear nuevo
        }
        
        this.guardarTodos(viajes);
        return viaje;
    }

    /**
     * Elimina un viaje por ID
     * @param {string} id - ID del viaje a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     */
    static eliminar(id) {
        const viajes = this.obtenerTodos();
        const filtered = viajes.filter(viaje => viaje.id !== id);
        
        if (filtered.length < viajes.length) {
            this.guardarTodos(filtered);
            return true;
        }
        
        return false;
    }

    /**
     * Limpia todo el almacenamiento
     * @warning Elimina todos los datos
     */
    static limpiar() {
        localStorage.removeItem(STORAGE_KEY);
    }
}
```

#### 5.2 ValidationService.js
```javascript
/**
 * ValidationService - Servicio de validación de datos
 * 
 * Principios aplicados:
 * - SRP: Solo maneja validaciones
 * - Reutilización: Métodos estáticos puros
 * - Extensibilidad: Fácil de agregar nuevas validaciones
 */

export class ValidationService {
    /**
     * Valida un nombre de viaje
     * @param {string} nombre - Nombre a validar
     * @returns {Object} { valido: boolean, mensaje: string }
     */
    static validarNombreViaje(nombre) {
        if (!nombre || nombre.trim().length === 0) {
            return { valido: false, mensaje: 'El nombre es requerido' };
        }
        
        if (nombre.length < 3) {
            return { valido: false, mensaje: 'Mínimo 3 caracteres' };
        }
        
        if (nombre.length > 50) {
            return { valido: false, mensaje: 'Máximo 50 caracteres' };
        }
        
        return { valido: true, mensaje: '' };
    }

    /**
     * Valida un monto
     * @param {number|string} monto - Monto a validar
     * @returns {Object} { valido: boolean, mensaje: string }
     */
    static validarMonto(monto) {
        const num = Number(monto);
        
        if (isNaN(num) || monto === '') {
            return { valido: false, mensaje: 'Ingrese un monto válido' };
        }
        
        if (num <= 0) {
            return { valido: false, mensaje: 'El monto debe ser mayor a 0' };
        }
        
        if (num > 1000000) {
            return { valido: false, mensaje: 'Monto máximo: 1,000,000' };
        }
        
        return { valido: true, mensaje: '' };
    }

    /**
     * Valida un correo electrónico
     * @param {string} email - Email a validar
     * @returns {Object} { valido: boolean, mensaje: string }
     */
    static validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || email.trim() === '') {
            return { valido: false, mensaje: 'El correo es requerido' };
        }
        
        if (!re.test(email)) {
            return { valido: false, mensaje: 'Formato de correo inválido' };
        }
        
        return { valido: true, mensaje: '' };
    }

    /**
     * Valida un objeto de viaje completo
     * @param {Object} viaje - Datos del viaje
     * @returns {Object} { valido: boolean, errores: Object }
     */
    static validarViaje(viaje) {
        const errores = {};
        
        // Validar nombre
        const nombreValido = this.validarNombreViaje(viaje.nombre);
        if (!nombreValido.valido) {
            errores.nombre = nombreValido.mensaje;
        }
        
        // Validar participantes
        if (!viaje.participantes || viaje.participantes.length === 0) {
            errores.participantes = 'Debe haber al menos un participante';
        }
        
        // Validar divisa
        const divisasValidas = ['USD', 'EUR', 'MXN', 'ARS', 'COP', 'CLP', 'BRL', 'PEN'];
        if (!divisasValidas.includes(viaje.divisa)) {
            errores.divisa = 'Divisa no válida';
        }
        
        return {
            valido: Object.keys(errores).length === 0,
            errores: errores
        };
    }
}
```

#### 5.3 index.js (services)
```javascript
/**
 * Services - Punto de entrada de servicios
 * 
 * Principios aplicados:
 * - SoC: Punto único de acceso a servicios
 * - Encapsulamiento: Abstracción de implementación
 */

import { StorageService } from './StorageService.js';
import { ValidationService } from './ValidationService.js';

// Exportar servicios
export const storageService = StorageService;
export const validationService = ValidationService;

export {
    StorageService,
    ValidationService
};
```

### 6. Utils

#### 6.1 formatters.js
```javascript
/**
 * formatters.js - Utilidades de formateo
 * 
 * Funciones puras para formatear diferentes tipos de datos
 */

/**
 * Formatea un monto según la divisa
 * @param {number} monto - Monto a formatear
 * @param {string} divisa - Código de divisa (USD, EUR, MXN, etc.)
 * @returns {string} Monto formateado
 */
export function formatCurrency(monto, divisa = 'USD') {
    const formatter = new Intl.NumberFormat(getLocale(divisa), {
        style: 'currency',
        currency: divisa,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(monto);
}

/**
 * Obtiene el locale adecuado para una divisa
 * @private
 * @param {string} divisa - Código de divisa
 * @returns {string} Código de locale
 */
function getLocale(divisa) {
    const locales = {
        'USD': 'en-US',
        'EUR': 'es-ES',
        'MXN': 'es-MX',
        'ARS': 'es-AR',
        'COP': 'es-CO',
        'CLP': 'es-CL',
        'BRL': 'pt-BR',
        'PEN': 'es-PE'
    };
    
    return locales[divisa] || 'en-US';
}

/**
 * Formatea una fecha a formato legible
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export function formatDate(fecha) {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Recorta un texto si excede una longitud máxima
 * @param {string} texto - Texto a recortar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto recortado con "..." si es necesario
 */
export function truncate(texto, maxLength = 50) {
    if (!texto) return '';
    return texto.length > maxLength 
        ? `${texto.substring(0, maxLength)}...`
        : texto;
}
```

#### 6.2 generators.js
```javascript
/**
 * generators.js - Utilidades de generación
 * 
 * Funciones para generar IDs, códigos, etc.
 */

/**
 * Genera un ID único
 * @param {number} length - Longitud del ID (por defecto 8)
 * @returns {string} ID generado
 */
export function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

/**
 * Genera un código de viaje único
 * @returns {string} Código de 6 caracteres
 */
export function generateTravelCode() {
    return generateId(6);
}

/**
 * Genera un color aleatorio en formato hexadecimal
 * @returns {string} Color en formato #RRGGBB
 */
export function generateRandomColor() {
    return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
}

/**
 * Genera las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} Iniciales (máx 2 caracteres)
 */
export function getInitials(name) {
    if (!name) return '';
    
    const parts = name.split(' ').filter(part => part.length > 0);
    
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}
```

#### 6.3 index.js (utils)
```javascript
/**
 * Utils - Punto de entrada de utilidades
 * 
 * Exporta todas las funciones de utilidad
 */

export * from './formatters.js';
export * from './generators.js';

// Exportar como objeto (opcional, para compatibilidad)
export const utils = {
    ...require('./formatters.js'),
    ...require('./generators.js')
};
```

### 7. Views

#### 7.1 HomeView.js
```javascript
import { BaseView } from './BaseView.js';

/**
 * HomeView - Vista de la página de inicio
 * 
 * Principios aplicados:
 * - SRP: Solo maneja la presentación de la página de inicio
 * - Herencia: Extiende BaseView
 * - Composición: Utiliza componentes más pequeños
 */

export class HomeView extends BaseView {
    constructor() {
        super();
        this.setTitle('TravelSplit | Inicio');
    }

    /**
     * Renderiza la vista
     * @returns {string} HTML de la vista
     */
    render() {
        return `
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>Bienvenido a TravelSplit</h1>
                        <p class="lead">La forma más fácil de dividir gastos en tus viajes</p>
                        
                        <div class="cta-buttons">
                            <a href="#/crear-viaje" class="btn btn-primary">
                                <i class="fas fa-plus"></i> Crear Viaje
                            </a>
                            <a href="#/unirse-viaje" class="btn btn-outline">
                                <i class="fas fa-sign-in-alt"></i> Unirse a Viaje
                            </a>
                        </div>
                    </div>
                    
                    <div class="hero-image">
                        <img src="assets/images/travel-illustration.svg" alt="Viajeros" />
                    </div>
                </div>
            </section>
            
            <section class="features">
                <div class="container">
                    <h2>¿Por qué usar TravelSplit?</h2>
                    
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-euro-sign"></i>
                            </div>
                            <h3>Divide Gastos</h3>
                            <p>Calcula automáticamente quién debe a quién.</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Comparte con Amigos</h3>
                            <p>Invita a tus amigos con un simple código.</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <h3>Acceso en Cualquier Lugar</h3>
                            <p>Funciona en todos tus dispositivos.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="how-it-works">
                <div class="container">
                    <h2>¿Cómo funciona?</h2>
                    
                    <ol class="steps">
                        <li>
                            <span class="step-number">1</span>
                            <div class="step-content">
                                <h3>Crea un viaje</h3>
                                <p>Ingresa el nombre del viaje y agrega a los participantes.</p>
                            </div>
                        </li>
                        <li>
                            <span class="step-number">2</span>
                            <div class="step-content">
                                <h3>Registra gastos</h3>
                                <p>Anota quién pagó y por quiénes fue el gasto.</p>
                            </div>
                        </li>
                        <li>
                            <span class="step-number">3</span>
                            <div class="step-content">
                                <h3>¡Listo!</h3>
                                <p>TravelSplit calcula automáticamente los balances.</p>
                            </div>
                        </li>
                    </ol>
                    
                    <div class="cta-section">
                        <a href="#/crear-viaje" class="btn btn-primary btn-large">
                            <i class="fas fa-rocket"></i> Comenzar Ahora
                        </a>
                    </div>
                </div>
            </section>
        `;
    }
    
    /**
     * Se ejecuta después de renderizar la vista
     */
    afterRender() {
        console.log('HomeView renderizada');
    }
}
```

#### 7.2 TravelListView.js
```javascript
import { BaseView } from './BaseView.js';
import { storageService } from '../services/index.js';
import { formatDate } from '../utils/index.js';

/**
 * TravelListView - Vista de la lista de viajes
 * 
 * Muestra una lista de viajes guardados y permite filtrarlos
 */

export class TravelListView extends BaseView {
    constructor() {
        super();
        this.setTitle('Mis Viajes | TravelSplit');
        this.viajes = [];
    }

    /**
     * Renderiza la vista
     * @returns {string} HTML de la vista
     */
    render() {
        this.viajes = storageService.obtenerTodos();
        
        return `
            <section class="travel-list">
                <div class="container">
                    <div class="section-header">
                        <h1>Mis Viajes</h1>
                        <a href="#/crear-viaje" class="btn btn-primary">
                            <i class="fas fa-plus"></i> Nuevo Viaje
                        </a>
                    </div>
                    
                    ${this.viajes.length > 0 
                        ? this.renderTravelsList() 
                        : this.renderEmptyState()
                    }
                </div>
            </section>
        `;
    }
    
    /**
     * Renderiza la lista de viajes
     * @private
     * @returns {string} HTML de la lista de viajes
     */
    renderTravelsList() {
        return `
            <div class="search-box">
                <div class="search-input">
                    <i class="fas fa-search"></i>
                    <input type="text" id="search-input" placeholder="Buscar viaje...">
                </div>
            </div>
            
            <div class="travels-grid" id="travels-container">
                ${this.viajes.map(viaje => this.renderTravelCard(viaje)).join('')}
            </div>
        `;
    }
    
    /**
     * Renderiza una tarjeta de viaje
     * @private
     * @param {Object} viaje - Datos del viaje
     * @returns {string} HTML de la tarjeta
     */
    renderTravelCard(viaje) {
        const fecha = viaje.ultimaModificacion 
            ? formatDate(viaje.ultimaModificacion) 
            : 'Sin modificaciones';
            
        return `
            <div class="travel-card" data-id="${viaje.id}">
                <div class="travel-card-header">
                    <h3>${this.escapeHTML(viaje.nombre)}</h3>
                    <span class="travel-code">${viaje.id}</span>
                </div>
                
                <div class="travel-card-body">
                    <div class="travel-meta">
                        <span><i class="fas fa-users"></i> ${viaje.participantes.length} participantes</span>
                        <span><i class="fas fa-receipt"></i> ${viaje.gastos.length} gastos</span>
                    </div>
                    
                    <div class="travel-total">
                        <span>Total gastado:</span>
                        <span class="amount">${formatCurrency(viaje.totalGastado, viaje.divisa)}</span>
                    </div>
                    
                    <div class="travel-date">
                        <i class="far fa-clock"></i> ${fecha}
                    </div>
                </div>
                
                <div class="travel-card-actions">
                    <a href="#/viaje/${viaje.id}" class="btn btn-sm btn-primary">
                        Ver Detalles
                    </a>
                    <button class="btn btn-sm btn-outline copy-code" data-code="${viaje.id}">
                        <i class="far fa-copy"></i> Copiar Código
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Renderiza el estado vacío
     * @private
     * @returns {string} HTML del estado vacío
     */
    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-suitcase-rolling"></i>
                </div>
                <h3>No tienes viajes guardados</h3>
                <p>Crea tu primer viaje para comenzar a organizar tus gastos.</p>
                <a href="#/crear-viaje" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Crear Primer Viaje
                </a>
            </div>
        `;
    }
    
    /**
     * Se ejecuta después de renderizar la vista
     */
    afterRender() {
        // Configurar búsqueda
        const searchInput = this.$('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterTravels(e.target.value);
            });
        }
        
        // Configurar botones de copiar código
        const copyButtons = this.$('.copy-code', true);
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const code = e.currentTarget.getAttribute('data-code');
                this.copyToClipboard(code);
                this.showNotification('¡Código copiado al portapapeles!', 'success');
            });
        });
    }
    
    /**
     * Filtra los viajes según el término de búsqueda
     * @private
     * @param {string} term - Término de búsqueda
     */
    filterTravels(term) {
        const container = this.$('#travels-container');
        if (!container) return;
        
        const filtered = this.viajes.filter(viaje => {
            const searchTerm = term.toLowerCase();
            return (
                viaje.nombre.toLowerCase().includes(searchTerm) ||
                viaje.id.toLowerCase().includes(searchTerm) ||
                viaje.participantes.some(p => p.toLowerCase().includes(searchTerm))
            );
        });
        
        container.innerHTML = filtered.length > 0
            ? filtered.map(viaje => this.renderTravelCard(viaje)).join('')
            : `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron viajes que coincidan con "${term}"</p>
                </div>
            `;
    }
    
    /**
     * Copia texto al portapapeles
     * @private
     * @param {string} text - Texto a copiar
     */
    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}
```

#### 7.3 JoinTravelView.js
```javascript
import { BaseView } from './BaseView.js';
import { storageService, validationService } from '../services/index.js';

/**
 * JoinTravelView - Vista para unirse a un viaje existente
 * 
 * Permite a los usuarios unirse a un viaje usando un código
 */

export class JoinTravelView extends BaseView {
    constructor() {
        super();
        this.setTitle('Unirse a Viaje | TravelSplit');
    }

    /**
     * Renderiza la vista
     * @returns {string} HTML de la vista
     */
    render() {
        return `
            <section class="join-travel">
                <div class="container">
                    <div class="card">
                        <h1>Unirse a un Viaje</h1>
                        <p class="subtitle">Ingresa el código del viaje al que deseas unirte</p>
                        
                        <form id="join-travel-form">
                            <div class="form-group">
                                <label for="travel-code">Código del Viaje</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-key"></i>
                                    <input 
                                        type="text" 
                                        id="travel-code" 
                                        name="code" 
                                        placeholder="Ej: ABC123"
                                        required
                                        maxlength="6"
                                        pattern="[A-Z0-9]{6}"
                                        title="El código debe tener 6 caracteres alfanuméricos"
                                    >
                                </div>
                                <div class="form-hint">
                                    <i class="fas fa-info-circle"></i> El código es de 6 letras/números (ej: ABC123)
                                </div>
                            </div>
                            
                            <div class="form-actions">
                                <a href="#/" class="btn btn-outline">
                                    <i class="fas fa-arrow-left"></i> Volver
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-sign-in-alt"></i> Unirse al Viaje
                                </button>
                            </div>
                        </form>
                        
                        <div class="divider">
                            <span>o</span>
                        </div>
                        
                        <div class="create-new">
                            <p>¿Quieres crear un nuevo viaje?</p>
                            <a href="#/crear-viaje" class="btn btn-outline">
                                <i class="fas fa-plus"></i> Crear Viaje
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    /**
     * Se ejecuta después de renderizar la vista
     */
    afterRender() {
        const form = this.$('#join-travel-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleJoinTravel();
            });
        }
    }
    
    /**
     * Maneja el envío del formulario de unión
     * @private
     */
    handleJoinTravel() {
        const codeInput = this.$('#travel-code');
        const code = codeInput.value.trim().toUpperCase();
        
        // Validar formato del código
        if (!/^[A-Z0-9]{6}$/.test(code)) {
            this.showError('El código debe tener exactamente 6 caracteres alfanuméricos');
            return;
        }
        
        // Verificar si el viaje existe
        const viaje = storageService.obtenerPorId(code);
        
        if (viaje) {
            // Redirigir al detalle del viaje
            window.location.hash = `#/viaje/${code}`;
        } else {
            this.showError('No se encontró ningún viaje con ese código');
        }
    }
    
    /**
     * Muestra un mensaje de error
     * @private
     * @param {string} message - Mensaje de error
     */
    showError(message) {
        this.showNotification(message, 'error');
    }
}
```

#### 7.4 ExpenseFormView.js
```javascript
import { BaseView } from './BaseView.js';
import { formatCurrency } from '../utils/index.js';

/**
 * ExpenseFormView - Vista del formulario de gastos
 * 
 * Permite agregar nuevos gastos a un viaje
 */

export class ExpenseFormView extends BaseView {
    constructor() {
        super();
        this.setTitle('Nuevo Gasto | TravelSplit');
        this.viaje = null;
    }

    /**
     * Establece los datos del viaje
     * @param {Object} viaje - Datos del viaje
     */
    setViaje(viaje) {
        this.viaje = viaje;
        if (viaje) {
            this.setTitle(`Nuevo Gasto - ${viaje.nombre} | TravelSplit`);
        }
    }

    /**
     * Renderiza la vista
     * @returns {string} HTML de la vista
     */
    render() {
        if (!this.viaje) {
            return this.renderError('No se encontró el viaje especificado');
        }

        return `
            <section class="expense-form">
                <div class="container">
                    <div class="card">
                        <div class="card-header">
                            <h1>Nuevo Gasto</h1>
                            <p class="subtitle">${this.escapeHTML(this.viaje.nombre)}</p>
                        </div>
                        
                        <form id="expense-form">
                            <div class="form-group">
                                <label for="expense-description">Descripción</label>
                                <input 
                                    type="text" 
                                    id="expense-description" 
                                    name="description" 
                                    placeholder="Ej: Cena en restaurante"
                                    required
                                    maxlength="100"
                                >
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="expense-amount">Monto</label>
                                    <div class="input-with-currency">
                                        <input 
                                            type="number" 
                                            id="expense-amount" 
                                            name="amount" 
                                            step="0.01" 
                                            min="0.01"
                                            placeholder="0.00"
                                            required
                                        >
                                        <span class="currency">${this.viaje.divisa}</span>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="expense-date">Fecha</label>
                                    <input 
                                        type="date" 
                                        id="expense-date" 
                                        name="date" 
                                        required
                                        value="${new Date().toISOString().split('T')[0]}"
                                    >
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Pagado por</label>
                                <div class="participants-grid">
                                    ${this.renderParticipantOptions('payer')}
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>¿Quiénes participaron?</label>
                                <div class="participants-grid">
                                    ${this.renderParticipantOptions('participants', true)}
                                </div>
                            </div>
                            
                            <div class="form-actions">
                                <a href="#/viaje/${this.viaje.id}" class="btn btn-outline">
                                    <i class="fas fa-times"></i> Cancelar
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Guardar Gasto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
    
    /**
     * Renderiza las opciones de participantes
     * @private
     * @param {string} name - Nombre del campo
     * @param {boolean} isMultiple - Si permite selección múltiple
     * @returns {string} HTML de las opciones
     */
    renderParticipantOptions(name, isMultiple = false) {
        if (!this.viaje) return '';
        
        return this.viaje.participantes.map((participante, index) => {
            const id = `${name}-${index}`;
            const inputType = isMultiple ? 'checkbox' : 'radio';
            const inputName = isMultiple ? `${name}[]` : name;
            const checked = isMultiple || index === 0 ? 'checked' : '';
            
            return `
                <div class="participant-option">
                    <input 
                        type="${inputType}" 
                        id="${id}" 
                        name="${inputName}" 
                        value="${this.escapeHTML(participante)}"
                        ${checked}
                    >
                    <label for="${id}">
                        <span class="participant-avatar">
                            ${this.getInitials(participante)}
                        </span>
                        <span class="participant-name">${this.escapeHTML(participante)}</span>
                    </label>
                </div>
            `;
        }).join('');
    }
    
    /**
     * Obtiene las iniciales de un nombre
     * @private
     * @param {string} name - Nombre completo
     * @returns {string} Iniciales
     */
    getInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }
    
    /**
     * Renderiza un mensaje de error
     * @private
     * @param {string} message - Mensaje de error
     * @returns {string} HTML del mensaje de error
     */
    renderError(message) {
        return `
            <div class="error-page">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Error al cargar el formulario</h2>
                <p>${message}</p>
                <a href="#/mis-viajes" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i> Volver a Mis Viajes
                </a>
            </div>
        `;
    }
    
    /**
     * Se ejecuta después de renderizar la vista
     */
    afterRender() {
        const form = this.$('#expense-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
        
        // Actualizar total cuando cambia el monto
        const amountInput = this.$('#expense-amount');
        if (amountInput) {
            amountInput.addEventListener('input', () => {
                this.updateTotal();
            });
        }
    }
    
    /**
     * Maneja el envío del formulario
     * @private
     */
    handleSubmit() {
        if (!this.viaje) return;
        
        const formData = new FormData(this.$('#expense-form'));
        
        // Validar que al menos un participante esté seleccionado
        const participants = formData.getAll('participants[]');
        if (participants.length === 0) {
            this.showError('Debes seleccionar al menos un participante');
            return;
        }
        
        // Crear objeto de gasto
        const expense = {
            id: `exp-${Date.now()}`,
            descripcion: formData.get('description'),
            monto: parseFloat(formData.get('amount')),
            fecha: formData.get('date'),
            pagador: formData.get('payer'),
            participantes: participants,
            creadoEn: new Date().toISOString()
        };
        
        // Disparar evento personalizado
        const event = new CustomEvent('expense:create', { 
            detail: { 
                viajeId: this.viaje.id,
                expense: expense
            } 
        });
        
        document.dispatchEvent(event);
    }
    
    /**
     * Actualiza el total mostrado
     * @private
     */
    updateTotal() {
        const amountInput = this.$('#expense-amount');
        const totalElement = this.$('.expense-total-amount');
        
        if (amountInput && totalElement && this.viaje) {
            const amount = parseFloat(amountInput.value) || 0;
            const perPerson = amount / (this.viaje.participantes.length || 1);
            
            totalElement.textContent = formatCurrency(perPerson, this.viaje.divisa);
        }
    }
}
```

### 8. Components

#### 8.1 TravelCardView.js
```javascript
import { BaseView } from './BaseView.js';
import { formatCurrency, formatDate } from '../utils/index.js';

/**
 * TravelCardView - Componente de tarjeta de viaje
 * 
 * Muestra un resumen de un viaje en la lista de viajes
 */

export class TravelCardView extends BaseView {
    /**
     * Renderiza la tarjeta de viaje
     * @param {Object} viaje - Datos del viaje
     * @returns {string} HTML de la tarjeta
     */
    static render(viaje) {
        const fecha = viaje.ultimaModificacion 
            ? formatDate(viaje.ultimaModificacion) 
            : 'Sin modificaciones';
            
        return `
            <div class="travel-card" data-id="${viaje.id}">
                <div class="travel-card-header">
                    <h3>${this.escapeHTML(viaje.nombre)}</h3>
                    <span class="travel-code">${viaje.id}</span>
                </div>
                
                <div class="travel-card-body">
                    <div class="travel-meta">
                        <span><i class="fas fa-users"></i> ${viaje.participantes.length} participantes</span>
                        <span><i class="fas fa-receipt"></i> ${viaje.gastos.length} gastos</span>
                    </div>
                    
                    <div class="travel-total">
                        <span>Total gastado:</span>
                        <span class="amount">${formatCurrency(viaje.totalGastado, viaje.divisa)}</span>
                    </div>
                    
                    <div class="travel-date">
                        <i class="far fa-clock"></i> ${fecha}
                    </div>
                </div>
                
                <div class="travel-card-actions">
                    <a href="#/viaje/${viaje.id}" class="btn btn-sm btn-primary">
                        Ver Detalles
                    </a>
                    <button class="btn btn-sm btn-outline copy-code" data-code="${viaje.id}">
                        <i class="far fa-copy"></i> Copiar Código
                    </button>
                </div>
            </div>
        `;
    }
}
```

#### 8.2 ExpenseItemView.js
```javascript
import { BaseView } from './BaseView.js';
import { formatCurrency } from '../utils/index.js';

/**
 * ExpenseItemView - Componente de ítem de gasto
 * 
 * Muestra un gasto individual en la lista de gastos
 */

export class ExpenseItemView extends BaseView {
    /**
     * Renderiza un ítem de gasto
     * @param {Object} expense - Datos del gasto
     * @param {string} currency - Código de divisa
     * @returns {string} HTML del ítem
     */
    static render(expense, currency) {
        return `
            <div class="expense-item" data-id="${expense.id}">
                <div class="expense-icon">
                    <i class="fas fa-receipt"></i>
                </div>
                
                <div class="expense-details">
                    <div class="expense-header">
                        <h4>${this.escapeHTML(expense.descripcion)}</h4>
                        <span class="expense-amount">${formatCurrency(expense.monto, currency)}</span>
                    </div>
                    
                    <div class="expense-meta">
                        <span class="expense-payer">
                            <i class="fas fa-user"></i> ${this.escapeHTML(expense.pagador)}
                        </span>
                        <span class="expense-date">
                            <i class="far fa-calendar-alt"></i> ${new Date(expense.fecha).toLocaleDateString()}
                        </span>
                        <span class="expense-participants">
                            <i class="fas fa-users"></i> ${expense.participantes.length} personas
                        </span>
                    </div>
                </div>
                
                <button class="expense-actions" data-action="delete" title="Eliminar gasto">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
}
```

#### 8.3 ParticipantTagView.js
```javascript
import { BaseView } from './BaseView.js';

/**
 * ParticipantTagView - Componente de etiqueta de participante
 * 
 * Muestra un participante como una etiqueta con avatar
 */

export class ParticipantTagView extends BaseView {
    /**
     * Renderiza una etiqueta de participante
     * @param {string} name - Nombre del participante
     * @param {string} [color] - Color de fondo opcional
     * @returns {string} HTML de la etiqueta
     */
    static render(name, color) {
        const initials = this.getInitials(name);
        const bgColor = color || this.stringToColor(name);
        const textColor = this.getContrastColor(bgColor);
        
        return `
            <span class="participant-tag" style="background-color: ${bgColor}; color: ${textColor}">
                <span class="participant-avatar">${initials}</span>
                <span class="participant-name">${this.escapeHTML(name)}</span>
            </span>
        `;
    }
    
    /**
     * Genera un color a partir de un string
     * @private
     * @param {string} str - String de entrada
     * @returns {string} Código de color hexadecimal
     */
    static stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const hue = Math.abs(hash % 360);
        return `hsl(${hue}, 70%, 60%)`;
    }
    
    /**
     * Obtiene el color de contraste (blanco o negro) para un color de fondo
     * @private
     * @param {string} bgColor - Color de fondo en formato hexadecimal o hsl
     * @returns {string} 'white' o 'black'
     */
    static getContrastColor(bgColor) {
        // Si es un color HSL, convertirlo a RGB
        let r, g, b;
        
        if (bgColor.startsWith('hsl')) {
            const hsl = bgColor.match(/\d+/g);
            if (hsl && hsl.length >= 3) {
                [r, g, b] = this.hslToRgb(
                    parseInt(hsl[0]) / 360,
                    parseInt(hsl[1]) / 100,
                    parseInt(hsl[2]) / 100
                );
            }
        } else {
            // Asumir que es un color hexadecimal
            const hex = bgColor.replace('#', '');
            r = parseInt(hex.substr(0, 2), 16);
            g = parseInt(hex.substr(2, 2), 16);
            b = parseInt(hex.substr(4, 2), 16);
        }
        
        // Calcular luminosidad relativa (fórmula WCAG)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? 'black' : 'white';
    }
    
    /**
     * Convierte HSL a RGB
     * @private
     * @param {number} h - Matiz (0-1)
     * @param {number} s - Saturación (0-1)
     * @param {number} l - Luminosidad (0-1)
     * @returns {number[]} [r, g, b] en escala 0-255
     */
    static hslToRgb(h, s, l) {
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // Escala de grises
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
            g = Math.round(hue2rgb(p, q, h) * 255);
            b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
        }
        
        return [r, g, b];
    }
    
    /**
     * Obtiene las iniciales de un nombre
     * @private
     * @param {string} name - Nombre completo
     * @returns {string} Iniciales (máx 2 caracteres)
     */
    static getInitials(name) {
        if (!name) return '??';
        
        const parts = name.split(' ').filter(part => part.length > 0);
        if (parts.length === 0) return '??';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
}
```

#### 8.4 LoaderView.js
```javascript
import { BaseView } from './BaseView.js';

/**
 * LoaderView - Componente de carga
 * 
 * Muestra un indicador de carga animado
 */

export class LoaderView extends BaseView {
    /**
     * Renderiza el componente de carga
     * @param {string} [message=Cargando...] - Mensaje a mostrar
     * @returns {string} HTML del componente
     */
    static render(message = 'Cargando...') {
        return `
            <div class="loader-container">
                <div class="loader">
                    <div class="spinner"></div>
                    <p>${this.escapeHTML(message)}</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Renderiza un mensaje de error
     * @param {string} message - Mensaje de error
     * @param {string} [actionText=Reintentar] - Texto del botón de acción
     * @param {Function} [onRetry] - Función a ejecutar al hacer clic en Reintentar
     * @returns {string} HTML del mensaje de error
     */
    static renderError(message, actionText = 'Reintentar', onRetry = null) {
        const retryButton = onRetry 
            ? `<button class="btn btn-primary retry-button">${this.escapeHTML(actionText)}</button>`
            : '';
            
        return `
            <div class="error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <p>${this.escapeHTML(message)}</p>
                ${retryButton}
            </div>
        `;
    }
    
    /**
     * Se ejecuta después de renderizar el componente
     * @param {HTMLElement} container - Contenedor del componente
     * @param {Function} onRetry - Función a ejecutar al hacer clic en Reintentar
     */
    static afterRender(container, onRetry) {
        if (onRetry && container) {
            const retryButton = container.querySelector('.retry-button');
            if (retryButton) {
                retryButton.addEventListener('click', onRetry);
            }
        }
    }
}
```

#### 8.5 index.js (components)
```javascript
/**
 * Components - Punto de entrada de componentes
 * 
 * Exporta todos los componentes para facilitar su importación
 */

export * from './TravelCardView.js';
export * from './ExpenseItemView.js';
export * from './ParticipantTagView.js';
export * from './LoaderView.js';

// Exportar como objeto (opcional, para compatibilidad)
export const components = {
    TravelCardView: require('./TravelCardView.js').TravelCardView,
    ExpenseItemView: require('./ExpenseItemView.js').ExpenseItemView,
    ParticipantTagView: require('./ParticipantTagView.js').ParticipantTagView,
    LoaderView: require('./LoaderView.js').LoaderView
};
```

### 9. Estilos CSS

#### 9.1 Estructura de archivos
```
assets/
└── css/
    ├── base/
    │   ├── global.css     # Estilos globales y variables CSS
    │   ├── reset.css      # Reseteo de estilos
    │   └── variables.css  # Variables CSS personalizadas
    │
    ├── components/
    │   ├── buttons.css    # Estilos de botones
    │   ├── cards.css      # Estilos de tarjetas
    │   ├── forms.css      # Estilos de formularios
    │   └── header.css     # Estilos del encabezado
    │
    ├── pages/
    │   ├── home.css       # Estilos de la página de inicio
    │   ├── travel-detail.css # Estilos de detalle de viaje
    │   ├── travel-form.css   # Estilos de formulario de viaje
    │   └── travel-list.css   # Estilos de lista de viajes
    │
    └── main.css           # Archivo principal que importa todos los demás
```

#### 9.2 variables.css
```css
:root {
    /* Colores principales */
    --primary-color: #4361ee;
    --primary-light: #4895ef;
    --primary-dark: #3a0ca3;
    
    /* Colores secundarios */
    --secondary-color: #f72585;
    --success-color: #4cc9f0;
    --warning-color: #f8961e;
    --danger-color: #ef233c;
    --info-color: #4cc9f0;
    
    /* Escala de grises */
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-400: #ced4da;
    --gray-500: #adb5bd;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;
    
    /* Tipografía */
    --font-family-sans: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-family-mono: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    
    /* Espaciado */
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 1rem;
    --spacing-4: 1.5rem;
    --spacing-5: 3rem;
    
    /* Bordes */
    --border-radius: 0.5rem;
    --border-radius-sm: 0.25rem;
    --border-radius-lg: 1rem;
    
    /* Sombras */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Transiciones */
    --transition: all 0.2s ease-in-out;
    
    /* Z-index */
    --z-index-dropdown: 1000;
    --z-index-sticky: 1020;
    --z-index-fixed: 1030;
    --z-index-modal-backdrop: 1040;
    --z-index-modal: 1050;
    --z-index-popover: 1060;
    --z-index-tooltip: 1070;
}
```

#### 9.3 main.css
```css
/**
 * main.css - Punto de entrada de estilos
 * 
 * Importa todos los archivos CSS en el orden correcto
 */

/* Variables y reset */
@import 'base/variables.css';
@import 'base/reset.css';

/* Componentes */
@import 'components/buttons.css';
@import 'components/cards.css';
@import 'components/forms.css';
@import 'components/header.css';

/* Páginas */
@import 'pages/home.css';
@import 'pages/travel-detail.css';
@import 'pages/travel-form.css';
@import 'pages/travel-list.css';

/* Utilidades */
@import 'base/utilities.css';

/* Estilos globales */
@import 'base/global.css';
```

## 10. Conclusión

Este documento ha presentado la estructura completa del código fuente de TravelSplit, una aplicación web para dividir gastos de viajes. La aplicación sigue una arquitectura MVC pura con JavaScript moderno, sin dependencias externas.

### Características principales:
- **Arquitectura limpia y modular** con separación clara de responsabilidades
- **Persistencia local** usando localStorage
- **Interfaz de usuario responsiva** con diseño móvil primero
- **Validación de formularios** en el cliente
- **Enrutamiento SPA** con soporte para parámetros de ruta
- **Estilos modulares** con CSS personalizado y variables CSS
- **Código documentado** con JSDoc

### Posibles mejoras futuras:
1. Implementar autenticación de usuarios
2. Añadir sincronización en la nube
3. Mejorar la accesibilidad
4. Agregar pruebas unitarias y de integración
5. Implementar PWA para soporte offline

¡Gracias por revisar el código de TravelSplit!
```javascript
/**
 * Controllers - Exportador central
 * 
 * Principios aplicados:
 * - SoC: Punto único de acceso a controladores
 * - Encapsulamiento: Abstracción de controladores
 * - DRY: Importación centralizada
 */

// Exportar todos los controladores
export { AppController } from './AppController.js';
export { HomeController } from './HomeController.js';
export { TravelController } from './TravelController.js';
export { ExpenseController } from './ExpenseController.js';

/**
 * Uso recomendado:
 * 
 * // En app.js - Crear instancia del AppController
 * import { AppController } from './controllers/index.js';
 * 
 * // En cualquier otro archivo - Importar controladores específicos
 * import { TravelController, ExpenseController } from '../controllers/index.js';
 */
```

### 4. Router

#### 4.1 Router.js
```javascript
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
     */
    pathToRegex(path) {
        const pathWithParams = path
            .replace(/\//g, '\\/')
            .replace(/\*\*/g, '.*')
            .replace(/:([^\/]+)/g, '([^\/]+)');

        return new RegExp(`^${pathWithParams}$`, 'i');
    }

    /**
     * Extrae nombres de parámetros de la ruta
     * @private
     * @param {string} path - Ruta con parámetros
     * @returns {string[]} Nombres de parámetros
     */
    extractParamNames(path) {
        const params = [];
        const matches = path.matchAll(/:([^\/]+)/g);
        
        for (const match of matches) {
            params.push(match[1]);
        }
        
        return params;
    }

    // ... (resto de los métodos del Router)
    
    /**
     * Navega a una ruta específica
     * @param {string} path - Ruta a navegar
     * @param {Object} [state] - Estado opcional para la navegación
     */
    navigate(path, state = {}) {
        window.location.hash = `#${path}`;
        this.handleNavigation();
    }

    /**
     * Manejador de navegación
     * @private
     */
    handleNavigation() {
        const path = this.getCurrentPath();
        const route = this.matchRoute(path);

        if (route) {
            this.currentRoute = route;
            this.render(route, this.currentParams);
        } else if (this.notFoundHandler) {
            this.notFoundHandler();
        }
    }

    /**
     * Obtiene la ruta actual del hash
     * @private
     * @returns {string} Ruta actual
     */
    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }
}
```
```javascript
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
```

### 4. Modelos (src/models/)

#### 4.1 Travel.js
```javascript
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
```

#### 4.2 Expense.js
```javascript
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
```

#### 4.3 Participant.js
```javascript
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
            return palavras[0].substring(0, 2).toUpperCase();
        }
        
        return (palabras[0][0] + palavras[palabras.length - 1][0]).toUpperCase();
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
```

### 5. Vistas (src/views/)

#### 5.1 BaseView.js
```javascript
/**
 * BaseView - Vista base abstracta
 * 
 * Principios aplicados:
 * - SRP: Solo maneja operaciones comunes de vistas
 * - DRY: Funcionalidad compartida entre todas las vistas
 * - Encapsulamiento: Métodos reutilizables
 * - Template Method Pattern: Define estructura común
 */

export class BaseView {
    constructor() {
        if (this.constructor === BaseView) {
            throw new Error('BaseView es una clase abstracta y no puede ser instanciada directamente');
        }
    }

    /**
     * Método abstracto que debe ser implementado por las clases hijas
     * @returns {string} - HTML de la vista
     */
    render() {
        throw new Error('El método render() debe ser implementado por la clase hija');
    }

    /**
     * Hook que se ejecuta después de renderizar
     * Las clases hijas pueden sobrescribirlo
     */
    afterRender() {
        // Implementar en clases hijas si es necesario
    }

    /**
     * Encuentra un elemento en el DOM
     * @param {string} selector - Selector CSS
     * @returns {Element|null}
     */
    $(selector) {
        return document.querySelector(selector);
    }

    /**
     * Encuentra múltiples elementos en el DOM
     * @param {string} selector - Selector CSS
     * @returns {NodeList}
     */
    $$(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Agrega un event listener a un elemento
     * @param {string} selector - Selector CSS
     * @param {string} event - Nombre del evento
     * @param {Function} handler - Manejador del evento
     */
    on(selector, event, handler) {
        const element = this.$(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message - Mensaje de error
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Muestra un mensaje de éxito
     * @param {string} message - Mensaje de éxito
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Muestra una notificación
     * @param {string} message - Mensaje
     * @param {string} type - Tipo (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Por ahora usa alert, pero puede mejorarse con toasts
        const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        alert(`${icon} ${message}`);
    }

    /**
     * Limpia el contenido de un elemento
     * @param {string} selector - Selector CSS
     */
    clearContent(selector) {
        const element = this.$(selector);
        if (element) {
            element.innerHTML = '';
        }
    }

    /**
     * Actualiza el título de la página
     * @param {string} title - Título
     */
    setTitle(title) {
        document.title = `${title} | TravelSplit`;
    }

    /**
     * Sanitiza HTML para prevenir XSS
     * @param {string} html - HTML a sanitizar
     * @returns {string}
     */
    sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }

    /**
     * Escapa caracteres especiales en HTML
     * @param {string} text - Texto a escapar
     * @returns {string}
     */
    escapeHTML(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
```

#### 5.2 CreateTravelView.js
```javascript
/**
 * CreateTravelView - Vista para crear un viaje
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza el formulario de creación
 * - SoC: No contiene lógica de negocio (eso va en el Controller)
 * - Encapsulamiento: Métodos auxiliares privados
 */

import { BaseView } from './BaseView.js';

export class CreateTravelView extends BaseView {
    constructor() {
        super();
        this.setTitle('Crear Viaje');
        this.participantes = [];
    }

    render() {
        return `
            <section class="travel-form-section animated">
                <div class="card">
                    <h2>Crear Nuevo Viaje</h2>
                    
                    <form id="form-crear-viaje">
                        <div class="form-group">
                            <label for="nombre">
                                <i class="fas fa-suitcase"></i>
                                Nombre del Viaje
                            </label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre"
                                class="form-control"
                                placeholder="Ej: Viaje a la playa 2025"
                                required
                                minlength="3"
                                maxlength="50"
                            >
                            <small class="form-help">
                                <i class="fas fa-info-circle"></i>
                                Mínimo 3 caracteres, máximo 50
                            </small>
                        </div>

                        <div class="form-group">
                            <label for="divisa">
                                <i class="fas fa-money-bill-wave"></i>
                                Divisa Principal
                            </label>
                            <select id="divisa" name="divisa" class="form-control" required>
                                <option value="">Selecciona una divisa</option>
                                <option value="USD">USD - Dólar estadounidense</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="MXN" selected>MXN - Peso mexicano</option>
                                <option value="ARS">ARS - Peso argentino</option>
                                <option value="COP">COP - Peso colombiano</option>
                                <option value="CLP">CLP - Peso chileno</option>
                                <option value="BRL">BRL - Real brasileño</option>
                                <option value="PEN">PEN - Sol peruano</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>
                                <i class="fas fa-users"></i>
                                Participantes
                            </label>
                            <div class="add-participant">
                                <input 
                                    type="text" 
                                    id="nuevo-participante"
                                    class="form-control"
                                    placeholder="Nombre del participante"
                                    maxlength="30"
                                >
                                <button type="button" id="agregar-participante" class="btn btn-secondary">
                                    <i class="fas fa-plus"></i>
                                    Agregar
                                </button>
                            </div>
                            <div id="lista-participantes" class="participantes-list"></div>
                            <small class="form-help">
                                <i class="fas fa-info-circle"></i>
                                Agrega al menos un participante
                            </small>
                        </div>

                        <div class="form-actions">
                            <a href="#/" class="btn btn-outline">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Crear Viaje
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        `;
    }

    afterRender() {
        this.renderParticipantes();
        console.log('CreateTravelView renderizada');
    }

    /**
     * Renderiza la lista de participantes
     */
    renderParticipantes() {
        const container = this.$('#lista-participantes');
        
        if (!container) return;

        if (this.participantes.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = this.participantes.map(nombre => `
            <div class="participante-tag">
                <span>${this.escapeHTML(nombre)}</span>
                <button type="button" class="btn-remove" data-nombre="${this.escapeHTML(nombre)}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    /**
     * Agrega un participante a la lista
     * @param {string} nombre - Nombre del participante
     * @returns {boolean}
     */
    agregarParticipante(nombre) {
        const nombreNormalizado = nombre.trim();

        if (!nombreNormalizado) {
            this.showError('El nombre no puede estar vacío');
            return false;
        }

        if (this.participantes.includes(nombreNormalizado)) {
            this.showError('Este participante ya está agregado');
            return false;
        }

        this.participantes.push(nombreNormalizado);
        this.renderParticipantes();
        return true;
    }

    /**
     * Elimina un participante de la lista
     * @param {string} nombre - Nombre del participante
     */
    eliminarParticipante(nombre) {
        this.participantes = this.participantes.filter(p => p !== nombre);
        this.renderParticipantes();
    }

    /**
     * Obtiene los datos del formulario
     * @returns {Object}
     */
    getFormData() {
        return {
            nombre: this.$('#nombre')?.value.trim(),
            divisa: this.$('#divisa')?.value,
            participantes: [...this.participantes]
        };
    }

    /**
     * Limpia el formulario
     */
    limpiarFormulario() {
        const form = this.$('#form-crear-viaje');
        if (form) {
            form.reset();
        }
        this.participantes = [];
        this.renderParticipantes();
    }
}

#### 5.3 TravelDetailView.js

Vista que muestra los detalles de un viaje específico, incluyendo resúmenes, gastos y participantes.

```javascript
/**
 * TravelDetailView - Vista de detalles del viaje
 * 
 * Principios aplicados:
 * - SRP: Solo renderiza detalles del viaje
 * - DRY: Reutiliza utilidades de formateo
 * - SoC: Separación clara de presentación
 */

import { BaseView } from './BaseView.js';
import { formatCurrency, formatDate } from '../utils/index.js';

export class TravelDetailView extends BaseView {
    constructor() {
        super();
        this.viaje = null;
    }

    /**
     * Renderiza la vista de detalles del viaje
     * @returns {string} HTML de la vista
     */
    render() {
        if (!this.viaje) {
            return this.renderError();
        }

        this.setTitle(`${this.viaje.nombre}`);

        return `
            <section class="animated">
                <div class="card viaje-header-detail">
                    <div class="header-content">
                        <h1>${this.escapeHTML(this.viaje.nombre)}</h1>
                        <p>
                            Código del viaje: 
                            <span class="viaje-codigo">${this.viaje.id}</span>
                        </p>
                    </div>
                </div>

                <div class="resumen-section">
                    <div class="card resumen-card">
                        <h2><i class="fas fa-chart-bar"></i> Resumen del Viaje</h2>
                        <div class="resumen-grid">
                            <div class="resumen-item">
                                <h3>Total Gastado</h3>
                                <div class="monto">
                                    ${formatCurrency(this.viaje.totalGastado, this.viaje.divisa)}
                                </div>
                            </div>
                            <div class="resumen-item">
                                <h3>Participantes</h3>
                                <div class="monto">${this.viaje.participantes.length}</div>
                            </div>
                            <div class="resumen-item">
                                <h3>Gastos Totales</h3>
                                <div class="monto">${this.viaje.gastos?.length || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="actions-section">
                    <a href="#/viajes/${this.viaje.id}/gastos/nuevo" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Agregar Gasto
                    </a>
                    <button id="share-btn" class="btn btn-secondary">
                        <i class="fas fa-share-alt"></i> Compartir
                    </button>
                </div>

                <div class="gastos-section">
                    <h2><i class="fas fa-receipt"></i> Gastos Recientes</h2>
                    ${this.renderGastos()}
                </div>

                <div class="participantes-section">
                    <h2><i class="fas fa-users"></i> Participantes</h2>
                    <div class="participantes-grid">
                        ${this.renderParticipantes()}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Renderiza la lista de gastos
     * @private
     * @returns {string} HTML de la lista de gastos
     */
    renderGastos() {
        if (!this.viaje?.gastos?.length) {
            return `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>No hay gastos registrados</p>
                    <a href="#/viajes/${this.viaje.id}/gastos/nuevo" class="btn btn-primary">
                        Agregar primer gasto
                    </a>
                </div>
            `;
        }

        return `
            <div class="gastos-list">
                ${this.viaje.gastos.slice(0, 5).map(gasto => `
                    <div class="gasto-item card">
                        <div class="gasto-info">
                            <h3>${this.escapeHTML(gasto.concepto)}</h3>
                            <p class="gasto-meta">
                                <span class="gasto-fecha">${formatDate(gasto.fecha)}</span>
                                <span class="gasto-pagador">Pagado por: ${this.getParticipanteNombre(gasto.pagadorId)}</span>
                            </p>
                        </div>
                        <div class="gasto-monto">
                            ${formatCurrency(gasto.monto, this.viaje.divisa)}
                        </div>
                    </div>
                `).join('')}
                ${this.viaje.gastos.length > 5 ? `
                    <a href="#/viajes/${this.viaje.id}/gastos" class="btn btn-link">
                        Ver todos los gastos (${this.viaje.gastos.length})
                    </a>
                ` : ''}
            </div>
        `;
    }

    /**
     * Renderiza la lista de participantes
     * @private
     * @returns {string} HTML de la lista de participantes
     */
    renderParticipantes() {
        if (!this.viaje?.participantes?.length) {
            return '<p>No hay participantes en este viaje</p>';
        }

        return this.viaje.participantes.map(participante => `
            <div class="participante-card">
                <div class="participante-avatar">
                    ${this.getInitials(participante.nombre)}
                </div>
                <div class="participante-info">
                    <h3>${this.escapeHTML(participante.nombre)}</h3>
                    <p class="participante-balance ${participante.balance < 0 ? 'debe' : 'le-deben'}">
                        ${participante.balance < 0 ? 'Debe' : 'Le deben'} 
                        ${formatCurrency(Math.abs(participante.balance), this.viaje.divisa)}
                    </p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Obtiene el nombre de un participante por su ID
     * @private
     * @param {string} id - ID del participante
     * @returns {string} Nombre del participante
     */
    getParticipanteNombre(id) {
        const participante = this.viaje.participantes.find(p => p.id === id);
        return participante ? participante.nombre : 'Desconocido';
    }

    /**
     * Obtiene las iniciales de un nombre
     * @private
     * @param {string} name - Nombre completo
     * @returns {string} Iniciales
     */
    getInitials(name) {
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    /**
     * Renderiza un mensaje de error
     * @private
     * @returns {string} HTML del mensaje de error
     */
    renderError() {
        return `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>No se pudo cargar la información del viaje</p>
                <a href="#/viajes" class="btn btn-primary">
                    Volver a la lista de viajes
                </a>
            </div>
        `;
    }
}
```
```

### 5.4 ExpenseFormView.js

Vista que muestra el formulario para agregar un nuevo gasto a un viaje.
                    <div class="header-content">
                        <h1>${this.escapeHTML(this.viaje.nombre)}</h1>
                        <p>
                            Código del viaje: 
                            <span class="viaje-codigo">${this.viaje.id}</span>
                        </p>
                    </div>
                </div>

                <div class="resumen-section">
                    <div class="card resumen-card">
                        <h2><i class="fas fa-chart-bar"></i> Resumen del Viaje</h2>
                        <div class="resumen-grid">
                            <div class="resumen-item">
                                <h3>Total Gastado</h3>
                                <div class="monto">
                                    ${formatCurrency(this.viaje.totalGastado, this.viaje.divisa)}
                                </div>
                            </div>
                            <div class="resumen-item">
                                <h3>Participantes</h3>
                                <div class="monto">${this.viaje.participantes.length}</div>
                            </div>
                            <div class="resumen-item">
                                <h3>Gastos Registrados</h3>
                                <div class="monto">${this.viaje.gastos.length}</div>
                            </div>
                            <div class="resumen-item">
                                <h3>Promedio por Persona</h3>
                                <div class="monto">
                                    ${formatCurrency(this.getPromedio(), this.viaje.divisa)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-container">
                    <div class="card participantes-section">
                        <h2><i class="fas fa-users"></i> Participantes</h2>
                        <ul id="lista-participantes">
                            ${this.renderParticipantes()}
                        </ul>
                    </div>

                    <div class="card gastos-section">
                        <div class="gastos-header">
                            <h2><i class="fas fa-receipt"></i> Gastos</h2>
                            <a href="#/viaje/${this.viaje.id}/nuevo-gasto" class="btn btn-primary btn-small">
                                <i class="fas fa-plus"></i> Nuevo Gasto
                            </a>
                        </div>
                        <div id="lista-gastos">
                            ${this.renderGastos()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Establece el viaje actual
     * @param {Object} viaje - Datos del viaje
     */
    setViaje(viaje) {
        this.viaje = viaje;
    }

    /**
     * Calcula el promedio por persona
     * @private
     * @returns {number}
     */
    getPromedio() {
        if (!this.viaje || this.viaje.participantes.length === 0) {
            return 0;
        }
        return this.viaje.totalGastado / this.viaje.participantes.length;
    }

    /**
     * Renderiza la lista de participantes
     * @private
     * @returns {string}
     */
    renderParticipantes() {
        if (!this.viaje || !this.viaje.participantes.length) {
            return '<li style="color: var(--gray);">No hay participantes</li>';
        }

        return this.viaje.participantes
            .map(p => `<li>${this.escapeHTML(p)}</li>`)
            .join('');
    }

    /**
     * Renderiza la lista de gastos
     * @private
     * @returns {string}
     */
    renderGastos() {
        if (!this.viaje || !this.viaje.gastos.length) {
            return '<p class="empty-state" style="text-align: center; padding: 2rem; color: var(--gray);">No hay gastos registrados todavía</p>';
        }

        return this.viaje.gastos
            .map(gasto => `
                <div class="gasto-item">
                    <div class="gasto-info">
                        <h4>${this.escapeHTML(gasto.descripcion)}</h4>
                        <div class="gasto-meta">
                            <span><i class="fas fa-user"></i> ${this.escapeHTML(gasto.pagador)}</span>
                            <span><i class="fas fa-calendar"></i> ${gasto.fecha}</span>
                            <span><i class="fas fa-users"></i> ${gasto.participantes.length} personas</span>
                        </div>
                    </div>
                    <div class="gasto-monto">
                        ${formatCurrency(gasto.monto, this.viaje.divisa)}
                    </div>
                </div>
            `)
            .join('');
    }

    /**
     * Renderiza mensaje de error
     * @private
     * @returns {string}
     */
    renderError() {
        return `
            <div class="card error-page" style="text-align: center; padding: 3rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                <h2>Viaje no encontrado</h2>
                <p style="color: var(--gray); margin: 1rem 0;">
                    El viaje que buscas no existe o fue eliminado
                </p>
                <a href="#/mis-viajes" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i> Volver a Mis Viajes
                </a>
            </div>
        `;
    }

    afterRender() {
        console.log('TravelDetailView renderizada');
    }
}
```

[Se continuará con el resto de archivos...]
