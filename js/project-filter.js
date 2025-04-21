function filterProjects(category) {
    // Get all project cards and filter buttons
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.project-filter');

    // Update active state of filter buttons
    filterButtons.forEach(button => {
        button.classList.remove('bg-primary', 'text-white');
        if (button.textContent.toLowerCase() === category.toLowerCase()) {
            button.classList.add('bg-primary', 'text-white');
        }
    });

    // Show/hide project cards based on category
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category.toLowerCase() === 'all') {
            card.style.display = 'block';
        } else {
            card.style.display = cardCategory && cardCategory.toLowerCase() === category.toLowerCase() 
                ? 'block' 
                : 'none';
        }
    });
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to filter buttons
    const filterButtons = document.querySelectorAll('.project-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterProjects(this.textContent);
        });
    });

    // Set "All" as default active filter
    filterProjects('All');
});
