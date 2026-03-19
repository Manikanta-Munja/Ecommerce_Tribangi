function Category() {
  const categories = [
    { id: 1, name: 'Electronics', icon: '📱', products: '150+' },
    { id: 2, name: 'Fashion', icon: '👕', products: '200+' },
    { id: 3, name: 'Home & Kitchen', icon: '🍳', products: '180+' },
    { id: 4, name: 'Sports', icon: '⚽', products: '120+' },
    { id: 5, name: 'Books', icon: '📚', products: '300+' },
    { id: 6, name: 'Beauty & Personal Care', icon: '💄', products: '250+' },
  ];

  return (
    <div className="container py-5">
      <h2 style={{
        textAlign: 'center',
        color: '#667eea',
        marginBottom: '40px',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        Shop by Category
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {categories.map(category => (
          <div
            key={category.id}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(102, 126, 234, 0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(102, 126, 234, 0.2)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(102, 126, 234, 0.25)';
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f5f8ff 0%, #eef2ff 100%)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(102, 126, 234, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
              {category.icon}
            </div>
            <h4 style={{ color: '#667eea', marginBottom: '10px', fontSize: '1.3rem', fontWeight: 'bold' }}>
              {category.name}
            </h4>
            <p style={{ color: '#764ba2', fontWeight: 'bold', marginBottom: '15px' }}>
              {category.products}
            </p>
            <button style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: '2px solid #667eea',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#5568d3';
              e.target.style.borderColor = '#5568d3';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.borderColor = '#667eea';
              e.target.style.transform = 'scale(1)';
            }}
            >
              Browse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
