// Rainbow spore drop effect (full spectrum)
function createSporeRain(x, y) {
    const colors = ['#ff0080', '#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600'];
    for (let i = 0; i < 20; i++) {
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
function createMysticSporeRain(x, y) {
    const colors = ['#ff0080', '#8b5cf6', '#a855f7', '#c026d3', '#db2777', '#9333ea'];
    for (let i = 0; i < 20; i++) {
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

// Initialize spore effects on clickable elements
document.addEventListener('DOMContentLoaded', () => {
    // Rainbow spores for navigation and main CTAs
    document.querySelectorAll('.nav-link, .cta-button, .skill-item, .tech-tag, .hamburger').forEach(button => {
        button.addEventListener('click', function(e) {
            createSporeRain(e.pageX, e.pageY);
        });
    });

    // Mystic spores for donate, lost, and special buttons
    document.querySelectorAll('.donate-btn, .lost-btn, .donate-btn-top, .lost-btn-top, .social-link').forEach(button => {
        button.addEventListener('click', function(e) {
            createMysticSporeRain(e.pageX, e.pageY);
        });
    });

    // Rainbow spores for read more and resource buttons
    document.querySelectorAll('.read-more, .resource-btn, .magnetize-btn, .pill-tag').forEach(button => {
        button.addEventListener('click', function(e) {
            createSporeRain(e.pageX, e.pageY);
        });
    });
});
