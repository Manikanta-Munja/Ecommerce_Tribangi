function About() {
  return (
    <div className="container py-5">
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.15)',
        maxWidth: '800px',
        margin: '0 auto',
        borderLeft: '5px solid #667eea'
      }}>
        <h2 style={{ color: '#667eea', marginBottom: '20px', fontSize: '2rem' }}>
          About E-Commerce App
        </h2>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
          Welcome to <strong>E-Commerce App</strong> - Your one-stop shopping destination for quality products at great prices.
        </p>

        <h4 style={{ color: '#764ba2', marginTop: '30px', marginBottom: '15px' }}>
          Our Mission
        </h4>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
          We strive to provide customers with an easy, convenient, and secure shopping experience. Our goal is to offer the best products with exceptional customer service.
        </p>

        <h4 style={{ color: '#764ba2', marginTop: '30px', marginBottom: '15px' }}>
          Why Choose Us?
        </h4>
        <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#555', marginLeft: '20px' }}>
          <li>✅ Wide variety of quality products</li>
          <li>✅ Competitive prices</li>
          <li>✅ Secure online shopping</li>
          <li>✅ Fast and reliable delivery</li>
          <li>✅ Excellent customer support</li>
          <li>✅ Easy returns and exchanges</li>
        </ul>

        <h4 style={{ color: '#764ba2', marginTop: '30px', marginBottom: '15px' }}>
          Contact Us
        </h4>
        <p style={{ fontSize: '1rem', color: '#555' }}>
          📧 Email: info@ecommerceapp.com<br />
          📱 Phone: +91 1234567890<br />
          🏢 Address: 123 Shopping Street, Tech City
        </p>
      </div>
    </div>
  );
}

export default About;
