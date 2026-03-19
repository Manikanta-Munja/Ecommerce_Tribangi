import { useState, useEffect } from "react";
import { getLoggedInUserId } from "../utils/auth";
import { API_BASE_URL } from "../utils/api";

const BASE_URL = API_BASE_URL;

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placingItemId, setPlacingItemId] = useState(null);
  const userId = getLoggedInUserId();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setCartItems([]);
      return;
    }

    fetchCart(userId);
  }, [userId]);

  const fetchCart = (activeUserId) => {
    setLoading(true);
    setError(null);
    fetch(`${BASE_URL}/cart/${activeUserId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      })
      .then(data => {
        setCartItems(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Unable to load cart. Please try again.");
        setLoading(false);
      });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + ((item.product?.price || 0) * item.quantity), 0)
      .toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (!userId) {
      setError("Please login first to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Cart is empty. Add products before placing an order.");
      return;
    }

    setPlacingOrder(true);
    setError(null);
    setMessage(null);

    fetch(`${BASE_URL}/order/place?userId=${userId}`, {
      method: "POST"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to place order");
        return res.json();
      })
      .then(() => {
        setCartItems([]);
        setMessage("✅ Order placed successfully. Ordered items were removed from your cart.");
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Unable to place order. Please try again.");
      })
      .finally(() => setPlacingOrder(false));
  };

  const handlePlaceSingleItemOrder = (cartItemId) => {
    if (!userId) {
      setError("Please login first to place an order.");
      return;
    }

    setPlacingItemId(cartItemId);
    setError(null);
    setMessage(null);

    fetch(`${BASE_URL}/order/place-item?userId=${userId}&cartItemId=${cartItemId}`, {
      method: "POST"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to place item order");
        return res.json();
      })
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
        setMessage("✅ Item order placed successfully and removed from cart.");
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Unable to place order for this item. Please try again.");
      })
      .finally(() => setPlacingItemId(null));
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
            Please login as a user to view your cart.
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
        <p className="mt-3">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 style={{ color: '#667eea', marginBottom: '30px', fontSize: '2rem' }}>
        🛒 Shopping Cart
      </h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          padding: '60px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ fontSize: '1.5rem', color: '#999', marginBottom: '20px' }}>
            Your cart is empty
          </p>
          <p style={{ color: '#666' }}>
            Start shopping to add items to your cart!
          </p>
        </div>
      ) : (
        <>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: '30px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f3f7', borderBottom: '3px solid #667eea' }}>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#667eea' }}>Product</th>
                  <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>Price</th>
                  <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>Quantity</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', color: '#667eea' }}>Total</th>
                  <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '15px', color: '#333' }}>{item.product.name}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#667eea', fontWeight: 'bold' }}>
                      ₹{item.product.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#333' }}>
                      {item.quantity}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right', color: '#667eea', fontWeight: 'bold' }}>
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handlePlaceSingleItemOrder(item.id)}
                        disabled={placingOrder || Boolean(placingItemId)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: (placingOrder || placingItemId) ? '#ccc' : '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '600',
                          cursor: (placingOrder || placingItemId) ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => !placingOrder && !placingItemId && (e.target.style.backgroundColor = '#5568d3')}
                        onMouseLeave={e => !placingOrder && !placingItemId && (e.target.style.backgroundColor = '#667eea')}
                      >
                        {placingItemId === item.id ? 'Ordering...' : 'Order This Item'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px 30px',
              borderRadius: '10px',
              minWidth: '300px',
              textAlign: 'right'
            }}>
              <h4 style={{ color: '#333', marginBottom: '15px', fontSize: '1.3rem' }}>
                Cart Summary
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Subtotal:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Shipping:</span>
                <span className="text-success">FREE</span>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder || Boolean(placingItemId) || cartItems.length === 0}
                style={{
                  width: '100%',
                  marginTop: '15px',
                  padding: '10px',
                  backgroundColor: (placingOrder || placingItemId || cartItems.length === 0) ? '#ccc' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: (placingOrder || placingItemId || cartItems.length === 0) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => !placingOrder && !placingItemId && cartItems.length > 0 && (e.target.style.backgroundColor = '#5568d3')}
                onMouseLeave={e => !placingOrder && !placingItemId && cartItems.length > 0 && (e.target.style.backgroundColor = '#667eea')}
              >
                {placingOrder ? 'Placing Order...' : 'Place Order (All Items)'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
