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
