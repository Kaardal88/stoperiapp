const produktListe = "/json/produkter.json";
const productsContainer = document.getElementById("products-container");
const favoritesContainer = document.getElementById("favorites-container");
let selectedProducts = [];

// Clear sessionStorage on page load
sessionStorage.removeItem('selectedProducts');

// Fetch product data and render product elements
async function fetchData() {
    try {
        const response = await fetch(produktListe);
        const data = await response.json();
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'bg-white shadow-md rounded-lg p-4 flex items-center justify-between';
            productDiv.innerHTML = `
                <div>
                    <p class="text-lg font-bold">${product.navn}</p>
                    <p class="text-zinc-500">Artikkelnummer: ${product.artikkelnr}</p>
                    <p class="text-zinc-500">Leverandør: ${product.leverandør}</p>
                </div>
                <div>
                    <button class="bg-blue-500 text-white px-2 py-1 rounded-lg add-item-btn">Legg til</button>
                </div>
            `;
            const addButton = productDiv.querySelector('.add-item-btn');
            addButton.addEventListener('click', () => {
                addToFavorites(product);
            });
            productsContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.error(error);
        productsContainer.innerHTML = message("error", "Oops! Spør Kimmen...");
    }
}

// Add product to favorites and update count
function addToFavorites(product) {
    const existingProduct = selectedProducts.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.amount += 1;
    } else {
        selectedProducts.push({ product, amount: 1 });
    }
    renderFavorites();
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}

// Reduce product amount in favorites
function reduceFavoriteAmount(product) {
    const existingProduct = selectedProducts.find(item => item.product === product);
    if (existingProduct) {
        if (existingProduct.amount > 1) {
            existingProduct.amount -= 1;
        } else {
            removeFromFavorites(product);
        }
    }
    renderFavorites();
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}

// Remove product from favorites
function removeFromFavorites(product) {
    selectedProducts = selectedProducts.filter(item => item.product !== product);
    renderFavorites();
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}

// Render favorites in the favorites container
function renderFavorites() {
    favoritesContainer.innerHTML = "";
    selectedProducts.forEach(item => {
        const favoriteDiv = document.createElement('div');
        favoriteDiv.className = 'bg-green-400 shadow-md rounded-lg p-4 flex items-center justify-between';
        favoriteDiv.innerHTML = `
            <div>
                <p class="text-lg font-bold">${item.product.navn}</p>
                <p class="text-zinc-500">Antall: ${item.amount}</p>
            </div>
            <div>
                <button class="bg-green-500 text-white px-2 py-1 rounded-lg add-item-fav-btn">+ Legg til</button>
                <button class="bg-yellow-500 text-white px-2 py-1 rounded-lg reduce-item-btn">- Angre</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded-lg delete-item-btn">Slett</button>
            </div>
        `;
        favoriteDiv.querySelector('.add-item-fav-btn').addEventListener('click', () => {
            addToFavorites(item.product);
        });
        favoriteDiv.querySelector('.reduce-item-btn').addEventListener('click', () => {
            reduceFavoriteAmount(item.product);
        });
        favoriteDiv.querySelector('.delete-item-btn').addEventListener('click', () => {
            removeFromFavorites(item.product);
        });
        favoritesContainer.appendChild(favoriteDiv);
    });
}

// Event listener for sending email
document.getElementById('send-email-btn').addEventListener('click', () => {
    const selectedProductsJSON = JSON.stringify(selectedProducts);
    window.location.href = `mail.html?selectedProducts=${encodeURIComponent(selectedProductsJSON)}`;
});

// Fetch data on page load
fetchData();
