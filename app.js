function fetchProductData(category) {
    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById("productContainer");
            productContainer.innerHTML = "";

            const products = data.categories.find(obj => obj.category_name === category).category_products;

            products.forEach(product => {
                const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;

                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <span class="badge">${product.badge_text}</span>
                    <h2 class="title">${product.title}</h2>
                    <p class="vendor">Vendor: ${product.vendor}</p>
                    <p class="price">Price: $${product.price}</p>
                    <p class="compare-price">Compare at Price: $${product.compare_at_price}</p>
                    <p class="discount">Discount: ${discount.toFixed(2)}%</p>
                    <button class="add-to-cart-button" onclick="addToCart('${product.title}')">Add to Cart</button>
                `;

                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching product data:", error));
}

function addToCart(productTitle) {
    console.log(`Adding ${productTitle} to the cart.`);
}

fetchProductData('Men');
