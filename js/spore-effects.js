// Rainbow spore drop effect (full spectrum)
function createRainbowSpores(x, y) {
    const colors = ['#ff0080', '#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600'];
    for (let i = 0; i < 12; i++) {
        const spore = document.createElement('div');
        spore.className = 'rainbow-spore';
        spore.style.left = x + 'px';
        spore.style.top = y + 'px';
        spore.style.color = colors[Math.floor(Math.random() * colors.length)];

        const offsetX = (Math.random() - 0.5) * 200;
        const offsetY = (Math.random() - 0.5) * 200;
        spore.style.setProperty('--offset-x', offsetX + 'px');
        spore.style.setProperty('--offset-y', offsetY + 'px');
        spore.style.animation = 'sporeExplode 2s ease-out forwards';

        document.body.appendChild(spore);
        setTimeout(() => spore.remove(), 2000);
    }
}

// Mystic spore drop effect (red/purple/magenta variant)
function createMysticSpores(x, y) {
    const colors = ['#ff0080', '#8b5cf6', '#a855f7', '#c026d3', '#db2777', '#9333ea'];
    for (let i = 0; i < 12; i++) {
        const spore = document.createElement('div');
        spore.className = 'rainbow-spore mystic-spore';
        spore.style.left = x + 'px';
        spore.style.top = y + 'px';
        spore.style.color = colors[Math.floor(Math.random() * colors.length)];

        const offsetX = (Math.random() - 0.5) * 180;
        const offsetY = (Math.random() - 0.5) * 180;
        spore.style.setProperty('--offset-x', offsetX + 'px');
        spore.style.setProperty('--offset-y', offsetY + 'px');
        spore.style.animation = 'sporeExplode 2s ease-out forwards';

        document.body.appendChild(spore);
        setTimeout(() => spore.remove(), 2000);
    }
}

// Combined spore rain effect - BOTH rainbow and mystic spores together
function createSporeRain(x, y) {
    createRainbowSpores(x, y);
    createMysticSpores(x, y);
}

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
