import { useEffect, useState } from "react";

// Static Admin Credentials
const ADMIN_EMAIL = "admin@ecommerce.com";
const ADMIN_PASSWORD = "Admin@123";

const getCurrentSessionOwner = () => {
  if (localStorage.getItem('admin')) return 'admin';
  if (localStorage.getItem('user')) return 'user';
  return null;
};

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [sessionOwner, setSessionOwner] = useState(getCurrentSessionOwner);

  useEffect(() => {
    const syncSessionOwner = () => {
      setSessionOwner(getCurrentSessionOwner());
    };

    window.addEventListener('storage', syncSessionOwner);
    window.addEventListener('auth-changed', syncSessionOwner);

    return () => {
      window.removeEventListener('storage', syncSessionOwner);
      window.removeEventListener('auth-changed', syncSessionOwner);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sessionOwner) {
      setMessage({
        type: 'error',
        text: `❌ ${sessionOwner === 'admin' ? 'Admin' : 'User'} is already logged in. Please logout first and then login again.`
      });
      return;
    }
    
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: '❌ Please fill all fields' });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Simulate login delay
    setTimeout(() => {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        const adminData = {
          id: 999,
          name: 'Admin',
          email: ADMIN_EMAIL,
          role: 'ADMIN'
        };
        setMessage({ type: 'success', text: '✅ Admin login successful! Redirecting...' });
        localStorage.removeItem('user');
        localStorage.setItem('admin', JSON.stringify(adminData));
        localStorage.setItem('isAdmin', 'true');
        window.dispatchEvent(new Event('auth-changed'));
        setTimeout(() => window.location.href = '/add-products', 2000);
      } else {
        setMessage({ type: 'error', text: '❌ Invalid admin credentials' });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container py-5">
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid #667eea'
      }}>
        <h2 style={{
          color: '#667eea',
          marginBottom: '10px',
          fontSize: '2rem',
          textAlign: 'center'
        }}>
          🔐 Admin Login
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#999',
          marginBottom: '30px',
          fontSize: '0.9rem'
        }}>
          Admin Only - Restricted Access
        </p>

        {sessionOwner && (
          <div style={{
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb'
          }}>
            ❌ {sessionOwner === 'admin' ? 'Admin is' : 'User is'} already logged in. Please logout first to continue.
          </div>
        )}

        {message && (
          <div style={{
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333'
            }}>
              Admin Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ecommerce.com"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: '2px solid #e9ecef',
                fontSize: '1rem',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
              onFocus={e => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333'
            }}>
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: '2px solid #e9ecef',
                fontSize: '1rem',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
              onFocus={e => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || Boolean(sessionOwner)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: (loading || sessionOwner) ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: (loading || sessionOwner) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => !loading && !sessionOwner && (e.target.style.backgroundColor = '#5568d3')}
            onMouseLeave={e => !loading && !sessionOwner && (e.target.style.backgroundColor = '#667eea')}
          >
            {sessionOwner ? 'Logout first' : loading ? 'Logging in...' : 'Admin Login'}
          </button>
        </form>

        <div style={{
          marginTop: '25px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#333' }}>
            📝 Demo Credentials:
          </p>
          <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9rem' }}>
            <strong>Email:</strong> admin@ecommerce.com
          </p>
          <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9rem' }}>
            <strong>Password:</strong> Admin@123
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
