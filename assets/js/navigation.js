// assets/js/navigation.js
import { elements } from './domElements.js'; // Importa se usar domElements.js

export function initNavigation() {
    let isMenuOpen = false;

    if (elements.menuToggleBtn && elements.mobileMenu) {
        elements.menuToggleBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                elements.mobileMenu.style.height = elements.mobileMenu.scrollHeight + 'px';
                elements.mobileMenu.style.opacity = '1';
                elements.menuIcon.classList.add('hidden');
                elements.xIcon.classList.remove('hidden');
            } else {
                elements.mobileMenu.style.height = '0';
                elements.mobileMenu.style.opacity = '0';
                elements.menuIcon.classList.remove('hidden');
                elements.xIcon.classList.add('hidden');
            }
        });

        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                isMenuOpen = false;
                elements.mobileMenu.style.height = '0';
                elements.mobileMenu.style.opacity = '0';
                elements.menuIcon.classList.remove('hidden');
                elements.xIcon.classList.add('hidden');
            });
        });
    }
}