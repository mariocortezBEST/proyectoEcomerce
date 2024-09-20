document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

async function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    for (const productId of cart) {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            const product = await response.json();
            
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
                <button onclick="removeFromCart(${product.id})">Eliminar</button>
            `;
            cartItemsContainer.appendChild(productElement);
            
            total += product.price;
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    }

    cartTotalElement.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

document.getElementById('checkout-btn').addEventListener('click', async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Calcular el total
    let total = 0;
    for (const productId of cart) {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        const product = await response.json();
        total += product.price;
    }

    // Crear preferencia de pago
    const response = await fetch('http://localhost:3000/api/payments/create_preference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: 'Compra en Mi Tienda',
            price: total,
            quantity: 1,
        }),
    });

    const preference = await response.json();

    // Iniciar MercadoPago Checkout
    const mp = new MercadoPago('TEST-bbc380d8-90cf-43fc-aa0d-12042d3dc135', {
        locale: 'es-AR'
    });

    mp.checkout({
        preference: {
            id: preference.id
        },
        render: {
            container: '.cho-container',
            label: 'Pagar',
        }
    });
});