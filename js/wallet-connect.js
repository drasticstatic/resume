// Web3 Wallet Connection Module
// Handles MetaMask and WalletConnect integration

const WalletManager = {
    isConnected: false,
    currentAddress: null,
    currentChain: null,
    currentChainId: null,

    storageKeys: {
        disconnectPreference: 'resume.wallet.disconnectRequested'
    },

    // Wallet addresses for donations
    donationAddresses: {
        ETH: '0x96F185dB969F3c45EDDff27c73A4880A877BaeF6',
        BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', // Replace with your BTC address
        LTC: 'LTC_ADDRESS_HERE', // Replace with your LTC address
        XRP: 'XRP_ADDRESS_HERE'  // Replace with your XRP address
    },

    // Chain ID to name mapping (expanded)
    chainNames: {
        '0x1': 'Ethereum Mainnet',
        '0x5': 'Goerli Testnet',
        '0xaa36a7': 'Sepolia Testnet',
        '0x89': 'Polygon',
        '0xa86a': 'Avalanche',
        '0xa4b1': 'Arbitrum One',
        '0xa': 'Optimism',
        '0x38': 'BNB Smart Chain',
        '0x7a69': 'Hardhat Local',
        '0x539': 'Hardhat Local',
        '0x13881': 'Polygon Mumbai'
    },

    // Check if MetaMask is available
    isMetaMaskAvailable() {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    },

    // Check if any wallet is available (with delayed check for injection)
    isWalletAvailable() {
        // Log what we find for debugging
        console.log('Checking wallet availability...');
        console.log('  window.ethereum:', typeof window.ethereum);
        console.log('  window.ethereum.isMetaMask:', window.ethereum?.isMetaMask);
        console.log('  window.web3:', typeof window.web3);

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
                if (accounts.length > 0 && !this.hasDisconnectPreference()) {
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
                    this.disconnect({ persistPreference: false });
                } else {
                    this.setDisconnectPreference(false);
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
        console.log('WalletManager.connect() called');

        // Check if Safari
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        // Check if wallet is available - give a small moment for injection
        let walletAvailable = this.isWalletAvailable();
        console.log('Initial wallet check:', walletAvailable);

        if (!walletAvailable) {
            // Wait a brief moment for extension injection (some extensions are slow)
            await new Promise(resolve => setTimeout(resolve, 500));
            walletAvailable = this.isWalletAvailable();
            console.log('After delay wallet check:', walletAvailable);
        }

        if (!walletAvailable) {
            console.log('No wallet found, showing modal');
            this.showWalletModal(isSafari);
            return false;
        }

        try {
            console.log('Requesting accounts from wallet...');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Got accounts:', accounts);
            this.setDisconnectPreference(false);
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

                <!-- Web3Auth Info Link -->
                <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(138, 43, 226, 0.1)); border: 1px solid rgba(255, 0, 128, 0.3); border-radius: 12px; text-align: center;">
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0 0 10px 0;"><i class="fas fa-users"></i> No wallet? Use social login instead!</p>
                    <button onclick="WalletManager.showWeb3AuthModal()" style="padding: 10px 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(138, 43, 226, 0.2)); border: 1px solid rgba(255, 0, 128, 0.5); border-radius: 8px; color: #ff0080; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-key"></i> Connect with Web3Auth
                    </button>
                    <p style="color: rgba(255,255,255,0.5); font-size: 0.7rem; margin-top: 8px;"><i class="fas fa-shield-alt"></i> Powered by <a href="https://web3auth.io" target="_blank" style="color: #ff0080;">Web3Auth</a></p>
                </div>

                <div style="text-align: center; margin-top: 15px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button id="safari-info-btn" style="background: none; border: 1px solid rgba(255,255,255,0.3); padding: 10px 20px; border-radius: 8px; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.3s ease;">
                        ℹ️ Why Safari Doesn't Work
                    </button>
                    <button onclick="openDonateModal()" style="background: none; border: 1px solid rgba(0,255,255,0.3); padding: 10px 20px; border-radius: 8px; color: #00ffff; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-arrow-left"></i> Back to Donate
                    </button>
                </div>
            </div>
        `;

        if (window.modalInstance) {
            window.modalInstance.open(modalContent);
            // Constrain modal width
            const modalEl = document.querySelector('.modal-content');
            if (modalEl) {
                modalEl.style.maxWidth = '650px';
            }

            // Add event listener for Safari info button after modal opens
            setTimeout(() => {
                const safariBtn = document.getElementById('safari-info-btn');
                if (safariBtn) {
                    safariBtn.addEventListener('click', () => {
                        WalletManager.showSafariModal();
                    });
                }
            }, 100);
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
                    <p style="color: rgba(255,255,255,0.6); font-style: italic; margin: 0 0 15px 0;">🌟 Web3 is the future of the internet - your keys, your crypto, your identity! 🚀</p>
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button id="back-to-wallet-modal" style="background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 128, 0.2)); border: 1px solid rgba(0, 255, 255, 0.5); border-radius: 8px; padding: 10px 20px; color: #00ffff; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-wallet"></i> Back to Wallet Options
                        </button>
                        <button onclick="openDonateModal()" style="background: none; border: 1px solid rgba(255, 0, 128, 0.5); border-radius: 8px; padding: 10px 20px; color: #ff0080; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-heart"></i> Back to Donate
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (window.modalInstance) {
            window.modalInstance.open(modalContent);
            // Constrain modal width
            const modalEl = document.querySelector('.modal-content');
            if (modalEl) {
                modalEl.style.maxWidth = '700px';
            }

            // Add back button listener
            setTimeout(() => {
                const backBtn = document.getElementById('back-to-wallet-modal');
                if (backBtn) {
                    backBtn.addEventListener('click', () => {
                        WalletManager.showWalletModal();
                    });
                }
            }, 100);
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

    // Web3Auth instance
    web3auth: null,
    web3authProvider: null,

    // Initialize Web3Auth
    async initWeb3Auth() {
        if (this.web3auth) return this.web3auth;

        try {
            // Check if Web3Auth SDK is loaded
            const Web3AuthCtor = window.Web3Auth?.Web3Auth || window.Modal?.Web3Auth;
            const EthereumPrivateKeyProviderCtor = window.EthereumProvider?.EthereumPrivateKeyProvider;
            if (typeof Web3AuthCtor === 'undefined' || typeof EthereumPrivateKeyProviderCtor === 'undefined') {
                console.log('Web3Auth SDK not loaded yet');
                return null;
            }

            const chainConfig = {
                chainNamespace: "eip155",
                chainId: "0x1",
                rpcTarget: "https://rpc.ankr.com/eth",
            };

            const privateKeyProvider = new EthereumPrivateKeyProviderCtor({
                config: { chainConfig }
            });

            this.web3auth = new Web3AuthCtor({
                clientId: "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ", // Demo client ID
                chainConfig,
                privateKeyProvider,
                web3AuthNetwork: "sapphire_mainnet",
            });

            await this.web3auth.initModal();
            console.log('Web3Auth initialized successfully');
            return this.web3auth;
        } catch (error) {
            console.error('Web3Auth initialization failed:', error);
            return null;
        }
    },

    // Connect with Web3Auth
    async connectWithWeb3Auth(loginProvider = null) {
        try {
            // Show loading state
            this.showTxBadge('pending', 'Connecting with Web3Auth...');

            if (!this.web3auth) {
                await this.initWeb3Auth();
            }

            if (!this.web3auth) {
                throw new Error('Web3Auth not available');
            }

            const web3authProvider = await this.web3auth.connect();
            if (web3authProvider) {
                this.web3authProvider = web3authProvider;

                // Get user info
                const user = await this.web3auth.getUserInfo();
                console.log('Web3Auth user:', user);

                // Get accounts from provider
                const accounts = await web3authProvider.request({ method: 'eth_accounts' });
                if (accounts && accounts.length > 0) {
                    this.setDisconnectPreference(false);
                    this.currentAddress = accounts[0];
                    this.isConnected = true;
                    this.currentChain = 'Ethereum';

                    // Remove pending badge and show success
                    const existingBadge = document.querySelector('.tx-status-badge');
                    if (existingBadge) existingBadge.remove();

                    this.showTxBadge('success', `Connected as ${user.name || this.formatAddress(this.currentAddress)}`);
                    this.updateUI();

                    // Close modal
                    if (window.modalInstance) {
                        window.modalInstance.close();
                    }

                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Web3Auth connection failed:', error);
            const existingBadge = document.querySelector('.tx-status-badge');
            if (existingBadge) existingBadge.remove();

            if (error.message !== 'User closed the modal') {
                this.showTxBadge('error', 'Connection cancelled or failed');
            }
            return false;
        }
    },

    // Show Web3Auth Modal
    showWeb3AuthModal() {
        const isConnected = this.isConnected;
        const modalContent = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.3), rgba(138, 43, 226, 0.3)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-key" style="font-size: 2rem; color: #ff0080;"></i>
                </div>
                <h2 style="background: linear-gradient(135deg, #ff0080, #8a2be2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px;">Web3Auth Social Login</h2>
                <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">Connect with your favorite social accounts - no wallet needed!</p>

                ${isConnected ? `
                    <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                        <p style="color: #00ff88; margin: 0;"><i class="fas fa-check-circle"></i> Already Connected: ${this.formatAddress(this.currentAddress)}</p>
                    </div>
                ` : `
                    <div id="web3auth-status" style="background: rgba(255, 165, 0, 0.1); border: 1px solid rgba(255, 165, 0, 0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                        <p style="color: #ffa500; margin: 0;"><i class="fas fa-info-circle"></i> Click a provider below to connect</p>
                    </div>
                `}

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
                    <button onclick="WalletManager.connectWithWeb3Auth('google')" style="padding: 15px; background: rgba(219, 68, 55, 0.15); border: 1px solid rgba(219, 68, 55, 0.4); border-radius: 12px; color: #db4437; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;" onmouseover="this.style.background='rgba(219, 68, 55, 0.3)'" onmouseout="this.style.background='rgba(219, 68, 55, 0.15)'">
                        <i class="fab fa-google" style="font-size: 1.2rem;"></i> Google
                    </button>
                    <button onclick="WalletManager.connectWithWeb3Auth('facebook')" style="padding: 15px; background: rgba(24, 119, 242, 0.15); border: 1px solid rgba(24, 119, 242, 0.4); border-radius: 12px; color: #1877f2; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;" onmouseover="this.style.background='rgba(24, 119, 242, 0.3)'" onmouseout="this.style.background='rgba(24, 119, 242, 0.15)'">
                        <i class="fab fa-facebook" style="font-size: 1.2rem;"></i> Facebook
                    </button>
                    <button onclick="WalletManager.connectWithWeb3Auth('twitter')" style="padding: 15px; background: rgba(29, 161, 242, 0.15); border: 1px solid rgba(29, 161, 242, 0.4); border-radius: 12px; color: #1da1f2; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;" onmouseover="this.style.background='rgba(29, 161, 242, 0.3)'" onmouseout="this.style.background='rgba(29, 161, 242, 0.15)'">
                        <i class="fab fa-twitter" style="font-size: 1.2rem;"></i> Twitter/X
                    </button>
                    <button onclick="WalletManager.connectWithWeb3Auth('discord')" style="padding: 15px; background: rgba(88, 101, 242, 0.15); border: 1px solid rgba(88, 101, 242, 0.4); border-radius: 12px; color: #5865f2; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;" onmouseover="this.style.background='rgba(88, 101, 242, 0.3)'" onmouseout="this.style.background='rgba(88, 101, 242, 0.15)'">
                        <i class="fab fa-discord" style="font-size: 1.2rem;"></i> Discord
                    </button>
                </div>

                <button onclick="WalletManager.connectWithWeb3Auth()" style="width: 100%; padding: 15px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 136, 0.5); border-radius: 12px; color: #00ff88; cursor: pointer; transition: all 0.3s ease; margin-bottom: 20px; font-size: 1rem;" onmouseover="this.style.background='linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(0, 255, 255, 0.3))'" onmouseout="this.style.background='linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 255, 0.2))'">
                    <i class="fas fa-envelope"></i> Email / More Options
                </button>

                <p style="color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 15px;"><i class="fas fa-shield-alt"></i> Powered by <a href="https://web3auth.io" target="_blank" style="color: #ff0080;">Web3Auth</a> - Non-custodial, secure authentication</p>

                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="openDonateModal()" style="background: none; border: 1px solid rgba(0,255,255,0.3); padding: 10px 20px; border-radius: 8px; color: #00ffff; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-arrow-left"></i> Back to Donate
                    </button>
                    <button onclick="WalletManager.showWalletModal()" style="background: none; border: 1px solid rgba(255,255,255,0.3); padding: 10px 20px; border-radius: 8px; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-wallet"></i> Use Web3 Wallet Instead
                    </button>
                </div>
            </div>
        `;

        if (window.modalInstance) {
            window.modalInstance.open(modalContent);
            const modalEl = document.querySelector('.modal-content');
            if (modalEl) {
                modalEl.style.maxWidth = '650px';
            }
        }
    },

    // Disconnect wallet
    disconnect({ persistPreference = true } = {}) {
        if (persistPreference) {
            this.setDisconnectPreference(true);
        }
        this.isConnected = false;
        this.currentAddress = null;
        this.currentChain = null;
        this.currentChainId = null;
        this.updateUI();
    },

    hasDisconnectPreference() {
        try {
            return window.localStorage?.getItem(this.storageKeys.disconnectPreference) === 'true';
        } catch (error) {
            return false;
        }
    },

    setDisconnectPreference(value) {
        try {
            window.localStorage?.setItem(this.storageKeys.disconnectPreference, value ? 'true' : 'false');
        } catch (error) {
            console.log('Could not persist wallet disconnect preference');
        }
    },

    // Get chain name
    async getChainName() {
        if (!this.isWalletAvailable()) return null;
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            this.currentChainId = chainId;
            return this.chainNames[chainId] || `Chain ${parseInt(chainId, 16)}`;
        } catch (error) {
            return null;
        }
    },

    // Show transaction badge
    showTxBadge(type, message, txHash = null) {
        // Remove any existing badge
        const existingBadge = document.querySelector('.tx-status-badge');
        if (existingBadge) existingBadge.remove();

        const badge = document.createElement('div');
        badge.className = 'tx-status-badge';

        if (type === 'demo') {
            badge.innerHTML = `
                <div style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, rgba(255, 165, 0, 0.9), rgba(255, 100, 0, 0.9)); padding: 15px 25px; border-radius: 12px; z-index: 10000; box-shadow: 0 0 30px rgba(255, 165, 0, 0.5); animation: slideIn 0.3s ease;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🎭</span>
                        <div>
                            <strong style="color: white; display: block;">Demo Mode</strong>
                            <small style="color: rgba(255,255,255,0.8);">${message}</small>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'pending') {
            badge.innerHTML = `
                <div style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, rgba(0, 255, 255, 0.9), rgba(138, 43, 226, 0.9)); padding: 15px 25px; border-radius: 12px; z-index: 10000; box-shadow: 0 0 30px rgba(0, 255, 255, 0.5); animation: slideIn 0.3s ease, pulse 1s ease-in-out infinite;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem; animation: spin 1s linear infinite;">⏳</span>
                        <div>
                            <strong style="color: white; display: block;">Transaction Pending</strong>
                            <small style="color: rgba(255,255,255,0.8);">${message}</small>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'success') {
            badge.innerHTML = `
                <div style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.9), rgba(0, 255, 255, 0.9)); padding: 15px 25px; border-radius: 12px; z-index: 10000; box-shadow: 0 0 30px rgba(0, 255, 136, 0.5); animation: slideIn 0.3s ease;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">✅</span>
                        <div>
                            <strong style="color: white; display: block;">Real Transaction!</strong>
                            <small style="color: rgba(255,255,255,0.8);">${message}</small>
                            ${txHash ? `<a href="https://etherscan.io/tx/${txHash}" target="_blank" style="color: #00ffff; font-size: 0.8rem;">View on Etherscan →</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'error') {
            badge.innerHTML = `
                <div style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, rgba(255, 100, 100, 0.9), rgba(255, 0, 128, 0.9)); padding: 15px 25px; border-radius: 12px; z-index: 10000; box-shadow: 0 0 30px rgba(255, 100, 100, 0.5); animation: slideIn 0.3s ease;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">❌</span>
                        <div>
                            <strong style="color: white; display: block;">Transaction Failed</strong>
                            <small style="color: rgba(255,255,255,0.8);">${message}</small>
                        </div>
                    </div>
                </div>
            `;
        }

        document.body.appendChild(badge);

        // Auto-remove after 5 seconds (except pending)
        if (type !== 'pending') {
            setTimeout(() => badge.remove(), 5000);
        }

        return badge;
    },

    // Send donation transaction (ETH)
    async sendDonation(amountEth) {
        console.log('sendDonation called with amount:', amountEth);

        if (!this.isConnected) {
            // Show demo badge when not connected
            this.showTxBadge('demo', 'Connect wallet for real transactions');
            const connected = await this.connect();
            if (!connected) {
                console.log('Connection failed, aborting transaction');
                return false;
            }
        }

        // Validate amount
        const amount = parseFloat(amountEth);
        if (isNaN(amount) || amount <= 0) {
            this.showTxBadge('error', 'Invalid amount');
            return false;
        }

        // Show pending badge
        const pendingBadge = this.showTxBadge('pending', `Sending ${amount} ETH...`);

        try {
            // Convert ETH to Wei (1 ETH = 10^18 Wei)
            const weiAmount = BigInt(Math.floor(amount * 1e18));
            const weiValue = '0x' + weiAmount.toString(16);

            console.log('Sending transaction:', {
                from: this.currentAddress,
                to: this.donationAddresses.ETH,
                value: weiValue,
                amountEth: amount
            });

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: this.currentAddress,
                    to: this.donationAddresses.ETH,
                    value: weiValue
                }]
            });

            console.log('Transaction hash:', txHash);

            // Remove pending badge and show success
            pendingBadge.remove();
            this.showTxBadge('success', `${amount} ETH sent!`, txHash);

            // Trigger celebration
            if (typeof createSporeRain === 'function') {
                createSporeRain(window.innerWidth / 2, window.innerHeight / 2);
            }

            return true;
        } catch (error) {
            console.error('Transaction error:', error);
            pendingBadge.remove();

            if (error.code === 4001) {
                this.showTxBadge('error', 'Transaction cancelled by user');
            } else {
                this.showTxBadge('error', error.message || 'Transaction failed. Please try again.');
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
        const networkShort = this.currentChain ? this.currentChain.split(' ')[0] : '';

        // Update wallet status badges (in donate modal and elsewhere)
        document.querySelectorAll('.wallet-status-badge').forEach(badge => {
            if (this.isConnected) {
                badge.innerHTML = `<i class="fas fa-check-circle" style="color: #00ff88;"></i> <span class="wallet-status-text">${this.formatAddress(this.currentAddress)}</span> <span style="font-size: 0.75em; opacity: 0.8;">(${networkShort})</span>`;
                badge.classList.add('connected');
                badge.classList.remove('disconnected');
                badge.style.borderColor = 'rgba(0, 255, 136, 0.5)';
                badge.style.background = 'rgba(0, 255, 136, 0.1)';
                badge.style.color = '#00ff88';
            } else {
                badge.innerHTML = '<i class="fas fa-wallet"></i> <span class="wallet-status-text">Not Connected</span>';
                badge.classList.remove('connected');
                badge.classList.add('disconnected');
                badge.style.borderColor = 'rgba(255, 100, 100, 0.3)';
                badge.style.background = 'rgba(255, 100, 100, 0.1)';
                badge.style.color = '#ff6b6b';
            }
        });

        // Update connect buttons in donate modal - change to Disconnect when connected
        document.querySelectorAll('.wallet-connect-btn').forEach(btn => {
            if (this.isConnected) {
                btn.innerHTML = `<i class="fas fa-unlink" style="font-size: 1.5rem; color: #ff6b6b;"></i><span style="font-size: 1rem; color: #fff;">Disconnect Wallet</span>`;
                btn.onclick = () => WalletManager.disconnect();
                btn.style.borderImage = 'linear-gradient(135deg, #ff6b6b, #ff0080, #8a2be2) 1';
            } else {
                btn.innerHTML = `<i class="fas fa-wallet" style="font-size: 1.5rem; color: #00ffff;"></i><span style="font-size: 1rem; color: #fff;">Connect Your Web3 Wallet</span>`;
                btn.onclick = () => connectWallet();
                btn.style.borderImage = 'linear-gradient(135deg, #ff0080, #00ffff, #8a2be2) 1';
            }
        });

        // Update demo badge visibility
        const demoBadge = document.getElementById('tx-demo-badge');
        if (demoBadge) {
            demoBadge.style.display = this.isConnected ? 'none' : 'block';
        }

        // Update top-right connect button
        document.querySelectorAll('.connect-btn-top').forEach(btn => {
            if (this.isConnected) {
                btn.classList.add('connected');
                btn.setAttribute('data-chain', 'Disconnect');
                btn.setAttribute('data-tooltip', `${this.formatAddress(this.currentAddress)} on ${networkShort} — Click to disconnect`);
                btn.innerHTML = '<i class="fas fa-check-circle" style="font-size: 10px; position: absolute; top: 2px; right: 2px; color: #00ff88;"></i><i class="fas fa-unlink"></i>';
                btn.onclick = () => this.disconnect();
                btn.title = `Connected: ${this.formatAddress(this.currentAddress)} on ${this.currentChain} — Click to disconnect`;
            } else {
                btn.classList.remove('connected');
                btn.setAttribute('data-chain', 'Connect');
                btn.setAttribute('data-tooltip', 'Click to Connect Web3 Wallet');
                btn.innerHTML = '<i class="fas fa-wallet"></i>';
                btn.onclick = () => this.connect();
                btn.title = 'Connect Web3 Wallet';
            }
        });

        // Update connection status badges (if any exist - legacy support)
        document.querySelectorAll('.connection-status-badge').forEach(badge => {
            if (this.isConnected) {
                badge.style.display = 'none'; // Hide separate badge, info is now in button
            } else {
                badge.style.display = 'none';
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
window.sendCustomDonation = () => {
    const input = document.getElementById('custom-eth-amount');
    if (input && input.value) {
        const amount = parseFloat(input.value);
        if (amount > 0) {
            WalletManager.sendDonation(amount);
        } else {
            WalletManager.showTxBadge('error', 'Please enter a valid amount');
        }
    } else {
        WalletManager.showTxBadge('error', 'Please enter an amount');
    }
};
window.WalletManager = WalletManager;

// Gas Price Indicator - Shows current mainnet gas price
async function fetchGasPrice() {
    try {
        // Try using connected wallet first
        if (typeof window.ethereum !== 'undefined') {
            const gasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
            const gweiPrice = parseInt(gasPrice, 16) / 1e9;
            return Math.round(gweiPrice);
        }

        // Fallback to public RPC endpoint
        const response = await fetch('https://rpc.ankr.com/eth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_gasPrice',
                params: [],
                id: 1
            })
        });
        const data = await response.json();
        if (data.result) {
            const gweiPrice = parseInt(data.result, 16) / 1e9;
            return Math.round(gweiPrice);
        }
        return null;
    } catch (e) {
        console.log('Could not fetch gas price:', e.message);
        return null;
    }
}

// Update gas indicator periodically if on page
async function updateGasIndicator() {
    const indicator = document.getElementById('gas-indicator');
    if (!indicator) return;

    const gasPrice = await fetchGasPrice();
    if (gasPrice) {
        let color = '#00ff88'; // Green for low gas
        if (gasPrice > 50) color = '#ffd700'; // Yellow for medium
        if (gasPrice > 100) color = '#ff6b6b'; // Red for high

        indicator.innerHTML = `<i class="fas fa-gas-pump" style="color: ${color};"></i> ${gasPrice} gwei`;
        indicator.style.color = color;
    } else {
        indicator.innerHTML = `<i class="fas fa-gas-pump" style="color: rgba(255,255,255,0.5);"></i> N/A`;
        indicator.style.color = 'rgba(255,255,255,0.5)';
    }
}

// Initialize gas price updates every 30 seconds if element exists
document.addEventListener('DOMContentLoaded', () => {
    updateGasIndicator();
    setInterval(updateGasIndicator, 30000);
});
