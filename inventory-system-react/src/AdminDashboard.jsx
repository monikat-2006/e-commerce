import { useState } from 'react';

export default function AdminDashboard({ handleLogout, username }) {
  const [activeTab, setActiveTab] = useState('overview');

  const navButtonStyle = (tabName) => ({
    textAlign: 'left',
    background: activeTab === tabName ? '#9b59b6' : 'transparent',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    transition: 'background 0.2s'
  });

  const handleDownloadCSV = () => {
    // Generate a dummy CSV string
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ProductID,Name,Category,Stock,UnitPrice,TotalValue\n"
      + "PRD-001,Laptop,Electronics,15,999.00,14985.00\n"
      + "PRD-002,Office Chair,Furniture,3,150.00,450.00\n"
      + "PRD-003,Wireless Mouse,Electronics,45,25.00,1125.00";
    
    // Create a hidden link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_valuation.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    alert("In a production environment, this would use a library like 'jspdf' to generate and download a PDF report.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem', color: '#2c3e50' }}>Command Center Overview</h2>
            
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Total Products</h3>
                <p style={{ fontSize: '2.5rem', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>1,245</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Inventory Value</h3>
                <p style={{ fontSize: '2.5rem', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>$124.5k</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Low Stock Items</h3>
                <p style={{ fontSize: '2.5rem', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>32</p>
              </div>
            </div>
            
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ color: '#2c3e50' }}>Recent System Activity (Live)</h3>
              <ul style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', listStyleType: 'none', border: '1px solid #eee' }}>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🔵 <strong>staff_user</strong> received 50 units of PRD-001</span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>2 mins ago</span>
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🟢 <strong>staff_user</strong> created new product "Wireless Keyboard"</span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>14 mins ago</span>
                </li>
                <li style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🔴 <strong>SYSTEM</strong> Warning: Office Chairs reached critical stock (3)</span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>1 hour ago</span>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem' }}>
              <h2 style={{ margin: 0, color: '#2c3e50' }}>Staff Management</h2>
              <button style={{ background: '#2ecc71', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>+ Invite Employee</button>
            </div>
            <p style={{ color: '#7f8c8d' }}>View and manage employee accounts, roles, and system access.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '1.5rem', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '15px', borderBottom: '2px solid #dee2e6' }}>Username</th>
                  <th style={{ padding: '15px', borderBottom: '2px solid #dee2e6' }}>Assigned Role</th>
                  <th style={{ padding: '15px', borderBottom: '2px solid #dee2e6' }}>Account Status</th>
                  <th style={{ padding: '15px', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>staff</td>
                  <td style={{ padding: '15px' }}>Warehouse Staff</td>
                  <td style={{ padding: '15px' }}><span style={{ background: '#e8f8f5', color: '#27ae60', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Active</span></td>
                  <td style={{ padding: '15px' }}>
                    <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Revoke Access</button>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>admin</td>
                  <td style={{ padding: '15px' }}>System Admin</td>
                  <td style={{ padding: '15px' }}><span style={{ background: '#e8f8f5', color: '#27ae60', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Active</span></td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#95a5a6', fontSize: '0.85rem' }}>Cannot edit admins</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'reports':
        return (
          <div>
            <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '0.5rem', color: '#2c3e50' }}>Financial & Analytics Reports</h2>
            <p style={{ color: '#7f8c8d' }}>Generate and download detailed reports on warehouse performance and inventory valuation.</p>
            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem', maxWidth: '600px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Inventory Valuation</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Current stock levels multiplied by unit costs.</p>
                </div>
                <button onClick={handleDownloadCSV} style={{ background: '#3498db', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>📥 Download CSV</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Stock Movement Log</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>Complete audit trail of all items entering/leaving.</p>
                </div>
                <button onClick={handleDownloadPDF} style={{ background: '#2ecc71', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>📥 Download PDF</button>
              </div>

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
      <nav style={{ width: '260px', background: '#2c3e50', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center', paddingTop: '1rem' }}>
          <div style={{ background: 'rgba(155, 89, 182, 0.2)', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', border: '2px solid #9b59b6' }}>
            <span style={{ fontSize: '2rem' }}>👑</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '600', letterSpacing: '1px' }}>Admin Portal</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#bdc3c7', marginTop: '0.5rem' }}>User: {username}</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.25rem' }}>
          <button onClick={() => setActiveTab('overview')} style={navButtonStyle('overview')}>📊 Dashboard Overview</button>
          <button onClick={() => setActiveTab('staff')} style={navButtonStyle('staff')}>👥 Staff Management</button>
          <button onClick={() => setActiveTab('reports')} style={navButtonStyle('reports')}>📑 Financial Reports</button>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
            <button onClick={handleLogout} style={{ ...navButtonStyle('logout'), background: '#e74c3c' }}>🚪 Secure Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minHeight: '75vh' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
