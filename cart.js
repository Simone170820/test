// Ottieni il carrello dal localStorage (se esiste)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Aggiungi un prodotto al carrello
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const product = {
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price),
        quantity: 1
    };

    // Verifica se il prodotto è già nel carrello
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // Se il prodotto è già nel carrello, aumenta la quantità
        existingProduct.quantity++;
    } else {
        // Aggiungi il prodotto al carrello
        cart.push(product);
    }

    // Salva il carrello nel localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Aggiorna il riepilogo del carrello
    updateCartSummary();
}

// Rimuovi un prodotto dal carrello
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    renderCartItems();
}

// Modifica la quantità di un prodotto
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeItem(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
            renderCartItems();
        }
    }
}

// Aggiorna il riepilogo del carrello
function updateCartSummary() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// Visualizza gli articoli nel carrello
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisci la lista

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Il tuo carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - €${item.price} x ${item.quantity}</p>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="removeItem(${item.id})">Rimuovi</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Funzione di checkout (da completare)
function checkout() {
    if (cart.length === 0) {
        alert("Il carrello è vuoto. Aggiungi qualche prodotto prima di acquistare!");
    } else {
        alert("Procedi con il pagamento! (Funzionalità non implementata)");
    }
}

// Carica il carrello all'avvio della pagina
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartSummary();
});

// Aggiungi un prodotto al carrello
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('size-popup');
    const confirmBtn = document.getElementById('confirm-size');
    const cancelBtn = document.getElementById('cancel-popup');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Apre il pop-up quando viene cliccato "Aggiungi al carrello"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.classList.remove('hidden');
        });
    });

    // Conferma la selezione della taglia
    confirmBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('input[name="size"]:checked');
        if (selectedSize) {
            alert(`Taglia selezionata: ${selectedSize.value}`);
            popup.classList.add('hidden');
            // Qui puoi aggiungere il prodotto al carrello con la taglia selezionata
        } else {
            alert('Seleziona una taglia prima di confermare.');
        }
    });

    // Chiude il pop-up senza selezionare una taglia
    cancelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });
});
// Aggiungi un prodotto al carrello
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const selectedSize = productElement.querySelector('.size-select').value; // Ottieni la taglia selezionata
    const product = {
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price),
        size: selectedSize, // Aggiungi la taglia al prodotto
        quantity: 1
    };

    // Verifica se il prodotto è già nel carrello
    const existingProduct = cart.find(item => item.id === product.id && item.size === product.size);
    if (existingProduct) {
        // Se il prodotto è già nel carrello, aumenta la quantità
        existingProduct.quantity++;
    } else {
        // Aggiungi il prodotto al carrello
        cart.push(product);
    }

    // Salva il carrello nel localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Aggiorna il riepilogo del carrello
    updateCartSummary();
}
// Visualizza gli articoli nel carrello
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisci la lista

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; font-weight: bold;">Il tuo carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - Taglia: ${item.size} - €${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
            <button onclick="removeItem('${item.id}')">Rimuovi</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}
// Visualizza gli articoli nel carrello
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisci la lista

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Il tuo carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - Taglia: ${item.size} - €${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
            <button onclick="removeItem('${item.id}')">Rimuovi</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}
// Modifica la quantità di un prodotto
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeItem(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
            renderCartItems();
        }
    }
}
// Rimuovi un prodotto dal carrello
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    renderCartItems();
}// Visualizza gli articoli nel carrello
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisci la lista

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; font-weight: bold;">Il tuo carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - Taglia: ${item.size} - €${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
            <button onclick="removeItem('${item.id}')">Rimuovi</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}// Visualizza gli articoli nel carrello
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisci la lista

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; font-weight: bold;">Il tuo carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - Taglia: ${item.size} - €${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
            <button onclick="removeItem('${item.id}')">Rimuovi</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}