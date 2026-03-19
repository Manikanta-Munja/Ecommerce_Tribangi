import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";

const BASE_URL = API_BASE_URL;

const getCurrentSessionOwner = () => {
  if (localStorage.getItem('admin')) return 'admin';
  if (localStorage.getItem('user')) return 'user';
  return null;
};

function Login() {
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

    fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setMessage({ type: 'success', text: `✅ Welcome back, ${data.name}!` });
          localStorage.removeItem('admin');
          localStorage.removeItem('isAdmin');
          localStorage.setItem('user', JSON.stringify(data));
          window.dispatchEvent(new Event('auth-changed'));
          setTimeout(() => window.location.href = '/', 2000);
        } else {
          setMessage({ type: 'error', text: `❌ ${data.message}` });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setMessage({ type: 'error', text: '❌ Login failed. Please try again.' });
        setLoading(false);
      });
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
          marginBottom: '30px',
          fontSize: '2rem',
          textAlign: 'center'
        }}>
          🔐 Login
        </h2>

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
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
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
            {sessionOwner ? 'Logout first' : loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#666'
        }}>
          Don't have an account? <a href="/register" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none' }}>Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
