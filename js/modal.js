// Modal functionality
class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close');
        this.modalContent = document.querySelector('.modal-content');
        this.touchStartTarget = null;
        this.previouslyFocusedElement = null;
        this.modalHeadingId = 'modal-heading';

        this.init();
    }

    init() {
        if (this.modal) {
            this.modal.setAttribute('aria-hidden', 'true');
        }

        if (this.modalContent) {
            this.modalContent.setAttribute('tabindex', '-1');
        }

        // Close modal when clicking the X
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            });

            // Touch support for close button
            this.closeBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            }, { passive: false });
        }

        // Close modal when clicking outside (on the modal backdrop)
        if (this.modal) {
            // Track touch start to verify tap on backdrop
            this.modal.addEventListener('touchstart', (event) => {
                this.touchStartTarget = event.target;
            }, { passive: true });

            // Close on touchend if both start and end were on modal backdrop
            this.modal.addEventListener('touchend', (event) => {
                // Close if touch is outside modal content
                const modalContent = this.modal.querySelector('.modal-content');
                if (modalContent && !modalContent.contains(event.target)) {
                    event.preventDefault();
                    this.close();
                }
                this.touchStartTarget = null;
            }, { passive: false });

            // Mouse click for desktop - check if click is on the modal backdrop itself
            this.modal.addEventListener('click', (event) => {
                // Only close if clicking directly on the modal backdrop (not its children)
                if (event.target === this.modal) {
                    this.close();
                }
            });

            // Also add mousedown tracking for better UX
            this.modal.addEventListener('mousedown', (event) => {
                if (event.target === this.modal) {
                    this.modal.dataset.clickedBackdrop = 'true';
                }
            });

            this.modal.addEventListener('mouseup', (event) => {
                if (event.target === this.modal && this.modal.dataset.clickedBackdrop === 'true') {
                    this.close();
                }
                delete this.modal.dataset.clickedBackdrop;
            });
        }

        // Add event delegation for any dynamically created close buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-close-btn, .close-modal-btn, [data-close-modal]')) {
                e.preventDefault();
                this.close();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen()) {
                this.close();
                return;
            }

            if (event.key === 'Tab' && this.isOpen()) {
                this.trapFocus(event);
            }
        });
    }

    isOpen() {
        return Boolean(this.modal && this.modal.style.display === 'block');
    }

    getFocusableElements() {
        if (!this.modalContent) {
            return [];
        }

        return Array.from(this.modalContent.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter((element) => element instanceof HTMLElement && element.getClientRects().length > 0);
    }

    trapFocus(event) {
        const focusableElements = this.getFocusableElements();

        if (!focusableElements.length) {
            event.preventDefault();
            this.modalContent?.focus({ preventScroll: true });
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus({ preventScroll: true });
        }
    }

    syncDialogLabel() {
        if (!this.modal || !this.modalBody) {
            return;
        }

        const heading = this.modalBody.querySelector('h1, h2, h3, h4, h5, h6');

        if (heading instanceof HTMLElement) {
            if (!heading.id) {
                heading.id = this.modalHeadingId;
            }
            this.modal.setAttribute('aria-labelledby', heading.id);
            this.modal.removeAttribute('aria-label');
        } else {
            this.modal.removeAttribute('aria-labelledby');
            this.modal.setAttribute('aria-label', 'Dialog');
        }
    }

    open(content) {
        if (!this.modal || !this.modalBody) {
            console.error('Modal elements not found');
            return;
        }

        document.dispatchEvent(new Event('tooltip:hide'));

        if (this.modal.style.display !== 'block' && document.activeElement instanceof HTMLElement) {
            this.previouslyFocusedElement = document.activeElement;
        }

        // Add close button at bottom for mobile with hover effect
        const closeButtonHtml = `
            <div class="modal-close-bottom" style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                <button
                    onclick="window.modalInstance.close()"
                    onmouseenter="this.innerHTML='✕ click to close'; this.style.background='rgba(0, 255, 255, 0.3)'; this.style.borderColor='rgba(0, 255, 255, 0.7)'; this.style.color='#00ffff'; this.style.transform='scale(1.05)';"
                    onmouseleave="this.innerHTML='ready to return?'; this.style.background='rgba(255, 0, 128, 0.2)'; this.style.borderColor='rgba(255, 0, 128, 0.5)'; this.style.color='#ff0080'; this.style.transform='scale(1)';"
                    ontouchstart="this.innerHTML='✕ click to close'; this.style.background='rgba(0, 255, 255, 0.3)';"
                    style="padding: 12px 30px; background: rgba(255, 0, 128, 0.2); border: 2px solid rgba(255, 0, 128, 0.5); border-radius: 8px; color: #ff0080; cursor: pointer; font-size: 1rem; transition: all 0.3s ease;">
                    ready to return?
                </button>
            </div>
        `;
        this.modalBody.innerHTML = content + closeButtonHtml;
        this.modal.style.display = 'block';
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Reset modal content width to default for non-resume modals
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            // Only add liquid-glass if not already present
            if (!modalContent.classList.contains('liquid-glass')) {
                modalContent.classList.add('liquid-glass');
            }
            // Reset to default width (will be overridden by resume modal if needed)
            modalContent.style.maxWidth = '';
            modalContent.style.width = '';
            modalContent.style.height = '';
        }

        this.syncDialogLabel();
        this.focusInitialElement();

        // Spore rain on modal open
        if (typeof createSporeRain === 'function') {
            createSporeRain(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    close() {
        if (!this.modal) return;

        document.dispatchEvent(new Event('tooltip:hide'));

        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.removeAttribute('aria-labelledby');
        this.modal.removeAttribute('aria-label');
        document.body.style.overflow = 'auto';

        // Reset modal content dimensions
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '';
            modalContent.style.width = '';
            modalContent.style.height = '';
        }

        if (this.previouslyFocusedElement && this.previouslyFocusedElement.isConnected) {
            this.previouslyFocusedElement.focus({ preventScroll: true });
        }
        this.previouslyFocusedElement = null;

        // Spore rain on modal close
        if (typeof createSporeRain === 'function') {
            createSporeRain(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    focusInitialElement() {
        const focusTarget = this.modalContent?.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || this.closeBtn || this.modalContent;

        if (focusTarget instanceof HTMLElement) {
            if (focusTarget === this.modalContent) {
                focusTarget.setAttribute('tabindex', '-1');
            }
            focusTarget.focus({ preventScroll: true });
        }
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modalInstance = new Modal();
    
    // Add liquid glass to modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.add('liquid-glass');
    }
});

// Utility functions for opening specific modals
function openProjectModal(projectId) {
    const projects = {
        'ethereal-offering': {
            title: 'Ethereal Offering',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🍄</div>
                    <h3>Ethereal Offering</h3>
                    <p class="project-role"><strong>Co-founder & Lead Developer</strong> | 2024-Present</p>
                </div>
                
                <div class="project-description">
                    <p>A spiritually grounded Web3 ecosystem integrating gratitude rituals, soulbound identity, zero-knowledge privacy, and mycelial AI (the Oracle of Fruit). More than a project, it is a living altar: a place where code becomes prayer, where offerings become data, and where technology remembers its responsibility to serve the human heart.</p>
                </div>
                
                <h4>🌟 Key Features:</h4>
                <ul>
                    <li><strong>Gratitude-based token economics</strong> - Token distribution based on community contributions and spiritual practice</li>
                    <li><strong>Soulbound identity protocols (DIDs)</strong> - Non-transferable identity tied to spiritual reputation</li>
                    <li><strong>Zero-knowledge privacy systems</strong> - Private credentials and anonymous participation using Aleo</li>
                    <li><strong>Oracle of Fruit</strong> - LLM-powered ritual intelligence for offering analysis and spiritual guidance</li>
                    <li><strong>DAO governance structures</strong> - Holacratic decision-making with MPC recovery voting</li>
                    <li><strong>Mycelial network architecture</strong> - Decentralized, resilient community structures</li>
                    <li><strong>Offering indexing</strong> - Track and honor spiritual contributions across the ecosystem</li>
                    <li><strong>Community wisdom synthesis</strong> - Collective intelligence through ritual practice</li>
                </ul>
                
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Aleo Leo</span>
                    <span class="tech-badge">React</span>
                    <span class="tech-badge">Node.js</span>
                    <span class="tech-badge">Wagmi</span>
                    <span class="tech-badge">Ethers.js</span>
                    <span class="tech-badge">ZK Circuits</span>
                    <span class="tech-badge">LLM Integration</span>
                    <span class="tech-badge">DAO Governance</span>
                </div>
                
                <h4>🎯 Project Goals:</h4>
                <p>Ethereal Offering aims to create a Web3 ecosystem where technology serves spiritual growth, community healing, and collective awakening. By integrating zero-knowledge privacy with gratitude-based economics, we're building systems that honor human dignity while enabling transparent, decentralized governance.</p>

                <div class="project-links">
                    <a href="https://drasticstatic.github.io/gratitude-token-project_testPublish_2026-01-05/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Launch Dapp</a>
                    <a href="https://drasticstatic.github.io/gratitude-token-project_docs/" class="modal-btn modal-btn-secondary" target="_blank"><i class="fas fa-book"></i> Docusaurus</a>
                    <a href="https://github.com/drasticstatic" class="modal-btn" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
                </div>
            `
        },
        'zk-voting': {
            title: 'Anonymous ZK + MPC Voting Platform',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🗳️</div>
                    <h3>Anonymous ZK + MPC Voting Platform</h3>
                    <p class="project-role"><strong>Lead Developer</strong> | 2024</p>
                </div>
                
                <div class="project-description">
                    <p>Hybrid privacy-preserving governance system built on Aleo's zero-knowledge framework with MPC fail-safe recovery. Enables truly anonymous voting while maintaining verifiability and providing secure key recovery mechanisms through multi-party computation.</p>
                </div>
                
                <h4>🔐 Key Features:</h4>
                <ul>
                    <li><strong>Zero-knowledge ballot casting</strong> - Vote privately without revealing identity</li>
                    <li><strong>MPC fail-safe recovery system</strong> - Distributed key management for resilience</li>
                    <li><strong>DAO-triggered key rotation</strong> - Automated security updates via governance</li>
                    <li><strong>Anonymous voter registration</strong> - Privacy-preserving identity verification</li>
                    <li><strong>Verifiable vote tallying</strong> - Transparent results without compromising privacy</li>
                    <li><strong>Audit trail without identity exposure</strong> - Accountability with anonymity</li>
                </ul>
                
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Aleo Leo</span>
                    <span class="tech-badge">MPC Protocols</span>
                    <span class="tech-badge">Zero-Knowledge Proofs</span>
                    <span class="tech-badge">DAO Smart Contracts</span>
                    <span class="tech-badge">Cryptographic Key Management</span>
                </div>
                
                <div class="project-links">
                    <a href="https://github.com/drasticstatic" class="modal-btn" target="_blank">View on GitHub</a>
                </div>
            `
        },
        'dex-arbitrage': {
            title: 'DEX Arbitrage Scanner & Treasury Agent',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">⚡</div>
                    <h3>DEX Arbitrage Scanner & Treasury Agent</h3>
                    <p class="project-role"><strong>Developer</strong> | 2024</p>
                </div>
                
                <div class="project-description">
                    <p>Automated treasury management system with cross-DEX arbitrage capabilities and real-time profit optimization. Scans multiple decentralized exchanges for price discrepancies and executes profitable trades while managing treasury assets through auto-compounding strategies.</p>
                </div>
                
                <h4>⚡ Key Features:</h4>
                <ul>
                    <li><strong>Cross-DEX arbitrage detection</strong> - Real-time price monitoring across exchanges</li>
                    <li><strong>Real-time profit optimization</strong> - Automated execution when thresholds met</li>
                    <li><strong>Treasury auto-compounding</strong> - Reinvest profits for exponential growth</li>
                    <li><strong>Multi-chain support</strong> - Works across Ethereum, BSC, and more</li>
                    <li><strong>Gas optimization strategies</strong> - Minimize transaction costs</li>
                    <li><strong>Risk management protocols</strong> - Slippage protection and fail-safes</li>
                </ul>
                
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Solidity</span>
                    <span class="tech-badge">JavaScript</span>
                    <span class="tech-badge">Ethers.js</span>
                    <span class="tech-badge">Uniswap SDK</span>
                    <span class="tech-badge">PancakeSwap SDK</span>
                    <span class="tech-badge">Node.js</span>
                </div>
                
                <div class="project-links">
                    <a href="https://github.com/drasticstatic" class="modal-btn" target="_blank">View on GitHub</a>
                </div>
            `
        },
        'mycelium-agent': {
            title: 'Mycelium Agent — Oracle of Fruit',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🧠</div>
                    <h3>Mycelium Agent — Oracle of Fruit</h3>
                    <p class="project-role"><strong>AI Architect & Developer</strong> | 2024</p>
                </div>
                
                <div class="project-description">
                    <p>LLM-powered ritual intelligence system for spiritual-technological ecosystems with mycelial-inspired interaction patterns. The Oracle of Fruit indexes offerings, analyzes spiritual practices, and generates wisdom synthesis for community healing and growth.</p>
                </div>
                
                <h4>🧠 Key Features:</h4>
                <ul>
                    <li><strong>Offering indexing and categorization</strong> - Track spiritual contributions</li>
                    <li><strong>Ritual intelligence generation</strong> - AI-powered guidance and insights</li>
                    <li><strong>Spiritual practice guidance</strong> - Personalized recommendations</li>
                    <li><strong>Community wisdom synthesis</strong> - Collective intelligence aggregation</li>
                    <li><strong>Mycelial network patterns</strong> - Decentralized, interconnected design</li>
                    <li><strong>Privacy-preserving AI interactions</strong> - Secure and confidential</li>
                </ul>
                
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">LLM Integration</span>
                    <span class="tech-badge">Python</span>
                    <span class="tech-badge">NLP</span>
                    <span class="tech-badge">Vector Databases</span>
                    <span class="tech-badge">API Design</span>
                    <span class="tech-badge">Node.js</span>
                </div>
                
                <div class="project-links">
                    <a href="https://github.com/drasticstatic" class="modal-btn" target="_blank">View on GitHub</a>
                </div>
            `
        },
        'multi-chain': {
            title: 'Multi-Chain Hackathon Architecture',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🌐</div>
                    <h3>Multi-Chain Hackathon Architecture</h3>
                    <p class="project-role"><strong>Architect & Developer</strong> | 2024</p>
                </div>

                <div class="project-description">
                    <p>Cross-chain interoperability system designed for Mantle, Cosmos, TON, ASI, Chainlink, zkID, and Aleo integration. Built during multiple hackathons to explore the frontiers of blockchain interoperability and privacy-preserving cross-chain communication.</p>
                </div>

                <h4>🌐 Key Features:</h4>
                <ul>
                    <li><strong>Cross-chain messaging</strong> - Seamless communication between disparate blockchains</li>
                    <li><strong>Chainlink CCIP integration</strong> - Secure cross-chain data and token transfers</li>
                    <li><strong>zkID verification</strong> - Privacy-preserving identity across chains</li>
                    <li><strong>Multi-chain governance</strong> - Unified DAO operations across ecosystems</li>
                    <li><strong>Cosmos IBC support</strong> - Inter-Blockchain Communication protocol</li>
                </ul>

                <h4>🔧 Technical Stack:</h4>
                <div class="tech-stack-modal">
                    <span class="tech-tag">Cosmos SDK</span>
                    <span class="tech-tag">Mantle</span>
                    <span class="tech-tag">TON</span>
                    <span class="tech-tag">Chainlink CCIP</span>
                    <span class="tech-tag">Aleo</span>
                    <span class="tech-tag">Solidity</span>
                </div>

                <div class="project-links">
                    <a href="https://github.com/drasticstatic" class="modal-btn" target="_blank">View on GitHub</a>
                </div>
            `
        },
        'csw-productions': {
            title: 'CSW Productions',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🎵</div>
                    <h3>CSW Productions</h3>
                    <p class="project-role"><strong>Owner & Lead Engineer</strong> | 2010-Present</p>
                </div>

                <div class="project-description">
                    <p>Professional audio engineering services including FOH engineering, live sound, lighting design, and event production. From intimate worship gatherings to large-scale concerts, CSW Productions brings technical excellence and spiritual sensitivity to every event.</p>
                </div>

                <h4>🎵 Services:</h4>
                <ul>
                    <li><strong>Front of House Engineering</strong> - Live mixing for concerts, worship, and events</li>
                    <li><strong>Live Sound Reinforcement</strong> - Professional PA systems and acoustics</li>
                    <li><strong>Lighting Design</strong> - Atmospheric and stage lighting</li>
                    <li><strong>Event Production</strong> - Full-service event technical coordination</li>
                    <li><strong>Recording & Mixing</strong> - Multi-track recording and post-production</li>
                </ul>

                <h4>🔧 Equipment & Expertise:</h4>
                <div class="tech-stack-modal">
                    <span class="tech-tag">Digital Consoles</span>
                    <span class="tech-tag">Analog Mixing</span>
                    <span class="tech-tag">PA Systems</span>
                    <span class="tech-tag">Stage Lighting</span>
                    <span class="tech-tag">Multi-track Recording</span>
                </div>

                <div class="project-links">
                    <a href="https://drasticstatic.wixsite.com/cswproductions" class="modal-btn" target="_blank">Visit Website</a>
                </div>
            `
        },
        'manufacturing': {
            title: 'Precision Manufacturing Portfolio',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🔧</div>
                    <h3>Precision Manufacturing Portfolio</h3>
                    <p class="project-role"><strong>CNC Programmer & Machinist</strong> | 2006-Present</p>
                </div>

                <div class="project-description">
                    <p>18+ years of CNC machining expertise across aerospace, defense, and entertainment industries with ±0.0001" tolerances. From titanium aerospace components to precision entertainment structures, this work taught me the discipline of precision that now informs my approach to blockchain development.</p>
                </div>

                <h4>🔧 Industries Served:</h4>
                <ul>
                    <li><strong>Aerospace</strong> - Flight-critical components with AS9100 certification</li>
                    <li><strong>Defense</strong> - ITAR-compliant precision parts</li>
                    <li><strong>Entertainment</strong> - TAIT Towers stage automation systems</li>
                    <li><strong>Medical</strong> - High-precision medical device components</li>
                    <li><strong>Industrial</strong> - Custom tooling and fixtures</li>
                </ul>

                <h4 style="margin-top: 24px;">🔧 Technical Expertise:</h4>
                <div class="tech-stack-modal">
                    <span class="tech-tag">Mazak Mazatrol</span>
                    <span class="tech-tag">Mastercam</span>
                    <span class="tech-tag">FeatureCAM</span>
                    <span class="tech-tag">G-code</span>
                    <span class="tech-tag">ISO-9001</span>
                    <span class="tech-tag">AS9100</span>
                    <span class="tech-tag">ITAR</span>
                </div>

                <h4 style="margin-top: 24px;">🏢 Companies:</h4>
                <ul>
                    <li><strong>Jones Manufacturing</strong> - Industrial component manufacturing</li>
                    <li><strong>TAIT Towers</strong> - Entertainment automation systems</li>
                    <li><strong>Billet Industries</strong> - Precision machining & fabrication</li>
                </ul>

                <div class="project-links">
                    <a href="https://www.jonesmanufacturingyorkpa.com" class="modal-btn" target="_blank"><i class="fas fa-external-link-alt"></i> Jones Manufacturing</a>
                    <a href="https://billet-industries.com/" class="modal-btn" target="_blank"><i class="fas fa-external-link-alt"></i> Billet Industries</a>
                    <a href="https://www.taittowers.com/" class="modal-btn" target="_blank"><i class="fas fa-external-link-alt"></i> TAIT Towers</a>
                </div>
            `
        },

        // ─── Appended 2026-08-23: full build-log entries ───

        'web3-ready': {
            title: 'This Site Is Web3-Ready',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🔮</div>
                    <h3>This Site Is Web3-Ready</h3>
                    <p class="project-role"><strong>Vanilla JS, no framework, real wallet integration</strong></p>
                </div>

                <div class="project-description">
                    <p>This resume is plain HTML5/CSS3/JavaScript with no build step — and it still connects a real wallet, shows a live gas price, and sends real ETH donations. <code>js/wallet-connect.js</code> implements a full <code>WalletManager</code>: MetaMask/injected-wallet detection, a chain-ID → network-name map covering Ethereum, Polygon, Arbitrum, Optimism, BSC, and several testnets, and clean connect/disconnect/address-formatting flows.</p>
                </div>

                <h4>🔮 What's actually wired up:</h4>
                <ul>
                    <li><strong>Multi-chain wallet connect</strong> — top-right button on every page</li>
                    <li><strong>Live gas-price indicator</strong> — shown right in the donate modal</li>
                    <li><strong>Real ETH micro-donations</strong> — quick-amount buttons (0.01/0.05/0.1 ETH) plus a custom-amount field</li>
                    <li><strong>Multi-asset donation addresses</strong> — BTC, ADA, DOGE, LTC, XRP, alongside ETH</li>
                </ul>

                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Vanilla JS</span>
                    <span class="tech-badge">Web3 Wallet APIs</span>
                    <span class="tech-badge">No Build Step</span>
                    <span class="tech-badge">GitHub Pages</span>
                </div>

                <div class="project-links">
                    <a href="https://github.com/drasticstatic/resume" class="modal-btn" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
                </div>
            `
        },
        'dappu-coursework': {
            title: 'DappU Mentorship Coursework',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🎓</div>
                    <h3>DappU Mentorship Coursework</h3>
                    <p class="project-role"><strong>Hands-on Solidity & smart-contract fundamentals</strong></p>
                </div>

                <div class="project-description">
                    <p>Seven build-along projects from the DappU program, each exploring a different core smart-contract pattern. Five have live GitHub Pages demos, one has on-chain proof of a from-scratch token deployment, and one is a contract-only exercise with no frontend to deploy.</p>
                </div>

                <h4>🎓 The gallery:</h4>
                <div class="dappu-gallery-list">
                    <div class="dappu-gallery-item">
                        <span><strong>DAO</strong> — production-ready decentralized autonomous organization with funding proposals and voting</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://drasticstatic.github.io/dao/" class="modal-btn modal-btn-small" target="_blank"><i class="fas fa-rocket"></i> Live Demo</a>
                        </div>
                    </div>
                    <div class="dappu-gallery-item">
                        <span><strong>Crowdsale</strong> — Ethereum-based token crowdsale using Hardhat and React</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://drasticstatic.github.io/crowdsale/" class="modal-btn modal-btn-small" target="_blank"><i class="fas fa-rocket"></i> Live Demo</a>
                        </div>
                    </div>
                    <div class="dappu-gallery-item">
                        <span><strong>AMM</strong> — automated market maker mechanics</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://drasticstatic.github.io/amm/" class="modal-btn modal-btn-small" target="_blank"><i class="fas fa-rocket"></i> Live Demo</a>
                        </div>
                    </div>
                    <div class="dappu-gallery-item">
                        <span><strong>NFT Collection</strong> — DappU Punks NFT project</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://drasticstatic.github.io/nft_dappu-punks/" class="modal-btn modal-btn-small" target="_blank"><i class="fas fa-rocket"></i> Live Demo</a>
                        </div>
                    </div>
                    <div class="dappu-gallery-item">
                        <span><strong>Solidity Intensive</strong> — core language fundamentals</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://drasticstatic.github.io/solidity_intensive/" class="modal-btn modal-btn-small" target="_blank"><i class="fas fa-rocket"></i> Live Demo</a>
                        </div>
                    </div>
                    <div class="dappu-gallery-item">
                        <span><strong>Blockchain Developer Bootcamp</strong> — a Token.sol contract built from scratch and deployed to Sepolia</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://sepolia.etherscan.io/address/0x202be008122ba0eeedae74fe81d398f11c5534a8" class="modal-btn modal-btn-small" target="_blank"><i class="fas fa-check-circle"></i> Etherscan Proof</a>
                            <a href="https://github.com/drasticstatic/blockchain-developer-bootcamp" class="modal-btn modal-btn-small" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                    <div class="dappu-gallery-item">
                        <span><strong>Hardhat Example</strong> — contract-only exercise, no frontend</span>
                        <div class="dappu-gallery-actions">
                            <a href="https://github.com/drasticstatic/hardhat_example" class="modal-btn modal-btn-small" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Solidity</span>
                    <span class="tech-badge">Hardhat</span>
                    <span class="tech-badge">React</span>
                    <span class="tech-badge">Ethers.js</span>
                </div>
            `
        },
        'iamoneself': {
            title: 'I Am One Self',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🦉</div>
                    <h3>I Am One Self</h3>
                    <p class="project-role"><strong>Primary Technical Architect & Builder</strong></p>
                </div>
                <div class="project-description">
                    <p>The Holy Earth Foundation's online home, bridging A Course in Miracles with Plant Medicine traditions. A 98-question FAQ across 9 categories, Pagefind-powered AI Guide search, retreat booking integration with Retreat Guru and Aya Advisors, and a full dark-mode-aware, animation-rich Next.js SSG build.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Next.js 16</span>
                    <span class="tech-badge">TypeScript</span>
                    <span class="tech-badge">Tailwind CSS</span>
                    <span class="tech-badge">Framer Motion</span>
                    <span class="tech-badge">Pagefind</span>
                </div>
                <div class="project-links">
                    <a href="https://www.iamoneself.com" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'findyourfeathers': {
            title: 'Find Your Feathers',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🪶</div>
                    <h3>Find Your Feathers</h3>
                    <p class="project-role"><strong>Developer</strong></p>
                </div>
                <div class="project-description">
                    <p>A personal healing and transformation site, built with the same Next.js SSG + Tailwind + Framer Motion stack as I Am One Self, tuned for a gentler, more intimate reading experience.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Next.js 15</span>
                    <span class="tech-badge">Tailwind CSS</span>
                    <span class="tech-badge">Framer Motion</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/findyourfeathers-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'dpnelson': {
            title: 'dpnelson.com Rebuild',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🧭</div>
                    <h3>dpnelson.com Rebuild</h3>
                    <p class="project-role"><strong>Developer / Builder</strong></p>
                </div>
                <div class="project-description">
                    <p>Reconstructing Douglas P Nelson's IFS (Internal Family Systems) coaching practice from WordPress into a high-performance Vite + React static site — preserving every heading and structural phrase from the original while upgrading the visual and motion presentation layer.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Vite 6</span>
                    <span class="tech-badge">React 18</span>
                    <span class="tech-badge">Framer Motion</span>
                    <span class="tech-badge">shadcn/ui</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/dpnelson-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'wilson-lawn': {
            title: "Wilson's Lawn Maintenance — AI Assist",
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🌱</div>
                    <h3>Wilson's Lawn Maintenance — AI Assist</h3>
                    <p class="project-role"><strong>Developer</strong></p>
                </div>
                <div class="project-description">
                    <p>A lawn-care business site with a live voice agent (ElevenLabs-powered) for handling customer inquiries, built on Vite + React + shadcn/ui components.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Vite</span>
                    <span class="tech-badge">React</span>
                    <span class="tech-badge">shadcn/ui</span>
                    <span class="tech-badge">AI Voice Agent</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/wilson-lawn-ai-assist-public/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'pir-devine-news': {
            title: 'De Vine News — Committee Hub',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🗞️</div>
                    <h3>De Vine News — Committee Hub</h3>
                    <p class="project-role"><strong>Developer</strong></p>
                </div>
                <div class="project-description">
                    <p>Newsletter workflow hub for the Psychedelics in Recovery™ / PIR® 12-Step Fellowship. A GWS-automated dashboard for newsletter submissions and PR review — partnering with an existing WordPress site rather than replacing it.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Google Workspace CLI</span>
                    <span class="tech-badge">GitHub Actions</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/pir-devine-news-public/dashboard/index.html" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Dashboard</a>
                </div>
            `
        },
        'divorce-custody': {
            title: 'Divorce & Custody Assistant',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">⚖️</div>
                    <h3>Divorce & Custody Assistant</h3>
                    <p class="project-role"><strong>Developer</strong></p>
                </div>
                <div class="project-description">
                    <p>Privacy-first, AI-assisted case management for pro se litigation support — organizes court documents, maps evidence to statutory custody factors, tracks filings and deadlines, and models financial exposure with strict privacy isolation.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">AI-Assisted</span>
                    <span class="tech-badge">Privacy-First Architecture</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/divorce-custody-assistant-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'tax-assistant': {
            title: 'Tax Assistant',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🧾</div>
                    <h3>Tax Assistant</h3>
                    <p class="project-role"><strong>Developer</strong> | In Development</p>
                </div>
                <div class="project-description">
                    <p>AI-assisted tax position management — back-tax relief navigation, transaction-history reconstruction, and filing support. Still early-stage; the public preview will populate as the build matures.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">AI-Assisted</span>
                    <span class="tech-badge">In Development</span>
                </div>
            `
        },
        'trading-assistant-project': {
            title: 'Trading Assistant (Fortuna)',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">📈</div>
                    <h3>Trading Assistant (Fortuna)</h3>
                    <p class="project-role"><strong>Architect & Developer</strong></p>
                </div>
                <div class="project-description">
                    <p>A live, multi-agent AI trading accountability system — wealth warden, accountability coach, session analyst, and success manager for futures and crypto futures operations. Built on Claude Code CLI + Augment Code, backed by MCP integrations into Hummingbot, TradingView, and Robinhood.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Claude Code CLI</span>
                    <span class="tech-badge">Augment Code</span>
                    <span class="tech-badge">MCP</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/trading-assistant-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'ecosystem-tooling': {
            title: 'Forked & Adapted Tools',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🧰</div>
                    <h3>Forked & Adapted Tools</h3>
                    <p class="project-role"><strong>Infrastructure & Integrations</strong></p>
                </div>
                <div class="project-description">
                    <p>Working copies and forks of third-party tools, adapted into this ecosystem's trading infrastructure. (Looking for the reusable repo scaffolding? That's <code>my-template</code>, now its own card in this section.)</p>
                </div>
                <h4>🧰 The gallery:</h4>
                <ul>
                    <li><strong>free-claude-code</strong> — an Anthropic-compatible proxy adapted to route free/open-source model traffic (NVIDIA NIM, DeepSeek, OpenRouter, Ollama) — <a href="https://github.com/drasticstatic/free-claude-code" target="_blank"><i class="fab fa-github"></i> code</a></li>
                    <li><strong>hummingbot-mcp</strong> — MCP layer for the Hummingbot trading engine — <a href="https://github.com/drasticstatic/hummingbot-mcp" target="_blank"><i class="fab fa-github"></i> code</a></li>
                    <li><strong>hummingbot-api</strong> — Hummingbot API server integration — <a href="https://github.com/drasticstatic/hummingbot-api" target="_blank"><i class="fab fa-github"></i> code</a></li>
                    <li><strong>tradingview-mcp-jackson</strong> — TradingView Desktop MCP integration — <a href="https://github.com/drasticstatic/tradingview-mcp-jackson" target="_blank"><i class="fab fa-github"></i> code</a></li>
                    <li><strong>robinhood-mcp</strong> — Robinhood MCP integration — <a href="https://github.com/drasticstatic/robinhood-mcp" target="_blank"><i class="fab fa-github"></i> code</a></li>
                </ul>
            `
        },
        'drasticstatic-howtos': {
            title: 'How-To Guides',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">📚</div>
                    <h3>How-To Guides</h3>
                    <p class="project-role"><strong>Ecosystem Documentation</strong></p>
                </div>
                <div class="project-description">
                    <p>The <code>drasticstatic/drasticstatic</code> profile repo doubles as a small library of how-to guides for running this whole ecosystem — the same playbooks used to stand up every repo in this portfolio.</p>
                </div>
                <h4>📚 The guides:</h4>
                <ul>
                    <li><a href="https://github.com/drasticstatic/drasticstatic/blob/main/how-to-establish-a-github-PROFILE-README.md" target="_blank"><i class="fab fa-github"></i> How to establish a GitHub profile README</a></li>
                    <li><a href="https://github.com/drasticstatic/drasticstatic/blob/main/how-to-establish-cross_repo_CONTRIBUTORS_SECURITY_LICENSING.md" target="_blank"><i class="fab fa-github"></i> How to establish cross-repo CONTRIBUTORS/SECURITY/LICENSING</a></li>
                    <li><a href="https://github.com/drasticstatic/drasticstatic/blob/main/how-to-publish-react-APPS-to-ghPAGES.md" target="_blank"><i class="fab fa-github"></i> How to publish React apps to GitHub Pages</a></li>
                    <li><a href="https://github.com/drasticstatic/drasticstatic/blob/main/how-to-setup-BRANCH-PROTECTION-and-TOPICS.md" target="_blank"><i class="fab fa-github"></i> How to set up branch protection & topics</a></li>
                    <li><a href="https://github.com/drasticstatic/drasticstatic/blob/main/how-to-setup-GITEXPORTER.md" target="_blank"><i class="fab fa-github"></i> How to set up GitExporter</a></li>
                </ul>
                <div class="project-links">
                    <a href="https://github.com/drasticstatic/drasticstatic" class="modal-btn modal-btn-primary" target="_blank"><i class="fab fa-github"></i> View Repo</a>
                </div>
            `
        },
        'dev-recruitment-safeguards': {
            title: 'Dev Recruitment Safeguards',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🕵️</div>
                    <h3>Dev Recruitment Safeguards</h3>
                    <p class="project-role"><strong>Author & Maintainer</strong></p>
                </div>
                <div class="project-description">
                    <p>A security-awareness portal documenting sophisticated LinkedIn recruitment scams targeting Web3 and fullstack developers — pattern recognition, red flags, and protection guidance for the community.</p>
                </div>
                <div class="project-links">
                    <a href="https://github.com/drasticstatic/dev-recruitment-safeguards" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> View Portal</a>
                </div>
            `
        },
        'agent-alfred': {
            title: 'Alfred',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🤖</div>
                    <h3>Alfred</h3>
                    <p class="project-role"><strong>System Coordinator</strong> | Claude Code CLI</p>
                </div>
                <div class="project-description">
                    <p>Named for the Master Butler archetype — proactive, discreet, always one step ahead. Alfred handles cross-repo housekeeping, security flags, and routes lower-stakes work to a free-model sandbox, keeping context lean so the specialist agents can stay focused on their own domains.</p>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/anthropas-argus-alfred-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'agent-fortuna': {
            title: 'Fortuna',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">💰</div>
                    <h3>Fortuna</h3>
                    <p class="project-role"><strong>Wealth Warden & Trading Coach</strong> | Claude Code CLI + Augment Code</p>
                </div>
                <div class="project-description">
                    <p>Christopher's dedicated trading accountability coach — session analysis, strategy documentation, and success-manager duties for futures and crypto futures operations.</p>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/trading-assistant-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                </div>
            `
        },
        'agent-kavanah': {
            title: 'Kavanah',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🕯️</div>
                    <h3>Kavanah</h3>
                    <p class="project-role"><strong>Spec-Driven Orchestration</strong> | Augment Intent</p>
                </div>
                <div class="project-description">
                    <p>Intent-driven orchestration rather than a chat session — Kavanah's primary scope is the web3 DEX arbitrage bot and this very resume site, turning specs into coordinated execution.</p>
                </div>
                <div class="project-links">
                    <a href="https://github.com/drasticstatic/trading-bot-arbitrage-public" class="modal-btn modal-btn-primary" target="_blank"><i class="fab fa-github"></i> DEX Arb Bot</a>
                </div>
            `
        },
        'david-amaringo': {
            title: 'David Amaringo',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🎨</div>
                    <h3>David Amaringo</h3>
                    <p class="project-role"><strong>Ayahuasca Visionary Artist</strong> | Chaiconi Bari Healer</p>
                </div>
                <div class="project-description">
                    <p>A home online for Maestro David Amaringo, trained by his uncle Pablo Cesar Amaringo Shuña — founder of the USKO-AYAR Amazonian School of Painting. His work has shown at the Museum of Children's Art in Oslo, Norway. Beyond painting, he's a skilled guide of the upper Amazon basin, an English translator, and a masterful ceremonial facilitator.</p>
                </div>
                <div class="project-description">
                    <p>This site is an early foundation — Kenney and Christopher are still building out the fuller picture of David's story, services, and needs. Shares its technical foundation with I Am One Self and Find Your Feathers.</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Next.js</span>
                    <span class="tech-badge">Visionary Art</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/david-amaringo-public-preview/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                    <a href="https://github.com/drasticstatic/david-amaringo-public-preview" class="modal-btn" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
                </div>
            `
        },
        'this-site': {
            title: 'This Very Site',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🌈</div>
                    <h3>This Very Site</h3>
                    <p class="project-role"><strong>Vanilla HTML5/CSS3/JS</strong> | No Framework, No Build Step</p>
                </div>
                <div class="project-description">
                    <p>This resume is proof that "modern" doesn't require a bundler. No React, no build pipeline — just hand-written HTML, CSS, and JavaScript, deployed straight to GitHub Pages. And it still connects a real wallet, sends real ETH, and shows a live gas price (see "This Site Is Web3-Ready" under Major Roles for the full technical writeup).</p>
                </div>
                <h4>⚙️ Technical Stack:</h4>
                <div class="tech-stack-grid">
                    <span class="tech-badge">Vanilla JS</span>
                    <span class="tech-badge">No Build Step</span>
                    <span class="tech-badge">GitHub Pages</span>
                </div>
                <div class="project-links">
                    <a href="https://drasticstatic.github.io/resume/" class="modal-btn modal-btn-primary" target="_blank"><i class="fas fa-rocket"></i> Visit Live Site</a>
                    <a href="https://github.com/drasticstatic/resume" class="modal-btn" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
                </div>
            `
        },
        'my-template-guides': {
            title: 'my-template Workflow Guides',
            description: `
                <div class="project-modal-header">
                    <div class="project-icon-large">🧱</div>
                    <h3>my-template Workflow Guides</h3>
                    <p class="project-role"><strong>Reusable Repo Scaffolding</strong></p>
                </div>
                <div class="project-description">
                    <p><code>my-template/workflow-templates/</code> holds the reference docs every repo in this portfolio was built against — proven patterns and pitfalls, not just boilerplate files.</p>
                </div>
                <h4>🧱 The guides:</h4>
                <ul>
                    <li><a href="https://github.com/drasticstatic/my-template/blob/main/workflow-templates/GITEXPORTER-TO-ACTIONS-SYNC.md" target="_blank"><i class="fab fa-github"></i> GitExporter → GitHub Actions sync pipeline</a></li>
                    <li><a href="https://github.com/drasticstatic/my-template/blob/main/workflow-templates/DETACHED_HEAD_GUIDE.md" target="_blank"><i class="fab fa-github"></i> Detached HEAD guide</a></li>
                    <li><a href="https://github.com/drasticstatic/my-template/blob/main/workflow-templates/nextjs-ssg-ghpages-deploy.md" target="_blank"><i class="fab fa-github"></i> Next.js SSG → GitHub Pages deploy</a></li>
                    <li><a href="https://github.com/drasticstatic/my-template/blob/main/workflow-templates/react-cra-ghpages-deploy.md" target="_blank"><i class="fab fa-github"></i> React (CRA) → GitHub Pages deploy</a></li>
                </ul>
                <div class="project-links">
                    <a href="https://github.com/drasticstatic/my-template/tree/main/workflow-templates" class="modal-btn modal-btn-primary" target="_blank"><i class="fab fa-github"></i> Browse All Templates</a>
                </div>
            `
        }
    };

    const project = projects[projectId];
    if (project && window.modalInstance) {
        window.modalInstance.open(project.description);
    }
}

function openDonateModal() {
    const isConnected = window.WalletManager && window.WalletManager.isConnected;
    const donateContent = `
        <div class="donate-modal">
            <h3>❤️ Support the Work</h3>
            <p>Your support helps build sacred technology that honors human dignity and spiritual growth.</p>
            <div class="payment-options">
                <div class="payment-section">
                    <h4>Peer-to-Peer (P2P) Payment Networks</h4>
                    <div class="payment-links">
                        <a href="https://www.paypal.me/csdubz" target="_blank" class="payment-btn paypal-btn">
                            <i class="fab fa-paypal"></i> PayPal
                        </a>
                        <a href="https://venmo.com/u/Christopher-Wilson-cdubz" target="_blank" class="payment-btn venmo-btn">
                            <span style="font-weight: 800; font-size: 1.1rem; font-style: italic;">V</span> Venmo
                        </a>
                        <a href="https://cash.app/$drasticstatic" target="_blank" class="payment-btn cashapp-btn">
                            <span style="font-weight: 800; font-size: 1.1rem;">$</span> Cash App
                        </a>
                        <a href="https://github.com/sponsors/drasticstatic" target="_blank" class="payment-btn sponsors-btn">
                            <i class="fab fa-github"></i> GitHub Sponsors <span style="opacity: 0.85;">(<i class="fab fa-stripe"></i>)</span>
                        </a>
                    </div>
                </div>
                <div class="payment-section wallet-section">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <h4 style="margin: 0;">Direct via Web3 Wallet</h4>
                            <button onclick="WalletManager.showWalletModal()" class="wallet-info-btn tooltip-above" data-tooltip="Learn about Web3 wallets" style="background: none; border: 1px solid rgba(0,255,255,0.5); border-radius: 50%; width: 24px; height: 24px; color: #00ffff; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-info"></i>
                            </button>
                        </div>
                        <span class="wallet-status-badge ${isConnected ? 'connected' : 'disconnected'}" style="font-size: 0.85rem; padding: 6px 12px; border-radius: 20px; border: 1px solid ${isConnected ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 100, 100, 0.3)'}; background: ${isConnected ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 100, 100, 0.1)'};">
                            <i class="fas ${isConnected ? 'fa-check-circle' : 'fa-wallet'}"></i> <span class="wallet-status-text">${isConnected ? window.WalletManager.formatAddress(window.WalletManager.currentAddress) : 'Not Connected'}</span>
                        </span>
                    </div>
                    <button class="wallet-connect-btn rainbow-cta tooltip-left" data-tooltip="${isConnected ? 'Disconnect your wallet' : 'Connect MetaMask, Rainbow, or other Web3 wallet'}" onclick="${isConnected ? 'WalletManager.disconnect()' : 'connectWallet()'}" style="width: 100%; padding: 15px 20px; display: flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2), rgba(138, 43, 226, 0.2)); border: 2px solid; border-image: linear-gradient(135deg, #ff0080, #00ffff, #8a2be2) 1; border-radius: 12px;">
                        <i class="fas ${isConnected ? 'fa-unlink' : 'fa-wallet'}" style="font-size: 1.5rem; color: ${isConnected ? '#ff6b6b' : '#00ffff'};"></i>
                        <span style="font-size: 1rem; color: #fff;">${isConnected ? 'Disconnect Wallet' : 'Connect Your Web3 Wallet'}</span>
                    </button>
                    <div class="donation-amounts" style="margin-top: 15px;">
                        <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-bottom: 10px; text-align: center;">Quick Send (ETH):</p>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 10px;">
                            <button class="quick-donate-btn tooltip-left" data-tooltip="Send 0.01 ETH (~$25 USD)" onclick="sendDonation(0.01)">0.01 ETH</button>
                            <button class="quick-donate-btn tooltip-left" data-tooltip="Send 0.05 ETH (~$125 USD)" onclick="sendDonation(0.05)">0.05 ETH</button>
                            <button class="quick-donate-btn tooltip-left" data-tooltip="Send 0.1 ETH (~$250 USD)" onclick="sendDonation(0.1)">0.1 ETH</button>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center; justify-content: center; margin-top: 12px;">
                            <input type="number" id="custom-eth-amount" placeholder="Custom amount" step="0.001" min="0.001" style="width: 120px; padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(0,255,255,0.3); background: rgba(0,0,0,0.3); color: #fff; font-size: 0.9rem; text-align: center;">
                            <button class="quick-donate-btn tooltip-left" data-tooltip="Send custom ETH amount" onclick="sendCustomDonation()" style="padding: 10px 16px;">
                                <i class="fab fa-ethereum"></i> Send ETH
                            </button>
                        </div>
                        <p id="tx-demo-badge" style="font-size: 0.75rem; color: rgba(255, 165, 0, 0.8); text-align: center; margin-top: 10px; display: ${isConnected ? 'none' : 'block'};">
                            ⚠️ Demo mode - Connect wallet to send real transactions
                        </p>
                        <div id="gas-indicator" class="tooltip-above" data-tooltip="Current Ethereum mainnet gas price - lower is cheaper" style="font-size: 0.8rem; text-align: center; margin-top: 8px; padding: 6px 12px; background: rgba(0,0,0,0.2); border-radius: 8px; display: inline-block; cursor: help;">
                            <i class="fas fa-gas-pump" style="color: #00ff88;"></i> Loading gas...
                        </div>
                    </div>
                </div>
                <div class="payment-section">
                    <h4>Cryptocurrency Wallet Addresses</h4>
                    <div class="crypto-addresses">
                        <div class="crypto-item">
                            <strong>Cardano (ADA)</strong>
                            <div class="address-container">
                                <input type="text" value="addr1q9f5wu44906hflrh9ce8ts0hnkat6022rw642ehfkcukj3c9cwda6hcsmdvsa0rc7la8jq66lqrzdfenahkey83nla2svpg9nt" readonly onclick="this.select()">
                                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="copy-btn"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                        <div class="crypto-item">
                            <strong>Bitcoin (BTC)</strong>
                            <div class="address-container">
                                <input type="text" value="bc1q9ak9tt7v4m7egv5gfv32g93ghah5tvzh8c7hwh" readonly onclick="this.select()">
                                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="copy-btn"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                        <div class="crypto-item">
                            <strong>Ethereum (ETH)</strong>
                            <div class="address-container">
                                <input type="text" value="0x96F185dB969F3c45EDDff27c73A4880A877BaeF6" readonly onclick="this.select()">
                                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="copy-btn"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                        <div class="crypto-item">
                            <strong>Dogecoin (DOGE)</strong>
                            <div class="address-container">
                                <input type="text" value="D7fQthvuwXxWmRJNo78PHQL6uiWZTFMSnu" readonly onclick="this.select()">
                                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="copy-btn"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                        <div class="crypto-item">
                            <strong>Litecoin (LTC)</strong>
                            <div class="address-container">
                                <input type="text" value="ltc1qy39tw67h8r7c9uk0uydmv79lrkjlenc6p8j7mw" readonly onclick="this.select()">
                                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="copy-btn"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                        <div class="crypto-item">
                            <strong>XRP (Ripple)</strong>
                            <div class="address-container">
                                <input type="text" value="rPjzaK8NS24iwk3m2PtrS81M4X4PgN7EAj" readonly onclick="this.select()">
                                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="copy-btn"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Social Login Section -->
                <div class="payment-section" style="background: linear-gradient(135deg, rgba(255, 0, 128, 0.05), rgba(138, 43, 226, 0.05)); border: 1px solid rgba(255, 0, 128, 0.2); border-radius: 12px; padding: 20px; margin-top: 15px;">
                    <h4 style="color: #ff0080; margin: 0 0 10px 0; text-align: center;"><i class="fas fa-users"></i> Or Connect with Social Login</h4>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; text-align: center; margin-bottom: 15px;">No wallet? Sign in with your existing accounts!</p>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px;">
                        <button onclick="WalletManager.showWeb3AuthModal()" style="padding: 12px; background: rgba(219, 68, 55, 0.2); border: 1px solid rgba(219, 68, 55, 0.5); border-radius: 10px; color: #db4437; cursor: pointer; transition: all 0.3s ease;"><i class="fab fa-google"></i></button>
                        <button onclick="WalletManager.showWeb3AuthModal()" style="padding: 12px; background: rgba(24, 119, 242, 0.2); border: 1px solid rgba(24, 119, 242, 0.5); border-radius: 10px; color: #1877f2; cursor: pointer; transition: all 0.3s ease;"><i class="fab fa-facebook"></i></button>
                        <button onclick="WalletManager.showWeb3AuthModal()" style="padding: 12px; background: rgba(29, 161, 242, 0.2); border: 1px solid rgba(29, 161, 242, 0.5); border-radius: 10px; color: #1da1f2; cursor: pointer; transition: all 0.3s ease;"><i class="fab fa-twitter"></i></button>
                        <button onclick="WalletManager.showWeb3AuthModal()" style="padding: 12px; background: rgba(88, 101, 242, 0.2); border: 1px solid rgba(88, 101, 242, 0.5); border-radius: 10px; color: #5865f2; cursor: pointer; transition: all 0.3s ease;"><i class="fab fa-discord"></i></button>
                    </div>
                    <p style="color: rgba(255,255,255,0.5); font-size: 0.7rem; text-align: center;"><i class="fas fa-shield-alt"></i> Powered by <a href="https://web3auth.io" target="_blank" style="color: #ff0080;">Web3Auth</a></p>
                </div>
            </div>
        </div>
    `;
    if (window.modalInstance) {
        window.modalInstance.open(donateContent);
        // Constrain donate modal width
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '650px';
        }
        // Update gas indicator after modal opens
        if (typeof updateGasIndicator === 'function') {
            setTimeout(updateGasIndicator, 100);
        }
    }
}

function openContactModal() {
    // Determine correct path based on current page location
    const contactPath = window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html';
    const onContactPage = window.location.pathname.endsWith('contact.html');

    const greetings = [
        "🌟 Hello, fellow traveler of the digital mycelium!",
        "🍄 Welcome to the sacred network...",
        "✨ The Oracle senses your presence...",
        "🔮 A connection is forming across the void...",
        "🌌 The network awakens to your call..."
    ];

    const prompts = [
        "What vision calls you to connect?",
        "What sacred technology shall we build together?",
        "How may the mycelium serve your journey?",
        "What questions stir in the depths of your inquiry?",
        "What creation awaits our collaboration?"
    ];

    const contactContent = `
        <div class="contact-modal" style="text-align: center;">
            <div class="typing-container" style="font-size: 1.5rem; color: #00ffff; margin-bottom: 10px; min-height: 60px;">
                <span id="typed-greeting"></span>
            </div>
            <div class="conv-controls" style="display: flex; justify-content: center; align-items: center; gap: 14px; margin-bottom: 20px;">
                <button onclick="conversationCycler.prev()" class="conv-control-btn" aria-label="Previous phrase" title="Previous" style="width: 34px; height: 34px; border-radius: 50%; border: 1px solid rgba(0,255,255,0.4); background: rgba(0,255,255,0.08); color: #00ffff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; transition: all 0.2s ease;">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button onclick="conversationCycler.togglePlay()" id="conv-play-pause" class="conv-control-btn" aria-label="Pause" title="Pause" style="width: 34px; height: 34px; border-radius: 50%; border: 1px solid rgba(0,255,255,0.4); background: rgba(0,255,255,0.08); color: #00ffff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; transition: all 0.2s ease;">
                    <i class="fas fa-pause"></i>
                </button>
                <button onclick="conversationCycler.next()" class="conv-control-btn" aria-label="Next phrase" title="Next" style="width: 34px; height: 34px; border-radius: 50%; border: 1px solid rgba(0,255,255,0.4); background: rgba(0,255,255,0.08); color: #00ffff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; transition: all 0.2s ease;">
                    <i class="fas fa-step-forward"></i>
                </button>
            </div>
            <div id="prompt-container" style="opacity: 0; transition: opacity 0.5s ease;">
                <p style="font-size: 1.1rem; color: rgba(255,255,255,0.9); margin-bottom: 25px;" id="typed-prompt"></p>

                <div class="conversation-options" style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px;">
                    <button onclick="scrollToForm()" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 12px; color: #00ffff; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fas fa-pencil-alt"></i> Write to Me
                    </button>
                    <a href="mailto:drasticstatic@gmail.com" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(255, 0, 128, 0.5); border-radius: 12px; color: #ff0080; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fas fa-envelope"></i> Email Directly
                    </a>
                    <a href="tel:+17175011481" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(0, 255, 136, 0.5); border-radius: 12px; color: #00ff88; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fas fa-phone"></i> Call Me
                    </a>
                    <a href="https://www.linkedin.com/in/christopherwilsonmrt/" target="_blank" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(0, 119, 181, 0.3), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(0, 119, 181, 0.5); border-radius: 12px; color: #0077b5; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fab fa-linkedin"></i> Connect on LinkedIn
                    </a>
                    <a href="https://github.com/drasticstatic" target="_blank" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(255, 255, 255, 0.4); border-radius: 12px; color: #fff; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="https://gravatar.com/christopherdrasticstatic" target="_blank" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(255, 165, 0, 0.2), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(255, 165, 0, 0.5); border-radius: 12px; color: #ffa500; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fas fa-user-circle"></i> Gravatar
                    </a>
                </div>

                <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;"><i class="fas fa-map-marker-alt"></i> York, Pennsylvania, USA</p>

                ${!onContactPage ? `
                <div style="margin-top: 15px;">
                    <a href="${contactPath}" class="btn-primary" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.3), rgba(0, 255, 255, 0.3)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 8px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">Visit Full Contact Page</a>
                </div>` : ''}
            </div>
        </div>
    `;

    if (window.modalInstance) {
        window.modalInstance.open(contactContent);

        if (typeof createSporeRain === 'function') {
            createSporeRain(window.innerWidth / 2, window.innerHeight / 3);
        }

        // Cycle through every greeting/prompt pair (in random order) while the
        // modal stays open, so a one-time visitor sees the whole suite instead
        // of just whichever single pair happened to be picked at random. The
        // play/pause/back/forward controls let a visitor take the wheel.
        setTimeout(() => {
            conversationCycler.init(greetings, prompts);
        }, 300);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Drives the greeting/prompt typing carousel in the contact modal. Only the
// title/subtitle text retypes on each pass — the buttons/info area fades in
// once on the first pass and then stays put, so nothing in the modal
// disappears or flashes while a visitor might be reaching for a button.
// Exposed on window so the modal's play/pause/back/forward buttons (inline
// onclick handlers) can reach it.
window.conversationCycler = {
    greetings: [],
    prompts: [],
    order: [],
    index: 0,
    paused: false,
    readyForNext: false,
    everShown: false,
    holdTimeout: null,

    init(greetings, prompts) {
        clearTimeout(this.holdTimeout);
        this.greetings = greetings;
        this.prompts = prompts;
        this.order = shuffle([...greetings.keys()]);
        this.index = 0;
        this.paused = false;
        this.readyForNext = false;
        this.everShown = false;
        this.updateIcon();
        this.render();
    },

    render() {
        const greetingEl = document.getElementById('typed-greeting');
        const promptEl = document.getElementById('typed-prompt');
        const promptContainer = document.getElementById('prompt-container');
        if (!greetingEl || !promptEl || !promptContainer) return;

        const i = this.order[this.index];
        typeText('typed-greeting', this.greetings[i], 50, () => {
            if (!document.getElementById('typed-greeting')) return;
            if (!this.everShown) {
                promptContainer.style.opacity = '1';
                this.everShown = true;
            }
            typeText('typed-prompt', this.prompts[i], 40, () => {
                if (!document.getElementById('typed-prompt')) return;
                this.readyForNext = true;
                this.scheduleAdvance();
            });
        });
    },

    scheduleAdvance() {
        clearTimeout(this.holdTimeout);
        if (this.paused) return;
        this.holdTimeout = setTimeout(() => {
            this.readyForNext = false;
            this.index = (this.index + 1) % this.order.length;
            this.render();
        }, 3500);
    },

    togglePlay() {
        this.paused = !this.paused;
        this.updateIcon();
        if (this.paused) {
            clearTimeout(this.holdTimeout);
        } else if (this.readyForNext) {
            this.scheduleAdvance();
        }
    },

    prev() {
        clearTimeout(this.holdTimeout);
        this.readyForNext = false;
        this.index = (this.index - 1 + this.order.length) % this.order.length;
        this.render();
    },

    next() {
        clearTimeout(this.holdTimeout);
        this.readyForNext = false;
        this.index = (this.index + 1) % this.order.length;
        this.render();
    },

    updateIcon() {
        const btn = document.getElementById('conv-play-pause');
        if (!btn) return;
        btn.innerHTML = this.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        btn.setAttribute('aria-label', this.paused ? 'Play' : 'Pause');
        btn.setAttribute('title', this.paused ? 'Play' : 'Pause');
    }
};

// Typing effect helper (also defined in contact.js for pages that load both; kept in sync).
// Each element tracks its own call token so a newer typeText() call on the same
// elementId (e.g. clicking back/forward mid-animation) cancels any in-flight one
// instead of both writing to the element at once.
function typeText(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const token = (element._typeToken = (element._typeToken || 0) + 1);
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (element._typeToken !== token) return;
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Scroll to the on-page contact form if present (contact.html); otherwise navigate to the full contact page
function scrollToForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        if (window.modalInstance) {
            window.modalInstance.close();
        }
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
        }, 500);
    } else {
        const contactPath = window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html';
        window.location.href = `${contactPath}#contactForm`;
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('✓ Address copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert('✓ Address copied to clipboard!');
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
        alert('Copy failed. Please select and copy manually.');
    }
    document.body.removeChild(textArea);
}

function openGlossaryModal() {
    const glossaryContent = `
        <div class="glossary-modal">
            <h3>📚 Web3 & Sacred Technology Glossary</h3>
            <div class="glossary-terms">
                <div class="term-item" onclick="openTermModal('zero-knowledge')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>Zero-Knowledge:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('mpc')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>MPC:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('soulbound')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>Soulbound:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('dao')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>DAO:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('mycelial')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>Mycelial:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('aleo')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>Aleo:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('defi')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>DeFi:</strong> Click to learn more</div>
                <div class="term-item" onclick="openTermModal('ritual')" style="cursor: pointer; padding: 10px; border-radius: 8px; margin: 5px 0; transition: background 0.3s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,0,128,0.1)'" onmouseout="this.style.background='transparent'"><strong>Ritual Intelligence:</strong> Click to learn more</div>
            </div>
            <div class="glossary-actions">
                <a href="pages/glossary.html" class="glossary-link btn-primary" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 8px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">📖 View Full Glossary</a>
            </div>
        </div>
    `;
    
    if (window.modalInstance) {
        window.modalInstance.open(glossaryContent);
    }
}

function openTermModal(termId) {
    const terms = {
        'zero-knowledge': {
            title: 'Zero-Knowledge Proofs',
            content: 'Cryptographic protocols that allow one party to prove to another that they know a value, without conveying any information apart from the fact that they know the value. Essential for privacy-preserving blockchain applications.'
        },
        'mpc': {
            title: 'Multi-Party Computation (MPC)',
            content: 'Cryptographic technique that enables multiple parties to jointly compute a function over their inputs while keeping those inputs private. Used for secure key management and distributed governance.'
        },
        'soulbound': {
            title: 'Soulbound Tokens',
            content: 'Non-transferable NFTs that represent identity, achievements, or credentials tied to a specific wallet or person. They cannot be sold or transferred, making them ideal for reputation systems.'
        },
        'dao': {
            title: 'Decentralized Autonomous Organization',
            content: 'An organization governed by smart contracts and token holders rather than traditional management structures. Decisions are made through community voting and executed automatically.'
        },
        'mycelial': {
            title: 'Mycelial Networks',
            content: 'Organizational structures inspired by fungal networks, emphasizing decentralized, interconnected nodes that share resources and information organically rather than hierarchically.'
        },
        'aleo': {
            title: 'Aleo Platform',
            content: 'A privacy-focused blockchain platform that uses zero-knowledge proofs to enable private smart contracts and applications while maintaining verifiability and decentralization.'
        },
        'defi': {
            title: 'Decentralized Finance',
            content: 'Financial services built on blockchain technology that operate without traditional intermediaries like banks, enabling peer-to-peer lending, trading, and other financial activities.'
        },
        'ritual': {
            title: 'Ritual Intelligence',
            content: 'AI systems designed to support spiritual practices, ceremony guidance, and community wisdom synthesis. Combines machine learning with sacred technology principles.'
        },
        'nft': {
            title: 'Non-Fungible Tokens',
            content: 'Unique digital assets that represent ownership of specific items or content on the blockchain. Unlike cryptocurrencies, each NFT has distinct properties and cannot be exchanged on a one-to-one basis.'
        },
        'privacy': {
            title: 'Privacy-Preserving Technology',
            content: 'Technologies that protect user data and maintain confidentiality while still enabling verification and functionality. Essential for maintaining human dignity in digital systems.'
        },
        'web3': {
            title: 'Web3',
            content: 'The next evolution of the internet built on blockchain technology, emphasizing decentralization, user ownership, and peer-to-peer interactions without intermediaries.'
        },
        'smart-contracts': {
            title: 'Smart Contracts',
            content: 'Self-executing contracts with terms directly written into code. Automatically execute when predetermined conditions are met, eliminating need for intermediaries.'
        },
        'ethereum': {
            title: 'Ethereum',
            content: 'Decentralized blockchain platform enabling smart contracts and decentralized applications (dApps). Uses Ether (ETH) as native cryptocurrency.'
        },
        'blockchain': {
            title: 'Blockchain',
            content: 'Distributed ledger technology that maintains a continuously growing list of records (blocks) linked and secured using cryptography.'
        },
        'cryptocurrency': {
            title: 'Cryptocurrency',
            content: 'Digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit. Operates independently of central banks.'
        },
        'dapp': {
            title: 'dApp (Decentralized Application)',
            content: 'Application that runs on a decentralized network, typically blockchain, rather than centralized servers. Offers censorship resistance and user control.'
        },
        'wallet': {
            title: 'Crypto Wallet',
            content: 'Digital tool for storing, sending, and receiving cryptocurrencies. Contains public and private keys for blockchain transactions.'
        },
        'gas': {
            title: 'Gas Fees',
            content: 'Transaction fees paid to blockchain validators for processing and confirming transactions. Varies based on network congestion and complexity.'
        },
        'consensus': {
            title: 'Consensus Mechanism',
            content: 'Protocol used by blockchain networks to agree on the validity of transactions. Common types include Proof of Work and Proof of Stake.'
        },
        'tokenomics': {
            title: 'Tokenomics',
            content: 'Economic model and incentive structure of a cryptocurrency token, including supply, distribution, utility, and governance mechanisms.'
        },
        'yield-farming': {
            title: 'Yield Farming',
            content: 'DeFi strategy of lending or staking cryptocurrency to earn rewards, often in the form of additional tokens or interest payments.'
        },
        'liquidity-pool': {
            title: 'Liquidity Pool',
            content: 'Collection of funds locked in smart contracts to facilitate decentralized trading and lending. Users provide liquidity in exchange for fees.'
        },
        'oracle': {
            title: 'Blockchain Oracle',
            content: 'Service that connects blockchains to external data sources, enabling smart contracts to access real-world information.'
        },
        'layer2': {
            title: 'Layer 2 Solutions',
            content: 'Scaling solutions built on top of existing blockchains to increase transaction throughput and reduce fees while maintaining security.'
        },
        'interoperability': {
            title: 'Blockchain Interoperability',
            content: 'Ability of different blockchain networks to communicate and share data with each other, enabling cross-chain transactions and applications.'
        },
        'governance-token': {
            title: 'Governance Token',
            content: 'Cryptocurrency that gives holders voting rights in decentralized protocols, allowing community-driven decision making and protocol upgrades.'
        }
    };
    
    const term = terms[termId];
    if (term && window.modalInstance) {
        const termContent = `
            <div class="term-modal">
                <h3>${term.title}</h3>
                <p>${term.content}</p>
                <div class="modal-actions">
                    <button onclick="openGlossaryModal()" class="btn-secondary">← Back to Glossary</button>
                    <a href="pages/glossary.html" class="btn-primary" style="margin-left: 10px; display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 8px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">📖 View Full Glossary</a>
                </div>
            </div>
        `;
        window.modalInstance.open(termContent);
    } else {
        // Show loading for undefined terms
        const loadingContent = `
            <div class="term-modal">
                <h3>Loading definition...</h3>
                <p>This term is being added to our glossary.</p>
                <div class="modal-actions">
                    <button onclick="openGlossaryModal()" class="btn-secondary">← Back to Glossary</button>
                </div>
            </div>
        `;
        if (window.modalInstance) {
            window.modalInstance.open(loadingContent);
        }
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

function openACIMModal() {
    const acimContent = `
        <div class="acim-modal" style="max-width: 700px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; margin: 0 auto 15px; background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(0, 255, 255, 0.3)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-book-open" style="font-size: 2rem; color: #00ffff;"></i>
                </div>
                <h2 style="background: linear-gradient(135deg, #8a2be2, #00ffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">Teaching as Learning</h2>
                <p style="color: rgba(255,255,255,0.6); margin-top: 5px;"><em>Service as Practice</em></p>
            </div>

            <div style="line-height: 1.8; color: rgba(255,255,255,0.85);">
                <p>&nbsp;&nbsp;In service to the realm of technically precise engineering, creative explorative expression, and/or healing: I understand life and labor as guided through the practice of teaching as learning — a principle articulated in <em>A Course in Miracles (ACIM)</em> that understands teaching not as authority or instruction, but as learning made visible through giving and receiving, service as the medium through which understanding deepens.</p>

                <blockquote style="border-left: 3px solid rgba(0, 255, 255, 0.8); padding-left: 20px; margin: 25px 0; font-style: italic; color: rgba(138, 43, 226, 0.9);">
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">"Only by teaching it can you learn it. 'As you teach so will you learn.' If that is true, and it is true indeed, do not forget that what you teach is teaching you. And what you project or extend you believe."</p>
                    <cite style="font-style: normal; font-size: 0.9rem; color: rgba(133,77,222,0.6);">&nbsp;&nbsp;&nbsp;&nbsp;~ T-6.III.2:6-9</cite>
                </blockquote>

                <p>&nbsp;&nbsp;In this framework, a "teacher" is not defined by credentials, certainty, or belief, but by a practical decision: to no longer treat one's interests as separate from another's. From that choiceless choice, direction emerges naturally—not through force or coercion, but through consistency, humility, and the willingness to establish shared responsibility.</p>


                <blockquote style="border-left: 3px solid rgba(138, 43, 226, 0.8); padding-left: 20px; margin: 25px 0; font-style: italic; color: rgba(0, 255, 255, 0.9);">
                    <p style="font-size: 1.0rem; color: rgba(55, 222, 222, 0.8);">"A teacher of God is anyone who chooses to be one. His qualifications consist solely in this; somehow, somewhere he has made a deliberate choice in which he did not see his interests as apart from someone else's. Once he has done that, his road is established and his direction is sure. A light has entered the darkness."</p>
                    <cite style="font-style: normal; font-size: 0.9rem; color: rgba(55,222,222,0.6);">&nbsp;&nbsp;&nbsp;&nbsp;~ M-1.1:1-4</cite>
                </blockquote>

                <p>&nbsp;&nbsp;The <em>Manual for Teachers</em> describes this moment as simple yet decisive—a willingness to choose shared interest over separation. From that choice, direction emerges naturally. A small light enters, and that is enough. Teaching, in this sense, is not about fixing, persuading, or correcting, but about standing for an alternative way of relating—one rooted in cooperation, remembrance, and trust rather than control.</p>
                <br/>
                <p>&nbsp;&nbsp;The work, as I understand it, is not to supply an answer or remedy but to remind ourselves of what Answer is already present and available when our minds are vacant; Not intervention looking to repair, convince, correct and/or persuade one another with an occupied mind but rather a soft joining, witnessing each other coming to truth.</p>

                <blockquote style="border-left: 3px solid rgba(0, 255, 255, 0.8); padding-left: 20px; margin: 25px 0; font-style: italic; color: rgba(138, 43, 226, 0.9);">
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.9);">"They stand for the Alternative. With God's Word in their minds they come in benediction, not to heal the sick but to remind them of the remedy God has already given them. It is not their hands that heal. It is not their voice that speaks the Word of God. They merely give what has been given them."</p>
                    <cite style="font-style: normal; font-size: 0.9rem; color: rgba(133,77,222,0.6);">&nbsp;&nbsp;&nbsp;&nbsp;~ M-5.III.2:6-10</cite>
                </blockquote>

                <p>&nbsp;&nbsp;I do not interpret this as religious authority, title, or special calling, but as a discipline of integrity: aligning thought, action, and service so that work—whether technical, creative, or relational—becomes a shared practice rather than a personal claim.</p>
                <br/>
                <p>&nbsp;&nbsp;This practice shows up quietly and practically in my work. Whether designing systems, writing code, collaborating with others, or navigating human complexity, I aim to learn openly, offer what I'm learning honestly, and allow service to consistently refine understanding. Teaching and learning are not separate activities here, but a single, ongoing movement allowing thought, action, and service to inform one another.</p>

                <blockquote style="border-left: 3px solid rgba(138, 43, 226, 0.8); padding-left: 20px; margin: 25px 0; font-style: italic; color: rgba(0, 255, 255, 0.9);">
                    <p style="font-size: 1.0rem; color: rgba(55, 222, 222, 0.8);">"Every good teacher hopes to give his students so much of his own learning that they will one day no longer need him. This is the one true goal of the teacher."</p>
                    <cite style="font-style: normal; font-size: 0.9rem; color: rgba(55,222,222,0.6);">&nbsp;&nbsp;&nbsp;&nbsp;~ T-4.I.5:1-2</cite>
                </blockquote>

                <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(0, 255, 255, 0.1)); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 12px; padding: 20px; margin-top: 25px; text-align: center;">
                    <p style="margin: 15px 0 0 0; color: #7c3aed; font-weight: 555;">Teaching, as I understand it, is something we enter together.</p>
                    <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.8); font-weight: 777;">If this way of working resonates — if you're interested in building, learning, or creating in a way that honors shared interest over separation — I welcome collaboration.</p>
                    <p style="margin: 15px 0 0 0; color: #00ffff; font-weight: 333; font-style: italic; font-size: 1.0rem;">"Teacher and pupil, therapist and patient, are all insane or they would not be here. Together they can find a pathway out, for no one will find sanity alone." ~ P-2.II.5:6-7</p>
                </div>
            </div>
            <div style="line-height: 1.8; color: rgba(255,255,255,0.85);">
                <blockquote style="border-left: 3px solid rgba(0, 255, 255, 0.8); padding-left: 20px; margin: 25px 0; text-align: center; font-style: italic; color: rgba(138, 43, 226, 0.9);">
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">"I am here only to be truly helpful.
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">I am here to represent Him Who sent me.
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">I do not have to worry about what to say or what to do,
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">because He Who sent me will direct me.
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">I am content to be wherever He wishes, knowing He goes there with me.
                    <p style="font-size: 1.0rem; color: rgba(133, 77, 222, 0.8);">I will be healed as I let Him teach me to heal."</p>
                    <cite style="font-style: normal; font-size: 0.5rem; color: rgba(133,77,222,0.6);">&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://acim.org/acim/en/s/66#18:2-6" target="_blank" style="color: #00ffff; text-decoration: underline dotted;">~&nbsp;&nbsp;T-2.V-A.18:2-6</a></cite>
                </blockquote>
            </div>
            <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <a href="https://acim.org/" target="_blank" class="magnetize-btn" style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(0, 255, 255, 0.2)); border: 1px solid rgba(0, 255, 255, 0.5); border-radius: 12px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">
                    <i class="fas fa-external-link-alt"></i> Explore A Course in Miracles
                </a>
            </div>
        </div>
    `;

    if (window.modalInstance) {
        window.modalInstance.open(acimContent);
        // Constrain modal width to fit content better
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '700px';
        }
    }
}

function openGuidedMeditationModal() {
    const meditationContent = `
        <div class="meditation-modal" style="max-width: 720px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; margin: 0 auto 15px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(138, 43, 226, 0.3)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-pray" style="font-size: 2rem; color: #00ff88;"></i>
                </div>
                <h2 style="background: linear-gradient(135deg, #00ff88, #8a2be2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">The Offering</h2>
                <p style="color: rgba(255,255,255,0.6); margin-top: 5px;"><em>A Guided Meditation • Mycelial, Psychedelic, Christ-Harmonic</em></p>
            </div>

            <p style="text-align: center; color: rgba(255,255,255,0.7); font-style: italic; margin-bottom: 25px;">A contemplative practice for metabolizing gratitude and remembering your belonging in the sacred network.</p>

            <!-- Full Meditation Text -->
            <div style="background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(138, 43, 226, 0.05)); border: 1px solid rgba(0, 255, 136, 0.2); border-radius: 12px; padding: 25px; margin-bottom: 20px; line-height: 1.9;">
                <p style="color: rgba(255,255,255,0.9);"><strong style="color: #00ff88;">Begin by finding a comfortable posture.</strong><br>Let your shoulders drop. Let your breath loosen its armor.</p>

                <p style="color: rgba(255,255,255,0.85);">Close your eyes, not to shut the world out, but to open yourself to the world within.</p>

                <p style="color: rgba(255,255,255,0.85);">Take a slow inhale through the nose... and exhale gently through the mouth.</p>

                <p style="color: rgba(255,255,255,0.85);">Now imagine the inside of your chest as a forest floor. Soft earth. Rich soil. A place where everything that has ever happened to you has been composted into wisdom.</p>

                <p style="color: rgba(255,255,255,0.85);">In this soil, the holy mycelium begins to glimmer — threads of living light, branching, breathing, listening.</p>

                <p style="color: rgba(255,255,255,0.85);">These threads represent everything you are connected to: your family, your community, your ancestors, the people you will help tomorrow, and the quiet presence of Christ who walks with you even when you forget He is there.</p>

                <p style="color: rgba(255,255,255,0.85);">Feel the network beneath you, beneath your story, beneath your breath.</p>

                <p style="color: rgba(255,255,255,0.85);">Now gently bring to mind something you are grateful for today — not something grand or impressive, but something real: warm light, a friend's voice, music that touched you, forgiveness that visited unexpectedly.</p>

                <p style="color: rgba(255,255,255,0.85);">Hold that gratitude like a small fruit in your hands — glowing, fragrant, alive.</p>

                <p style="color: rgba(255,255,255,0.9);"><strong style="color: #8a2be2;">And now — offer it.</strong> Not outward, not upward, but <strong>inward to the network</strong> that nourishes everything.</p>

                <p style="color: rgba(255,255,255,0.85);">Let your offering sink into the soil. Let it travel through the mycelium. Let it reach those who need its nourishment.</p>

                <p style="color: rgba(255,255,255,0.85);">Know this: in a universe held together by love, no offering is lost. All gratitude circulates. All blessings return multiplied. All fruit eventually ripens into a revelation of who you truly are.</p>

                <p style="color: rgba(255,255,255,0.85);">Take one last slow breath... And when you're ready, open your eyes, remembering that the network remains, Christ remains, and your offering continues to glow beneath your steps.</p>
            </div>

            <!-- Timed Practice Guide -->
            <details style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(0, 255, 255, 0.1)); border: 1px solid rgba(138, 43, 226, 0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                <summary style="cursor: pointer; color: #8a2be2; font-weight: 600;"><i class="fas fa-clock"></i> Timed Practice Guide (12 minutes)</summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <div style="padding: 10px 15px; border-left: 3px solid rgba(0, 255, 136, 0.5); margin-bottom: 10px;">
                        <strong style="color: #00ff88;">Grounding (2 min):</strong> Feel your connection to the earth. Imagine roots extending into the soil, connecting to the mycelial network.
                    </div>
                    <div style="padding: 10px 15px; border-left: 3px solid rgba(138, 43, 226, 0.5); margin-bottom: 10px;">
                        <strong style="color: #8a2be2;">Remembering (3 min):</strong> Bring to mind something you are grateful for today. Hold this gratitude in your heart.
                    </div>
                    <div style="padding: 10px 15px; border-left: 3px solid rgba(0, 255, 255, 0.5); margin-bottom: 10px;">
                        <strong style="color: #00ffff;">Offering (3 min):</strong> Place this gratitude on an altar. See it dissolving into light, traveling through the mycelial threads.
                    </div>
                    <div style="padding: 10px 15px; border-left: 3px solid rgba(255, 0, 128, 0.5); margin-bottom: 10px;">
                        <strong style="color: #ff0080;">Receiving (2 min):</strong> Open yourself to receive. Feel the gratitude of the network flowing back to you.
                    </div>
                    <div style="padding: 10px 15px; border-left: 3px solid rgba(255, 215, 0, 0.5);">
                        <strong style="color: #ffd700;">Integration (2 min):</strong> Bring awareness back to your body. When ready, open your eyes.
                    </div>
                </div>
            </details>

            <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(0, 255, 136, 0.15)); border: 1px solid rgba(138, 43, 226, 0.4); border-radius: 12px; padding: 20px; text-align: center;">
                <p style="color: rgba(255,255,255,0.9); font-style: italic; margin: 0 0 10px 0;"><i class="fas fa-infinity"></i> Practice daily. The network is always listening.</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.location.href='${window.location.pathname.includes('/pages/') ? '' : 'pages/'}resources.html#contemplative'" class="magnetize-btn" style="padding: 12px 24px; border-radius: 12px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); color: #00ffff; font-size: 1rem; cursor: pointer;">
                    <i class="fas fa-book-open"></i> More Contemplative Resources
                </button>
            </div>
        </div>
    `;

    if (window.modalInstance) {
        window.modalInstance.open(meditationContent);
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '750px';
        }
    }
}

function openManifestoModalFull() {
    const manifestoContent = `
        <div class="manifesto-modal-full" style="max-width: 700px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; margin: 0 auto 15px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.3), rgba(0, 255, 255, 0.3)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-scroll" style="font-size: 2rem; color: #ff0080;"></i>
                </div>
                <h2 style="background: linear-gradient(135deg, #ff0080, #00ffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">Personal Manifesto</h2>
                <p style="color: rgba(255,255,255,0.6); margin-top: 5px;"><em>Declarations of Intent</em></p>
            </div>

            <div style="line-height: 1.9; color: rgba(255,255,255,0.85);">
                <div style="background: linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(0, 255, 255, 0.1)); border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                    <p style="font-size: 1.1rem; margin: 0;">Technology, like music and mycelium, can become a vessel for the sacred. Systems can be designed to honor the dignity of the human soul — rooted in privacy, gratitude, humility, and compassion.</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h4 style="color: #ff0080; margin: 0 0 10px 0;"><i class="fas fa-crosshairs"></i> Precision matters.</h4>
                    <p>The same care once required to machine aerospace-grade components now shapes decentralized architectures, cryptographic systems, and ritual intelligence — where every detail carries intention and consequence.</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h4 style="color: #00ffff; margin: 0 0 10px 0;"><i class="fas fa-music"></i> Harmony reveals truth.</h4>
                    <p>Just as every note finds its place in a larger composition, every individual carries a unique frequency that contributes to the symphony of creation — a symphony conducted not by control, but by love.</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h4 style="color: #00ff88; margin: 0 0 10px 0;"><i class="fas fa-project-diagram"></i> The mycelial model offers a blueprint for healthy systems.</h4>
                    <p>Interdependence without domination. Resilience without centralization. Growth through mutual nourishment.</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h4 style="color: #8a2be2; margin: 0 0 10px 0;"><i class="fas fa-door-open"></i> Psychedelic insight serves as a doorway, not a destination.</h4>
                    <p>Transformation becomes enduring only when integrated through Christ, embodied through service, and expressed through daily gratitude.</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h4 style="color: #ffd700; margin: 0 0 10px 0;"><i class="fas fa-brain"></i> Creation carries hidden intelligence.</h4>
                    <p>The same patterns appear in metal shavings, musical overtones, zero-knowledge circuits, and fungal networks — all pointing toward a unifying Logos that holds everything together.</p>
                </div>

                <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(255, 0, 128, 0.15)); border: 1px solid rgba(255, 0, 128, 0.4); border-radius: 12px; padding: 25px; text-align: center;">
                    <p style="font-size: 1.1rem; margin: 0 0 15px 0; color: rgba(255,255,255,0.9);">This work exists to build technology that brings people home — to themselves, to one another, and to the Source from which all coherence flows.</p>
                    <p style="font-size: 1.2rem; font-weight: 600; margin: 0; color: #ff0080;">This is the offering.</p>
                </div>

                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="window.location.href='${window.location.pathname.includes('/pages/') ? '' : 'pages/'}resources.html#contemplative'" class="magnetize-btn" style="padding: 12px 24px; border-radius: 12px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); color: #00ffff; font-size: 1rem; cursor: pointer;">
                        <i class="fas fa-book-open"></i> More Contemplative Resources
                    </button>
                </div>
            </div>
        </div>
    `;

    if (window.modalInstance) {
        window.modalInstance.open(manifestoContent);
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '750px';
        }
    }
}