// assets/js/scrollProgress.js
import { elements } from './domElements.js'; // Importa se usar domElements.js

export function initScrollFeatures() {
    // Scroll Progress Bar
    if (elements.scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = document.documentElement.scrollTop;
            const percentage = (scrolled / totalHeight) * 100;
            elements.scrollProgressBar.style.width = `${percentage}%`;
        });
    }

    // Back to Top Button
    if (elements.backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                elements.backToTopBtn.classList.remove('hidden');
                setTimeout(() => elements.backToTopBtn.classList.remove('opacity-0', 'translate-y-20'), 10);
            } else {
                elements.backToTopBtn.classList.add('opacity-0', 'translate-y-20');
                elements.backToTopBtn.addEventListener('transitionend', () => elements.backToTopBtn.classList.add('hidden'), { once: true });
            }
        });

        elements.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Adicionado smooth scroll
        });
    }
}