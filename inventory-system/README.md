# Smart E-Commerce Data Warehouse Inventory Management System

## Project Overview
This project is an inventory management system designed for e-commerce warehouses, featuring role-based dashboards for Staff and Admin users. Built with HTML5, CSS3, JavaScript, and a MySQL database structure.

## Setup Instructions

### 1. Database Configuration
- A MySQL server is required.
- Import the database schema from `database/schema.sql`.
- Example using command line: `mysql -u root -p < database/schema.sql`
- Note: This frontend mockup doesn't connect directly to the MySQL database. A backend (Node.js, PHP, Python) should be implemented to connect the frontend to the database.

### 2. Running the Application
- No build steps are required for the frontend.
- Serve the directory using any local web server.
  - Example using Python: `python -m http.server 8000`
- Open `http://localhost:8000/index.html` in your browser.

### 3. User Guide
- **Login Credentials (Mock)**:
  - Admin: Email `admin` / Password `admin` (Role: Admin)
  - Staff: Email `staff` / Password `staff` (Role: Staff)
- **Staff Dashboard**: Allows CRUD operations on inventory, view activities, and update settings.
- **Admin Dashboard**: View KPI metrics, charts, manage staff, view financial and inventory reports, and configure system settings.

## Features implemented in this build
- Fully responsive HTML templates.
- CSS styling with variables for easy theming.
- Role-based login mockup using sessionStorage.
- DOM manipulation and tab navigation on dashboards.
- Product Management Modal structure.
- Chart.js integration on the Admin dashboard.
