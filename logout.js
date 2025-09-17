// Clear token & cart on logout
localStorage.removeItem("token");
localStorage.removeItem("cart");

// Redirect to login after 1 second
setTimeout(() => {
  window.location.href = "login.html";
}, 1000);
