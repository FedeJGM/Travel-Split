# TravelSplit

Aplicación web para organizar y dividir gastos de viajes entre grupos de amigos y familiares.

![image alt](https://github.com/FedeJGM/Travel-Split/blob/670bc2133fd2c1cffa42c7f753475060b7327be9/assets/img/pag-inicio.png)

TravelSplit es una **Single Page Application (SPA)** construida con JavaScript puro siguiendo el patrón **Model-View-Controller (MVC)**, además este contiene e implementa **Principios del Desarrollo del Software**. Permite crear viajes, registrar gastos compartidos y calcular automáticamente quién debe a quién.

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Arquitectura](#arquitectura)
- [Validaciones](#validaciones)
- [Principios](#principios)
- [Notas](#notas)
- [Autor](#autor)

---

## Características

### Funcionalidades Principales

- **Autenticación**: Registro, login y gestión de usuarios
- **Creación de Viajes**: Viajes con nombre, divisa y participantes personalizables
- **Gestión de Participantes**: Agregar y administrar participantes dinámicamente
- **Registro de Gastos**: Captura de gastos con pagador y participantes
- **Cálculo Automático**: Balances en tiempo real y deuda entre participantes
- **Códigos Únicos**: Comparte viajes mediante códigos alfanuméricos
- **Búsqueda**: Filtra viajes por nombre o código
- **Múltiples Divisas**: USD, EUR, MXN, ARS, COP, CLP, BRL, PEN
- **Persistencia Local**: Datos guardados en localStorage del navegador
- **Validaciones en Tiempo Real**: Feedback visual inmediato en formularios

### Características Técnicas

- Single Page Application (SPA) con routing basado en hash
- Arquitectura MVC pura sin frameworks externos
- ES6 Modules nativos
- localStorage para persistencia
- Responsive design con CSS modular
- Sin dependencias de JavaScript (solo Font Awesome para iconos)

---

## Tecnologías

| Categoría | Detalles |
|-----------|----------|
| **HTML** | HTML5 con estructura semántica |
| **CSS** | CSS3 con variables y diseño modular responsive |
| **JavaScript** | ES6+ con Modules, Classes, Arrow Functions, Destructuring |
| **Fuentes** | Google Fonts - Poppins |
| **Iconos** | Font Awesome 6.5.1 |
| **Storage** | localStorage del navegador |

---

## Requisitos

### Navegadores Soportados

- Chrome / Edge v61+
- Firefox v60+
- Safari v11+
- Opera v48+

### Requisitos del Sistema

- Navegador moderno con soporte ES6 Modules
- JavaScript habilitado
- localStorage habilitado

---

## Instalación
Clona el repositorio:

```bash
git clone https://github.com/FedeJGM/Travel-Split.git

```

### Opción 1: Ejecuta con Live Server (Recomendado)

Este proyecto está diseñado para ejecutarse con **Live Server**, una extensión de Visual Studio Code que crea un servidor local en tiempo real.

#### Instalación de Live Server:

1. Abre **Visual Studio Code**
2. Ve a la sección de **Extensiones**
3. Busca "Live Server" (creador: Ritwick Dey)
4. Haz clic en **Instalar**

#### ¿Cómo usar Live Server?:

1. Abre este proyecto en VS Code
2. Haz clic derecho en el archivo `index.html`
3. Selecciona **"Open with Live Server"**
4. El proyecto se abrirá automáticamente en tu navegador predeterminado
5. Los cambios se recargarán automáticamente al guardar archivos

## Opción 2: Hosting Estático

Despliega en GitHub Pages, Netlify, Vercel o Firebase Hosting

---

## Uso

### Acceder a la Aplicación

1. Visualiza la página de bienvenida
2. Click en "Iniciar Sesión" o "Crear cuenta"
3. Completa registro con email y contraseña válidos
4. Serás redirigido a la página principal

### Crear un Viaje
1. Navega a "Crear Viaje"
2. Ingresa nombre del viaje
3. Selecciona divisa
4. Agrega participantes
5. Click en "Crear Viaje" - recibe código único

### Registrar un Gasto
1. Abre detalles del viaje
2. Click en "Nuevo Gasto"
3. Ingresa descripción y monto
4. Selecciona quién pagó
5. Marca participantes del gasto
6. Guarda el gasto

### Unirse a un Viaje
1. Navega a "Unirse a Viaje"
2. Ingresa código compartido
3. Acceso inmediato a detalles y gastos

### Ver Balances

El sistema muestra automáticamente:

- Total gastado
- Promedio por persona
- Balance individual de cada participante
- Historial completo de gastos

---

## Arquitectura

| Capa | Responsabilidad |
|-------|---------|
| Models | Lógica de negocio y reglas de dominio |
| Views | Presentación y renderizado de UI |
| Controllers | Coordinación entre Models y Views |
| Services | Servicios auxiliares (Storage, Validation) |
| Router | Navegación SPA basada en hash |
| Utils | Utilidades puras (formatters, generators) |

---

## Validaciones

### Autenticación

#### Email

- Formato válido 
- Campo obligatorio
- Validación en tiempo real

#### Contraseña

- Mínimo 8 caracteres
- Al menos 1 mayúscula (A-Z)
- Al menos 1 minúscula (a-z)
- Al menos 1 número (0-9)
- Validación en tiempo real con feedback visual

#### Viajes
- Nombre: 3-50 caracteres
- Divisa: Una de las soportadas
- Participantes: 1-50, sin duplicados
- Código: Único alfanumérico

#### Gastos
- Descripción: 3-100 caracteres
- Monto: Mayor a 0 y menor a 1,000,000 
- Pagador: Debe ser participante existente
- Participantes: Mínimo 1

#### Participantes
- Nombre: 2-30 caracteres
- Permitidos: Letras, espacios, guiones
- Prohibidos: Números, caracteres especiales
- Normalización: Espacios extras eliminados
- No eliminables si tienen gastos asociados

#### Feedback Visual
- Borde verde: Campo válido
- Borde rojo: Campo con error
- Check verde: Requisito cumplido
- Círculo gris: Requisito pendiente
- Mensajes de error debajo de campos

---

## Principios

Los principios del Desarrollo del Software aplicados a este proyecto son:

### SOLID

- S - Single Responsibility: Cada clase una única responsabilidad
- O - Open/Closed: Abierto a extensión, cerrado a modificación
- L - Liskov Substitution: Vistas heredan de BaseView correctamente
- I - Interface Segregation: Interfaces específicas y enfocadas
- D - Dependency Inversion: Dependencia de abstracciones

### DRY

Código reutilizable en utils y components

### KISS

Implementaciones simples y claras

### SoC 

Separación clara de responsabilidades

### Cohesión 

Alta - componentes relacionados

### Acoplamiento

Bajo - mínima dependencia entre módulos

---

## Notas

### Almacenamiento

Todos los datos se almacenan en **localStorage** bajo la clave **travelsplit_viajes**. Los datos persisten entre sesiones hasta que el usuario los elimine o limpie el caché.

### Limitaciones

LocalStorage tiene límite de 5-10MB por dominio. El sistema incluye verificaciones para detectar límites y limpiar datos antiguos si es necesario.

---

## Autor

FedeJGM 

---
