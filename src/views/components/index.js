/**
 * Components - Exportador central de componentes
 * 
 * Principios aplicados:
 * - SoC: Punto único de acceso a componentes
 * - DRY: Importación centralizada
 * - Encapsulamiento: Abstracción de componentes internos
 */

// Exportar todos los componentes
export { TravelCardView } from './TravelCardView.js';
export { ExpenseItemView } from './ExpenseItemView.js';
export { ParticipantTagView } from './ParticipantTagView.js';
export { LoaderView } from './LoaderView.js';

/**
 * Uso recomendado:
 * 
 * // En vistas que necesiten componentes
 * import { TravelCardView, LoaderView } from './components/index.js';
 * 
 * // Usar componentes
 * const cardHTML = TravelCardView.render(viaje);
 * const loaderHTML = LoaderView.render('Cargando viajes...');
 */
 
