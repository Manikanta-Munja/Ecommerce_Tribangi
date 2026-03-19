import { useEffect, useState } from "react";
import { getLoggedInUserId } from "../utils/auth";
import { API_BASE_URL } from "../utils/api";

const BASE_URL = API_BASE_URL;

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = getLoggedInUserId();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setOrders([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}/order/user/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Unable to load order history. Please try again.");
        setLoading(false);
      });
  }, [userId]);

  const getStatusColor = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'DELIVERED':
        return '#28a745';
      case 'IN_TRANSIT':
      case 'SHIPPED':
        return '#ffc107';
      case 'PLACED':
      case 'PROCESSING':
        return '#007bff';
      default:
        return '#6c757d';
    }
  };

  if (!userId) {
    return (
      <div className="container py-5">
        <div style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>Login Required</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Please login as a user to view your order history.
          </p>
          <a href="/login" style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading order history...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 style={{ color: '#667eea', marginBottom: '30px', fontSize: '2rem' }}>
        📋 My Orders History
      </h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          padding: '60px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ fontSize: '1.5rem', color: '#999', marginBottom: '20px' }}>
            You haven't placed any orders yet
          </p>
          <a href="/" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none' }}>
            Browse products
          </a>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f3f7', borderBottom: '3px solid #667eea' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#667eea' }}>Order ID</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#667eea' }}>Items</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', color: '#667eea' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const itemNames = (order.items || [])
                  .map(item => `${item.product?.name || 'Product'} x${item.quantity}`)
                  .join(', ');

                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '15px', color: '#333', fontWeight: '600' }}>#{order.id}</td>
                    <td style={{ padding: '15px', color: '#666' }}>
                      {itemNames || 'No items'}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{
                        backgroundColor: `${getStatusColor(order.status)}`,
                        color: 'white',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {order.status || 'PLACED'}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right', color: '#667eea', fontWeight: 'bold' }}>
                      ₹{Number(order.totalAmount || 0).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
