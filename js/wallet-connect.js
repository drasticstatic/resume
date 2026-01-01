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

    // Check if any wallet is available
    isWalletAvailable() {
        return typeof window.ethereum !== 'undefined';
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

    // Connect wallet
    async connect() {
        if (!this.isWalletAvailable()) {
            alert('No Web3 wallet detected. Please install MetaMask or another wallet.');
            window.open('https://metamask.io/download/', '_blank');
            return false;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.currentAddress = accounts[0];
            this.isConnected = true;
            this.currentChain = await this.getChainName();
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                alert('Connection rejected. Please approve the connection in your wallet.');
            }
            return false;
        }
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

