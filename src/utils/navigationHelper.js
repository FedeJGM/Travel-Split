/**
 * navigationHelper - Ayuda con la navegación dinámica del header
 */

export function updateHeaderNavigation() {
    const nav = document.getElementById('main-nav');
    const currentPath = window.location.hash.slice(1) || '/';

    if (!nav) return;

    // Si estamos en la página de bienvenida, mostrar solo login
    if (currentPath === '/') {
        nav.innerHTML = `
            <button class="btn btn-login" onclick="window.location.hash='/login'">
                <i class="fas fa-sign-in-alt"></i>
                Iniciar Sesión
            </button>
        `;
    } 
    // Si estamos en login o registro, ocultar navegación
    else if (currentPath === '/login' || currentPath === '/registro') {
        nav.innerHTML = '';
    } 
    // En cualquier otra página, mostrar navegación completa
    else {
        nav.innerHTML = `
            <a href="#/home" class="btn btn-outline">
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
        `;
    }
}

// Escuchar cambios de ruta
window.addEventListener('hashchange', updateHeaderNavigation);
window.addEventListener('load', updateHeaderNavigation);
