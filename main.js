// const API_BASE = "http://localhost:5004";

// // Fetch categories
// async function loadCategories() {
//   const categoryFilter = document.getElementById("category-filter");

//   try {
//     const res = await fetch(`${API_BASE}/get-all-category`, {
//       credentials: "include"
//     });
//     const categories = await res.json();

//     categoryFilter.innerHTML = `<option value="all">All</option>`;

//     categories.forEach(cat => {
//       const option = document.createElement("option");
//       option.value = cat.name
//       option.textContent = `${cat.name} - ${cat.description || ""}`;
//       categoryFilter.appendChild(option);
//     });
//   } catch (err) {
//     console.error("Error fetching categories:", err);
//   }
// }
// loadCategories();


const API_BASE = "http://localhost:5003";

// Fetch categories
async function loadCategories() {
  const categoryFilter = document.getElementById("category-filter");

  try {
    const res = await fetch(`${API_BASE}/get-all-category`, {
      credentials: "include"
    });
    const categories = await res.json();

    categoryFilter.innerHTML = `<option value="all">All</option>`;

    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.name;
      option.textContent = `${cat.name} - ${cat.description || ""}`;
      categoryFilter.appendChild(option);
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}
loadCategories();

// Add product to cart
async function addToCart(productId) {
  try {
    const res = await fetch(`${API_BASE}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity: 1 })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product added to cart");
    } else {
      if (res.status === 401 || res.status === 403) {
        // Optionally handle guest cart here
        alert("Please log in to add to cart.");
      } else {
        alert(data.message || "Error adding to cart");
      }
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}

// Filter products by category
document.getElementById("category-filter").addEventListener("change", async (e) => {
  const selectedCategory = e.target.value;
  const container = document.getElementById("productsContainer");
  container.innerHTML = "Loading...";

  try {
    let url =
      selectedCategory === "all"
        ? `${API_BASE}/api/products`
        : `${API_BASE}/api/products/category/${selectedCategory}`;

    const res = await fetch(url, { credentials: "include" });
    const products = await res.json();

    container.innerHTML = "";

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.images?.[0] || 'placeholder.jpg'}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.description || ""}</p>
        <p>
          <span class="old-price">$${p.price}</span>
          <span class="price">$${p.discountedPrice || p.price}</span>
        </p>
        <button onclick="addToCart('${p._id}')">Add to Cart</button>
      `;
      container.appendChild(card);
    });

    if (products.length === 0) {
      container.innerHTML = "No products found.";
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    container.innerHTML = "Failed to load products.";
  }
});

// Initial load
document.getElementById("category-filter").dispatchEvent(new Event("change"));

async function addToCart(productId) {
  try {
    const res = await fetch(`${API_BASE}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity: 1 })
    });
 
    const data = await res.json();
    if (res.ok) {
      alert("Product added to cart");
    } else {
      if (res.status === 401 || res.status === 403) {
        addToGuestCart(productId, 1);
        alert("Added to cart (guest)");
      } else {
        alert(data.message || "Error adding to cart");
      }
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}

// Filter products by category
document.getElementById("category-filter").addEventListener("change", async (e) => {
  const selectedCategory = e.target.value;
  const container = document.getElementById("productsContainer");
  container.innerHTML = "Loading...";

  try {
    let url =
      selectedCategory === "all"
        ? `${API_BASE}/api/products`
        : `${API_BASE}/api/products/category/${selectedCategory}`;

    const res = await fetch(url, { credentials: "include" });
    const products = await res.json();

    container.innerHTML = "";

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>
          <span class="old-price">$${p.price}</span>
          <span class="price">$${p.discountedPrice}</span>
        </p>
        <button onclick="addToCart('${p._id}')">Add to Cart</button>
      `;
      container.appendChild(card);
    });

    if (products.length === 0) {
      container.innerHTML = "No products found.";
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    container.innerHTML = "Failed to load products.";
  }
});

// Add product to cart
async function addToCart(productId) {
  try {
    const res = await fetch(`${API_BASE}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity: 1 })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product added to cart");
    } else {
      alert(data.message || "Error adding to cart");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}


products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.images?.[0] || 'placeholder.jpg'}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description || ""}</p>
    <p class="price">$${product.price}</p>
    <button onclick="addToCart('${product._id}')">Add to Cart</button>
  `;

  productList.appendChild(card);
});


document.getElementById("category-filter").dispatchEvent(new Event("change"));

