document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');

            const token = data.data.accessToken;
            const role = data.data.role;

            // ✅ Store token in a cookie (valid for 1 day)
            document.cookie = `token=${token}; path=/; max-age=86400; secure`;

            // ✅ Redirect based on role
            if (role === 'ADMIN') {
                window.location.href = 'admin_dashboard.html';
            } else if (role === 'USER') {
                window.location.href = 'user_dashboard.html';
            } else {
                alert('Unknown role');
            }
        } else {
            alert('Login failed: ' + (data.message || 'Error'));
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Something went wrong');
    }
});
