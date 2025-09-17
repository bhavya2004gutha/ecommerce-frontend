const API_BASE = "http://localhost:5000";
const cartList = document.getElementById("cart-list");
const checkoutBtn = document.getElementById("checkout-btn");

// Load cart items
async function loadCart() {
  cartList.innerHTML = "Loading...";
  try {
    const res = await fetch(`${API_BASE}/api/cart`, { credentials: "include" });
    const cart = await res.json();

    cartList.innerHTML = "";

    cart.items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.product.name} - $${item.product.price} x ${item.quantity}
        <button onclick="removeFromCart('${item.product._id}')">Remove</button>
      `;
      cartList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    cartList.innerHTML = "Failed to load cart.";
  }
}

// Remove item from cart
async function removeFromCart(productId) {
  try {
    const res = await fetch(`${API_BASE}/api/cart/${productId}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await res.json();
    if (res.ok) {
      alert("Item removed");
      loadCart();
    } else {
      alert(data.message || "Error removing item");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}

// Checkout (place order)
checkoutBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();
    if (res.ok) {
      alert("Order placed successfully!");
      loadCart();
    } else {
      alert(data.message || "Error placing order");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
});

loadCart();
