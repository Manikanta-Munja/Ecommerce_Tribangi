import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const getSessionInfo = () => {
  const adminData = localStorage.getItem('admin');
  if (adminData) {
    return { isLoggedIn: true, label: 'Admin' };
  }

  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      return { isLoggedIn: true, label: parsedUser.name || 'User' };
    } catch {
      return { isLoggedIn: true, label: 'User' };
    }
  }

  return { isLoggedIn: false, label: '' };
};

function Navbar() {
  const navigate = useNavigate();
  const [sessionInfo, setSessionInfo] = useState(getSessionInfo);

  useEffect(() => {
    const syncSessionInfo = () => {
      setSessionInfo(getSessionInfo());
    };

    window.addEventListener('storage', syncSessionInfo);
    window.addEventListener('auth-changed', syncSessionInfo);

    return () => {
      window.removeEventListener('storage', syncSessionInfo);
      window.removeEventListener('auth-changed', syncSessionInfo);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event('auth-changed'));
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          paddingBottom: '5px'
        }} onMouseEnter={e => {
          e.target.style.color = '#ffffff';
          e.target.style.borderBottom = '2px solid #ffffff';
        }}
           onMouseLeave={e => {
          e.target.style.color = 'white';
          e.target.style.borderBottom = 'none';
        }}>
          Home
        </Link>
        <Link to="/about" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          paddingBottom: '5px'
        }} onMouseEnter={e => {
          e.target.style.color = '#ffffff';
          e.target.style.borderBottom = '2px solid #ffffff';
        }}
           onMouseLeave={e => {
          e.target.style.color = 'white';
          e.target.style.borderBottom = 'none';
        }}>
          About
        </Link>
        <Link to="/category" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          paddingBottom: '5px'
        }} onMouseEnter={e => {
          e.target.style.color = '#ffffff';
          e.target.style.borderBottom = '2px solid #ffffff';
        }}
           onMouseLeave={e => {
          e.target.style.color = 'white';
          e.target.style.borderBottom = 'none';
        }}>
          Category
        </Link>
        <Link to="/cart" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          paddingBottom: '5px'
        }} onMouseEnter={e => {
          e.target.style.color = '#ffffff';
          e.target.style.borderBottom = '2px solid #ffffff';
        }}
           onMouseLeave={e => {
          e.target.style.color = 'white';
          e.target.style.borderBottom = 'none';
        }}>
          Cart
        </Link>
        <Link to="/orders" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          paddingBottom: '5px'
        }} onMouseEnter={e => {
          e.target.style.color = '#ffffff';
          e.target.style.borderBottom = '2px solid #ffffff';
        }}
           onMouseLeave={e => {
          e.target.style.color = 'white';
          e.target.style.borderBottom = 'none';
        }}>
          Orders
        </Link>
        <Link to="/add-products" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          paddingBottom: '5px'
        }} onMouseEnter={e => {
          e.target.style.color = '#ffffff';
          e.target.style.borderBottom = '2px solid #ffffff';
        }}
           onMouseLeave={e => {
          e.target.style.color = 'white';
          e.target.style.borderBottom = 'none';
        }}>
          Add Products
        </Link>
      </div>
      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {sessionInfo.isLoggedIn ? (
          <>
            <span style={{ color: 'white', fontWeight: '500' }}>
              {sessionInfo.label} logged in
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '10px 20px',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              backgroundColor: 'transparent'
            }} onMouseEnter={e => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1.05)';
            }}
               onMouseLeave={e => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1)';
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '10px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={e => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'scale(1.05)';
            }}
               onMouseLeave={e => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.target.style.transform = 'scale(1)';
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;