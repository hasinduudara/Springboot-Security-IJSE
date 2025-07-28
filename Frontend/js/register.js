document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }),
        });

        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = '/Frontend/login.html';
        } else {
            const data = await response.json();
            alert('Registration failed: ' + (data.message || response.status));
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Something went wrong.');
    }
});
