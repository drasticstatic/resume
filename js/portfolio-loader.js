// Dynamic portfolio content loader

// Load and display portfolio data
async function loadPortfolioData() {
    try {
        const response = await fetch('../data/portfolio-data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        return null;
    }
}

// Generate project cards dynamically
function generateProjectCards(projects) {
    const container = document.querySelector('.projects-grid');
    if (!container) return;
    
    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-icon">${project.icon}</div>
            <h3>${project.title}</h3>
            <p>${project.shortDescription}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-actions">
                <button onclick="openProjectModal('${project.id}')">Details</button>
                ${project.links.github ? `<a href="${project.links.github}">Code</a>` : ''}
                ${project.links.demo ? `<a href="${project.links.demo}">Demo</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Generate skills sections
function generateSkills(skills) {
    const container = document.querySelector('.skills-categories');
    if (!container) return;
    
    const skillCategories = {
        'blockchain': { title: '🌐 Blockchain & Web3', icon: '🌐' },
        'manufacturing': { title: '🔧 Manufacturing & Engineering', icon: '🔧' },
        'software': { title: '💻 Software Development', icon: '💻' },
        'audio': { title: '🎵 Audio & Production', icon: '🎵' },
        'sacred': { title: '🍄 Sacred Technology', icon: '🍄' }
    };
    
    container.innerHTML = Object.entries(skills).map(([key, skillList]) => `
        <div class="skill-category">
            <h3>${skillCategories[key].title}</h3>
            <ul>
                ${skillList.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Initialize portfolio page
document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadPortfolioData();
    if (data) {
        // Check if we're on portfolio page
        if (document.querySelector('.projects-grid')) {
            generateProjectCards(data.projects);
        }
        
        // Check if we're on a page with skills section
        if (document.querySelector('.skills-categories')) {
            generateSkills(data.skills);
        }
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadPortfolioData, generateProjectCards, generateSkills };
}
