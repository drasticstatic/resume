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

    // Initialize SVG on page
    init() {
        const page = this.detectPage();
        const svg = this[page];
        if (!svg) return;

        const heroSection = document.querySelector('.hero-section, .blog-hero, .portfolio-hero, .resources-hero, .contact-hero, .about-hero, [class*="-hero"]');
        if (!heroSection) return;

        const container = document.createElement('div');
        container.className = 'hero-svg-container';
        container.innerHTML = svg;
        heroSection.appendChild(container);
    },

    detectPage() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('portfolio')) return 'portfolio';
        if (path.includes('resources')) return 'resources';
        if (path.includes('contact')) return 'contact';
        if (path.includes('about')) return 'about';
        return null;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    HeroSVG.init();
});

