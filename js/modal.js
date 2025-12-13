// Modal functionality
class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close');
        
        this.init();
    }
    
    init() {
        // Close modal when clicking the X
        if (this.closeBtn) {
            this.closeBtn.onclick = () => this.close();
        }
        
        // Close modal when clicking outside
        window.onclick = (event) => {
            if (event.target === this.modal) {
                this.close();
            }
        };
        
        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.style.display === 'block') {
                this.close();
            }
        });
    }
    
    open(content) {
        this.modalBody.innerHTML = content;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modalInstance = new Modal();
});

// Utility functions for opening specific modals
function openProjectModal(projectId) {
    const projects = {
        'ethereal-offering': {
            title: 'Ethereal Offering',
            description: `
                <h3>Ethereal Offering</h3>
                <p><strong>Co-founder & Lead Developer</strong></p>
                <p>A spiritually grounded Web3 ecosystem integrating gratitude rituals, soulbound identity, zero-knowledge privacy, and mycelial AI (the Oracle of Fruit).</p>
                
                <h4>Key Features:</h4>
                <ul>
                    <li>Gratitude-based token system with soulbound DIDs</li>
                    <li>Daily NFT minting cycles</li>
                    <li>LLM-powered ritual intelligence (Oracle of Fruit)</li>
                    <li>DAO holacracy modules + MPC recovery voting</li>
                    <li>Full Aleo integration for private credentials</li>
                </ul>
                
                <h4>Technical Stack:</h4>
                <ul>
                    <li>Aleo Leo programming (ZK circuits)</li>
                    <li>React frontend with Wagmi/Ethers.js</li>
                    <li>Node.js backend with ritual indexing</li>
                    <li>Multi-chain interoperability (Cosmos, Mantle, TON)</li>
                </ul>
            `
        },
        'zk-voting': {
            title: 'Anonymous ZK + MPC Voting Platform',
            description: `
                <h3>Anonymous ZK + MPC Voting Platform</h3>
                <p>Hybrid privacy-preserving governance system built on Aleo's zero-knowledge framework.</p>
                
                <h4>Innovation Highlights:</h4>
                <ul>
                    <li>Zero-Knowledge Voting: Private ballots, verifiable tallies</li>
                    <li>MPC Fail-Safe Recovery: DAO-initiated key rotation ensures resilience</li>
                    <li>Community-incentivized staking around participation</li>
                    <li>Fail-safe member inactivity/death recovery</li>
                </ul>
                
                <h4>Technical Implementation:</h4>
                <ul>
                    <li>Aleo circuits for private ballot casting</li>
                    <li>MPC key-share recovery design</li>
                    <li>DAO-triggered rotation and quorum rules</li>
                    <li>Fully private, verifiable tallying system</li>
                </ul>
            `
        },
        'dex-arbitrage': {
            title: 'DEX Arbitrage Scanner & Treasury Agent',
            description: `
                <h3>DEX Arbitrage Scanner & Treasury Agent</h3>
                <p>Automated treasury management system with cross-DEX arbitrage capabilities.</p>
                
                <h4>Core Features:</h4>
                <ul>
                    <li>JavaScript + Solidity arbitrage engine</li>
                    <li>Auto-filtered token pairs using Dropstab volume/liquidity data</li>
                    <li>Real-time profit threshold logic</li>
                    <li>Treasury auto-compounding for DAO reserves</li>
                </ul>
                
                <h4>Functionality:</h4>
                <ul>
                    <li>Scans external DEXs (Uniswap ↔ PancakeSwap)</li>
                    <li>Executes profitable arbitrage opportunities</li>
                    <li>Compounds DAO treasury reserves automatically</li>
                    <li>Risk management and slippage protection</li>
                </ul>
            `
        },
        'mycelium-agent': {
            title: 'Mycelium Agent — Oracle of Fruit',
            description: `
                <h3>Mycelium Agent — Oracle of Fruit</h3>
                <p>LLM-powered ritual intelligence system for spiritual-technological ecosystems.</p>
                
                <h4>Capabilities:</h4>
                <ul>
                    <li>Generated "offering intelligence" and gratitude indexing</li>
                    <li>Ritual practice guidance and community insights</li>
                    <li>Integration with Ethereal Offering ecosystem</li>
                    <li>Mycelial metaphor-based interaction patterns</li>
                </ul>
                
                <h4>Technical Architecture:</h4>
                <ul>
                    <li>Large Language Model integration</li>
                    <li>Ritual data indexing and analysis</li>
                    <li>Community participation tracking</li>
                    <li>Spiritual practice recommendation engine</li>
                </ul>
            `
        }
    };
    
    const project = projects[projectId];
    if (project && window.modalInstance) {
        window.modalInstance.open(project.description);
    }
}

function openBioModal() {
    const bioContent = `
        <h3>Christopher Stephen Wilson — Full Biography</h3>
        <p><strong>Minister-Technologist • Machinist-Mystic • Builder of Sacred Systems</strong></p>
        
        <p>Christopher Stephen Wilson is a minister-technologist, machinist-mystic, and decentralized systems builder whose life bridges the visible world of precision engineering and the invisible world of spirit, ceremony, and psychedelic revelation.</p>
        
        <p>For nearly two decades he shaped matter with ten-thousandth-inch accuracy — crafting aerospace components, entertainment structures, and high-stakes industrial hardware across Billet Industries, TAIT Towers, and Jones Manufacturing. Through this work he learned the language of pattern, flow, and discipline.</p>
        
        <p>Through psychedelic healing, 12-step recovery, and ordination, he learned the language of the heart — surrender, gratitude, and sacred interconnectedness.</p>
        
        <p>Now, through Web3 development, he brings these worlds together.</p>
        
        <p>As co-creator of <strong>Ethereal Offering</strong>, Christopher designs a spiritual-technological mycelium: a living ecosystem of gratitude tokens, soulbound identity, zero-knowledge privacy, and LLM-powered ritual intelligence — all honoring the subtle offerings we make to life.</p>
        
        <p>As an ordained minister within Psanctuary, he serves not as a founder but as a bridge — a caretaker of the sacred, a witness to healing, and a grounding presence in psychedelic-informed community.</p>
        
        <p>Guided by mycelial metaphor and mystical insight, Christopher's mission is to help build systems of dignity, privacy, connection, and awakening. He walks a path where code becomes prayer, where offerings become remembrance, and where each of us is revealed as a hypha in a sacred, intelligent, evolving whole.</p>
    `;
    
    if (window.modalInstance) {
        window.modalInstance.open(bioContent);
    }
}