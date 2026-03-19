function ProductCard({ product, addToCart }) {
  return (
    <div className="card product-card shadow-sm p-2">
      <div className="card-body product-card-body text-center">
        <h5 className="product-card-title">{product.name}</h5>
        {product.description && (
          <p className="product-card-description text-muted small">
            {product.description.length > 50 
              ? product.description.substring(0, 50) + '...' 
              : product.description}
          </p>
        )}
        <p className="product-card-price">
          ₹{product.price?.toFixed(2) || '0.00'}
        </p>
        <button
          className="btn w-100"
          style={{
            backgroundColor: '#667eea',
            borderColor: '#667eea',
            color: 'white',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onClick={() => addToCart(product.id)}
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
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;