TravelSplit

Aplicación web para organizar y dividir gastos de viajes entre grupos de amigos y familiares.

TravelSplit es una Single Page Application (SPA) construida con JavaScript puro siguiendo el patrón arquitectónico Model-View-Controller (MVC). Permite a los usuarios crear viajes, registrar gastos compartidos y calcular automáticamente quién debe a quién de forma equitativa.

TABLA DE CONTENIDOS

Características
Arquitectura
Tecnologías
Requisitos
Instalación
Uso
Estructura del Proyecto
Principios de Diseño
Módulos Principales
Flujo de Datos
Navegación
Persistencia
Validaciones
Extensibilidad
Navegadores Soportados
Contribución
Licencia

CARACTERÍSTICAS

Funcionalidades Principales:

Sistema de Autenticación: Páginas de bienvenida, login y registro de usuarios
Creación de Viajes: Crea viajes con nombre, divisa y participantes
Gestión de Participantes: Agrega y administra participantes en cada viaje
Registro de Gastos: Registra gastos indicando quién pagó y quiénes participan
Cálculo Automático: Calcula automáticamente los balances y quién debe a quién
Códigos Únicos: Cada viaje tiene un código único para compartir y unirse
Búsqueda: Filtra viajes por nombre o código
Múltiples Divisas: Soporte para USD, EUR, MXN, ARS, COP, CLP, BRL, PEN
Persistencia Local: Todos los datos se guardan localmente en el navegador
Validaciones en Tiempo Real: Validación de email y contraseña con feedback visual inmediato

Características Técnicas:

Single Page Application (SPA) con routing basado en hash
Arquitectura MVC pura sin frameworks externos
ES6 Modules nativos
localStorage para persistencia de datos
Responsive design con CSS modular
Validaciones robustas en cliente con feedback visual
Sin dependencias externas de JavaScript
Sistema de navegación dinámica según el estado del usuario

ARQUITECTURA

TravelSplit implementa una arquitectura MVC (Model-View-Controller) estricta con las siguientes capas:

Capas de la Arquitectura:

Models: Lógica de negocio y reglas de dominio

Views: Presentación y renderizado de UI

Controllers: Coordinación entre Models y Views

Services: Servicios auxiliares (Storage, Validation)

Router: Navegación SPA basada en hash

Utils: Utilidades puras (formatters, generators)

TECNOLOGÍAS

Frontend:

HTML5: Estructura semántica
CSS3: Estilos modulares con variables CSS
JavaScript ES6+: Lógica de aplicación usando ES6 Modules, ES6 Classes, Arrow Functions, Template Literals, Destructuring y Promises

Bibliotecas Externas (Solo UI):

Google Fonts: Poppins
Font Awesome 6.5.1: Iconos

Almacenamiento:

localStorage: Persistencia de datos en cliente

REQUISITOS

Navegadores Soportados:

Chrome y Edge versión 61 o superior
Firefox versión 60 o superior
Safari versión 11 o superior
Opera versión 48 o superior

Requisitos del Sistema:

Navegador moderno con soporte para ES6 Modules
JavaScript habilitado
localStorage habilitado

INSTALACIÓN

Opción 1: Servidor Local con Python

Clona el repositorio, navega al directorio y ejecuta el siguiente comando: python -m http.server 8000

Luego abre http://localhost:8000 en tu navegador.

Opción 2: Servidor Local con Node.js

Clona el repositorio, navega al directorio y ejecuta el siguiente comando: npx http-server -p 8000

Luego abre http://localhost:8000 en tu navegador.

Opción 3: Live Server en VS Code

Instalar la extensión Live Server en VS Code
Abrir el proyecto en VS Code
Hacer clic derecho en index.html y seleccionar Open with Live Server

Opción 4: Hosting Estático

Sube los archivos a cualquier servicio de hosting estático como GitHub Pages, Netlify, Vercel o Firebase Hosting.

USO

Acceder a la Aplicación:

Al cargar la aplicación verás la Página de Bienvenida. Haz clic en Iniciar Sesión en el header. Si no tienes cuenta, haz clic en Crea una cuenta. Completa el formulario de registro con email y contraseña válidos. Una vez registrado o logueado serás redirigido a la página principal.

Crear un Viaje:

Navega a Crear Viaje. Ingresa el nombre del viaje. Selecciona la divisa. Agrega participantes uno por uno. Haz clic en Crear Viaje. Se generará un código único que puedes compartir.

Registrar un Gasto:

