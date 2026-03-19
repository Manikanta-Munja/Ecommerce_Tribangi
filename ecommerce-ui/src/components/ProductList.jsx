import ProductCard from "./ProductCard";

function ProductList({ products, search, addToCart }) {
  const hasSearch = search.trim().length > 0;

  return (
    <div className="container">
      {products.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">
            {hasSearch ? `No products found for "${search}"` : "No products available"}
          </h4>
          <p className="text-secondary">
            {hasSearch ? "Try a different search term" : "Check back later!"}
          </p>
        </div>
      ) : (
        <>
          <p className="text-muted mb-4">Showing {products.length} product{products.length !== 1 ? "s" : ""}</p>
          <div className="product-grid">
            {products.map(p => (
              <div className="product-grid-item" key={p.id}>
                <ProductCard product={p} addToCart={addToCart} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;