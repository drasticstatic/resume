// Unified spore drop effect
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

// Initialize spore effects on clickable elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link, .cta-button, .skill-item, .tech-tag').forEach(button => {
        button.addEventListener('click', function(e) {
            createSporeRain(e.pageX, e.pageY);
        });
    });
});
