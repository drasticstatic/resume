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
