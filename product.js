const products = [
{ 
  id: 1,  name: "SonicWave Pro Headset",  category: "Electronics", price: 19999, 
  description: "crystal-clear audio, deep bass,", 
  image: "headset.jpg" 
},

  { id: 2, name: "Laptop", category: "Electronics", price: 59999, description: "High performance laptop" },
 { id: 3, name: "YSL Heels", category: "Fashion", price:156416., description: "Elegant Yves Saint Laurent heels, crafted with premium leather and timeless Parisian design." },

  { id: 4, name: "CK-Tshirt", category: "Fashion", price: 799, description: "Comfortable cotton T-shirt" },
  
  { id: 5, name: "The Alchemist", category: "Books", price: 499, description: "The real wealth lies in wisdom, love, and destiny." },
  { id: 6, name: "Car", category: "Toys", price: 299, description: "Remote controlled toy car" },
  { id: 7, name: "Nike Air Max", category: "Fashion", price: 8999, description: "Premium Nike running shoes with cushioned comfort." },
  { id: 8, name: "Apple Watch Series 9", category: "Electronics", price: 45999, description: "Smartwatch with health tracking, GPS, and seamless iOS integration." },
  { id: 9, name: "Gucci Leather Bag", category: "Fashion", price: 120000, description: "Luxury Gucci handbag crafted with genuine Italian leather." },
];
 


// Function to render products (not grouped by category)
function renderProducts(filterCategory = "all") {
  const container = document.getElementById("productsContainer");
  container.innerHTML = ""; // Clear old products

  // Filter products based on selected category
  const filteredProducts = filterCategory === "all"
    ? products
    : products.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

  // Products grid
  const grid = document.createElement("div");
  grid.classList.add("products-grid");

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <h4>${product.name}</h4>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p>${product.description}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// Dummy add to cart function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  alert(`${product.name} added to cart!`);
}

// Event listener for category filter
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("category-filter").addEventListener("change", (e) => {
    renderProducts(e.target.value);
  });

  // Initial load
  renderProducts();
});