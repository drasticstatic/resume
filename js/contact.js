// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form data
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showSuccessMessage(data);
        resetForm(e.target);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject) {
        errors.push('Please select a subject');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage(data) {
    const message = `
        <h3>Message Sent Successfully!</h3>
        <p>Thank you, <strong>${data.name}</strong>! Your message has been received.</p>
        <p><strong>Subject:</strong> ${getSubjectText(data.subject)}</p>
        <p>I'll get back to you within 24-48 hours at <strong>${data.email}</strong>.</p>
        <p>In the meantime, feel free to explore my projects or connect with me on LinkedIn.</p>
        <div style="margin-top: 20px;">
            <a href="https://www.linkedin.com/in/christopherwilsonmrt/" target="_blank" style="color: var(--blue); text-decoration: none;">Connect on LinkedIn →</a>
        </div>
    `;
    
    if (window.modalInstance) {
        window.modalInstance.open(message);
    }
}

function showErrorMessage(errors) {
    const message = `
        <h3>Please Fix the Following Errors:</h3>
        <ul style="text-align: left; margin: 20px 0;">
            ${errors.map(error => `<li style="margin: 10px 0;">${error}</li>`).join('')}
        </ul>
        <p>Please correct these issues and try again.</p>
    `;
    
    if (window.modalInstance) {
        window.modalInstance.open(message);
    }
}

function getSubjectText(value) {
    const subjects = {
        'collaboration': 'Project Collaboration',
        'consulting': 'Consulting Inquiry',
        'speaking': 'Speaking Engagement',
        'technical': 'Technical Discussion',
        'spiritual': 'Spiritual Guidance',
        'other': 'Other'
    };
    
    return subjects[value] || value;
}

function resetForm(form) {
    form.reset();
}

// Generate mailto link for direct email (fallback)
function generateMailtoLink(data) {
    const subject = encodeURIComponent(`${getSubjectText(data.subject)} - ${data.name}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Subject: ${getSubjectText(data.subject)}

Message:
${data.message}
    `);
    
    return `mailto:drasticstatic@gmail.com?subject=${subject}&body=${body}`;
}