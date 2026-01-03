// Hero SVG animations for each page
// Creates contextual animated SVGs based on page type

const HeroSVG = {
    // Portfolio SVG - Code/Projects theme
    portfolio: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#ff0080;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Code brackets -->
            <text x="30" y="60" fill="url(#codeGrad)" font-size="40" font-family="monospace" class="svg-pulse">&lt;/&gt;</text>
            <!-- Gear -->
            <circle cx="200" cy="80" r="30" fill="none" stroke="url(#codeGrad)" stroke-width="2" class="svg-rotate"/>
            <circle cx="200" cy="80" r="15" fill="none" stroke="url(#codeGrad)" stroke-width="2"/>
            <!-- Connection lines -->
            <line x1="80" y1="60" x2="170" y2="80" stroke="url(#codeGrad)" stroke-width="1" stroke-dasharray="5,5" class="svg-dash"/>
            <!-- Binary -->
            <text x="50" y="140" fill="rgba(0,255,255,0.5)" font-size="12" font-family="monospace" class="svg-blink">01101001</text>
            <text x="150" y="160" fill="rgba(255,0,128,0.5)" font-size="12" font-family="monospace" class="svg-blink" style="animation-delay: 0.5s;">10110110</text>
        </svg>
    `,

    // Resources SVG - Books/Learning theme
    resources: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8a2be2;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Book stack -->
            <rect x="60" y="100" width="80" height="15" rx="2" fill="url(#bookGrad)" class="svg-pulse"/>
            <rect x="55" y="80" width="90" height="15" rx="2" fill="url(#bookGrad)" class="svg-pulse" style="animation-delay: 0.2s;"/>
            <rect x="50" y="60" width="100" height="15" rx="2" fill="url(#bookGrad)" class="svg-pulse" style="animation-delay: 0.4s;"/>
            <!-- Open book -->
            <path d="M180 70 Q200 60 220 70 L220 130 Q200 120 180 130 Z" fill="none" stroke="url(#bookGrad)" stroke-width="2" class="svg-pulse"/>
            <path d="M220 70 Q240 60 260 70 L260 130 Q240 120 220 130 Z" fill="none" stroke="url(#bookGrad)" stroke-width="2" class="svg-pulse"/>
            <!-- Sparkles -->
            <circle cx="240" cy="50" r="3" fill="#ffff00" class="svg-sparkle"/>
            <circle cx="260" cy="65" r="2" fill="#00ffff" class="svg-sparkle" style="animation-delay: 0.3s;"/>
            <circle cx="170" cy="55" r="2" fill="#ff0080" class="svg-sparkle" style="animation-delay: 0.6s;"/>
        </svg>
    `,

    // Contact SVG - Communication theme
    contact: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00ff88;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Envelope -->
            <rect x="50" y="60" width="100" height="70" rx="5" fill="none" stroke="url(#contactGrad)" stroke-width="2" class="svg-pulse"/>
            <polyline points="50,60 100,100 150,60" fill="none" stroke="url(#contactGrad)" stroke-width="2"/>
            <!-- Phone -->
            <rect x="180" y="50" width="50" height="90" rx="8" fill="none" stroke="url(#contactGrad)" stroke-width="2" class="svg-pulse" style="animation-delay: 0.3s;"/>
            <circle cx="205" cy="125" r="8" fill="none" stroke="url(#contactGrad)" stroke-width="1"/>
            <!-- Signal waves -->
            <path d="M240 70 Q260 60 240 50" fill="none" stroke="url(#contactGrad)" stroke-width="2" class="svg-wave"/>
            <path d="M250 80 Q280 65 250 40" fill="none" stroke="url(#contactGrad)" stroke-width="2" class="svg-wave" style="animation-delay: 0.2s;"/>
            <!-- @ symbol -->
            <text x="80" y="110" fill="url(#contactGrad)" font-size="24" class="svg-blink">@</text>
        </svg>
    `,

    // About SVG - Person/Journey theme
    about: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff0080;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#8a2be2;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Person silhouette -->
            <circle cx="100" cy="50" r="25" fill="none" stroke="url(#aboutGrad)" stroke-width="2" class="svg-pulse"/>
            <path d="M60 130 Q100 80 140 130" fill="none" stroke="url(#aboutGrad)" stroke-width="2"/>
            <!-- Journey path -->
            <path d="M160 100 Q200 60 240 100 Q280 140 240 180" fill="none" stroke="url(#aboutGrad)" stroke-width="2" stroke-dasharray="8,4" class="svg-dash"/>
            <!-- Stars -->
            <polygon points="220,50 223,58 232,58 225,63 228,72 220,67 212,72 215,63 208,58 217,58" fill="#ffff00" class="svg-sparkle"/>
            <polygon points="180,30 182,35 188,35 183,38 185,44 180,41 175,44 177,38 172,35 178,35" fill="#00ffff" class="svg-sparkle" style="animation-delay: 0.4s;"/>
        </svg>
    `,

    // Blog SVG - Writing/Ideas theme
    blog: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="blogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff6600;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#ff0080;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Quill pen -->
            <path d="M80 140 L120 40 L130 50 L90 150 Z" fill="none" stroke="url(#blogGrad)" stroke-width="2" class="svg-pulse"/>
            <path d="M120 40 Q140 30 150 50" fill="none" stroke="url(#blogGrad)" stroke-width="2"/>
            <!-- Paper/document -->
            <rect x="160" y="50" width="80" height="100" rx="5" fill="none" stroke="url(#blogGrad)" stroke-width="2" class="svg-pulse" style="animation-delay: 0.3s;"/>
            <line x1="175" y1="70" x2="225" y2="70" stroke="url(#blogGrad)" stroke-width="1"/>
            <line x1="175" y1="90" x2="225" y2="90" stroke="url(#blogGrad)" stroke-width="1"/>
            <line x1="175" y1="110" x2="210" y2="110" stroke="url(#blogGrad)" stroke-width="1"/>
            <!-- Thought bubbles -->
            <circle cx="50" cy="50" r="15" fill="none" stroke="url(#blogGrad)" stroke-width="1" class="svg-sparkle"/>
            <circle cx="30" cy="70" r="8" fill="none" stroke="url(#blogGrad)" stroke-width="1" class="svg-sparkle" style="animation-delay: 0.2s;"/>
            <circle cx="270" cy="40" r="10" fill="none" stroke="url(#blogGrad)" stroke-width="1" class="svg-sparkle" style="animation-delay: 0.4s;"/>
        </svg>
    `,

    // Glossary SVG - Dictionary/Knowledge theme
    glossary: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="glossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#8a2be2;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Open dictionary -->
            <path d="M50 60 L50 160 Q100 140 150 160 L150 60 Q100 80 50 60" fill="none" stroke="url(#glossGrad)" stroke-width="2" class="svg-pulse"/>
            <path d="M150 60 L150 160 Q200 140 250 160 L250 60 Q200 80 150 60" fill="none" stroke="url(#glossGrad)" stroke-width="2" class="svg-pulse"/>
            <!-- ABC letters -->
            <text x="70" y="100" fill="url(#glossGrad)" font-size="20" font-family="serif" class="svg-blink">A</text>
            <text x="100" y="130" fill="url(#glossGrad)" font-size="16" font-family="serif" class="svg-blink" style="animation-delay: 0.2s;">B</text>
            <text x="180" y="100" fill="url(#glossGrad)" font-size="18" font-family="serif" class="svg-blink" style="animation-delay: 0.4s;">Z</text>
            <!-- Magnifying glass -->
            <circle cx="230" cy="50" r="15" fill="none" stroke="url(#glossGrad)" stroke-width="2" class="svg-pulse"/>
            <line x1="240" y1="60" x2="255" y2="75" stroke="url(#glossGrad)" stroke-width="3"/>
        </svg>
    `,

    // 404 SVG - Lost/Compass theme
    lost: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8a2be2;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#ff0080;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <!-- Compass -->
            <circle cx="150" cy="100" r="50" fill="none" stroke="url(#lostGrad)" stroke-width="2" class="svg-pulse"/>
            <circle cx="150" cy="100" r="40" fill="none" stroke="url(#lostGrad)" stroke-width="1"/>
            <!-- Compass needle -->
            <polygon points="150,55 145,100 150,105 155,100" fill="#ff0080" class="svg-rotate-slow"/>
            <polygon points="150,145 145,100 150,95 155,100" fill="#00ffff" class="svg-rotate-slow"/>
            <!-- N E S W -->
            <text x="145" y="45" fill="url(#lostGrad)" font-size="12" font-weight="bold">N</text>
            <text x="205" y="105" fill="url(#lostGrad)" font-size="10">E</text>
            <text x="145" y="165" fill="url(#lostGrad)" font-size="10">S</text>
            <text x="85" y="105" fill="url(#lostGrad)" font-size="10">W</text>
            <!-- Question marks -->
            <text x="50" y="60" fill="url(#lostGrad)" font-size="24" class="svg-blink">?</text>
            <text x="240" y="80" fill="url(#lostGrad)" font-size="18" class="svg-blink" style="animation-delay: 0.3s;">?</text>
            <text x="30" y="150" fill="url(#lostGrad)" font-size="16" class="svg-blink" style="animation-delay: 0.6s;">?</text>
        </svg>
    `,

    // Home SVG - Mycelial network theme
    home: `
        <svg class="hero-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff0080;stop-opacity:0.6" />
                    <stop offset="50%" style="stop-color:#00ffff;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#8a2be2;stop-opacity:0.6" />
                </linearGradient>
            </defs>
            <!-- Mycelial network nodes -->
            <circle cx="150" cy="100" r="10" fill="url(#homeGrad)" class="svg-pulse"/>
            <circle cx="80" cy="60" r="6" fill="#ff0080" class="svg-sparkle"/>
            <circle cx="220" cy="70" r="8" fill="#00ffff" class="svg-sparkle" style="animation-delay: 0.2s;"/>
            <circle cx="100" cy="150" r="7" fill="#8a2be2" class="svg-sparkle" style="animation-delay: 0.4s;"/>
            <circle cx="200" cy="140" r="5" fill="#00ff88" class="svg-sparkle" style="animation-delay: 0.6s;"/>
            <circle cx="50" cy="120" r="4" fill="#ffff00" class="svg-sparkle" style="animation-delay: 0.8s;"/>
            <circle cx="250" cy="110" r="6" fill="#ff6600" class="svg-sparkle" style="animation-delay: 1s;"/>
            <!-- Connection lines -->
            <line x1="150" y1="100" x2="80" y2="60" stroke="url(#homeGrad)" stroke-width="1" stroke-dasharray="3,3" class="svg-dash"/>
            <line x1="150" y1="100" x2="220" y2="70" stroke="url(#homeGrad)" stroke-width="1" stroke-dasharray="3,3" class="svg-dash"/>
            <line x1="150" y1="100" x2="100" y2="150" stroke="url(#homeGrad)" stroke-width="1" stroke-dasharray="3,3" class="svg-dash"/>
            <line x1="150" y1="100" x2="200" y2="140" stroke="url(#homeGrad)" stroke-width="1" stroke-dasharray="3,3" class="svg-dash"/>
            <line x1="80" y1="60" x2="50" y2="120" stroke="url(#homeGrad)" stroke-width="1" stroke-dasharray="3,3" class="svg-dash"/>
            <line x1="220" y1="70" x2="250" y2="110" stroke="url(#homeGrad)" stroke-width="1" stroke-dasharray="3,3" class="svg-dash"/>
            <!-- Mushroom cap -->
            <path d="M140 30 Q150 10 160 30 Q180 50 150 60 Q120 50 140 30" fill="none" stroke="url(#homeGrad)" stroke-width="2" class="svg-pulse"/>
            <line x1="150" y1="60" x2="150" y2="85" stroke="url(#homeGrad)" stroke-width="2"/>
        </svg>
    `,

    // SVG configurations for multiple instances
    svgConfigs: [
        { scale: 1.0, x: 85, y: 20, opacity: 0.9, rotation: 0 },
        { scale: 0.6, x: 10, y: 10, opacity: 0.5, rotation: 15 },
        { scale: 0.5, x: 70, y: 60, opacity: 0.4, rotation: -10 },
        { scale: 0.4, x: 5, y: 55, opacity: 0.35, rotation: 25 },
        { scale: 0.35, x: 55, y: 5, opacity: 0.3, rotation: -20 }
    ],

    // Initialize multiple SVGs on page
    init() {
        const page = this.detectPage();
        const svg = this[page];
        if (!svg) return;

        const heroSection = document.querySelector('.hero-section, .blog-hero, .portfolio-hero, .resources-hero, .contact-hero, .about-hero, .glossary-hero, .error-content, [class*="-hero"]');
        if (!heroSection) return;

        // Ensure hero section has relative positioning
        heroSection.style.position = 'relative';
        heroSection.style.overflow = 'hidden';

        // Create multiple SVG instances with different sizes and positions
        this.svgConfigs.forEach((config, index) => {
            const container = document.createElement('div');
            container.className = 'hero-svg-container hero-svg-instance';
            container.style.cssText = `
                position: absolute;
                right: ${config.x}%;
                top: ${config.y}%;
                width: ${150 * config.scale}px;
                height: ${100 * config.scale}px;
                opacity: ${config.opacity};
                transform: rotate(${config.rotation}deg);
                pointer-events: none;
                z-index: 1;
                animation: heroSvgFloat ${3 + index * 0.5}s ease-in-out infinite;
                animation-delay: ${index * 0.3}s;
            `;
            container.innerHTML = svg;

            // Scale SVG elements
            const svgEl = container.querySelector('svg');
            if (svgEl) {
                svgEl.style.width = '100%';
                svgEl.style.height = '100%';
            }

            heroSection.appendChild(container);
        });

        // Add floating animation if not exists
        if (!document.getElementById('heroSvgStyles')) {
            const style = document.createElement('style');
            style.id = 'heroSvgStyles';
            style.textContent = `
                @keyframes heroSvgFloat {
                    0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
                    50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
                }
                .hero-svg-instance svg {
                    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
                }
                .hero-svg-instance:first-child svg {
                    filter: drop-shadow(0 0 20px rgba(255, 0, 128, 0.6)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.4));
                }
            `;
            document.head.appendChild(style);
        }
    },

    detectPage() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('portfolio')) return 'portfolio';
        if (path.includes('resources')) return 'resources';
        if (path.includes('contact')) return 'contact';
        if (path.includes('about')) return 'about';
        if (path.includes('blog')) return 'blog';
        if (path.includes('glossary')) return 'glossary';
        if (path.includes('404')) return 'lost';
        if (path === '/' || path.endsWith('index.html') || path === '') return 'home';
        return null;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    HeroSVG.init();
});

