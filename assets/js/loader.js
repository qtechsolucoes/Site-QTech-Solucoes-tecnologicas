// assets/js/loader.js
import { elements } from './domElements.js'; // Importa se usar domElements.js

export function initLoader() {
    const logoImagePath = "assets/images/logo_image.png";

    if (elements.loaderLogo) elements.loaderLogo.src = logoImagePath;
    if (elements.headerLogo) elements.headerLogo.src = logoImagePath;

    if (elements.loaderScreen) {
        setTimeout(() => {
            elements.loaderScreen.style.opacity = '0';
            elements.loaderScreen.addEventListener('transitionend', () => {
                elements.loaderScreen.style.display = 'none';
            }, { once: true });
        }, 2000);
    }
}