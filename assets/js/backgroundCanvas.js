// assets/js/backgroundCanvas.js
import { elements } from './domElements.js'; // Importa se usar domElements.js

export function initBackgroundCanvas() {
    if (elements.backgroundCanvas) {
        const ctx = elements.backgroundCanvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            elements.backgroundCanvas.width = window.innerWidth * dpr;
            elements.backgroundCanvas.height = window.innerHeight * dpr;
            elements.backgroundCanvas.style.width = `${window.innerWidth}px`;
            elements.backgroundCanvas.style.height = `${window.innerHeight}px`;
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
}