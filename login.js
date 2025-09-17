const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const data = Object.fromEntries(new FormData(loginForm).entries());

  try {
    const res = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.headers.get("content-type")?.includes("application/json")) {
      const result = await res.json();

      // Show message
      const msg = document.getElementById("login-message");
      msg.textContent = result.message;

      // If login success → store token + redirect
      if (res.ok && result.token) {
        localStorage.setItem("token", result.token);
        window.location.href = "index.html";
      }
    } else {
      // Non-JSON error
      const text = await res.text();
      document.getElementById("login-message").textContent =
        "Server error: " + text;
    }
  } catch (err) {
    console.error("Login error:", err);
    document.getElementById("login-message").textContent =
      "Something went wrong. Try again.";
  }
});
