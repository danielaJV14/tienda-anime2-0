const form = document.getElementById('product-form');
const productsContainer = document.getElementById('products-container');
const previewContainer = document.getElementById('preview-container');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Mostrar productos
function displayProducts() {
    productsContainer.innerHTML = '';
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price} MXN</p>
            <button class="delete-btn" onclick="deleteProduct(${index})">Eliminar</button>
        `;
        productsContainer.appendChild(card);
    });
    localStorage.setItem('products', JSON.stringify(products));
}

// Eliminar producto
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

// Previsualizar imagen al subir
document.getElementById('image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
        previewContainer.innerHTML = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        previewContainer.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
});

// Agregar producto con imagen subida
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const imageFile = document.getElementById('image').files[0];

    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        products.push({ name, price, image: imageData });
        displayProducts();
        form.reset();
        previewContainer.innerHTML = '';
    };
    reader.readAsDataURL(imageFile);
});

// Mostrar productos al cargar
displayProducts();
