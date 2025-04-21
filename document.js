document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.project-filter');
    const searchInput = document.querySelector('input[type="search"]');
    const cards = document.querySelectorAll('.project-card');

    // Set 'All' filter as active by default
    document.querySelector('[data-category="all"]').classList.add('active');

    // Filter click handler
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const category = this.dataset.category;

            cards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.dataset.category;
                    card.style.display = cardCategory === category ? 'block' : 'none';
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
            card.style.display = shouldShow ? 'block' : 'none';
        });
    });
});
