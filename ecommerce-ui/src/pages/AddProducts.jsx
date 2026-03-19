import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";

const BASE_URL = API_BASE_URL;

function AddProducts() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem('isAdmin');
    if (adminData === 'true') {
      setIsAdmin(true);
      setLoading(false);
    } else {
      // Redirect to admin login
      setLoading(false);
      setTimeout(() => window.location.href = '/admin-login', 1000);
    }
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
    
    if (!formData.name || !formData.price || !formData.description) {
      setMessage({ type: 'error', text: '❌ Please fill all fields' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add product');
        return res.json();
      })
      .then(data => {
        setMessage({ type: 'success', text: `✅ Product "${data.name}" added successfully!` });
        setFormData({ name: '', price: '', description: '' });
        setSubmitting(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setMessage({ type: 'error', text: '❌ Failed to add product. Please try again.' });
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Verifying admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-5">
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)',
          padding: '60px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.15)',
          borderLeft: '5px solid #667eea'
        }}>
          <h2 style={{ color: '#667eea', marginBottom: '20px' }}>⛔ Access Denied</h2>
          <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
            Admin login required to add products
          </p>
          <a href="/admin-login" style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#5568d3'}
          onMouseLeave={e => e.target.style.backgroundColor = '#667eea'}
          >
            Go to Admin Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.15)',
        borderTop: '4px solid #667eea'
      }}>
        <h2 style={{
          color: '#667eea',
          marginBottom: '10px',
          fontSize: '2rem',
          textAlign: 'center'
        }}>
          ➕ Add New Product
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#999',
          marginBottom: '30px',
          fontSize: '0.9rem'
        }}>
          Admin Panel
        </p>

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
              Product Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Gaming Laptop"
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333'
            }}>
              Price (₹) <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 55000"
              step="0.01"
              min="0"
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
              Description <span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              rows="5"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: '2px solid #e9ecef',
                fontSize: '1rem',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                resize: 'vertical'
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
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: submitting ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => !submitting && (e.target.style.backgroundColor = '#5568d3')}
            onMouseLeave={e => !submitting && (e.target.style.backgroundColor = '#667eea')}
          >
            {submitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>

        <button
          onClick={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('admin');
            window.dispatchEvent(new Event('auth-changed'));
            window.location.href = '/';
          }}
          style={{
            width: '100%',
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#5a6268'}
          onMouseLeave={e => e.target.style.backgroundColor = '#6c757d'}
        >
          Logout Admin
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
