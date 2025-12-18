// Modal System for Portfolio Content

// Donate Modal
function openDonateModal() {
    const modalContent = `
        <div class="donate-modal">
            <h2 class="modal-title rainbow-text">Support Sacred Technology</h2>
            <p class="modal-subtitle">Help fund the development of spiritual-technological systems</p>
            
            <div class="donation-options">
                <div class="donation-section">
                    <h3>Quick Links</h3>
                    <div class="donation-links">
                        <a href="https://www.paypal.me/csdubz" target="_blank" class="donation-link">
                            <i class="fab fa-paypal"></i> PayPal
                        </a>
                        <a href="https://venmo.com/u/Christopher-Wilson-cdubz" target="_blank" class="donation-link">
                            <i class="fas fa-mobile-alt"></i> Venmo
                        </a>
                    </div>
                </div>
                
                <div class="donation-section">
                    <h3>Crypto Wallets</h3>
                    <div class="wallet-addresses">
                        <div class="wallet-item">
                            <span class="wallet-label">Bitcoin</span>
                            <div class="wallet-address">
                                <span class="address">bc1q9ak9tt7v4m7egv5gfv32g93ghah5tvzh8c7hwh</span>
                                <button class="copy-btn" onclick="copyToClipboard('bc1q9ak9tt7v4m7egv5gfv32g93ghah5tvzh8c7hwh')">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="wallet-item">
                            <span class="wallet-label">Ethereum</span>
                            <div class="wallet-address">
                                <span class="address">0x96F185dB969F3c45EDDff27c73A4880A877BaeF6</span>
                                <button class="copy-btn" onclick="copyToClipboard('0x96F185dB969F3c45EDDff27c73A4880A877BaeF6')">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="wallet-item">
                            <span class="wallet-label">Cardano</span>
                            <div class="wallet-address">
                                <span class="address">addr1q9f5wu44906hflrh9ce8ts0hnkat6022rw642ehfkcukj3c9cwda6hcsmdvsa0rc7la8jq66lqrzdfenahkey83nla2svpg9nt</span>
                                <button class="copy-btn" onclick="copyToClipboard('addr1q9f5wu44906hflrh9ce8ts0hnkat6022rw642ehfkcukj3c9cwda6hcsmdvsa0rc7la8jq66lqrzdfenahkey83nla2svpg9nt')">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="wallet-item">
                            <span class="wallet-label">Dogecoin</span>
                            <div class="wallet-address">
                                <span class="address">D7fQthvuwXxWmRJNo78PHQL6uiWZTFMSnu</span>
                                <button class="copy-btn" onclick="copyToClipboard('D7fQthvuwXxWmRJNo78PHQL6uiWZTFMSnu')">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="donation-section">
                    <h3>Web3 Connect</h3>
                    <button class="wallet-connect-main" onclick="connectWallet()">
                        <i class="fas fa-wallet"></i> Connect Wallet
                    </button>
                    <p class="connect-note">Connect your wallet to send funds directly</p>
                </div>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

// Contact Modal
function openContactModal() {
    const modalContent = `
        <div class="contact-modal">
            <h2 class="modal-title rainbow-text">Start a Sacred Conversation</h2>
            <p class="modal-subtitle">Let's explore the intersection of technology and spirituality</p>
            
            <div class="contact-options">
                <div class="contact-method">
                    <i class="fas fa-envelope fa-2x"></i>
                    <h3>Email</h3>
                    <a href="mailto:drasticstatic@gmail.com">drasticstatic@gmail.com</a>
                </div>
                
                <div class="contact-method">
                    <i class="fas fa-phone fa-2x"></i>
                    <h3>Phone</h3>
                    <a href="tel:+17173091570">+1 (717) 309-1570</a>
                    <a href="https://wa.me/17173091570" class="whatsapp-link">
                        <i class="fab fa-whatsapp"></i> WhatsApp (International)
                    </a>
                </div>
                
                <div class="contact-method">
                    <i class="fas fa-map-marker-alt fa-2x"></i>
                    <h3>Location</h3>
                    <p>York, Pennsylvania, USA</p>
                </div>
            </div>
            
            <div class="contact-form">
                <h3>Send a Message</h3>
                <form class="modern-form">
                    <input type="text" placeholder="Your Name" class="form-input">
                    <input type="email" placeholder="Your Email" class="form-input">
                    <textarea placeholder="Your Message" class="form-textarea"></textarea>
                    <button type="submit" class="form-submit">Send Message</button>
                </form>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

// Blog Modal
function openBlogModal(postId) {
    const posts = {
        'mycelial-web': {
            title: 'The Mycelial Web',
            content: 'In the quiet depths of forest floors, mycelial networks demonstrate principles of decentralized coordination that blockchain developers are only beginning to understand...'
        },
        'microns-mysticism': {
            title: 'From Microns to Mysticism',
            content: 'How eighteen years of precision machining taught me about patience, intention, and the sacred geometry underlying both metal and code...'
        },
        'zk-spiritual': {
            title: 'Zero-Knowledge as Spiritual Practice',
            content: 'Why privacy-preserving cryptography mirrors contemplative traditions of knowing without revealing...'
        }
    };
    
    const post = posts[postId];
    if (!post) return;
    
    const modalContent = `
        <div class="blog-modal">
            <h2 class="modal-title rainbow-text">${post.title}</h2>
            <div class="blog-content">
                <p>${post.content}</p>
                <p><em>Full article coming soon...</em></p>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

// Glossary Modal
function openGlossary(term) {
    const glossary = {
        'sacred-technology': 'Technology built with intention, reverence, and respect for human dignity and spiritual growth.',
        'precision': 'The discipline of exactness learned through manufacturing, applied to both physical and digital systems.',
        'web3': 'Decentralized internet technologies including blockchain, smart contracts, and peer-to-peer networks.',
        'zk': 'Zero-Knowledge proofs allow verification of information without revealing the information itself.',
        'dao': 'Decentralized Autonomous Organization - a blockchain-based organization governed by smart contracts.',
        'mpc': 'Multi-Party Computation allows multiple parties to jointly compute a function without revealing inputs.'
    };
    
    const definition = glossary[term] || 'Term definition coming soon...';
    
    const modalContent = `
        <div class="glossary-modal">
            <h2 class="modal-title rainbow-text">Glossary: ${term.replace('-', ' ').toUpperCase()}</h2>
            <div class="glossary-content">
                <p>${definition}</p>
                <a href="pages/resources.html#glossary" class="glossary-link">View Full Glossary</a>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

// Bio Modal with extensive content
function openBioModal() {
    const modalContent = `
        <div class="bio-modal">
            <h2 class="modal-title rainbow-text">The Story of Christopher</h2>
            <div class="bio-content">
                <p><strong>Christopher Stephen Wilson</strong> is a minister-technologist, machinist-mystic, and decentralized systems builder whose life bridges the visible world of precision engineering and the invisible world of spirit, ceremony, and psychedelic revelation.</p>
                
                <p>For nearly two decades he shaped matter with ten-thousandth-inch accuracy — crafting aerospace components, entertainment structures, and high-stakes industrial hardware across Billet Industries, TAIT Towers, and Jones Manufacturing. Through this work he learned the language of pattern, flow, and discipline.</p>
                
                <p>Through psychedelic healing, 12-step recovery, and ordination, he learned the language of the heart — surrender, gratitude, and sacred interconnectedness.</p>
                
                <p>Now, through Web3 development, he brings these worlds together.</p>
                
                <p>As co-creator of <strong>Ethereal Offering</strong>, Christopher designs a spiritual-technological mycelium: a living ecosystem of gratitude tokens, soulbound identity, zero-knowledge privacy, and LLM-powered ritual intelligence — all honoring the subtle offerings we make to life.</p>
                
                <div class="bio-sections">
                    <button class="bio-section-btn" onclick="openManifestoModal()">Personal Manifesto</button>
                    <button class="bio-section-btn" onclick="openMissionModal()">Mission Statement</button>
                    <button class="bio-section-btn" onclick="openCreedModal()">Sacred Creed</button>
                </div>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Copied!';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(57, 255, 20, 0.9);
            color: black;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out;
        `;
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    });
}

