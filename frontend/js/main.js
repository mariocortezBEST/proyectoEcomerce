document.addEventListener('DOMContentLoaded', () => {
    fetchFeaturedProducts();
});

async function fetchFeaturedProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();
        displayFeaturedProducts(products.slice(0, 3)); // Mostrar solo los primeros 3 productos
    } catch (error) {
        console.error('Error al obtener los productos destacados:', error);
    }
}

function displayFeaturedProducts(products) {
    const featuredProductsContainer = document.getElementById('featured-products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        featuredProductsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}