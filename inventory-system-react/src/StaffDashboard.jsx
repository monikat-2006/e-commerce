import { useState } from 'react';

export default function StaffDashboard({ handleLogout, username }) {
  const [activeTab, setActiveTab] = useState('inventory');
  
  // State for storing all products
  const [products, setProducts] = useState([
    { id: 'PRD-001', name: 'Laptop', category: 'Electronics', price: 999.00, stock: 15, supplier: 'Tech Supply Co' },
    { id: 'PRD-002', name: 'Office Chair', category: 'Furniture', price: 150.00, stock: 3, supplier: 'Office Works' },
    { id: 'PRD-003', name: 'Wireless Mouse', category: 'Electronics', price: 25.00, stock: 45, supplier: 'Tech Supply Co' },
  ]);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form states for creating a product
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');

  // Form states for stock operations
  const [stockId, setStockId] = useState('');
  const [stockQty, setStockQty] = useState('');

  const navButtonStyle = (tabName) => ({
    textAlign: 'left',
    background: activeTab === tabName ? '#3498db' : 'transparent',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '0.5rem'
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: `PRD-00${products.length + 1}`,
      name: newProdName,
      category: newProdCategory,
      price: parseFloat(newProdPrice),
      stock: parseInt(newProdStock, 10),
      supplier: 'Internal'
    };
    setProducts([...products, newProduct]);
    alert('Product created and saved to Inventory Table!');
    // Reset form
    setNewProdName('');
    setNewProdCategory('');
    setNewProdPrice('');
    setNewProdStock('');
    // Switch to inventory view to see it
    setActiveTab('inventory');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm(`Are you sure you want to delete ${id}?`)) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleStockIn = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => {
      if (p.id === stockId) {
        return { ...p, stock: p.stock + parseInt(stockQty, 10) };
      }
      return p;
    });
    setProducts(updatedProducts);
    alert('Stock updated successfully!');
    setStockId('');
    setStockQty('');
    setActiveTab('inventory');
  };

  const handleStockOut = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => {
      if (p.id === stockId) {
        return { ...p, stock: Math.max(0, p.stock - parseInt(stockQty, 10)) };
      }
      return p;
    });
    setProducts(updatedProducts);
    alert('Stock updated successfully!');
    setStockId('');
    setStockQty('');
    setActiveTab('inventory');
  };

  // Filter logic for the table
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Unique categories for the dropdown filter
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Inventory Database</h2>
              <button onClick={() => setActiveTab('create')} style={{ background: '#2ecc71', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>+ Add New</button>
            </div>
            
            {/* Search and Filter Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="Search by ID or Name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '0.5rem', width: '250px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Data Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Product ID</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Name</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Category</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Price</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Stock</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #eee', background: product.stock < 10 ? '#fff3cd' : 'transparent' }}>
                      <td style={{ padding: '12px' }}>{product.id}</td>
                      <td style={{ padding: '12px' }}>{product.name}</td>
                      <td style={{ padding: '12px' }}>{product.category}</td>
                      <td style={{ padding: '12px' }}>${product.price.toFixed(2)}</td>
                      <td style={{ padding: '12px', color: product.stock < 10 ? '#856404' : 'inherit', fontWeight: product.stock < 10 ? 'bold' : 'normal' }}>
                        {product.stock} {product.stock < 10 && ' (Low)'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => handleDeleteProduct(product.id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ padding: '1rem', textAlign: 'center', color: '#7f8c8d' }}>No products found matching your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'stock-in':
        return (
          <div>
            <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem' }}>Stock In (Receive Inventory)</h2>
            <p>Use this section to record new stock arriving at the warehouse.</p>
            <form onSubmit={handleStockIn} style={{ display: 'grid', gap: '1rem', maxWidth: '400px', marginTop: '1rem' }}>
              <input type="text" placeholder="Product ID (e.g., PRD-001)" value={stockId} onChange={e => setStockId(e.target.value)} required />
              <input type="number" placeholder="Quantity Received" value={stockQty} onChange={e => setStockQty(e.target.value)} required min="1" />
              <button type="submit" style={{ background: '#2ecc71', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer' }}>Record Stock In</button>
            </form>
          </div>
        );
      
      case 'stock-out':
        return (
          <div>
            <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem' }}>Stock Out (Dispatch Inventory)</h2>
            <p>Use this section to record stock leaving the warehouse for orders.</p>
            <form onSubmit={handleStockOut} style={{ display: 'grid', gap: '1rem', maxWidth: '400px', marginTop: '1rem' }}>
              <input type="text" placeholder="Product ID (e.g., PRD-001)" value={stockId} onChange={e => setStockId(e.target.value)} required />
              <input type="number" placeholder="Quantity Dispatched" value={stockQty} onChange={e => setStockQty(e.target.value)} required min="1" />
              <button type="submit" style={{ background: '#e67e22', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer' }}>Record Stock Out</button>
            </form>
          </div>
        );
      
      case 'create':
        return (
          <div>
            <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem' }}>Create New Product</h2>
            <p>Add a brand new product to the inventory database.</p>
            <form onSubmit={handleCreateProduct} style={{ display: 'grid', gap: '1rem', maxWidth: '400px', marginTop: '1rem' }}>
              <input type="text" placeholder="Product Name" value={newProdName} onChange={e => setNewProdName(e.target.value)} required />
              <input type="text" placeholder="Category" value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)} required />
              <input type="number" placeholder="Unit Price" step="0.01" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} required />
              <input type="number" placeholder="Initial Stock Quantity" value={newProdStock} onChange={e => setNewProdStock(e.target.value)} required />
              <button type="submit" style={{ background: '#3498db', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer' }}>Create Product</button>
            </form>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem' }}>Account Settings</h2>
            <p>Manage your staff profile and preferences.</p>
            <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px', marginTop: '1rem' }}>
              <label>Logged in as: <strong>{username}</strong></label>
              <input type="password" placeholder="New Password" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="checkbox" style={{width: 'auto'}} /> Receive low stock email alerts
              </label>
              <button style={{ background: '#34495e', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer' }}>Save Settings</button>
            </div>
          </div>
        );
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ecf0f1' }}>
      
      {/* Sidebar Navigation */}
      <nav style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Staff Panel</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#bdc3c7', marginTop: '0.5rem' }}>Welcome, {username}</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <button onClick={() => setActiveTab('inventory')} style={navButtonStyle('inventory')}>📋 Inventory Table</button>
          <button onClick={() => setActiveTab('stock-in')} style={navButtonStyle('stock-in')}>📥 Stock In</button>
          <button onClick={() => setActiveTab('stock-out')} style={navButtonStyle('stock-out')}>📤 Stock Out</button>
          <button onClick={() => setActiveTab('create')} style={navButtonStyle('create')}>➕ Create Product</button>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setActiveTab('settings')} style={navButtonStyle('settings')}>⚙️ Settings</button>
            <button onClick={handleLogout} style={{ ...navButtonStyle('logout'), background: '#e74c3c', marginTop: '0.5rem' }}>🚪 Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minHeight: '70vh' }}>
          {renderContent()}
        </div>
      </main>

    </div>
  );
}
