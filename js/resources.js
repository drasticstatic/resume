// Resources modal content and functionality
function openResourceModal(resourceId) {
    const resources = {
        'zk-development': {
            title: 'Zero-Knowledge Development Resources',
            content: `
                <h3>Zero-Knowledge Development Learning Path</h3>
                
                <h4>🎯 Getting Started</h4>
                <ul>
                    <li><strong>Aleo Developer Documentation</strong> - Official guides and tutorials</li>
                    <li><strong>Leo Language Reference</strong> - Syntax and programming concepts</li>
                    <li><strong>Zero-Knowledge Proofs: An Illustrated Primer</strong> - Conceptual foundation</li>
                </ul>
                
                <h4>📚 Core Concepts</h4>
                <ul>
                    <li>Circuit design and constraint systems</li>
                    <li>Private vs public inputs and outputs</li>
                    <li>Proof generation and verification</li>
                    <li>Multi-party computation (MPC) protocols</li>
                </ul>
                
                <h4>🛠️ Practical Projects</h4>
                <ul>
                    <li>Private voting system implementation</li>
                    <li>Soulbound token contracts</li>
                    <li>Anonymous credential systems</li>
                    <li>Privacy-preserving DAO governance</li>
                </ul>
                
                <h4>🔗 Key Resources</h4>
                <ul>
                    <li><a href="https://aleo.org" target="_blank">Aleo Platform</a></li>
                    <li><a href="https://developer.aleo.org" target="_blank">Developer Portal</a></li>
                    <li><a href="https://github.com/AleoHQ" target="_blank">Aleo GitHub</a></li>
                </ul>
                
                <p><em>This learning path typically takes 3-6 months depending on prior blockchain experience.</em></p>
            `
        },
        'manufacturing': {
            title: 'Precision Manufacturing Resources',
            content: `
                <h3>Precision Manufacturing Learning Path</h3>
                
                <h4>🎯 Fundamentals</h4>
                <ul>
                    <li><strong>Blueprint Reading & GD&T</strong> - Geometric dimensioning and tolerancing</li>
                    <li><strong>Machining Principles</strong> - Cutting tools, speeds, feeds, and materials</li>
                    <li><strong>Measurement & Inspection</strong> - Precision measuring instruments</li>
                </ul>
                
                <h4>📚 CNC Programming</h4>
                <ul>
                    <li>G-code fundamentals and structure</li>
                    <li>Mazatrol conversational programming</li>
                    <li>Mastercam CAM workflows</li>
                    <li>Tool path optimization strategies</li>
                </ul>
                
                <h4>🛠️ Advanced Topics</h4>
                <ul>
                    <li>Multi-axis machining techniques</li>
                    <li>High-speed machining principles</li>
                    <li>Quality systems (ISO-9001, AS9100)</li>
                    <li>Lean manufacturing and 6S methodology</li>
                </ul>
                
                <h4>🔗 Industry Resources</h4>
                <ul>
                    <li><a href="https://mastercam.com" target="_blank">Mastercam Training</a></li>
                    <li><a href="https://mazakusa.com" target="_blank">Mazak University</a></li>
                    <li><a href="https://nims-skills.org" target="_blank">NIMS Certification</a></li>
                </ul>
                
                <p><em>Apprenticeship programs typically span 4 years with combined classroom and hands-on training.</em></p>
            `
        },
        'sacred-tech': {
            title: 'Sacred Technology Resources',
            content: `
                <h3>Sacred Technology Learning Path</h3>
                
                <h4>🎯 Foundational Concepts</h4>
                <ul>
                    <li><strong>Mycelial Intelligence</strong> - Network theory and biological systems</li>
                    <li><strong>Ritual Technology</strong> - Sacred practices in digital contexts</li>
                    <li><strong>Soulbound Identity</strong> - Non-transferable digital identity</li>
                </ul>
                
                <h4>📚 Philosophical Framework</h4>
                <ul>
                    <li>Technology as spiritual practice</li>
                    <li>Decentralized governance models</li>
                    <li>Community healing and recovery principles</li>
                    <li>Psychedelic integration and technology</li>
                </ul>
                
                <h4>🛠️ Practical Applications</h4>
                <ul>
                    <li>Gratitude-based token systems</li>
                    <li>LLM-powered ritual agents</li>
                    <li>Privacy-preserving spiritual communities</li>
                    <li>Holacratic DAO structures</li>
                </ul>
                
                <h4>🔗 Recommended Reading</h4>
                <ul>
                    <li>"Entangled Life" by Merlin Sheldrake</li>
                    <li>"Braiding Sweetgrass" by Robin Wall Kimmerer</li>
                    <li>"The Tao of Physics" by Fritjof Capra</li>
                    <li>"Reinventing Organizations" by Frederic Laloux</li>
                </ul>
                
                <p><em>This is an emerging field combining ancient wisdom with modern technology.</em></p>
            `
        },
        'audio-engineering': {
            title: 'Audio Engineering Resources',
            content: `
                <h3>Audio Engineering Learning Path</h3>
                
                <h4>🎯 Fundamentals</h4>
                <ul>
                    <li><strong>Acoustics & Psychoacoustics</strong> - Sound physics and perception</li>
                    <li><strong>Signal Flow</strong> - Audio routing and processing chains</li>
                    <li><strong>Microphone Techniques</strong> - Selection and placement strategies</li>
                </ul>
                
                <h4>📚 Live Sound Engineering</h4>
                <ul>
                    <li>FOH mixing console operation</li>
                    <li>Speaker system design and tuning</li>
                    <li>Monitor mixing and stage management</li>
                    <li>Wireless systems and RF coordination</li>
                </ul>
                
                <h4>🛠️ Technical Skills</h4>
                <ul>
                    <li>Digital vs analog signal processing</li>
                    <li>EQ, compression, and effects usage</li>
                    <li>System measurement and optimization</li>
                    <li>Troubleshooting and problem solving</li>
                </ul>
                
                <h4>🔗 Professional Resources</h4>
                <ul>
                    <li><a href="https://aes.org" target="_blank">Audio Engineering Society</a></li>
                    <li><a href="https://prosoundnetwork.com" target="_blank">Pro Sound Network</a></li>
                    <li><a href="https://rationalacoustics.com" target="_blank">Rational Acoustics (SMAART)</a></li>
                </ul>
                
                <p><em>Hands-on experience is crucial - seek opportunities to work with experienced engineers.</em></p>
            `
        }
    };
    
    const resource = resources[resourceId];
    if (resource && window.modalInstance) {
        window.modalInstance.open(resource.content);
    }
}