//  document.getElementById("productsCount").innerText = 150;
//     document.getElementById("ordersCount").innerText = 420;
//     document.getElementById("usersCount").innerText = 610;
//     document.getElementById("revenue").innerText = "$15,750";

//     // Add a new order dynamically
//     const ordersTable = document.getElementById("ordersTable");
//     const newRow = document.createElement("tr");
//     newRow.innerHTML = "<td>#1003</td><td>Michael Lee</td><td>Delivered</td><td>$350</td>";
//     ordersTable.appendChild(newRow);

 

document.getElementById("createAdminForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5004/api/admin/create-admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        document.getElementById("responseMsg").innerText = data.message;
    } catch (err) {
        document.getElementById("responseMsg").innerText = "Error: " + err.message;
    }
});

