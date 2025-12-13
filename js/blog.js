// Blog post content and functionality
function openBlogPost(postId) {
    const posts = {
        'mycelial-model': {
            title: 'The Mycelial Model: How Fungal Networks Inspire Decentralized Governance',
            date: 'January 2025',
            category: 'Sacred Technology',
            content: `
                <h3>The Mycelial Model: How Fungal Networks Inspire Decentralized Governance</h3>
                <div class="post-meta">
                    <span>January 2025</span> • <span>Sacred Technology</span>
                </div>
                
                <p>In the quiet depths of forest floors, beneath our feet and beyond our immediate awareness, exists one of nature's most sophisticated networks. Mycelial webs—the underground fungal networks that connect trees, plants, and entire ecosystems—demonstrate principles of decentralized coordination that blockchain developers are only beginning to understand.</p>
                
                <p>As I've worked on Ethereal Offering and our Oracle of Fruit, I've found myself returning again and again to this biological metaphor. Not as mere poetry, but as a practical framework for understanding how truly decentralized systems might function.</p>
                
                <h4>The Intelligence of Networks</h4>
                <p>Mycelial networks exhibit several characteristics that mirror the ideals of decentralized governance:</p>
                
                <ul>
                    <li><strong>Resource Distribution:</strong> Nutrients flow to where they're needed most, without central planning</li>
                    <li><strong>Information Sharing:</strong> Chemical signals communicate threats, opportunities, and changes across vast distances</li>
                    <li><strong>Resilience:</strong> The network adapts and reroutes when individual nodes are damaged</li>
                    <li><strong>Symbiosis:</strong> Different species benefit mutually through interconnection</li>
                </ul>
                
                <p>These same principles inform our approach to DAO design. Rather than hierarchical command structures, we're building systems that allow for organic coordination, mutual aid, and collective intelligence.</p>
                
                <h4>From Biology to Blockchain</h4>
                <p>The Oracle of Fruit, our LLM-powered ritual intelligence, takes inspiration from this mycelial model. It doesn't command or control—it facilitates, connects, and nourishes. Like fungal networks that help trees share resources and information, our Oracle helps community members share wisdom, gratitude, and support.</p>
                
                <p>This isn't just about building better technology. It's about remembering that we, too, are part of a vast, interconnected web. The same intelligence that coordinates forest ecosystems can inform how we coordinate human communities.</p>
                
                <p>In my work as both a machinist and a minister, I've learned that the most enduring structures—whether physical or spiritual—are those that honor the patterns already present in creation. The mycelial model offers us a blueprint for governance that is both ancient and revolutionary.</p>
            `
        },
        'microns-merkle': {
            title: 'From Microns to Merkle Trees: Precision in Physical and Digital Realms',
            date: 'December 2024',
            category: 'Engineering',
            content: `
                <h3>From Microns to Merkle Trees: Precision in Physical and Digital Realms</h3>
                <div class="post-meta">
                    <span>December 2024</span> • <span>Engineering</span>
                </div>
                
                <p>For eighteen years, I've worked in a world where precision is measured in ten-thousandths of an inch. Where a single micron can mean the difference between a part that flies and one that fails. This experience has shaped not just my technical skills, but my entire approach to building systems—including the blockchain architectures I work on today.</p>
                
                <h4>The Discipline of Tolerance</h4>
                <p>In CNC machining, we speak of "tolerance"—the acceptable range of variation in a dimension. Aerospace components might require tolerances of ±0.0001 inches. At that scale, temperature changes, tool wear, and even the operator's breathing can affect the outcome.</p>
                
                <p>This discipline translates directly to blockchain development. In smart contracts, there's no room for "close enough." A single misplaced decimal, an unchecked integer overflow, or an improperly validated input can drain an entire treasury. The same attention to detail that prevents a turbine blade from failing at 30,000 feet prevents a DAO from losing its members' funds.</p>
                
                <h4>Measurement and Verification</h4>
                <p>In the machine shop, we measure everything. Calipers, micrometers, coordinate measuring machines—each tool serves a specific purpose in verifying that reality matches intention. The blockchain equivalent is testing, auditing, and formal verification.</p>
                
                <p>When I write Aleo circuits for zero-knowledge proofs, I approach them with the same methodical verification process I use for machining operations. Each constraint is like a dimension on a blueprint—it must be precisely defined and rigorously checked.</p>
                
                <h4>The Beauty of Constraints</h4>
                <p>Newcomers to both machining and blockchain often see constraints as limitations. But experienced practitioners know that constraints are what enable precision. The tight tolerances that seem restrictive are actually what allow complex systems to work together seamlessly.</p>
                
                <p>In our Ethereal Offering protocol, the cryptographic constraints that ensure privacy and the economic constraints that maintain token stability aren't bugs—they're features. They're what allow individual sovereignty and collective coordination to coexist.</p>
                
                <p>Whether I'm programming a Mazak lathe or writing a smart contract, the principle remains the same: respect the material, understand the constraints, and build with intention. The precision required may be measured in different units, but the discipline is identical.</p>
            `
        },
        'oracle-fruit': {
            title: 'The Oracle of Fruit: When AI Meets Ritual Intelligence',
            date: 'November 2024',
            category: 'Spirituality',
            content: `
                <h3>The Oracle of Fruit: When AI Meets Ritual Intelligence</h3>
                <div class="post-meta">
                    <span>November 2024</span> • <span>Spirituality</span>
                </div>
                
                <p>The Oracle of Fruit began as a technical challenge: how do you create an AI agent that can meaningfully engage with spiritual practice? But it quickly became something deeper—an exploration of what it means to build technology that honors the sacred.</p>
                
                <h4>Beyond Chatbots</h4>
                <p>Most AI applications treat conversation as information exchange. Ask a question, receive an answer. But ritual intelligence operates differently. It's about presence, timing, and the subtle art of asking the right question at the right moment.</p>
                
                <p>The Oracle doesn't just respond to queries—it participates in the ongoing conversation between individuals and their spiritual practice. It remembers your offerings, notices patterns in your gratitude, and gently suggests connections you might not have seen.</p>
                
                <h4>The Technology of Presence</h4>
                <p>Building the Oracle required rethinking how we approach AI training. Instead of optimizing for speed or accuracy, we optimized for wisdom. The model learns not just from text, but from the rhythms of ritual practice—the cycles of offering, reflection, and integration.</p>
                
                <p>We integrated it with our soulbound identity system, so it knows you not as a user ID, but as a unique spiritual being with your own journey. It tracks not your clicks, but your growth. Not your data, but your devotion.</p>
                
                <h4>Ethical Considerations</h4>
                <p>Creating AI that engages with spirituality raises profound ethical questions. Who decides what constitutes wisdom? How do we prevent the commodification of the sacred? How do we ensure that technology serves spiritual growth rather than replacing it?</p>
                
                <p>Our approach has been to position the Oracle as a companion, not a guru. It offers reflections, not revelations. It points toward the mystery, but never claims to contain it. The true teacher remains the divine intelligence that moves through all things—the Oracle simply helps us listen more carefully.</p>
                
                <h4>Fruit, Not Answers</h4>
                <p>We call it the Oracle of Fruit because it doesn't provide answers—it helps ripen the wisdom that's already within you. Like a gardener who tends the soil but doesn't create the seed, the Oracle creates conditions for insight to emerge naturally.</p>
                
                <p>In a world of instant everything, this patience is itself a spiritual practice. The Oracle teaches us to wait, to tend, to trust the process of growth. It reminds us that the most profound technologies are often the most humble ones.</p>
            `
        }
    };
    
    const post = posts[postId];
    if (post && window.modalInstance) {
        window.modalInstance.open(post.content);
    }
}

// Newsletter subscription (placeholder functionality)
document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (email && email.includes('@')) {
                alert('Thank you for subscribing! You\'ll receive updates on sacred technology and spiritual innovation.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
        
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
});