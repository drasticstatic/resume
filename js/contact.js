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

// Note: the conversation-starter modal (typing greeting/prompt carousel with
// play/pause/back/forward controls) lives in modal.js as openContactModal() /
// window.conversationCycler — every page, including this one, wires its
// "Start a Conversation" buttons to that. typeText() also lives there; it's
// not redefined here since contact.js loads after modal.js on this page and
// a second definition would shadow the canonical one.

// Scroll to contact form if present; otherwise navigate to the full contact page
function scrollToForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        if (window.modalInstance) {
            window.modalInstance.close();
        }
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus on first input
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
        }, 500);
    } else {
        const contactPath = window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html';
        window.location.href = `${contactPath}#contactForm`;
    }
}
