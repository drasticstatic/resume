// Rainbow spore drop effect (full spectrum)
function createRainbowSpores(x, y) {
    const colors = ['#ff0080', '#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600'];
    for (let i = 0; i < 15; i++) {
        const spore = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 6 + Math.random() * 6;
        const offsetX = (Math.random() - 0.5) * 250;
        const offsetY = (Math.random() - 0.5) * 250;
        const duration = 1.5 + Math.random() * 1;

        spore.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: sporeExplode ${duration}s ease-out forwards;
            --offset-x: ${offsetX}px;
            --offset-y: ${offsetY}px;
        `;

        document.body.appendChild(spore);
        setTimeout(() => spore.remove(), duration * 1000);
    }
}

// Mystic spore drop effect (red/purple/magenta variant)
function createMysticSpores(x, y) {
    const colors = ['#ff0080', '#8b5cf6', '#a855f7', '#c026d3', '#db2777', '#9333ea'];
    for (let i = 0; i < 15; i++) {
        const spore = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 5;
        const offsetX = (Math.random() - 0.5) * 200;
        const offsetY = (Math.random() - 0.5) * 200;
        const duration = 1.8 + Math.random() * 0.8;

        spore.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 ${size * 3}px ${color};
            animation: sporeExplode ${duration}s ease-out forwards;
            --offset-x: ${offsetX}px;
            --offset-y: ${offsetY}px;
        `;

        document.body.appendChild(spore);
        setTimeout(() => spore.remove(), duration * 1000);
    }
}

// Combined spore rain effect - BOTH rainbow and mystic spores together
function createSporeRain(x, y) {
    createRainbowSpores(x, y);
    createMysticSpores(x, y);
}

// Inject spore animation CSS
const sporeStyles = document.createElement('style');
sporeStyles.textContent = `
    @keyframes sporeExplode {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--offset-x), calc(var(--offset-y) + 300px)) scale(0.3) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sporeStyles);

// Legacy function names for backwards compatibility
function createMysticSporeRain(x, y) {
    createSporeRain(x, y);
}

// Initialize spore effects on clickable elements
document.addEventListener('DOMContentLoaded', () => {
    // All interactive elements get both spore types
    const allSelectors = [
        '.nav-link', '.cta-button', '.skill-item', '.tech-tag', '.hamburger',
        '.read-more', '.resource-btn', '.magnetize-btn', '.pill-tag',
        '.btn-primary', '.btn-secondary', '.card-button--site', '.card-button--code',
        '.insight-node', '.post-card', '.project-card button', '.project-actions button',
        '.project-actions a', '.submit-btn', '.subscribe-btn', '.tag', '.soft-tag',
        '.glossary-term', '.timeline-card', '.bento-item button',
        '.donate-btn', '.lost-btn', '.donate-btn-top', '.lost-btn-top',
        '.social-link', '.social-circle', '.payment-btn', '.wallet-connect-btn',
        '.contact-btn', '.close', 'button', 'a[href]'
    ];

    document.querySelectorAll(allSelectors.join(', ')).forEach(element => {
        element.addEventListener('click', function(e) {
            createSporeRain(e.pageX, e.pageY);
        });
    });
});
