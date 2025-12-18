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

// Toggle expandable cards
function toggleCard(element) {
    const card = element.closest('.expandable-card');
    card.classList.toggle('expanded');
}

// Create spore rain confetti shower effect
function createSporeRain(x, y) {
    if (!x || !y) {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }
    const sporeCount = 50;
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.className = 'rainbow-spore';
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 50 + Math.random() * 150;
        const offsetX = Math.cos(angle) * velocity;
        const offsetY = Math.sin(angle) * velocity - 100;
        const size = 4 + Math.random() * 8;
        const hue = Math.random() * 360;
        const duration = 1.5 + Math.random() * 1.5;
        
        spore.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: hsl(${hue}, 90%, 60%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 ${size * 2}px hsl(${hue}, 90%, 60%);
            animation: sporeExplode ${duration}s ease-out forwards;
            --offset-x: ${offsetX}px;
            --offset-y: ${offsetY}px;
        `;
        document.body.appendChild(spore);
        
        setTimeout(() => spore.remove(), duration * 1000);
    }
}

// Enhanced floating blockchain code
function createFloatingCode() {
    const codeSnippets = [
        'pragma solidity ^0.8.0;',
        'contract EtherealOffering {',
        'mapping(address => uint256) gratitude;',
        'function mint() external payable {',
        'emit Offering(msg.sender, amount);',
        'require(blessed == true, "Not blessed");',
        'bytes32 merkleRoot = 0x...',
        'keccak256(abi.encodePacked(data))',
        'modifier onlyOracle() {',
        'uint256 constant SACRED_NUMBER = 108;',
        'struct Ritual { bytes32 hash; }',
        'event SacredOffering(address indexed)',
        'function bless(address soul) public',
        'mapping(bytes32 => bool) rituals;',
        'IERC721 soulboundToken;',
        'using SafeMath for uint256;',
        'address public oracle;',
        'bool public isBlessed;'
    ];
    
    const snippet = document.createElement('div');
    snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    
    const direction = Math.random();
    let startX, startY, endX, endY;
    
    if (direction < 0.7) {
        // Mostly falling down
        startX = Math.random() * window.innerWidth;
        startY = -20;
        endX = startX + (Math.random() - 0.5) * 200;
        endY = window.innerHeight + 20;
    } else {
        // Random directions
        const side = Math.floor(Math.random() * 4);
        switch(side) {
            case 0: // from left
                startX = -100; startY = Math.random() * window.innerHeight;
                endX = window.innerWidth + 100; endY = Math.random() * window.innerHeight;
                break;
            case 1: // from right
                startX = window.innerWidth + 100; startY = Math.random() * window.innerHeight;
                endX = -100; endY = Math.random() * window.innerHeight;
                break;
            case 2: // from top
                startX = Math.random() * window.innerWidth; startY = -100;
                endX = Math.random() * window.innerWidth; endY = window.innerHeight + 100;
                break;
            case 3: // diagonal
                startX = Math.random() * window.innerWidth; startY = -100;
                endX = Math.random() * window.innerWidth; endY = window.innerHeight + 100;
                break;
        }
    }
    
    snippet.style.cssText = `
        position: fixed;
        color: rgba(57, 255, 20, 0.6);
        font-family: 'Courier New', monospace;
        font-size: 12px;
        pointer-events: none;
        z-index: 1;
        left: ${startX}px;
        top: ${startY}px;
        animation: codeFloat${direction < 0.7 ? 'Down' : 'Random'} ${8 + Math.random() * 12}s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    snippet.style.setProperty('--end-x', endX + 'px');
    snippet.style.setProperty('--end-y', endY + 'px');
    
    document.body.appendChild(snippet);
    
    setTimeout(() => {
        if (snippet.parentNode) {
            snippet.remove();
        }
    }, 20000);
}

// Blockchain cube chain visualization
function createBlockchainChain() {
    const positions = [
        { right: '20px', bottom: '20px', size: 80 },
        { right: '120px', bottom: '30px', size: 60 },
        { right: '200px', bottom: '50px', size: 45 },
        { right: '30px', bottom: '120px', size: 50 },
        { right: '100px', bottom: '140px', size: 35 },
        { left: '20px', bottom: '20px', size: 70 },
        { left: '110px', bottom: '40px', size: 50 },
        { left: '30px', bottom: '110px', size: 40 }
    ];
    
    positions.forEach((pos, index) => {
        const cube = document.createElement('div');
        cube.innerHTML = `
            <div class="blockchain-cube" style="width: ${pos.size}px; height: ${pos.size}px;">
                <div class="cube-face front">Block #${Math.floor(Math.random() * 999999)}</div>
                <div class="cube-face back">Hash: 0x${Math.random().toString(16).substr(2, 6)}</div>
                <div class="cube-face right">Gas: ${Math.floor(Math.random() * 100000)}</div>
                <div class="cube-face left">Nonce: ${Math.floor(Math.random() * 1000)}</div>
                <div class="cube-face top">Tx: ${Math.floor(Math.random() * 50)}</div>
                <div class="cube-face bottom">Size: ${Math.floor(Math.random() * 1000)}kb</div>
            </div>
        `;
        
        cube.style.cssText = `
            position: fixed;
            ${pos.right ? `right: ${pos.right};` : ''}
            ${pos.left ? `left: ${pos.left};` : ''}
            bottom: ${pos.bottom};
            perspective: 1000px;
            z-index: ${1000 - index};
            pointer-events: none;
            opacity: ${0.8 - (index * 0.1)};
        `;
        
        document.body.appendChild(cube);
    });
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PsychedelicEffects();
    new Web3Simulator();
    
    // Initialize mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Add spore rain to navbar links
    document.querySelectorAll('.nav-link').forEach(button => {
        button.addEventListener('click', function(e) {
            createSporeRain(e.pageX, e.pageY);
        });
    });
    
    // Add spore rain to donate and lost buttons
    document.querySelectorAll('.donate-btn-top, .lost-btn-top, .donate-btn, .404-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createSporeRain(e.pageX, e.pageY);
        });
    });
    
    // Create blockchain chain visualization
    createBlockchainChain();
    
    // Start floating code effect
    setInterval(createFloatingCode, 2000);
    
    // Make all timeline cards expandable
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index > 0) { // Skip first one that's already expandable
            const content = item.querySelector('.timeline-content');
            if (content && !content.classList.contains('expandable-card')) {
                content.classList.add('expandable-card');
                const h3 = content.querySelector('h3');
                const years = content.querySelector('.card-years');
                const list = content.querySelector('ul');
                const link = content.querySelector('.external-link');
                
                content.innerHTML = `
                    <div class="card-header" onclick="toggleCard(this)">
                        ${h3 ? h3.outerHTML : ''}
                        ${years ? years.outerHTML : ''}
                        <i class="fas fa-chevron-down expand-icon"></i>
                    </div>
                    <div class="card-content">
                        ${list ? list.outerHTML : ''}
                        ${link ? link.outerHTML : ''}
                    </div>
                `;
            }
        }
    });
    
    // Add scroll-triggered mycelial growth
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const mycelialElements = document.querySelectorAll('.mycelial-network');
        
        mycelialElements.forEach(element => {
            element.style.opacity = 0.3 + (scrollPercent * 0.4);
        });
    });
    
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add some fun console messages
    console.log('%c🍄 Welcome to the Mycelial Web! 🍄', 'color: #ff0080; font-size: 20px; font-weight: bold;');
    console.log('%c⚡ Sacred Technology Activated ⚡', 'color: #00ffff; font-size: 16px;');
    console.log('%c🌈 Psychedelic Mode: ON 🌈', 'color: #39ff14; font-size: 14px;');
});

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
    
    .blockchain-cube {
        position: relative;
        transform-style: preserve-3d;
        animation: rotateCube 10s infinite linear;
    }
    
    .cube-face {
        position: absolute;
        background: rgba(255, 0, 128, 0.1);
        border: 1px solid rgba(255, 0, 128, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 7px;
        color: rgba(255, 255, 255, 0.7);
        font-family: 'Courier New', monospace;
        backdrop-filter: blur(5px);
        text-align: center;
        padding: 2px;
    }
    
    .cube-face.front { transform: rotateY(0deg) translateZ(40px); }
    .cube-face.back { transform: rotateY(180deg) translateZ(40px); }
    .cube-face.right { transform: rotateY(90deg) translateZ(40px); }
    .cube-face.left { transform: rotateY(-90deg) translateZ(40px); }
    .cube-face.top { transform: rotateX(90deg) translateZ(40px); }
    .cube-face.bottom { transform: rotateX(-90deg) translateZ(40px); }
    
    @keyframes rotateCube {
        0% { transform: rotateX(0deg) rotateY(0deg); }
        100% { transform: rotateX(360deg) rotateY(360deg); }
    }
`;
document.head.appendChild(style);