document.addEventListener('DOMContentLoaded', () => {
    // Check Auth
    if (!sessionStorage.getItem('isLoggedIn') || sessionStorage.getItem('role') !== 'staff') {
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

    // Modal logic
    const modal = document.getElementById('productModal');
    const addProductBtn = document.getElementById('addProductBtn');
    const closeBtn = document.querySelector('.close-btn');

    if(addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            document.getElementById('productForm').reset();
            document.getElementById('modalTitle').textContent = 'Add Product';
            modal.style.display = 'block';
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Form Submit
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Product saved successfully!', 'success');
        modal.style.display = 'none';
        // Mock refreshing table
        loadProducts();
    });

    function showToast(message, type) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type} show`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Mock Data Loading
    function loadProducts() {
        const tbody = document.querySelector('#productsTable tbody');
        if(tbody) {
            tbody.innerHTML = `
                <tr>
                    <td>PRD-001</td>
                    <td>Laptop</td>
                    <td>Electronics</td>
                    <td>15</td>
                    <td>$999.00</td>
                    <td>Tech Supplier Inc</td>
                    <td>2023-10-01</td>
                    <td>
                        <button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
                <tr class="low-stock">
                    <td>PRD-002</td>
                    <td>Desk Chair</td>
                    <td>Furniture</td>
                    <td>3</td>
                    <td>$150.00</td>
                    <td>Office Supply Co</td>
                    <td>2023-10-02</td>
                    <td>
                        <button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }
    }

    loadProducts();
});
