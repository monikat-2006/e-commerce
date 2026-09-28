document.addEventListener('DOMContentLoaded', () => {
    // Check Auth
    if (!sessionStorage.getItem('isLoggedIn') || sessionStorage.getItem('role') !== 'admin') {
        window.location.href = 'index.html';
    }

    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a[data-target]');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('current-page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const target = link.getAttribute('data-target');
            sections.forEach(sec => sec.style.display = 'none');
            document.getElementById(target).style.display = 'block';
            pageTitle.textContent = link.textContent.trim();
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Charts Initialization
    const stockCtx = document.getElementById('stockTrendChart');
    if(stockCtx) {
        new Chart(stockCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Stock Value ($)',
                    data: [110000, 115000, 105000, 120000, 118000, 124500],
                    borderColor: '#3498db',
                    tension: 0.1
                }]
            }
        });
    }

    const catCtx = document.getElementById('categoryChart');
    if(catCtx) {
        new Chart(catCtx, {
            type: 'doughnut',
            data: {
                labels: ['Electronics', 'Clothing', 'Furniture', 'Toys'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: ['#3498db', '#2ecc71', '#e67e22', '#9b59b6']
                }]
            }
        });
    }
});
