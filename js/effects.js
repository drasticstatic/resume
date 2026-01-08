// Tech Cursor
function initTechCursor() {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'tech-cursor-dot';
    ring.className = 'tech-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        ring.style.left = ringX - 20 + 'px';
        ring.style.top = ringY - 20 + 'px';

        requestAnimationFrame(animate);
    }
    animate();
}

// Magnetize Button Effect
function initMagnetizeButtons() {
    document.querySelectorAll('.magnetize-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Typewriter Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Pulse Beams
function createPulseBeams(container, count = 5) {
    for (let i = 0; i < count; i++) {
        const beam = document.createElement('div');
        beam.className = 'pulse-beam';
        beam.style.left = `${(i + 1) * (100 / (count + 1))}%`;
        beam.style.animationDelay = `${i * 0.5}s`;
        container.appendChild(beam);
    }
}

// JavaScript Tooltips for better cross-browser support
function initTooltips() {
    // Create tooltip element
    let tooltip = document.getElementById('js-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'js-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(10, 10, 15, 0.95);
            border: 1px solid rgba(0, 255, 255, 0.6);
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 0.85rem;
            color: #00ffff;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            pointer-events: none;
            z-index: 100000;
            box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
            font-family: 'JetBrains Mono', monospace;
        `;
        document.body.appendChild(tooltip);
    }

    // Add tooltip to all elements with data-tooltip
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const text = el.getAttribute('data-tooltip');
            if (!text) return;

            tooltip.textContent = text;
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';

            // Position tooltip above element
            const rect = el.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top - tooltipRect.height - 10;

            // Keep tooltip on screen
            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < 10) {
                top = rect.bottom + 10; // Show below instead
            }

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
        });

        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });

        el.addEventListener('mousemove', (e) => {
            // Update position on mouse move for smooth following
            const rect = el.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top - tooltipRect.height - 10;

            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < 10) {
                top = rect.bottom + 10;
            }

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    initTechCursor();
    initMagnetizeButtons();
    initTooltips();

    // Add floating effect to cards
    document.querySelectorAll('.project-card, .contact-card, .path-card').forEach((card, i) => {
        card.classList.add('floating-card');
        card.style.animationDelay = `${i * 0.2}s`;
    });

    // Add liquid glass to modals
    document.querySelectorAll('.modal-content').forEach(modal => {
        modal.classList.add('liquid-glass');
    });
});
