// Resume page functionality

// Toggle experience card expand/collapse
function toggleCard(header) {
    const card = header.closest('.expandable-card');
    card.classList.toggle('expanded');
}

// Glossary function with jump to full glossary
function openGlossary(term) {
    const glossaryTerms = {
        'zk': { title: 'Zero-Knowledge Proofs', desc: 'Cryptographic method allowing one party to prove to another that a statement is true without revealing any information beyond the validity of the statement itself.' },
        'soulbound': { title: 'Soulbound Tokens', desc: 'Non-transferable NFTs that represent identity, credentials, or achievements tied to a specific wallet address.' },
        'dao': { title: 'DAO (Decentralized Autonomous Organization)', desc: 'Organization represented by rules encoded as smart contracts, controlled by members rather than central authority.' },
        'nft': { title: 'NFT (Non-Fungible Token)', desc: 'Unique digital asset verified using blockchain technology, representing ownership of specific items or content.' },
        'aleo': { title: 'Aleo', desc: 'Privacy-focused blockchain platform using zero-knowledge cryptography for private applications.' },
        'mpc': { title: 'MPC (Multi-Party Computation)', desc: 'Cryptographic protocol allowing multiple parties to jointly compute a function while keeping inputs private.' },
        'defi': { title: 'DeFi (Decentralized Finance)', desc: 'Financial services built on blockchain without traditional intermediaries like banks.' },
        'solidity': { title: 'Solidity', desc: 'Programming language for writing smart contracts on Ethereum and EVM-compatible blockchains.' },
        'llm': { title: 'LLM (Large Language Model)', desc: 'AI model trained on vast amounts of text data to understand and generate human-like text.' },
        'ritual-intelligence': { title: 'Ritual Intelligence', desc: 'AI systems designed to support spiritual practices, ceremonies, and contemplative traditions.' },
        'mycelial-networks': { title: 'Mycelial Networks', desc: 'Decentralized organizational structures inspired by fungal networks, emphasizing interconnection and distributed intelligence.' },
        'mazatrol': { title: 'Mazatrol', desc: 'Conversational CNC programming language used on Mazak machine tools for intuitive part programming.' },
        'mastercam': { title: 'Mastercam', desc: 'CAM (Computer-Aided Manufacturing) software for creating CNC toolpaths and programs.' },
        'cnc-lathe': { title: 'CNC Lathe', desc: 'Computer-controlled machine tool that rotates workpiece for precision turning operations.' },
        'metrology': { title: 'Precision Metrology', desc: 'Science of measurement ensuring parts meet specified tolerances, often to ±0.0001" accuracy.' }
    };
    
    const termData = glossaryTerms[term] || { title: term, desc: 'Definition coming soon...' };
    
    if (window.modalInstance) {
        const glossaryContent = `
            <div class="glossary-entry">
                <h3>${termData.title}</h3>
                <p>${termData.desc}</p>
                <div class="glossary-actions">
                    <a href="pages/resources.html#glossary" class="glossary-link">
                        📚 Jump to Full Glossary
                    </a>
                </div>
            </div>
        `;
        window.modalInstance.open(glossaryContent);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for skill items
    document.querySelectorAll('.skill-item, .tag, .insight-tag.clickable-tag').forEach(item => {
        if (item.classList.contains('clickable-tag')) {
            item.style.cursor = 'pointer';
        }
    });
});
