// 3D Mycelial Blockchain Network Effect
// Lightweight canvas-based network visualization

class MycelialNetwork3D {
    constructor(containerId = 'network-canvas') {
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;

        this.canvas = document.createElement('canvas');
        this.canvas.id = containerId;
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.5;
        `;
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        // Create network nodes
        const nodeCount = Math.min(40, Math.floor(window.innerWidth / 40));
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 200 - 100,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                vz: (Math.random() - 0.5) * 0.2,
                radius: 2 + Math.random() * 3,
                hue: Math.random() * 60 + 160, // Cyan to purple range
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    update() {
        const time = Date.now() * 0.001;

        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            node.z += node.vz;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            if (node.z < -100 || node.z > 100) node.vz *= -1;

            // Mouse attraction
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200 && dist > 0) {
                node.vx += dx / dist * 0.02;
                node.vy += dy / dist * 0.02;
            }

            // Update pulse
            node.pulse += 0.02;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i];
                const b = this.nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dz = a.z - b.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < 150) {
                    const alpha = (1 - dist / 150) * 0.5;
                    const hue = (a.hue + b.hue) / 2;

                    this.ctx.beginPath();
                    this.ctx.moveTo(a.x, a.y);
                    this.ctx.lineTo(b.x, b.y);
                    this.ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
                    this.ctx.lineWidth = 0.5 + (1 - dist / 150);
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        this.nodes.forEach(node => {
            const scale = (node.z + 100) / 200;
            const radius = node.radius * (0.5 + scale * 0.5);
            const pulseRadius = radius + Math.sin(node.pulse) * 2;

            // Glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, pulseRadius * 3
            );
            gradient.addColorStop(0, `hsla(${node.hue}, 80%, 60%, 0.8)`);
            gradient.addColorStop(0.5, `hsla(${node.hue}, 80%, 60%, 0.2)`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseRadius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${node.hue}, 80%, 70%, 0.9)`;
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    mount(container = document.body) {
        container.insertBefore(this.canvas, container.firstChild);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.canvas.remove();
    }
}

// Initialize on DOM load if not on mobile
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        window.mycelialNetwork = new MycelialNetwork3D();
        window.mycelialNetwork.mount();
    }
});

