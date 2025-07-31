document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();

    // 🧹 Remove JWT token from Local Storage
    localStorage.removeItem("token");

    // 🔁 Redirect to login page
    window.location.href = "login.html";
});