// Wallet connect function
function connectWallet() {
    // Demo mode - show connection animation
    const statusText = document.querySelector('.status-text');
    if (statusText) {
        statusText.textContent = 'Connecting...';
        setTimeout(() => {
            statusText.textContent = 'Wallet Connected';
            statusText.style.color = 'var(--neon-green)';
        }, 2000);
    }
}

// Generic modal opener
function openModal(content) {
    const modal = document.getElementById('modal') || createModalElement();
    const modalBody = modal.querySelector('#modal-body');
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    modal.classList.add('modal-active');
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function createModalElement() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <div id="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal-active');
    }
}

// Additional modal content functions
function openManifestoModal() {
    const content = `
        <div class="manifesto-modal">
            <h2 class="modal-title rainbow-text">Personal Manifesto</h2>
            <div class="manifesto-content">
                <p><strong>I believe technology, like music and mycelium, can become a vessel for the sacred.</strong></p>
                <p>I build systems that honor the dignity of the human soul — systems rooted in privacy, gratitude, humility, and compassion.</p>
                <p><strong>I believe in precision.</strong> The same care I once brought to machining aerospace components I now bring to designing decentralized architectures where every line of code carries intention.</p>
                <p><strong>I believe in harmony.</strong> Just as every melody finds its place in the larger composition, every individual carries a unique frequency that contributes to the cosmic symphony Christ conducts.</p>
                <p><strong>I believe in the mycelial model.</strong> We are branches of one Vine, threads of one Body, nodes of one divine network of love and reciprocity.</p>
            </div>
        </div>
    `;
    openModal(content);
}

function openMissionModal() {
    const content = `
        <div class="mission-modal">
            <h2 class="modal-title rainbow-text">Mission Statement</h2>
            <div class="mission-content">
                <p><strong>My mission is to build systems — spiritual, technological, and communal — that honor human dignity, protect personal sovereignty, and nurture pathways of healing and awakening.</strong></p>
                <p>I combine precision engineering with zero-knowledge privacy, decentralized governance, and ministerial presence to create tools that empower individuals, strengthen communities, and reflect the sacred interconnectedness of all life.</p>
            </div>
        </div>
    `;
    openModal(content);
}

function openCreedModal() {
    const content = `
        <div class="creed-modal">
            <h2 class="modal-title rainbow-text">Sacred Creed</h2>
            <div class="creed-content">
                <p><strong>I commit to building systems that honor the dignity and sovereignty of every person.</strong></p>
                <p>I choose technologies that reflect compassion, reciprocity, and truth.</p>
                <p><strong>I acknowledge the sacred interconnectedness of all beings.</strong></p>
                <p>Like mycelium, we thrive through connection, communication, and shared nourishment.</p>
                <p><strong>I walk the path of humility and service.</strong></p>
                <p>May my work uplift those in struggle, illuminate those in darkness, and empower those seeking transformation.</p>
            </div>
        </div>
    `;
    openModal(content);
}