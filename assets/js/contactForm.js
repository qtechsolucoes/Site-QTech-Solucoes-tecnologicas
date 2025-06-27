// assets/js/contactForm.js
import { elements } from './domElements.js'; // Importa se usar domElements.js

export function initContactForm() {
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            elements.submitBtn.disabled = true;
            elements.submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...';

            try {
                // Simulação de envio. Em um site real com Netlify, você não precisaria disso.
                // O Netlify processa o 'data-netlify="true"' diretamente.
                // Esta parte seria removida ou substituída por uma chamada de API real.
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay de rede

                elements.submitStatusDiv.textContent = 'Mensagem enviada com sucesso!';
                elements.submitStatusDiv.className = 'mt-4 p-3 rounded-lg text-center bg-green-700';
                elements.contactForm.reset();
            } catch (error) {
                elements.submitStatusDiv.textContent = 'Erro ao enviar. Tente novamente.';
                elements.submitStatusDiv.className = 'mt-4 p-3 rounded-lg text-center bg-red-700';
            } finally {
                elements.submitBtn.disabled = false;
                elements.submitBtn.innerHTML = 'Enviar Mensagem'; // Use innerHTML para restaurar o SVG se necessário
                elements.submitStatusDiv.classList.remove('hidden'); // Certifica que está visível antes do timeout
                setTimeout(() => elements.submitStatusDiv.classList.add('hidden'), 5000);
            }
        });
    }
}