Entra a los Detalles del Viaje. Haz clic en Nuevo Gasto. Describe el gasto. Ingresa el monto. Selecciona quién pagó. Marca quiénes participan en el gasto. Guarda el gasto.

Unirse a un Viaje:

Navega a Unirse a Viaje. Ingresa el código del viaje que te compartieron. Accede instantáneamente a los detalles y gastos.

Ver Balances:

Entra a los Detalles del Viaje. El sistema muestra automáticamente el total gastado, promedio por persona, balance de cada participante y la lista completa de gastos.

ESTRUCTURA DEL PROYECTO

El proyecto TravelSplit contiene los siguientes directorios y archivos principales:

Archivos raíz: index.html que es el HTML principal, app.js como punto de entrada y README.md con la documentación.

Directorio src contiene:

Carpeta models con los archivos Travel.js, Expense.js, Participant.js e index.js

Carpeta views con los archivos BaseView.js, WelcomeView.js, LoginView.js, RegisterView.js, HomeView.js, CreateTravelView.js, TravelListView.js, TravelDetailView.js, ExpenseFormView.js y JoinTravelView.js. También contiene una subcarpeta components con TravelCardView.js, ExpenseItemView.js, ParticipantTagView.js, LoaderView.js e index.js

Carpeta controllers con AppController.js, WelcomeController.js, LoginController.js, RegisterController.js, HomeController.js, TravelController.js, ExpenseController.js e index.js

Carpeta router con Router.js, routes.js e index.js

Carpeta services con StorageService.js, ValidationService.js e index.js

Carpeta utils con formatters.js, generators.js, navigationHelper.js e index.js

Directorio assets contiene:

Carpeta css con subcarpetas base que incluye reset.css, variables.css y global.css. Subcarpeta components con buttons.css, cards.css, forms.css y header.css. Subcarpeta pages con home.css, welcome.css, login.css, register.css, travel-detail.css, travel-form.css y travel-list.css. También el archivo main.css en la raíz de css.

Carpeta img para las imágenes del proyecto.

PRINCIPIOS DE DISEÑO

Principios SOLID:

Single Responsibility Principle: Cada clase tiene una única responsabilidad
Open/Closed Principle: Abierto a extensión, cerrado a modificación
Liskov Substitution Principle: Las vistas heredan de BaseView correctamente
Interface Segregation Principle: Interfaces específicas y enfocadas
Dependency Inversion Principle: Dependencia de abstracciones, no implementaciones

Otros Principios Aplicados:

