// Web3 & Psychedelic Interactive Effects

class PsychedelicEffects {
    constructor() {
        this.init();
        this.createParticles();
        this.addInteractiveEffects();
    }

    init() {
        // Add mouse trail effect
        this.addMouseTrail();
        
        // Add scroll-triggered animations
        this.addScrollEffects();
        
        // Add random color shifts
        this.addColorShifts();
    }

    addMouseTrail() {
        let mouseTrail = [];
        const maxTrail = 20;

        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });

            if (mouseTrail.length > maxTrail) {
                mouseTrail.shift();
            }

            this.updateTrail(mouseTrail);
        });
    }

    updateTrail(trail) {
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());

        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${10 - index * 0.5}px;
                height: ${10 - index * 0.5}px;
                background: radial-gradient(circle, 
                    hsl(${(Date.now() / 10) % 360}, 100%, 50%) 0%, 
                    transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - index * 0.05};
                animation: fade-out 1s ease-out forwards;
            `;
            document.body.appendChild(trailElement);

            setTimeout(() => trailElement.remove(), 1000);
        });
    }

    addScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'breathe 3s ease-in-out infinite';
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .experience-card, .achievement-item').forEach(el => {
            observer.observe(el);
        });
    }

    addColorShifts() {
        setInterval(() => {
            const hue = Math.random() * 360;
            document.documentElement.style.setProperty('--random-hue', `${hue}deg`);
        }, 3000);
    }

    createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const hue = Math.random() * 360;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: hsl(${hue}, 100%, 50%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${duration}s linear infinite ${delay}s;
            opacity: 0.6;
            box-shadow: 0 0 ${size * 2}px hsl(${hue}, 100%, 50%);
        `;

        container.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            this.createParticle(container);
        }, (duration + delay) * 1000);
    }

    addInteractiveEffects() {
        // Add click ripple effect
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });

        // Add hover effects for cards
        document.querySelectorAll('.card, .skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(150%)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.filter = 'none';
            });
        });
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(255, 0, 128, 0.3) 0%, 
                rgba(0, 255, 255, 0.2) 50%, 
                transparent 100%);
            pointer-events: none;
            z-index: 9999;
            animation: ripple-expand 1s ease-out forwards;
        `;
        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 1000);
    }
}

// Web3 Connection Simulator
class Web3Simulator {
    constructor() {
        this.addWeb3Indicators();
        this.simulateBlockchainActivity();
    }

    addWeb3Indicators() {
        const indicator = document.createElement('div');
        indicator.className = 'web3-indicator';
        indicator.innerHTML = `
            <div class="blockchain-status">
                <span class="status-dot"></span>
                <span class="status-text">Connected to Ethereum</span>
            </div>
            <div class="wallet-address">0x...${Math.random().toString(16).substr(2, 4)}</div>
        `;
        indicator.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(42, 42, 42, 0.9);
            border: 1px solid var(--neon-cyan);
            border-radius: 12px;
            padding: 12px;
            font-size: 12px;
            color: var(--neon-cyan);
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        `;
        document.body.appendChild(indicator);

        // Animate status dot
        const statusDot = indicator.querySelector('.status-dot');
        statusDot.style.cssText = `
            display: inline-block;
            width: 8px;
            height: 8px;
            background: var(--neon-green);
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse-glow 2s ease-in-out infinite;
        `;
    }

    simulateBlockchainActivity() {
        setInterval(() => {
            this.showTransactionNotification();
        }, 8000);
    }

    showTransactionNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div class="tx-hash">Tx: 0x${Math.random().toString(16).substr(2, 8)}...</div>
            <div class="tx-status">✅ Confirmed</div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 180px;
            right: 20px;
            background: rgba(42, 42, 42, 0.95);
            border: 1px solid var(--neon-green);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 11px;
            color: var(--neon-green);
            z-index: 1000;
            backdrop-filter: blur(10px);
            animation: slide-in-right 0.5s ease-out;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slide-out-right 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-out {
        to { opacity: 0; transform: scale(0); }
    }
    
    @keyframes float-particle {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }
    
    @keyframes ripple-expand {
        to { 
            width: 200px; 
            height: 200px; 
            margin-left: -100px; 
            margin-top: -100px; 
            opacity: 0; 
        }
    }
    
    @keyframes slide-in-right {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slide-out-right {
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .in-view {
        animation-delay: 0s !important;
    }
`;
document.head.appendChild(style);

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PsychedelicEffects();
    new Web3Simulator();
    
    // Add some fun console messages
    console.log('%c🍄 Welcome to the Mycelial Web! 🍄', 'color: #ff0080; font-size: 20px; font-weight: bold;');
    console.log('%c⚡ Sacred Technology Activated ⚡', 'color: #00ffff; font-size: 16px;');
    console.log('%c🌈 Psychedelic Mode: ON 🌈', 'color: #39ff14; font-size: 14px;');
});