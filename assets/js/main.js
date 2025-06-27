// assets/js/main.js
// Este é o arquivo que você vai referenciar no seu index.html

import { elements } from './domElements.js'; // Opcional, se usar domElements.js
import { initLoader } from './loader.js';
import { initNavigation } from './navigation.js';
import { initScrollFeatures } from './scrollProgress.js';
import { initContactForm } from './contactForm.js';
import { initBackgroundCanvas } from './backgroundCanvas.js';
import { initScrollAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Definir o ano atual no rodapé
    if (elements.currentYearSpan) {
        elements.currentYearSpan.textContent = new Date().getFullYear();
    }

    // Inicializar todos os módulos
    initLoader();
    initNavigation();
    initScrollFeatures();
    initContactForm();
    initBackgroundCanvas();
    initScrollAnimations();
});