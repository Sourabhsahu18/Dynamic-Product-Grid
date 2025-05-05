document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    const scrollMoreBtn = document.querySelector('.scroll-more-button');
    let productsLoaded = 0;
    const initialLoad = 8;
    const loadMoreCount = 12;

    // Product data with your specific names and images
    const productNames = [
        "Round-Neck T-Shirts\nExplore Now!   →",
        "U-Neck T-Shirts\nExplore Now!   →",
        "V-Neck T-Shirts\nExplore Now!   →",
        "Polo T-shirts\nExplore Now!   →"
    ];

    const productImages = [
        "assets/images/img 04.png",
        "assets/images/img 01.png",
        "assets/images/img 02.png",
        "assets/images/img 03.png",

    ];

    // Generate product data (100 sample products)
    const products = Array.from({ length: 100 }, (_, i) => {
        const index = i % 4; // Cycle through 0-3 for names/images
        return {
            id: i + 1,
            name: productNames[index],
            image: productImages[index],
            category: ['Fashion', 'Casual', 'Summer', 'Basic'][index]
        };
    });

    // Create product card element (price removed)
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name.split('\n')[0]}" loading="lazy">
            <div class="product-details">
                <h3>${product.name.replace('\n', '<br>')}</h3>
            </div>
        `;
        return card;
    }

    // Initial load - 8 cards
    function loadInitialProducts() {
        // First 8 cards
        const firstBatch = products.slice(0, initialLoad);
        firstBatch.forEach(product => {
            productContainer.appendChild(createProductCard(product));
        });
        productsLoaded = initialLoad;

       
        const headings = document.createElement('div');
        headings.className = 'product-headings';
        headings.innerHTML = `
              <h2 class="our-products"> ■ Our Products</h2>
            <h3 class="explore-products">Explore Our Products</h3>
        `;
        productContainer.appendChild(headings);

        // Next 8 cards
        const secondBatch = products.slice(initialLoad, initialLoad * 2);
        secondBatch.forEach(product => {
            productContainer.appendChild(createProductCard(product));
        });
        productsLoaded = initialLoad * 2;
    }

    // Load more products function
    function loadMoreProducts() {
        // Show loading state
        scrollMoreBtn.textContent = 'Loading...';
        scrollMoreBtn.disabled = true;

        // Use setTimeout to allow UI to update before heavy DOM operations
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            const nextBatch = products.slice(productsLoaded, productsLoaded + loadMoreCount);

            nextBatch.forEach(product => {
                fragment.appendChild(createProductCard(product));
            });

            productContainer.appendChild(fragment);
            productsLoaded += nextBatch.length;

            // Restore button state
            scrollMoreBtn.textContent = 'Scroll More';
            scrollMoreBtn.disabled = false;

            // Hide button if all products loaded
            if (productsLoaded >= products.length) {
                scrollMoreBtn.style.display = 'none';
            }

            // Smooth scroll to show new products
            window.scrollBy({
                top: 300,
                behavior: 'smooth'
            });
        }, 50);
    }

    // Initialize
    loadInitialProducts();
    scrollMoreBtn.addEventListener('click', loadMoreProducts);


});