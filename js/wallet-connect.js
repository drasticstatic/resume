// Web3 Wallet Connection Module
// Handles MetaMask and WalletConnect integration

const WalletManager = {
    isConnected: false,
    currentAddress: null,
    currentChain: null,

    // Ethereum address for donations
    donationAddress: '0x96F185dB969F3c45EDDff27c73A4880A877BaeF6',

    // Check if MetaMask is available
    isMetaMaskAvailable() {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    },

    // Check if any wallet is available (with delayed check for injection)
    isWalletAvailable() {
        // Check for window.ethereum (injected by most wallets)
        if (typeof window.ethereum !== 'undefined') {
            return true;
        }
        // Check for wallet-specific providers
        if (typeof window.web3 !== 'undefined') {
            return true;
        }
        // Check for Coinbase Wallet
        if (typeof window.coinbaseWalletExtension !== 'undefined') {
            return true;
        }
        return false;
    },

    // Async check that waits for wallet injection
    async waitForWallet(timeout = 3000) {
        return new Promise((resolve) => {
            if (this.isWalletAvailable()) {
                resolve(true);
                return;
            }

            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                if (this.isWalletAvailable()) {
                    clearInterval(checkInterval);
                    resolve(true);
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    resolve(false);
                }
            }, 100);
        });
    },

    // Initialize wallet state
    async init() {
        if (this.isWalletAvailable()) {
            // Check if already connected
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.currentAddress = accounts[0];
                    this.isConnected = true;
                    this.currentChain = await this.getChainName();
                }
            } catch (error) {
                console.log('Wallet not connected');
            }

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnect();
                } else {
                    this.currentAddress = accounts[0];
                    this.isConnected = true;
                    this.updateUI();
                }
            });

            // Listen for chain changes
            window.ethereum.on('chainChanged', async () => {
                this.currentChain = await this.getChainName();
                this.updateUI();
            });
        }
        this.updateUI();
    },

    // Connect wallet - supports MetaMask, Coinbase Wallet, Trust Wallet, etc.
    async connect() {
        // Check if Safari
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        // Wait a moment for wallet injection if not immediately available
        let walletAvailable = this.isWalletAvailable();
        if (!walletAvailable) {
            // Wait up to 2 seconds for wallet to inject
            walletAvailable = await this.waitForWallet(2000);
        }

        if (!walletAvailable) {
            // Show wallet connect modal instead of alert
            this.showWalletModal(isSafari);
            return false;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.currentAddress = accounts[0];
            this.isConnected = true;
            this.currentChain = await this.getChainName();
            this.updateUI();

            // Show success message with wallet info
            const walletType = this.detectWalletType();
            console.log(`Connected to ${walletType}: ${this.currentAddress}`);

            // Trigger celebration effect
            if (typeof createSporeRain === 'function') {
                createSporeRain(window.innerWidth / 2, window.innerHeight / 2);
            }

            return true;
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                if (window.modalInstance) {
                    window.modalInstance.open(`
                        <div style="text-align: center; padding: 30px;">
                            <h3 style="color: #ff0080;">Connection Rejected</h3>
                            <p>Please approve the connection in your wallet to continue.</p>
                            <button onclick="connectWallet()" class="wallet-cta-btn" style="margin-top: 20px; padding: 15px 30px; background: linear-gradient(135deg, #ff0080, #00ffff); border: none; border-radius: 12px; color: white; cursor: pointer; font-size: 1rem;">Try Again</button>
                        </div>
                    `);
                }
            }
            return false;
        }
    },

    // Show wallet connection modal
    showWalletModal(isSafari = false) {
        const safariSection = isSafari ? `
            <div style="background: rgba(255, 100, 100, 0.2); border: 1px solid rgba(255, 100, 100, 0.5); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                <p style="color: #ff6b6b; margin: 0;">⚠️ <strong>Safari Detected</strong> - Safari is not Web3-compatible. <button onclick="WalletManager.showSafariModal()" style="background: none; border: none; color: #00ffff; text-decoration: underline; cursor: pointer;">Learn more →</button></p>
            </div>
        ` : '';

        const modalContent = `
            <div class="wallet-connect-modal" style="max-width: 600px; margin: 0 auto;">
                <h2 style="text-align: center; background: linear-gradient(135deg, #ff0080, #00ffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px;">🌐 Connect Your Web3 Wallet</h2>

                ${safariSection}

                <p style="text-align: center; color: rgba(255,255,255,0.8); margin-bottom: 25px;">To interact with this site's Web3 features, you'll need a compatible wallet.</p>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                    <a href="https://metamask.io/download/" target="_blank" class="wallet-option-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: rgba(255, 165, 0, 0.1); border: 2px solid rgba(255, 165, 0, 0.5); border-radius: 16px; text-decoration: none; transition: all 0.3s ease;">
                        <span style="font-size: 2rem;">🦊</span>
                        <strong style="color: #ff9500; margin-top: 10px;">MetaMask</strong>
                        <small style="color: rgba(255,255,255,0.6);">Most Popular</small>
                    </a>
                    <a href="https://rainbow.me/" target="_blank" class="wallet-option-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: rgba(138, 43, 226, 0.1); border: 2px solid rgba(138, 43, 226, 0.5); border-radius: 16px; text-decoration: none; transition: all 0.3s ease;">
                        <span style="font-size: 2rem;">🌈</span>
                        <strong style="color: #8a2be2; margin-top: 10px;">Rainbow</strong>
                        <small style="color: rgba(255,255,255,0.6);">Beautiful UI</small>
                    </a>
                    <a href="https://www.coinbase.com/wallet" target="_blank" class="wallet-option-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: rgba(0, 82, 255, 0.1); border: 2px solid rgba(0, 82, 255, 0.5); border-radius: 16px; text-decoration: none; transition: all 0.3s ease;">
                        <span style="font-size: 2rem;">💎</span>
                        <strong style="color: #0052ff; margin-top: 10px;">Coinbase Wallet</strong>
                        <small style="color: rgba(255,255,255,0.6);">Easy Onboarding</small>
                    </a>
                    <a href="https://trustwallet.com/" target="_blank" class="wallet-option-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: rgba(51, 117, 187, 0.1); border: 2px solid rgba(51, 117, 187, 0.5); border-radius: 16px; text-decoration: none; transition: all 0.3s ease;">
                        <span style="font-size: 2rem;">🛡️</span>
                        <strong style="color: #3375bb; margin-top: 10px;">Trust Wallet</strong>
                        <small style="color: rgba(255,255,255,0.6);">Mobile First</small>
                    </a>
                </div>

                <div style="text-align: center; padding: 20px; background: rgba(0, 255, 255, 0.1); border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="color: #00ffff; margin: 0 0 10px 0;">📱 On Mobile?</h4>
                    <p style="color: rgba(255,255,255,0.7); margin: 0 0 15px 0; font-size: 0.9rem;">Download the MetaMask or Rainbow app and use their built-in browser to access this site.</p>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: rgba(0,0,0,0.3); padding: 10px 15px; border-radius: 8px; border: 1px solid rgba(0,255,255,0.3);">
                        <code style="color: #00ffff; font-size: 0.85rem; word-break: break-all;">${window.location.href}</code>
                        <button onclick="WalletManager.copyUrl()" style="background: rgba(0,255,255,0.2); border: 1px solid #00ffff; border-radius: 6px; padding: 8px 12px; color: #00ffff; cursor: pointer; white-space: nowrap; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(0,255,255,0.4)'" onmouseout="this.style.background='rgba(0,255,255,0.2)'">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>

                <div style="text-align: center;">
                    <button onclick="WalletManager.showSafariModal()" style="background: none; border: 1px solid rgba(255,255,255,0.3); padding: 10px 20px; border-radius: 8px; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.3s ease;">
                        ℹ️ Why Safari Doesn't Work
                    </button>
                </div>
            </div>
        `;

        if (window.modalInstance) {
            window.modalInstance.open(modalContent);
        }
    },

    // Show Safari-specific modal
    showSafariModal() {
        const modalContent = `
            <div class="safari-modal" style="max-width: 700px; margin: 0 auto; padding: 10px;">
                <h2 style="text-align: center; color: #ff6b6b; margin-bottom: 20px;">🚫 Web3 Browser Required</h2>
                <p style="text-align: center; font-size: 1.1rem; color: #ff9999; margin-bottom: 25px;">Safari is Not Web3-Compatible</p>

                <div style="background: rgba(255, 100, 100, 0.1); border-left: 4px solid #ff6b6b; padding: 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                    <h4 style="color: #ff6b6b; margin: 0 0 10px 0;">⚠️ Why Safari Doesn't Work</h4>
                    <ul style="color: rgba(255,255,255,0.8); margin: 0; padding-left: 20px; line-height: 1.8;">
                        <li>Safari blocks browser extensions that inject Web3 providers</li>
                        <li>MetaMask and other wallet extensions cannot run in Safari</li>
                        <li>Apple's security policies prevent Web3 wallet integration</li>
                    </ul>
                </div>

                <h3 style="color: #00ffff; margin-bottom: 15px;">🖥️ Desktop Browsers</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 25px;">
                    <a href="https://www.google.com/chrome/" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 165, 0, 0.1); border: 1px solid rgba(255, 165, 0, 0.3); border-radius: 8px; text-decoration: none; color: #ff9500;">
                        <span>🌐</span> Google Chrome (Recommended)
                    </a>
                    <a href="https://www.mozilla.org/firefox/" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 100, 0, 0.1); border: 1px solid rgba(255, 100, 0, 0.3); border-radius: 8px; text-decoration: none; color: #ff6400;">
                        <span>🦊</span> Firefox
                    </a>
                    <a href="https://brave.com/" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 0, 128, 0.1); border: 1px solid rgba(255, 0, 128, 0.3); border-radius: 8px; text-decoration: none; color: #ff0080;">
                        <span>🦁</span> Brave (Built-in wallet!)
                    </a>
                    <a href="https://www.microsoft.com/edge" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(0, 120, 215, 0.1); border: 1px solid rgba(0, 120, 215, 0.3); border-radius: 8px; text-decoration: none; color: #0078d7;">
                        <span>🔷</span> Microsoft Edge
                    </a>
                </div>

                <h3 style="color: #00ff88; margin-bottom: 15px;">📱 Mobile Web3 Browsers</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 25px;">
                    <a href="https://metamask.io/download/" target="_blank" style="display: flex; flex-direction: column; align-items: center; padding: 15px; background: rgba(255, 165, 0, 0.1); border: 1px solid rgba(255, 165, 0, 0.3); border-radius: 12px; text-decoration: none; text-align: center;">
                        <span style="font-size: 1.5rem;">🦊</span>
                        <strong style="color: #ff9500;">MetaMask</strong>
                    </a>
                    <a href="https://rainbow.me/" target="_blank" style="display: flex; flex-direction: column; align-items: center; padding: 15px; background: rgba(138, 43, 226, 0.1); border: 1px solid rgba(138, 43, 226, 0.3); border-radius: 12px; text-decoration: none; text-align: center;">
                        <span style="font-size: 1.5rem;">🌈</span>
                        <strong style="color: #8a2be2;">Rainbow</strong>
                    </a>
                    <a href="https://trustwallet.com/" target="_blank" style="display: flex; flex-direction: column; align-items: center; padding: 15px; background: rgba(51, 117, 187, 0.1); border: 1px solid rgba(51, 117, 187, 0.3); border-radius: 12px; text-decoration: none; text-align: center;">
                        <span style="font-size: 1.5rem;">🛡️</span>
                        <strong style="color: #3375bb;">Trust</strong>
                    </a>
                </div>

                <div style="background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 128, 0.1)); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 12px; padding: 20px; text-align: center;">
                    <h4 style="color: #00ffff; margin: 0 0 15px 0;">⚡ Quick Setup Guide</h4>
                    <ol style="text-align: left; color: rgba(255,255,255,0.8); line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li><strong>Download</strong> a Web3 browser (Chrome/Brave) or mobile wallet app</li>
                        <li><strong>Install MetaMask</strong> extension or use wallet's built-in browser</li>
                        <li><strong>Return to this site</strong> and click Connect Wallet</li>
                        <li><strong>Approve the connection</strong> and start exploring! 🍄✨</li>
                    </ol>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p style="color: rgba(255,255,255,0.6); font-style: italic; margin: 0;">🌟 Web3 is the future of the internet - your keys, your crypto, your identity! 🚀</p>
                </div>
            </div>
        `;

        if (window.modalInstance) {
            window.modalInstance.open(modalContent);
        }
    },

    // Detect which wallet is being used
    detectWalletType() {
        if (!window.ethereum) return 'No Wallet';
        if (window.ethereum.isMetaMask) return 'MetaMask';
        if (window.ethereum.isCoinbaseWallet) return 'Coinbase Wallet';
        if (window.ethereum.isTrust) return 'Trust Wallet';
        if (window.ethereum.isRainbow) return 'Rainbow';
        if (window.ethereum.isBraveWallet) return 'Brave Wallet';
        if (window.ethereum.isPhantom) return 'Phantom';
        return 'Web3 Wallet';
    },

    // Copy URL to clipboard
    copyUrl() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            // Show quick feedback
            const btn = event.target.closest('button');
            if (btn) {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                btn.style.background = 'rgba(0,255,136,0.3)';
                btn.style.borderColor = '#00ff88';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = 'rgba(0,255,255,0.2)';
                    btn.style.borderColor = '#00ffff';
                }, 2000);
            }
        }).catch(err => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('✓ URL copied to clipboard!');
        });
    },

    // Disconnect wallet
    disconnect() {
        this.isConnected = false;
        this.currentAddress = null;
        this.currentChain = null;
        this.updateUI();
    },

    // Get chain name
    async getChainName() {
        if (!this.isWalletAvailable()) return null;
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const chainNames = {
                '0x1': 'Ethereum',
                '0x5': 'Goerli',
                '0xaa36a7': 'Sepolia',
                '0x89': 'Polygon',
                '0xa86a': 'Avalanche',
                '0xa4b1': 'Arbitrum',
                '0xa': 'Optimism',
                '0x38': 'BSC'
            };
            return chainNames[chainId] || 'Unknown Network';
        } catch (error) {
            return null;
        }
    },

    // Send donation transaction
    async sendDonation(amountEth) {
        if (!this.isConnected) {
            const connected = await this.connect();
            if (!connected) return false;
        }

        try {
            const weiValue = '0x' + (parseFloat(amountEth) * 1e18).toString(16);
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: this.currentAddress,
                    to: this.donationAddress,
                    value: weiValue
                }]
            });
            alert(`✓ Transaction sent! Hash: ${txHash.slice(0, 10)}...`);
            return true;
        } catch (error) {
            console.error('Transaction error:', error);
            if (error.code === 4001) {
                alert('Transaction cancelled.');
            } else {
                alert('Transaction failed. Please try again.');
            }
            return false;
        }
    },

    // Format address for display
    formatAddress(address) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    },

    // Update all UI elements
    updateUI() {
        // Update wallet status badges
        document.querySelectorAll('.wallet-status-badge').forEach(badge => {
            if (this.isConnected) {
                const textSpan = badge.querySelector('.wallet-status-text');
                if (textSpan) {
                    textSpan.textContent = this.formatAddress(this.currentAddress);
                } else {
                    badge.innerHTML = `<i class="fas fa-check-circle"></i> ${this.formatAddress(this.currentAddress)}`;
                }
                badge.classList.add('connected');
                badge.classList.remove('disconnected');
                badge.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                badge.style.color = '#00ff88';
            } else {
                const textSpan = badge.querySelector('.wallet-status-text');
                if (textSpan) {
                    textSpan.textContent = 'Connect';
                } else {
                    badge.innerHTML = '<i class="fas fa-wallet"></i> Connect';
                }
                badge.classList.remove('connected');
                badge.classList.add('disconnected');
                badge.style.borderColor = 'rgba(255, 100, 100, 0.3)';
                badge.style.color = '#ff6b6b';
            }
        });

        // Update connect buttons
        document.querySelectorAll('.wallet-connect-btn').forEach(btn => {
            if (this.isConnected) {
                btn.innerHTML = `<i class="fas fa-check-circle"></i> Connected: ${this.formatAddress(this.currentAddress)}`;
            }
        });

        // Update top-right connect button
        document.querySelectorAll('.connect-btn-top').forEach(btn => {
            if (this.isConnected) {
                btn.classList.add('connected');
                btn.setAttribute('data-chain', this.currentChain || 'Connected');
                btn.innerHTML = '<i class="fas fa-check-circle"></i>';
                btn.onclick = () => this.disconnect();
            } else {
                btn.classList.remove('connected');
                btn.setAttribute('data-chain', 'Connect');
                btn.innerHTML = '<i class="fas fa-wallet"></i>';
                btn.onclick = () => this.connect();
            }
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    WalletManager.init();
});

// Global functions
window.connectWallet = () => WalletManager.connect();
window.disconnectWallet = () => WalletManager.disconnect();
window.sendDonation = (amount) => WalletManager.sendDonation(amount);
window.WalletManager = WalletManager;

