// Solidity code rain effect
function createSolidityRain() {
    const containers = document.querySelectorAll('.solidity-code-rain');
    
    containers.forEach(container => {
        const solidityKeywords = [
            'pragma', 'solidity', 'contract', 'function', 'modifier', 'event', 'struct',
            'mapping', 'address', 'uint256', 'bool', 'string', 'bytes32', 'public',
            'private', 'internal', 'external', 'view', 'pure', 'payable', 'override',
            'virtual', 'abstract', 'interface', 'library', 'import', 'using', 'for',
            'require', 'assert', 'revert', 'emit', 'return', 'if', 'else', 'while',
            'for', 'do', 'break', 'continue', 'try', 'catch', 'throw', 'new', 'delete'
        ];
        
        // Dense single words and symbols falling with color changing
        const symbols = ['{}', '[]', '()', '=>', '!=', '==', '&&', '||', '++', '--', '+=', '*=', '/='];
        const allItems = [...solidityKeywords, ...symbols];
        
        for (let i = 0; i < 12; i++) {
            const word = document.createElement('div');
            const item = allItems[Math.floor(Math.random() * allItems.length)];
            word.textContent = item;
            word.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-family: 'Courier New', monospace;
                font-size: ${12 + Math.random() * 4}px;
                animation: solidityWordFall ${10 + Math.random() * 15}s linear infinite, colorChange 2s ease-in-out infinite;
                animation-delay: ${Math.random() * 12}s;
                white-space: nowrap;
                pointer-events: none;
            `;
            
            container.appendChild(word);
        }
    });
}

// Add CSS for solidity rain animation
const solidityStyle = document.createElement('style');
solidityStyle.textContent = `
    @keyframes solidityWordFall {
        0% { transform: translateY(-50px); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes colorChange {
        0% { color: rgba(0, 255, 128, 0.8); }
        25% { color: rgba(0, 255, 255, 0.8); }
        50% { color: rgba(255, 0, 128, 0.8); }
        75% { color: rgba(128, 255, 0, 0.8); }
        100% { color: rgba(0, 255, 128, 0.8); }
    }
`;
document.head.appendChild(solidityStyle);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', createSolidityRain);