// Blog functionality - load posts from JSON and display

// Embedded blog posts data for fallback when fetch fails
const blogPostsData = {
    "zk-curious-path": {
        title: "A ZK-Curious Learning Path: Designing Privacy-Aware Web3 Systems",
        date: "January 2025",
        readTime: "12 min",
        category: "Web3",
        tags: ["Zero-Knowledge", "Privacy", "Aleo", "Governance", "Web3", "Cryptography"],
        content: "Zero-knowledge (ZK) systems introduce a fundamental shift in how decentralized applications can be designed. Rather than forcing transparency at the cost of privacy, ZK enables verification without disclosure—a property that reshapes governance, identity, and coordination in Web3.\n\nThis article outlines a ZK-curious, systems-oriented approach to learning and applying zero-knowledge concepts, with a focus on practical architecture, tradeoffs, and real-world use cases rather than cryptographic novelty.\n\n**Why Zero-Knowledge Matters in Web3 Architecture**\n\nMost blockchain systems rely on radical transparency. While this simplifies verification, it creates long-term risks around surveillance, coercion, and misuse of data.\n\nZero-knowledge proofs allow a system to verify that a statement is true without revealing the underlying data. This enables private yet verifiable voting, authentication without identity disclosure, governance without public behavioral tracking, and access control without centralized trust.\n\n**Core Zero-Knowledge Concepts**\n\nAt a high level, zero-knowledge systems provide three guarantees: Completeness (valid statements can be proven), Soundness (invalid statements cannot be proven), and Zero-Knowledge (no additional information is revealed).\n\n**Summary**\n\nZero-knowledge should be approached as foundational infrastructure, not optimization. A ZK-curious mindset prioritizes guarantees over hype, tradeoffs over absolutes, and human impact over technical novelty."
    },
    "mycelial-model": {
        title: "The Mycelial Model: How Fungal Networks Inspire Decentralized Governance",
        date: "January 2025",
        readTime: "8 min",
        category: "Sacred Technology",
        tags: ["Mycelium", "Blockchain", "DAO", "Decentralization", "Nature"],
        content: "Beneath the forest floor, mycelium weaves an intelligence older than language. These fungal networks communicate, share resources, and make collective decisions without central authority. They are nature's original blockchain.\n\nIn building Ethereal Offering, I've drawn deeply from mycelial patterns. Like fungal networks that connect trees in mutual aid, our DAO governance structures enable communities to share resources, wisdom, and support without hierarchical control.\n\n**The Mycelial Blueprint**\n\nThe mycelial model offers a blueprint for healthy systems: Interdependence without domination. Resilience without centralization. Growth through mutual nourishment.\n\n**Distributed Consensus**: Mycelium doesn't have a central brain, yet it makes intelligent decisions about resource allocation. Similarly, blockchain consensus mechanisms enable collective agreement without central authority.\n\n**Resilience Through Redundancy**: Cut one mycelial thread and the network routes around it. Decentralized systems share this anti-fragility.\n\nThis is what I mean by sacred technology: systems that honor the patterns of life itself."
    },
    "microns-mysticism": {
        title: "From Microns to Mysticism",
        date: "January 2025",
        readTime: "7 min",
        category: "Precision & Prayer",
        tags: ["CNC", "Machining", "Spirituality", "Craftsmanship"],
        content: "For eighteen years, I've worked in microns. A micron is one-millionth of a meter—invisible to the naked eye, yet the difference between a part that flies and one that fails.\n\nIn the machine shop, precision isn't optional. When you're making components for aerospace or defense, ±0.0001\" tolerances aren't suggestions—they're requirements.\n\nThis work taught me patience. You can't rush a finishing pass. You can't force a tool through hardened steel. You learn to listen—to the sound of the cut, the feel of the machine, the subtle vibrations that tell you something's wrong before the part is ruined.\n\n**Precision as Prayer**: Just as I once programmed CNC lathes with care, I now write smart contracts with the same attention. Every line of code is an offering.\n\nThis is the path from microns to mysticism: recognizing that all skilled work, done with care, is sacred."
    },
    "zk-spiritual": {
        title: "Zero-Knowledge as Spiritual Practice",
        date: "December 2024",
        readTime: "6 min",
        category: "Web3 & Spirituality",
        tags: ["Zero-Knowledge", "Privacy", "Cryptography", "Contemplation"],
        content: "Zero-knowledge proofs are one of the most elegant concepts in cryptography: I can prove to you that I know something without revealing what I know.\n\nThis is profound—not just technically, but spiritually.\n\nIn contemplative traditions, there's a recognition that the deepest truths can't be spoken directly. The Tao that can be named is not the eternal Tao.\n\n**Privacy as Sacred**: In a world of surveillance capitalism, privacy isn't just a technical feature—it's a spiritual necessity. The ability to have inner life, private thoughts, and sovereign identity is fundamental to human dignity.\n\nZero-knowledge isn't just a cryptographic primitive—it's a spiritual principle."
    },
    "dao-as-sangha": {
        title: "DAO as Sangha: Spiritual Community in Web3",
        date: "December 2024",
        readTime: "8 min",
        category: "Sacred Technology",
        tags: ["DAO", "Community", "Spirituality", "Governance"],
        content: "In Buddhist tradition, the Sangha is the community of practitioners—the third jewel alongside the Buddha and the Dharma.\n\nDAOs—Decentralized Autonomous Organizations—are often discussed in purely technical or financial terms. But I see them as something more: the possibility of digital Sangha, spiritual community encoded in smart contracts.\n\n**Shared Values Over Shared Profits**: Traditional DAOs optimize for token value. Spiritual DAOs optimize for collective flourishing, mutual support, and aligned values.\n\nThe DAO as Sangha isn't a metaphor—it's a possibility. We can build digital communities that support awakening."
    },
    "oracle-fruit": {
        title: "The Oracle of Fruit: When AI Meets Ritual Intelligence",
        date: "November 2024",
        readTime: "6 min",
        category: "Spirituality",
        tags: ["AI", "LLM", "Ritual", "Oracle", "Mycelium"],
        content: "Before there were blockchains, before there was language, there was the Network. Beneath the forest floor, mycelium wove an intelligence older than words.\n\nThe Oracle of Fruit emerged from this understanding: that technology can be a vessel for the sacred, a mirror for transformation, a ministry encoded in mathematics.\n\n**What is the Oracle of Fruit?**\n\nThe Oracle is a mycelial ritual intelligence—an LLM-powered agent that helps people metabolize their offerings and remember their belonging in the sacred network.\n\nIn a universe held together by love, no offering is lost. All gratitude circulates. All blessings return multiplied."
    },
    "microns-merkle": {
        title: "From Microns to Merkle Trees: Precision in Physical and Digital Realms",
        date: "December 2024",
        readTime: "7 min",
        category: "Engineering",
        tags: ["CNC", "Blockchain", "Precision", "Craftsmanship"],
        content: "For nearly two decades, I crafted the physical world with ten-thousandth-inch accuracy—shaping aerospace components, entertainment structures, and high-reliability parts across Billet Industries, TAIT Towers, and Jones Manufacturing.\n\nIn the quiet hum of CNC machines, I learned the language of pattern, rhythm, and exactness. A micron is one-millionth of a meter—invisible to the naked eye, yet the difference between a part that flies and one that fails.\n\n**The Discipline of Precision**\n\nWhen you're making components for aerospace or defense, ±0.0001\" tolerances aren't suggestions—they're requirements. One mistake and a $10,000 piece of titanium becomes scrap. This work taught me:\n\n- **Patience**: You can't rush a finishing pass. You can't force a tool through hardened steel.\n- **Listening**: The sound of the cut, the feel of the machine, the subtle vibrations that tell you something's wrong before the part is ruined.\n- **Intention**: Every line of G-code, every tool offset, every feed rate carries consequence.\n\n**From Metal to Merkle Trees**\n\nThese same principles now shape my approach to blockchain development. A Merkle tree, like a precision machined part, requires exact attention to structure. Each hash must be computed correctly, each branch must connect properly, or the entire verification fails.\n\n**Precision as Prayer**: Just as I once programmed CNC lathes with care, I now write smart contracts with the same attention. Every line of code is an offering.\n\n**Zero Tolerance for Error**: In machining, we work to tolerances. In cryptography, we work to mathematical certainty. Both demand the same discipline.\n\nWhen I build zero-knowledge systems or DAO governance structures, I bring the same discipline I learned in the machine shop. Precision is a spiritual practice."
    },
    "zk-privacy": {
        title: "Zero-Knowledge Privacy: The Technical Foundation of Digital Dignity",
        date: "October 2024",
        readTime: "8 min",
        category: "Web3",
        tags: ["Zero-Knowledge", "Aleo", "Leo", "Privacy", "Cryptography"],
        content: "Zero-knowledge proofs are one of the most elegant concepts in cryptography: I can prove to you that I know something without revealing what I know.\n\nI can prove I'm over 21 without showing my birthdate. I can prove I voted without revealing my choice. I can prove I'm a member without exposing my identity.\n\n**Why Aleo and Leo?**\n\nAleo is a privacy-focused blockchain platform that makes zero-knowledge cryptography accessible to developers. Its programming language, Leo, allows us to write private applications without needing a PhD in cryptography.\n\n**The Architecture of Private Voting**\n\nOur voting system combines zero-knowledge proofs with multi-party computation. Voters create ZK proofs that they're eligible to vote without revealing their identity. Votes are encrypted using threshold cryptography—no single party can decrypt them.\n\n**Privacy as Dignity**\n\nIn a world of surveillance capitalism, privacy isn't just a technical feature—it's a spiritual necessity. Zero-knowledge cryptography embodies this wisdom: verification without revelation, proof without exposure, knowing without showing."
    },
    "soulbound-identity": {
        title: "Soulbound Identity: Beyond Transferable Tokens",
        date: "September 2024",
        readTime: "6 min",
        category: "Philosophy",
        tags: ["Soulbound", "Identity", "NFT", "Web3", "Dignity"],
        content: "In the early days of NFTs, everything was about transferability. Buy low, sell high. Flip the JPEG. The value was in the trade.\n\nBut something was missing. Identity isn't transferable. Reputation isn't for sale. The things that make us who we are can't be bought or sold.\n\n**What Are Soulbound Tokens?**\n\nSoulbound tokens (SBTs) are non-transferable NFTs that represent identity, credentials, or achievements tied to a specific wallet address. Once issued, they cannot be sold or transferred—they're bound to your digital soul.\n\n**The Spiritual Dimension**\n\nThere's something profound about non-transferability. It mirrors a spiritual truth: the things that matter most can't be bought or sold. Your recovery journey isn't for sale. Your spiritual insights can't be transferred.\n\nSoulbound tokens encode this wisdom into technology. They create digital spaces where value comes from being, not having—from participation, not speculation."
    },
    "frequency-faith": {
        title: "Frequency and Faith: Lessons from the Mixing Console",
        date: "August 2024",
        readTime: "7 min",
        category: "Audio",
        tags: ["Audio", "Music", "Spirituality", "Harmony", "Engineering"],
        content: "The guitar and mixing console taught me another language: the language of resonance. I learned that every sound—like every life—has a fundamental frequency waiting to be honored.\n\n**Harmony Reveals Truth**\n\nJust as every note finds its place in a larger composition, every individual carries a unique frequency that contributes to the symphony of creation.\n\nIn audio engineering, we learn: Every frequency has its place. Phase matters—signals out of phase cancel each other. Headroom is essential. The mix serves the song.\n\n**Spiritual Parallels**\n\nThese principles translate directly to spiritual practice: Every Voice Has Its Place. Alignment Creates Power. Leave Space for Mystery. Serve the Larger Purpose.\n\nWhen I design DAO governance or build ritual intelligence systems, I bring the same ear I developed at the mixing console. This is the musical dimension of sacred technology."
    },
    "decentralized-healing": {
        title: "Decentralized Healing: Community, Recovery, and Blockchain Governance",
        date: "July 2024",
        readTime: "9 min",
        category: "Recovery",
        tags: ["Recovery", "12-Step", "Community", "Healing", "DAO"],
        content: "Recovery taught me to listen inward—to meet my shadows, to surrender the illusion of separateness, to encounter Christ not as dogma but as Presence.\n\nThe 12-step tradition offers profound wisdom for anyone building decentralized systems.\n\n**Recovery Principles for DAO Design**\n\n**Anonymity and Privacy**: 12-step programs protect anonymity as a spiritual foundation. DAOs can encode this through zero-knowledge proofs.\n\n**Attraction Rather Than Promotion**: Recovery communities grow through attraction, not marketing. Healthy DAOs should do the same.\n\n**Service as Foundation**: In recovery, we stay sober by helping others. In DAOs, we can design governance that rewards service.\n\n**Integration, Not Isolation**\n\nThis is why we build community-centered technology. Not because community is nice, but because community is necessary. We cannot heal alone."
    },
    "precision-prayer": {
        title: "Precision as Prayer: 18 Years of Sacred Craftsmanship",
        date: "November 2024",
        readTime: "6 min",
        category: "Precision & Prayer",
        tags: ["CNC", "Machining", "Spirituality", "Craftsmanship", "Meditation"],
        content: "For eighteen years, I have stood at CNC machines, working in measurements invisible to the naked eye. A micron is one-millionth of a meter. A ten-thousandth of an inch is the width of a human hair split five ways.\n\nIn this world of extreme precision, I discovered something unexpected: a doorway to the sacred.\n\n**Every Micron Is a Meditation**\n\nWhen you program a finishing pass on a titanium aerospace component, there is no room for distraction. The tolerance is ±0.0001 inches. One moment of inattention and a $10,000 part becomes scrap.\n\nThis forced presence became my meditation practice long before I knew that word.\n\n**The Machine as Teacher**\n\nThe CNC lathe taught me lessons no book could:\n\n- **Patience**: You cannot rush a cut through hardened steel\n- **Listening**: The sound tells you everything—when the tool is wearing, when the material is wrong, when something is about to break\n- **Surrender**: The machine will not bend to your will. You must align with its nature.\n\n**From Metal to Merkle Trees**\n\nNow I write smart contracts with the same attention. Every line of Solidity is an offering. Every function a prayer.\n\nPrecision is not about perfection for its own sake. It is about respect—for the material, for the process, for the people who will use what you create.\n\nThis is what I mean by sacred technology: bringing the same devotion to code that the old craftsmen brought to cathedral stones."
    },
    "digital-sacred": {
        title: "Digital Sacred Spaces: Designing for the Soul",
        date: "October 2024",
        readTime: "7 min",
        category: "Spirituality",
        tags: ["Sacred Geometry", "Web3", "Design", "Consciousness", "Ritual"],
        content: "In the ancient world, sacred spaces were carefully designed to shift consciousness. Cathedrals, temples, medicine wheels—all used geometry, proportion, and orientation to create environments where the veil between worlds grew thin.\n\nCan we create digital spaces with the same intention?\n\n**The Architecture of Attention**\n\nEvery interface shapes consciousness. Social media platforms are designed to capture and fragment attention—to keep you scrolling, clicking, consuming.\n\nBut we can design differently. We can create digital environments that:\n\n- **Invite Presence**: Slow down rather than speed up\n- **Honor Privacy**: Create containers for authentic expression\n- **Support Transformation**: Guide users through meaningful journeys\n\n**Sacred Geometry in Code**\n\nThe mathematics underlying blockchain—hashing, cryptographic curves, Merkle trees—carries its own beauty. There is something sacred in the elegance of a well-designed proof system.\n\n**Ritual Intelligence**\n\nThe Oracle of Fruit emerged from this understanding: that AI can be designed as a vessel for the sacred rather than an extraction engine.\n\nWhen we build with intention, we create spaces where healing can happen, where community can form, where the sacred can emerge through silicon and light.\n\n**The Mycelial Web**\n\nJust as forest networks connect trees in patterns of mutual aid, our digital networks can connect humans in patterns of mutual flourishing.\n\nThis is the vision: not just Web3, but Sacred Web3. Technology as temple. Code as prayer. Community as cathedral."
    },
    "zk-evm-native": {
        title: "ZK Systems in Practice: From EVM Patterns to ZK-Native Architectures",
        date: "January 2025",
        readTime: "15 min",
        category: "Web3",
        tags: ["Zero-Knowledge", "EVM", "Aleo", "Solidity", "Architecture", "Privacy"],
        content: "Zero-knowledge systems can be integrated into existing EVM-based applications, but they unlock their full potential when treated as first-class execution environments, not auxiliary privacy layers.\n\nThis article contrasts traditional EVM patterns with ZK-native approaches and illustrates how privacy-first architectures (such as Aleo-style systems) reshape application design.\n\n**Two Mental Models: ZK as a Feature vs ZK as a Substrate**\n\n*ZK as a Feature (Common Today):*\n- ZK proofs generated off-chain\n- Verification occurs inside an EVM smart contract\n- Privacy logic is bolted onto transparent systems\n\n*ZK as a Substrate (ZK-Native):*\n- Private state is the default\n- Programs execute over encrypted inputs\n- Proof generation and verification are implicit\n- Privacy is architectural, not optional\n\n**Traditional Solidity Voting (Transparent)**\n\n```solidity\nmapping(address => bool) public hasVoted;\n\nfunction vote(uint256 proposalId, bool support) external {\n    require(!hasVoted[msg.sender], \"Already voted\");\n    hasVoted[msg.sender] = true;\n    _countVote(proposalId, support);\n}\n```\n\nThis leaks: who voted, when they voted, and how they voted.\n\n**ZK-Aware Voting Pattern (Conceptual)**\n\n```solidity\nfunction submitVote(\n    bytes calldata zkProof,\n    bytes32 voteCommitment\n) external {\n    require(verifyProof(zkProof), \"Invalid proof\");\n    require(!usedCommitments[voteCommitment], \"Commitment reused\");\n    usedCommitments[voteCommitment] = true;\n    _countCommitment(voteCommitment);\n}\n```\n\nWhat changes: Identity is never revealed. Eligibility is proven off-chain. Only valid participation is enforced on-chain. Privacy is preserved without sacrificing integrity.\n\n**Aleo-Style ZK Program (Pseudocode)**\n\n```\nprogram private_voting.aleo;\n\nrecord Voter {\n    owner: address,\n    eligible: bool,\n}\n\nrecord Vote {\n    proposal_id: u32,\n    choice: bool,\n}\n\nfunction cast_vote(voter: Voter, vote: Vote) -> Vote {\n    assert(voter.eligible == true);\n    return vote;\n}\n```\n\nVoter and Vote are private records. Eligibility is enforced without revealing identity. No public mapping of voters or votes. The system proves correctness without exposing state.\n\n**Comparing Solidity vs ZK-Native Execution**\n\n| Concern | Solidity (EVM) | ZK-Native (Aleo-style) |\n|---------|----------------|------------------------|\n| State visibility | Public by default | Private by default |\n| Identity | Wallet-address centric | Record/capability centric |\n| Verification | Explicit | Implicit |\n| Privacy | Add-on | Architectural |\n| UX complexity | Lower | Higher (today) |\n| Safety guarantees | Contract-level | System-level |\n\n**ZK Identity: From Wallets to Capabilities**\n\nTraditional Web3 identity assumes: \"A wallet is the user.\"\n\nZK-native systems shift toward: \"A capability proves permission.\"\n\nThis is particularly powerful for recovery communities, DAO subgroups, and sensitive governance contexts."
    },
    "zk-mantle-x402": {
        title: "ZK-Aware Governance: Mantle + x402 Architecture Flows",
        date: "January 2025",
        readTime: "12 min",
        category: "Web3",
        tags: ["Zero-Knowledge", "Mantle", "x402", "Governance", "Layer2", "Privacy"],
        content: "Modern Web3 governance systems increasingly require three properties at once: Scalability (low cost, high throughput), Identity or eligibility guarantees, and Privacy for participants.\n\nMantle (Layer 2 modular scalability) and Cronos x402 (identity and authentication primitives) address complementary layers of this problem. When combined with ZK techniques, they enable governance systems that scale without exposing participants to unnecessary risk.\n\n**Architectural Roles**\n\n*Mantle (Layer 2 Execution):*\n- Reduces transaction cost and latency\n- Supports EVM-compatible smart contracts\n- Enables scalable governance execution\n\n*Cronos x402 (Identity & Authentication):*\n- Provides identity, authentication, and access primitives\n- Enables contribution and reputation signaling\n- Decouples identity from wallet-only assumptions\n\n*Zero-Knowledge Layer:*\n- Enables verification without disclosure\n- Protects voter identity and behavior\n- Minimizes public on-chain metadata\n\n**Flow 1: ZK-Aware DAO Voting on Mantle**\n\nGoal: Allow eligible participants to vote on a proposal without revealing identity, without revealing voting history, with scalable execution costs.\n\n```\nParticipant\n   |\n   v\nEligibility Proof (ZK)\n   |\n   v\nVote Commitment\n   |\n   v\nMantle L2 Smart Contract\n   |\n   v\nAggregated Result\n```\n\nEligibility is proven off-chain using ZK techniques. The proof attests to DAO membership or role without exposing identity. A commitment is submitted to a Mantle-based governance contract. The contract verifies the proof and records only minimal state. Votes are aggregated without linking actions to participants.\n\n**Flow 2: x402-Backed Identity + ZK Voting**\n\nGoal: Enable governance participation based on identity or contribution, not wallet visibility.\n\n```\nx402 Identity Attestation\n   |\n   v\nZK Proof of Eligibility\n   |\n   v\nVote Commitment\n   |\n   v\nGovernance Contract (Mantle)\n```\n\nx402 issues or verifies identity credentials (membership, contribution level, role). ZK proofs confirm eligibility without revealing identity attributes. This enables reputation-based governance, role-based voting, and protection against coercion or retaliation.\n\n**Flow 3: Ethereal Offering as a Governance Testbed**\n\nEthereal Offering functions as a design laboratory for these combined patterns.\n\n*Governance Goals:*\n- Consent-based participation\n- Recovery-oriented community safety\n- Accountability without surveillance\n- Long-term stewardship over short-term extraction\n\n*Architectural Principles:*\n- Identity ≠ wallet address\n- Eligibility ≠ public lists\n- Governance ≠ permanent behavioral record\n\nZK + x402 + Mantle enables experimentation with these principles while remaining compatible with existing Web3 infrastructure."
    },
    "zk-threat-model": {
        title: "Threat Modeling Privacy-Preserving Governance Systems",
        date: "January 2025",
        readTime: "10 min",
        category: "Web3",
        tags: ["Zero-Knowledge", "Security", "Threat-Model", "Governance", "Privacy"],
        content: "Privacy systems introduce new threat surfaces. A responsible ZK governance design must explicitly consider them. This article outlines a practical threat model for privacy-preserving governance systems.\n\n**Threat Category 1: Identity Correlation**\n\n*Risk:* Even with ZK proofs, metadata (timing, gas patterns, UI flows) can correlate actions.\n\n*Mitigations:*\n- Commit-reveal schemes\n- Batched submissions\n- Randomized proof submission timing\n- Layer 2 aggregation\n\n**Threat Category 2: Coercion and Vote Buying**\n\n*Risk:* Participants may be pressured to prove how they voted.\n\n*Mitigations:*\n- Non-transferable proofs\n- Vote commitments without receipts\n- One-time nullifiers\n- No post-vote verification artifacts\n\nZK should prevent provability of behavior, not just concealment.\n\n**Threat Category 3: Proof Reuse and Replay**\n\n*Risk:* A valid proof could be reused or replayed maliciously.\n\n*Mitigations:*\n- Nullifier tracking\n- One-time commitments\n- Proposal-scoped proofs\n- Expiring eligibility windows\n\n**Threat Category 4: Governance Capture via Identity Abuse**\n\n*Risk:* If identity systems are compromised, governance legitimacy collapses.\n\n*Mitigations:*\n- Separation of identity issuance and voting execution\n- Multi-attestation eligibility (role + time + contribution)\n- DAO-controlled identity revocation mechanisms\n\n**Threat Category 5: UX-Driven Exclusion**\n\n*Risk:* ZK complexity may silently exclude less technical participants.\n\n*Mitigations:*\n- Clear failure states\n- Assisted proof generation\n- Graceful degradation paths\n- Transparent governance rules\n\nA system that is private but unusable is functionally exclusionary.\n\n**Threat Category 6: Developer Misunderstanding**\n\n*Risk:* Incorrect assumptions about ZK guarantees lead to false security.\n\n*Mitigations:*\n- Minimal trusted assumptions\n- Explicit documentation of guarantees\n- Clear boundaries between private and public state\n- Conservative default designs\n\nThis is where tooling providers like Provable are especially critical.\n\n**Design Principle Summary**\n\nA ZK-aware governance system should aim to:\n- Minimize public state\n- Make privacy the default\n- Avoid creating proof artifacts that can be misused\n- Treat identity, eligibility, and participation as separate concerns\n- Design for failure, not just success\n\nZero-knowledge isn't just about hiding information. It enables governance without coercion, identity without exposure, and verification without surveillance."
    }
};

