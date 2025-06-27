// assets/js/animations.js

export function initScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleciona todos os elementos com as classes de animação e observa-os
    document.querySelectorAll('.animated-section, .animated-heading, .animated-card').forEach(el => observer.observe(el));
}