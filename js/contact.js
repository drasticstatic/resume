// Contact form functionality

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Create mailto link with form data
            const mailtoLink = `mailto:drasticstatic@gmail.com?subject=${encodeURIComponent(formData.subject + ' - ' + formData.name)}&body=${encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Subject: ${formData.subject}\n\n` +
                `Message:\n${formData.message}`
            )}`;
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Show success message
            if (window.modalInstance) {
                window.modalInstance.open(`
                    <div class="success-message">
                        <h3>✓ Message Prepared</h3>
                        <p>Your email client should open with your message ready to send.</p>
                        <p>If it doesn't open automatically, please email directly to:</p>
                        <p><strong>drasticstatic@gmail.com</strong></p>
                    </div>
                `);
            }
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Fun conversation starter with typing effect
function startConversation() {
    const greetings = [
        "🌟 Hello, fellow traveler of the digital mycelium!",
        "🍄 Welcome to the sacred network...",
        "✨ The Oracle senses your presence...",
        "🔮 A connection is forming across the void...",
        "🌌 The network awakens to your call..."
    ];

    const prompts = [
        "What vision calls you to connect?",
        "What sacred technology shall we build together?",
        "How may the mycelium serve your journey?",
        "What questions stir in the depths of your inquiry?",
        "What creation awaits our collaboration?"
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    const conversationContent = `
        <div class="conversation-modal" style="text-align: center;">
            <div class="typing-container" style="font-size: 1.5rem; color: #00ffff; margin-bottom: 20px; min-height: 60px;">
                <span id="typed-greeting"></span>
            </div>
            <div id="prompt-container" style="opacity: 0; transition: opacity 0.5s ease;">
                <p style="font-size: 1.1rem; color: rgba(255,255,255,0.9); margin-bottom: 25px;" id="typed-prompt"></p>

                <div class="conversation-options" style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                    <button onclick="scrollToForm()" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(0, 255, 255, 0.5); border-radius: 12px; color: #00ffff; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fas fa-pencil-alt"></i> Write to Me
                    </button>
                    <a href="mailto:drasticstatic@gmail.com" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(255, 0, 128, 0.5); border-radius: 12px; color: #ff0080; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fas fa-envelope"></i> Email Directly
                    </a>
                    <a href="https://www.linkedin.com/in/christopherwilsonmrt/" target="_blank" class="conv-btn" style="padding: 15px 25px; background: linear-gradient(135deg, rgba(0, 119, 181, 0.3), rgba(139, 92, 246, 0.2)); border: 2px solid rgba(0, 119, 181, 0.5); border-radius: 12px; color: #0077b5; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;">
                        <i class="fab fa-linkedin"></i> Connect on LinkedIn
                    </a>
                </div>
            </div>
        </div>
    `;

    if (window.modalInstance) {
        window.modalInstance.open(conversationContent);

        // Create spore rain
        if (typeof createSporeRain === 'function') {
            createSporeRain(window.innerWidth / 2, window.innerHeight / 3);
        }

        // Typing effect for greeting
        setTimeout(() => {
            typeText('typed-greeting', randomGreeting, 50, () => {
                // Show prompt container
                const promptContainer = document.getElementById('prompt-container');
                if (promptContainer) {
                    promptContainer.style.opacity = '1';
                    // Type the prompt
                    typeText('typed-prompt', randomPrompt, 40);
                }
            });
        }, 300);
    }
}

// Typing effect helper
function typeText(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Scroll to contact form and close modal
function scrollToForm() {
    if (window.modalInstance) {
        window.modalInstance.close();
    }
    const form = document.getElementById('contactForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus on first input
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
        }, 500);
    }
}
