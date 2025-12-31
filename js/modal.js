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
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }

        // Close modal when clicking outside (on the modal backdrop)
        if (this.modal) {
            this.modal.addEventListener('click', (event) => {
                // Only close if clicking directly on the modal backdrop, not its children
                if (event.target === this.modal) {
                    this.close();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal && this.modal.style.display === 'block') {
                this.close();
            }
        });
    }

    open(content) {
        this.modalBody.innerHTML = content;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add liquid glass effect
        const modalContent = document.querySelector('.modal-content');
        if (modalContent && !modalContent.classList.contains('liquid-glass')) {
            modalContent.classList.add('liquid-glass');
        }

        // Spore rain on modal open
        if (typeof createSporeRain === 'function') {
            createSporeRain(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Spore rain on modal close
        if (typeof createSporeRain === 'function') {
            createSporeRain(window.innerWidth / 2, window.innerHeight / 2);
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
                    <a href="https://github.com/drasticstatic" class="modal-btn" target="_blank">View on GitHub</a>
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

                <h4>🔧 Technical Expertise:</h4>
                <div class="tech-stack-modal">
                    <span class="tech-tag">Mazak Mazatrol</span>
                    <span class="tech-tag">Mastercam</span>
                    <span class="tech-tag">FeatureCAM</span>
                    <span class="tech-tag">G-code</span>
                    <span class="tech-tag">ISO-9001</span>
                    <span class="tech-tag">AS9100</span>
                    <span class="tech-tag">ITAR</span>
                </div>

                <h4>🏢 Companies:</h4>
                <ul>
                    <li><strong>Jones Manufacturing</strong> - Current position, aerospace & defense</li>
                    <li><strong>TAIT Towers</strong> - Entertainment automation systems</li>
                    <li><strong>Billet Industries</strong> - Precision machining</li>
                </ul>

                <div class="project-links">
                    <a href="https://www.jonesmanufacturingyorkpa.com" class="modal-btn" target="_blank">Jones Manufacturing</a>
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
    const donateContent = `
        <div class="donate-modal">
            <h3>❤️ Support the Work</h3>
            <p>Your support helps build sacred technology that honors human dignity and spiritual growth.</p>
            
            <div class="payment-options">
                <div class="payment-section">
                    <h4>Quick Payment</h4>
                    <div class="payment-links">
                        <a href="https://www.paypal.me/csdubz" target="_blank" class="payment-btn paypal-btn">
                            <i class="fab fa-paypal"></i> PayPal
                        </a>
                        <a href="https://venmo.com/u/Christopher-Wilson-cdubz" target="_blank" class="payment-btn venmo-btn">
                            Venmo
                        </a>
                    </div>
                </div>
                
                <div class="payment-section">
                    <h4>Cryptocurrency</h4>
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
                
                <div class="payment-section">
                    <h4>Web3 Wallet</h4>
                    <button class="wallet-connect-btn" onclick="alert('Wallet connect coming soon! For now, please copy and use the addresses above.')">
                        <i class="fas fa-wallet"></i> Connect Wallet (Demo Mode)
                    </button>
                    <p class="demo-note">Live wallet integration coming soon via ThirdWeb</p>
                </div>
            </div>
        </div>
    `;
    
    if (window.modalInstance) {
        window.modalInstance.open(donateContent);
    }
}

function openContactModal() {
    // Determine correct path based on current page location
    const contactPath = window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html';

    const contactContent = `
        <div class="contact-modal">
            <h3>📬 Start a Conversation</h3>
            <p>I'd love to hear from you. Whether you're interested in sacred technology, precision engineering, or spiritual-technical innovation, let's connect.</p>

            <div class="contact-options">
                <div class="contact-section">
                    <h4>Direct Contact</h4>
                    <div class="contact-links">
                        <a href="mailto:drasticstatic@gmail.com" class="contact-btn email-btn">
                            <i class="fas fa-envelope"></i> Email Me
                        </a>
                        <a href="tel:+17175011481" class="contact-btn phone-btn">
                            <i class="fas fa-phone"></i> Call Me
                        </a>
                    </div>
                </div>

                <div class="contact-section">
                    <h4>Social & Professional</h4>
                    <div class="contact-links">
                        <a href="https://www.linkedin.com/in/christopherwilsonmrt/" target="_blank" class="contact-btn linkedin-btn">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <a href="https://github.com/drasticstatic" target="_blank" class="contact-btn github-btn">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>

                <div class="contact-section">
                    <h4>Location</h4>
                    <p style="color: rgba(255,255,255,0.8);"><i class="fas fa-map-marker-alt"></i> York, Pennsylvania, USA</p>
                </div>
            </div>

            <div class="contact-cta" style="margin-top: 20px; text-align: center;">
                <a href="${contactPath}" class="btn-primary" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.3), rgba(0, 255, 255, 0.3)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 8px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">Visit Full Contact Page</a>
            </div>
        </div>
    `;

    if (window.modalInstance) {
        window.modalInstance.open(contactContent);
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