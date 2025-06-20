// Aguarda o carregamento completo do conteúdo da página antes de executar os scripts.
document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAÇÃO E CONFIGURAÇÕES GERAIS ---
    
    // Define o ano atual no rodapé.
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Referências para os elementos do logo.
    const loaderLogo = document.getElementById('loader-logo');
    const headerLogo = document.getElementById('header-logo');
    const logoImagePath = "assets/images/logo_image.png";

    // Define a imagem do logo no loader e no cabeçalho.
    if (loaderLogo) loaderLogo.src = logoImagePath;
    if (headerLogo) headerLogo.src = logoImagePath;


    // --- LÓGICA DA TELA DE CARREGAMENTO (LOADER) ---
    
    const loaderScreen = document.getElementById('loader-screen');
    
    setTimeout(() => {
        if (loaderScreen) {
            loaderScreen.style.opacity = '0';
            loaderScreen.addEventListener('transitionend', () => {
                loaderScreen.style.display = 'none';
            }, { once: true });
        }
    }, 2000);
    
    
    // --- MENU DE NAVEGAÇÃO MOBILE ---

    const menuToggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const xIcon = document.getElementById('x-icon');
    let isMenuOpen = false;

    menuToggleBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.style.height = mobileMenu.scrollHeight + 'px';
            mobileMenu.style.opacity = '1';
            menuIcon.classList.add('hidden');
            xIcon.classList.remove('hidden');
        } else {
            mobileMenu.style.height = '0';
            mobileMenu.style.opacity = '0';
            menuIcon.classList.remove('hidden');
            xIcon.classList.add('hidden');
        }
    });
    
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.style.height = '0';
            mobileMenu.style.opacity = '0';
            menuIcon.classList.remove('hidden');
            xIcon.classList.add('hidden');
        });
    });

    
    // --- BARRA DE PROGRESSO DE SCROLL ---

    const scrollProgressBar = document.querySelector('#scroll-progress-bar > div');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = document.documentElement.scrollTop;
        const percentage = (scrolled / totalHeight) * 100;
        if(scrollProgressBar) scrollProgressBar.style.width = `${percentage}%`;
    });

    
    // --- BOTÃO 'VOLTAR AO TOPO' ---

    const backToTopBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
            setTimeout(() => backToTopBtn.classList.remove('opacity-0', 'translate-y-20'), 10);
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-20');
            backToTopBtn.addEventListener('transitionend', () => backToTopBtn.classList.add('hidden'), { once: true });
        }
    });

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
});
    
    // --- FORMULÁRIO DE CONTATO ---

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitStatusDiv = document.getElementById('submit-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg class="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 12c0 2.127.8 4.07 2.189 5.56l-.582.582m-4.407-4.407a8.001 8.001 0 0115.356-2A8.001 8.001 0 004 12c0 2.127.8 4.07 2.189 5.56l-.582.582"/></svg> Enviando...';
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                submitStatusDiv.textContent = 'Mensagem enviada com sucesso!';
                submitStatusDiv.className = 'mt-4 p-3 rounded-lg text-center bg-green-700';
                contactForm.reset();
            } catch (error) {
                submitStatusDiv.textContent = 'Erro ao enviar. Tente novamente.';
                submitStatusDiv.className = 'mt-4 p-3 rounded-lg text-center bg-red-700';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
                setTimeout(() => submitStatusDiv.className = 'hidden', 5000);
            }
        });
    }

    
    // --- ANIMAÇÕES AO ROLAR A PÁGINA (INTERSECTION OBSERVER) ---

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
    document.querySelectorAll('.animated-section, .animated-heading, .animated-card').forEach(el => observer.observe(el));
    
    // --- ANIMAÇÃO DE PARTÍCULAS EM CANVAS NO FUNDO ---
    
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        }

        const particleConfig = {
            count: window.innerWidth < 768 ? 40 : 80,
            speed: 0.3,
            minRadius: 0.5,
            maxRadius: 1.5,
            lineDistance: 120,
            particleColor: 'rgba(34, 197, 94, 0.7)',
        };

        class Particle {
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.vx = (Math.random() - 0.5) * particleConfig.speed;
                this.vy = (Math.random() - 0.5) * particleConfig.speed;
                this.radius = particleConfig.minRadius + Math.random() * (particleConfig.maxRadius - particleConfig.minRadius);
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
                if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = particleConfig.particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = particleConfig.count;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const distance = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
                    if (distance < particleConfig.lineDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = 1 - (distance / particleConfig.lineDistance);
                        ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 250);
        });

        resizeCanvas();
        initParticles();
        animate();
    }
});