document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();

    // 🧹 Clear JWT token cookie
    document.cookie = "token=; path=/; max-age=0; secure";

    // 🔁 Redirect to login page
    window.location.href = "login.html";
});
