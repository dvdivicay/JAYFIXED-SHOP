// Get all category buttons and products
const categoryButtons = document.querySelectorAll('.category-btn');
const products = document.querySelectorAll('.product-card');

// Add click event listeners to category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const selectedCategory = button.getAttribute('data-category');
        
        // Filter products
        products.forEach(product => {
            if (selectedCategory === 'all' || product.getAttribute('data-category') === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});
