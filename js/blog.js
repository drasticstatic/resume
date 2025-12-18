// Blog functionality - load posts from JSON and display

// Function to open blog post modal
function openBlogPost(postId) {
    fetch('../data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            const post = data.posts.find(p => p.id === postId);
            if (post && window.modalInstance) {
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
                            ${post.content.split('\n\n').map(para => `<p>${para}</p>`).join('')}
                        </div>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                        </div>
                    </article>
                `;
                window.modalInstance.open(content);
            }
        })
        .catch(error => console.error('Error loading blog post:', error));
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
