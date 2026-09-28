import { useState } from 'react';
import StaffDashboard from './StaffDashboard';
import AdminDashboard from './AdminDashboard';

function App() {
  // Views: 'landing', 'login', 'register', 'dashboard'
  const [currentView, setCurrentView] = useState('landing'); 
  const [role, setRole] = useState('staff');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Store mock users in state so registration actually works!
  const [users, setUsers] = useState([
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'staff', password: 'staff', role: 'staff' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Find if user exists in our array (ignoring case and whitespace for username)
    const validUser = users.find(u => 
      u.username.toLowerCase() === username.trim().toLowerCase() && 
      u.password === password && 
      u.role === role
    );

    if (validUser) {
      setCurrentView('dashboard');
      setError('');
    } else {
      setError('Invalid credentials or role mismatch! (Check your dropdown)');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Check if user already exists
    if (users.find(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
      setError('Username already taken!');
      return;
    }

    // Add new user to our mock database
    setUsers([...users, { username: username.trim(), password, role }]);
    
    setSuccessMsg('Account registered successfully! Please login.');
    setTimeout(() => {
      setSuccessMsg('');
      setCurrentView('login');
      // Keep username and role populated to make logging in easier
      setPassword(''); 
    }, 1500);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setUsername('');
    setPassword('');
    setEmail('');
    setError('');
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setError('');
    setSuccessMsg('');
    setRole('staff');
  };

  const navigateTo = (view) => {
    resetForm();
    setCurrentView(view);
  };

  // 1. Landing Page View
  if (currentView === 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '1rem' }}>
          Smart E-Commerce Warehouse
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d', maxWidth: '600px', marginBottom: '2.5rem' }}>
          The ultimate inventory management system for modern e-commerce. Track stock, manage suppliers, and analyze your warehouse operations in real-time.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => navigateTo('login')}
            style={{ width: '150px', padding: '1rem', fontSize: '1.1rem', borderRadius: '50px', background: '#3498db' }}
          >
            Login
          </button>
          <button 
            onClick={() => navigateTo('register')}
            style={{ width: '150px', padding: '1rem', fontSize: '1.1rem', borderRadius: '50px', background: '#2ecc71' }}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  // 2. Dashboard View
  if (currentView === 'dashboard') {
    if (role === 'staff') {
      return <StaffDashboard handleLogout={handleLogout} username={username} />;
    }

    // Admin Dashboard
    return <AdminDashboard handleLogout={handleLogout} username={username} />;
  }

  // 3. Register View
  if (currentView === 'register') {
    return (
      <div className="login-container">
        <div className="login-box">
          <button 
            onClick={() => navigateTo('landing')} 
            style={{ background: 'transparent', color: '#7f8c8d', padding: 0, width: 'auto', marginBottom: '1rem', border: 'none', textDecoration: 'underline' }}
          >
            &larr; Back to Home
          </button>
          <h2 style={{textAlign: 'center', color: '#2ecc71'}}>Create Account</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Choose a username" />
            </div>
            <div>
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Create a strong password" />
            </div>
            <div>
              <label>Request Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <p style={{color: 'red', fontSize: '0.9rem', textAlign: 'center'}}>{error}</p>}
            {successMsg && <p style={{color: 'green', fontSize: '0.9rem', textAlign: 'center'}}>{successMsg}</p>}
            <button type="submit" style={{marginTop: '1rem', background: '#2ecc71'}}>Sign Up</button>
          </form>
          <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem'}}>
            Already have an account? <span style={{color: '#3498db', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigateTo('login')}>Login here</span>
          </p>
        </div>
      </div>
    );
  }

  // 4. Login View
  return (
    <div className="login-container">
      <div className="login-box">
        <button 
          onClick={() => navigateTo('landing')} 
          style={{ background: 'transparent', color: '#7f8c8d', padding: 0, width: 'auto', marginBottom: '1rem', border: 'none', textDecoration: 'underline' }}
        >
          &larr; Back to Home
        </button>
        <h2 style={{textAlign: 'center', color: '#2c3e50'}}>System Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" />
          </div>
          <div>
            <label>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p style={{color: 'red', fontSize: '0.9rem'}}>{error}</p>}
          <button type="submit" style={{marginTop: '1rem'}}>Login</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem'}}>
          Don't have an account? <span style={{color: '#2ecc71', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigateTo('register')}>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default App;
