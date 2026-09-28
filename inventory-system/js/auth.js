document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                showError('Please enter both email and password.');
                return;
            }

            // Mock authentication
            if (email === 'admin' && password === 'admin' && role === 'admin') {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('role', 'admin');
                window.location.href = 'admin-dashboard.html';
            } else if (email === 'staff' && password === 'staff' && role === 'staff') {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('role', 'staff');
                window.location.href = 'staff-dashboard.html';
            } else {
                showError('Invalid credentials or role mismatch. Use admin/admin or staff/staff.');
            }
        });
    }

    function showError(msg) {
        loginError.textContent = msg;
        loginError.style.display = 'block';
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 3000);
    }
});