DRY (Don't Repeat Yourself): Código reutilizable en utils y components
KISS (Keep It Simple): Implementaciones simples y claras
SoC (Separation of Concerns): Separación clara de responsabilidades entre capas
Alta Cohesión: Componentes fuertemente relacionados dentro de cada módulo
Bajo Acoplamiento: Mínima dependencia entre módulos diferentes

MÓDULOS PRINCIPALES

Models:

Travel.js representa un viaje completo con participantes y gastos. Incluye métodos para agregar participantes, agregar gastos, calcular balances individuales y obtener estadísticas del viaje.

Expense.js representa un gasto individual con descripción, monto, pagador y participantes. Incluye métodos para calcular el monto por persona y validar los datos del gasto.

Participant.js representa un participante del viaje. Incluye métodos para obtener iniciales, validar datos y comparar participantes.

Controllers:

AppController.js es el controlador principal que inicializa la aplicación, configura las rutas del router y coordina los demás controladores.

WelcomeController.js gestiona la página de bienvenida inicial.

LoginController.js gestiona el proceso de inicio de sesión con validaciones.

RegisterController.js gestiona el registro de nuevos usuarios con validaciones en tiempo real.

TravelController.js gestiona todas las operaciones relacionadas con viajes: creación, listado, visualización de detalles y unirse a viajes existentes.

ExpenseController.js gestiona las operaciones de gastos: creación y validación de nuevos gastos dentro de un viaje.

Services:

StorageService.js abstrae el acceso a localStorage proporcionando operaciones CRUD sobre los viajes. Maneja serialización, deserialización y verificaciones de límites.

ValidationService.js centraliza todas las validaciones de la aplicación. Valida viajes, gastos, participantes, emails y contraseñas según reglas de negocio definidas.

Router:

Router.js es el sistema de routing basado en hash que soporta parámetros dinámicos, hooks de navegación y manejo de páginas 404.

Utils:

navigationHelper.js gestiona la navegación dinámica del header según la ruta actual mostrando diferentes botones en welcome, login/registro y páginas principales.

FLUJO DE DATOS

El flujo de datos en TravelSplit sigue el patrón MVC estricto:

El usuario interactúa con una Vista. La Vista dispara un evento. El Controller captura el evento. El Controller valida los datos usando ValidationService. El Controller crea o modifica un Model. El Controller persiste los cambios usando StorageService. El Controller actualiza la Vista con los nuevos datos. La Vista se re-renderiza mostrando el estado actualizado.

NAVEGACIÓN

Rutas Disponibles:

La ruta raíz con hash slash muestra la página de bienvenida con WelcomeView.
La ruta hash login muestra el inicio de sesión con LoginView.
La ruta hash registro muestra el registro de usuario con RegisterView.
La ruta hash home muestra la página principal con HomeView.
La ruta hash crear-viaje muestra el formulario para crear viaje con CreateTravelView.
La ruta hash mis-viajes muestra el listado de viajes con TravelListView.
La ruta hash viaje seguido del id muestra los detalles del viaje con TravelDetailView.
La ruta hash viaje id nuevo-gasto muestra el formulario de nuevo gasto con ExpenseFormView.
La ruta hash unirse-viaje permite unirse a un viaje existente con JoinTravelView.

Características del Router:

Basado en hash para compatibilidad con hosting estático. Soporte para parámetros dinámicos en rutas. Hooks beforeEach y afterEach para lógica pre/post navegación. Manejo automático de páginas no encontradas (404). Interceptación de enlaces para navegación sin recarga. Navegación dinámica del header según la ruta.

Flujo de Navegación:

Usuario accede a la raíz y ve WelcomeView. Hace clic en Iniciar Sesión y es redirigido a login. Hace clic en Crea una cuenta y es redirigido a registro. Después de login o registro exitoso es redirigido a home. En home tiene disponible la navegación completa.

PERSISTENCIA

Almacenamiento en localStorage:

Todos los datos se almacenan localmente en el navegador usando localStorage bajo la clave travelsplit_viajes. Los datos persisten entre sesiones hasta que el usuario los elimine o limpie el caché del navegador.

Estructura de Datos:

Cada viaje se almacena como un objeto JSON con id que es un código único alfanumérico, nombre como nombre descriptivo del viaje, divisa con el código ISO de la divisa como USD EUR MXN etc, participantes como array de nombres de participantes, gastos como array de objetos gasto con descripción monto pagador y participantes, totalGastado como suma total de todos los gastos y fechaCreacion como timestamp ISO de creación.

Limitaciones:

localStorage tiene un límite aproximado de 5 a 10MB por dominio. El sistema incluye verificaciones para detectar cuando se alcanza este límite y puede limpiar datos antiguos automáticamente si es necesario.

VALIDACIONES

Reglas de Negocio para Autenticación:

Email debe tener formato válido de correo electrónico con el patrón nombre arroba dominio punto extensión. Es un campo obligatorio. Tiene validación en tiempo real con feedback visual.

Contraseña debe tener mínimo 8 caracteres. Debe incluir al menos 1 letra mayúscula de A a Z. Debe incluir al menos 1 letra minúscula de a a z. Debe incluir al menos 1 número de 0 a 9. Tiene validación en tiempo real con indicadores visuales. Proporciona feedback inmediato de requisitos cumplidos con checks verdes.

Reglas de Negocio para Viajes:

Nombre debe tener entre 3 y 50 caracteres. Divisa debe ser una de las soportadas oficialmente. Debe haber al menos 1 participante con un máximo de 50. No puede haber participantes duplicados. El código del viaje debe ser único.

Reglas de Negocio para Gastos:

Descripción debe tener entre 3 y 100 caracteres. Monto debe ser mayor a 0 y menor a 1000000. El pagador debe ser un participante existente del viaje. Debe haber al menos 1 participante incluido en el gasto. La fecha se asigna automáticamente al momento de creación.

Reglas de Negocio para Participantes:

Nombre debe tener entre 2 y 30 caracteres. Solo se permiten letras, espacios y guiones. No se permiten caracteres especiales ni números. Los nombres se normalizan eliminando espacios extras. No se pueden eliminar participantes con gastos asociados.

Feedback Visual de Validaciones:

Bordes verdes indican campo válido. Bordes rojos indican campo con error. Checks verdes indican requisitos de contraseña cumplidos. Círculos grises indican requisitos pendientes. Mensajes de error aparecen debajo de cada campo.