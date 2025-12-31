// Shared glossary function for all pages
function openGlossary(term) {
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
        'nft': {
            title: 'Non-Fungible Tokens',
            content: 'Unique digital assets that represent ownership of specific items or content on the blockchain. Unlike cryptocurrencies, each NFT has distinct properties and cannot be exchanged on a one-to-one basis.'
        },
        'aleo': {
            title: 'Aleo Platform',
            content: 'A privacy-focused blockchain platform that uses zero-knowledge proofs to enable private smart contracts and applications while maintaining verifiability and decentralization.'
        },
        'defi': {
            title: 'Decentralized Finance',
            content: 'Financial services built on blockchain technology that operate without traditional intermediaries like banks, enabling peer-to-peer lending, trading, and other financial activities.'
        },
        'solidity': {
            title: 'Solidity',
            content: 'Object-oriented programming language for writing smart contracts on Ethereum and EVM-compatible blockchains. Syntax similar to JavaScript and C++.'
        },
        'privacy': {
            title: 'Privacy-Preserving Technology',
            content: 'Technologies that protect user data and maintain confidentiality while still enabling verification and functionality. Essential for maintaining human dignity in digital systems.'
        },
        'ritual': {
            title: 'Ritual Intelligence',
            content: 'AI systems designed to support spiritual practices, ceremony guidance, and community wisdom synthesis. Combines machine learning with sacred technology principles.'
        },
        'llm': {
            title: 'Large Language Model',
            content: 'AI model trained on vast amounts of text data to understand and generate human-like text. Powers applications like ChatGPT and our Oracle of Fruit.'
        },
        'mazatrol': {
            title: 'Mazatrol',
            content: 'Conversational CNC programming language used on Mazak machine tools. Allows intuitive part programming through graphical interface and conversational prompts.'
        },
        'mastercam': {
            title: 'Mastercam',
            content: 'Industry-leading CAM (Computer-Aided Manufacturing) software for creating CNC toolpaths and programs. Used for mill, lathe, and multi-axis machining.'
        },
        'cnc-lathe': {
            title: 'CNC Lathe',
            content: 'Computer-controlled machine tool that rotates workpiece for precision turning operations. Capable of complex geometries with tight tolerances.'
        },
        'metrology': {
            title: 'Precision Metrology',
            content: 'Science of measurement ensuring parts meet specified tolerances, often to ±0.0001" accuracy. Uses CMMs, micrometers, and optical comparators.'
        },
        'ritual-intelligence': {
            title: 'Ritual Intelligence',
            content: 'AI systems designed to support spiritual practices, ceremony guidance, and community wisdom synthesis. Combines machine learning with sacred technology principles.'
        },
        'mycelial-networks': {
            title: 'Mycelial Networks',
            content: 'Organizational structures inspired by fungal networks, emphasizing decentralized, interconnected nodes that share resources and information organically rather than hierarchically.'
        },
        'audio-foh': {
            title: 'Front of House (FOH) Engineering',
            content: 'The audio engineer position responsible for mixing sound for the audience in live events. Controls the main PA system, monitors overall sound quality, and ensures optimal audio experience for attendees.'
        },
        'audio-system': {
            title: 'Audio System Design',
            content: 'The process of designing and configuring sound reinforcement systems for venues and events. Includes speaker placement, signal flow, power distribution, and acoustic treatment considerations.'
        },
        'audio-mixing': {
            title: 'Digital Mixing',
            content: 'The art and science of combining multiple audio signals using digital mixing consoles. Includes EQ, compression, effects processing, and routing to create balanced, professional sound.'
        },
        'acoustics': {
            title: 'Acoustics',
            content: 'The science of sound behavior in enclosed spaces. Understanding room modes, reflections, absorption, and diffusion is essential for both live sound and studio recording environments.'
        },
        'aleo-leo': {
            title: 'Aleo Leo Programming',
            content: 'Leo is the programming language for building private applications on Aleo. It compiles to zero-knowledge circuits, enabling developers to write privacy-preserving smart contracts with familiar syntax.'
        },
        'spiritual-ai': {
            title: 'Spiritual AI Systems',
            content: 'AI systems designed with sacred technology principles, serving human spiritual growth rather than extraction. Examples include the Oracle of Fruit ritual intelligence.'
        },
        'privacy-first': {
            title: 'Privacy-First Design',
            content: 'An architectural approach that treats privacy as a fundamental requirement rather than an afterthought. Systems are designed from the ground up to protect user data and sovereignty.'
        },
        'community-governance': {
            title: 'Community Governance',
            content: 'Decentralized decision-making structures that empower community members to participate in organizational direction. Often implemented through DAOs with token-based or reputation-based voting.'
        },
        'agent': {
            title: 'AI Agent',
            content: 'An autonomous AI system that can perceive its environment, make decisions, and take actions to achieve specific goals. In Web3, agents can interact with smart contracts and blockchain systems.'
        },
        'ai': {
            title: 'Artificial Intelligence',
            content: 'Computer systems designed to perform tasks that typically require human intelligence, including learning, reasoning, problem-solving, and natural language understanding.'
        },
        'arbitrage': {
            title: 'Arbitrage',
            content: 'The practice of exploiting price differences between markets. In DeFi, this involves buying assets on one exchange and selling on another for profit, often automated through smart contracts.'
        },
        'javascript': {
            title: 'JavaScript',
            content: 'A versatile programming language essential for web development. In Web3, JavaScript is used with libraries like ethers.js and wagmi for building decentralized application frontends.'
        },
        'cosmos': {
            title: 'Cosmos',
            content: 'An ecosystem of interconnected blockchains using the Inter-Blockchain Communication (IBC) protocol. Enables sovereign chains to communicate and transfer assets securely.'
        },
        'mantle': {
            title: 'Mantle',
            content: 'A Layer 2 scaling solution for Ethereum that uses optimistic rollup technology to provide faster and cheaper transactions while inheriting Ethereum security.'
        },
        'ton': {
            title: 'TON (The Open Network)',
            content: 'A decentralized blockchain platform originally developed by Telegram. Known for high throughput, low fees, and integration with messaging applications.'
        },
        'ccip': {
            title: 'Chainlink CCIP',
            content: 'Cross-Chain Interoperability Protocol by Chainlink. Enables secure cross-chain messaging and token transfers between different blockchain networks.'
        },
        'audio': {
            title: 'Audio Engineering',
            content: 'The technical and creative discipline of recording, mixing, and reproducing sound. Encompasses live sound reinforcement, studio recording, and broadcast audio.'
        },
        'live-sound': {
            title: 'Live Sound',
            content: 'The practice of amplifying and mixing audio for live events. Requires real-time decision-making, acoustic awareness, and technical expertise with PA systems.'
        },
        'production': {
            title: 'Event Production',
            content: 'The comprehensive planning and execution of live events, including audio, lighting, staging, and technical coordination. Requires both creative vision and logistical expertise.'
        },
        'engineering': {
            title: 'Engineering',
            content: 'The application of scientific and mathematical principles to design, build, and maintain systems. In audio, this means creating optimal sound experiences through technical expertise.'
        },
        'cnc': {
            title: 'CNC Machining',
            content: 'Computer Numerical Control machining uses programmed instructions to control machine tools. Enables precise, repeatable manufacturing of complex parts from various materials.'
        },
        'precision': {
            title: 'Precision Manufacturing',
            content: 'Manufacturing processes that achieve extremely tight tolerances, often ±0.0001 inches or better. Essential for aerospace, medical, and high-reliability applications.'
        },
        'react': {
            title: 'React',
            content: 'A JavaScript library for building user interfaces, particularly single-page applications. Widely used in Web3 for creating decentralized application frontends.'
        },
        'nodejs': {
            title: 'Node.js',
            content: 'A JavaScript runtime built on Chrome V8 engine that enables server-side JavaScript execution. Essential for building Web3 backends and blockchain tooling.'
        },
        'wagmi': {
            title: 'Wagmi',
            content: 'A collection of React hooks for Ethereum development. Simplifies wallet connection, contract interaction, and blockchain data fetching in React applications.'
        },
        'ethersjs': {
            title: 'Ethers.js',
            content: 'A complete Ethereum library for JavaScript and TypeScript. Provides utilities for wallet management, contract interaction, and blockchain communication.'
        },
        'zk-circuits': {
            title: 'ZK Circuits',
            content: 'Mathematical constructs that define the logic of zero-knowledge proofs. Circuits specify what can be proven without revealing the underlying data.'
        },
        'cam': {
            title: 'CAM (Computer-Aided Manufacturing)',
            content: 'Software that translates CAD designs into machine tool instructions. Generates optimized toolpaths for CNC machining operations.'
        },
        'gcode': {
            title: 'G-code',
            content: 'Programming language used to control CNC machine tools. Specifies movements, speeds, feeds, and tool changes for automated manufacturing.'
        },
        'spiritual': {
            title: 'Spiritual Practice',
            content: 'Contemplative disciplines that cultivate inner transformation, presence, and connection to the sacred. Includes meditation, prayer, ceremony, and ritual.'
        },
        'python': {
            title: 'Python',
            content: 'Versatile programming language widely used in data science, AI/ML, automation, and Web3 development. Known for readable syntax and extensive libraries.'
        },
        'api': {
            title: 'API (Application Programming Interface)',
            content: 'Set of protocols and tools for building software applications. Enables different systems to communicate and share data securely.'
        },
        'database': {
            title: 'Database Design',
            content: 'The organization and structure of data storage systems. Includes relational databases (SQL) and NoSQL solutions for different use cases.'
        }
    };
    
    const termData = terms[term];
    const isSubPage = window.location.pathname.includes('/pages/');
    const glossaryPath = isSubPage ? 'glossary.html' : 'pages/glossary.html';
    
    if (window.modalInstance && termData) {
        window.modalInstance.open(`
            <div class="glossary-entry">
                <h3>${termData.title}</h3>
                <p>${termData.content}</p>
                <div class="glossary-actions">
                    <a href="${glossaryPath}#${term}" class="btn-primary" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 8px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">📚 View Full Glossary</a>
                </div>
            </div>
        `);
    } else if (window.modalInstance) {
        window.modalInstance.open(`
            <div class="glossary-entry">
                <h3>${term.toUpperCase()}</h3>
                <p>Loading definition...</p>
                <div class="glossary-actions">
                    <a href="${glossaryPath}#${term}" class="btn-primary" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(0, 255, 255, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 8px; color: #00ffff; text-decoration: none; transition: all 0.3s ease;">📚 View Full Glossary</a>
                </div>
            </div>
        `);
    }
}
