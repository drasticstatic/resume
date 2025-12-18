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

// Function to open contact modal from other pages
function openContactModal() {
    const content = `
        <div class="contact-modal">
            <h3>Get in Touch</h3>
            <p>I'm building systems that honor human dignity, protect personal sovereignty, and nurture pathways of healing and awakening.</p>
            
            <div class="contact-options">
                <a href="mailto:drasticstatic@gmail.com" class="contact-option">
                    <i class="fas fa-envelope"></i>
                    <span>Email Me</span>
                </a>
                <a href="https://www.linkedin.com/in/christopherwilsonmrt/" target="_blank" class="contact-option">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
                <a href="https://github.com/drasticstatic" target="_blank" class="contact-option">
                    <i class="fab fa-github"></i>
                    <span>GitHub</span>
                </a>
                <a href="pages/contact.html" class="contact-option">
                    <i class="fas fa-paper-plane"></i>
                    <span>Contact Form</span>
                </a>
            </div>
        </div>
    `;
    
    if (window.modalInstance) {
        window.modalInstance.open(content);
    }
}