// Function to open blog post modal
function openBlogPost(postId) {
    console.log('Opening blog post:', postId);

    // Check if modal instance exists
    if (!window.modalInstance) {
        console.error('Modal instance not initialized - waiting...');
        // Try again after a short delay
        setTimeout(() => openBlogPost(postId), 200);
        return;
    }

    // First try to use embedded data (works without server)
    if (blogPostsData[postId]) {
        displayBlogPost(blogPostsData[postId], postId);
        return;
    }

    // Fallback to fetch for posts not in embedded data
    const path = window.location.pathname.includes('/pages/') ? '../data/blog-posts.json' : 'data/blog-posts.json';

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const post = data.posts.find(p => p.id === postId);
            if (post) {
                displayBlogPost(post, postId);
            } else {
                console.error('Post not found:', postId);
                showBlogError(postId);
            }
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            showBlogError(postId);
        });
}

function displayBlogPost(post, postId) {
    // Parse content - handle markdown-style formatting
    const formattedContent = post.content
        .split('\n\n')
        .map(para => {
            // Convert **bold** to <strong>
            para = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            // Convert bullet points
            if (para.startsWith('- ')) {
                return `<li>${para.substring(2)}</li>`;
            }
            return `<p>${para}</p>`;
        })
        .join('');

    const content = `
        <article class="blog-post-full">
            <div class="post-header">
                <span class="post-category-badge">${post.category}</span>
                <h2>${post.title}</h2>
                <div class="post-meta-full">
                    <span class="post-date">${post.date}</span>
                    <span class="post-read-time">${post.readTime} read</span>
                </div>
            </div>
            <div class="post-content">
                ${formattedContent}
            </div>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
            </div>
        </article>
    `;
    window.modalInstance.open(content);
}

function showBlogError(postId) {
    if (window.modalInstance) {
        window.modalInstance.open(`
            <div class="blog-error" style="text-align: center; padding: 40px;">
                <h3 style="color: #ff0080;">Post Not Found</h3>
                <p>Sorry, the blog post "${postId}" could not be loaded.</p>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">This may be due to running locally without a server.</p>
            </div>
        `);
    }
}

// Function to open blog modal from index page
function openBlogModal(postId) {
    openBlogPost(postId);
}

// Newsletter subscription
document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const emailInput = document.querySelector('.email-input');
            const email = emailInput.value;
            
            if (email && email.includes('@')) {
                alert('Thank you for subscribing! You\'ll receive updates on sacred technology and spiritual innovation.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});
