// Complete hero effects for all pages
function initializeHeroEffects() {
    // EtherealOffering horizontal text
    createEtherealOfferingText();
    
    // Web3 matrix rain
    createWeb3MatrixRain();
    
    // Glossary terms only on glossary page
    if (window.location.pathname.includes('glossary')) {
        createGlossaryTerms();
    }
}

function createWeb3MatrixRain() {
    const heroes = document.querySelectorAll('.hero-section, .about-hero, .portfolio-hero, .blog-hero, .contact-hero, .resources-hero, .glossary-hero');
    const web3Symbols = '0x{}[]()=>!=&&||++--+=*=/=;:.,<>?@#$%^&*';

    heroes.forEach(hero => {
        // Reduced from 6 to 4 for better performance
        for (let i = 0; i < 4; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -100px;
                color: rgba(0, 255, 128, 0.5);
                font-family: 'Courier New', monospace;
                font-size: 13px;
                line-height: 1.3;
                animation: web3MatrixFall ${10 + Math.random() * 15}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
                pointer-events: none;
                z-index: 1;
                will-change: transform, opacity;
                contain: layout style;
            `;

            let text = '';
            for (let j = 0; j < 12; j++) {
                text += web3Symbols[Math.floor(Math.random() * web3Symbols.length)] + '<br>';
            }
            column.innerHTML = text;

            hero.appendChild(column);
        }
    });
}

function createEtherealOfferingText() {
    const heroes = document.querySelectorAll('.hero-section, .about-hero, .portfolio-hero, .blog-hero, .contact-hero, .resources-hero, .glossary-hero');
    
    heroes.forEach(hero => {
        const etherealText = document.createElement('div');
        etherealText.className = 'ethereal-offering-text';
        etherealText.textContent = 'EtherealOffering';
        const randomTop = Math.random() * 60 + 10; // Random between 10% and 70%
        etherealText.style.cssText = `
            position: absolute;
            top: ${randomTop}%;
            left: -200px;
            color: rgba(255, 0, 128, 0.3);
            font-family: 'Courier New', monospace;
            font-size: 24px;
            font-weight: bold;
            animation: etherealMove 20s linear infinite;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(etherealText);
    });
}

function createGlossaryTerms() {
    const hero = document.querySelector('.glossary-hero');
    if (!hero) return;
    
    const web3Terms = [
        'Zero-Knowledge', 'Soulbound', 'DAO', 'Aleo', 'MPC', 'DeFi', 'Solidity', 
        'LLM', 'Blockchain', 'Smart Contract', 'Web3', 'Ethereum', 'Bitcoin',
        'Cryptography', 'Hash', 'Merkle Tree', 'Consensus', 'Mining', 'Staking',
        'Token', 'NFT', 'Privacy', 'Oracle', 'Layer2', 'Rollup', 'Bridge'
    ];
    
    for (let i = 0; i < 20; i++) {
        const term = document.createElement('div');
        term.className = 'glossary-term-float';
        term.textContent = web3Terms[Math.floor(Math.random() * web3Terms.length)];
        term.style.cssText = `
            position: absolute;
            top: ${Math.random() * 70 + 15}%;
            left: ${Math.random() * 90 + 5}%;
            color: rgba(0, 255, 255, 0.5);
            font-family: 'Courier New', monospace;
            font-size: ${9 + Math.random() * 5}px;
            animation: glossaryFloat ${6 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(term);
    }
}

// Add CSS animations
const heroEffectsStyle = document.createElement('style');
heroEffectsStyle.textContent = `
    @keyframes etherealMove {
        0% { transform: translateX(-200px); }
        100% { transform: translateX(calc(100vw + 200px)); }
    }
    
    @keyframes glossaryFloat {
        0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
        25% { transform: translate(15px, -10px) rotate(45deg); opacity: 0.6; }
        50% { transform: translate(-8px, -20px) rotate(90deg); opacity: 0.5; }
        75% { transform: translate(-15px, -5px) rotate(135deg); opacity: 0.7; }
    }
    
    @keyframes web3MatrixFall {
        0% { transform: translateY(-100px); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(heroEffectsStyle);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializeHeroEffects);