function Header() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '30px 20px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    }}>
      <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
        🛒 E-Commerce App
      </h1>
      <p style={{ margin: '10px 0 0 0', fontSize: '1rem', opacity: 0.9 }}>
        Your one-stop shopping destination
      </p>
    </div>
  );
}

export default Header;