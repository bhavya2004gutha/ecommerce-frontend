const API_BASE = "http://localhost:50001";
const ordersList = document.getElementById("orders-list");

// Load orders
async function loadOrders() {
  ordersList.innerHTML = "Loading...";
  try {
    const res = await fetch(`${API_BASE}/api/orders`, { credentials: "include" });
    const orders = await res.json();

    ordersList.innerHTML = "";

    orders.forEach(order => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Order ID:</strong> ${order._id} <br>
        <strong>Status:</strong> ${order.status} <br>
        <strong>Items:</strong>
        <ul>
          ${order.items.map(i => `<li>${i.product.name} x ${i.quantity}</li>`).join("")}
        </ul>
      `;
      ordersList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    ordersList.innerHTML = "Failed to load orders.";
  }
}

loadOrders();
