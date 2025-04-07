document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('products').innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        
        productElement.innerHTML = `
            <div class="product-name">${product.name.toUpperCase()}</div>
            <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
            <div class="product-category">${product.category || ''}</div>
            <div class="product-type">${product.type || ''}</div>
        `;
        
        productsContainer.appendChild(productElement);
    });
}
