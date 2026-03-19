import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { getLoggedInUserId } from "../utils/auth";
import { API_BASE_URL } from "../utils/api";

const BASE_URL = API_BASE_URL;

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const trimmedSearch = search.trim();
    const endpoint = trimmedSearch
      ? `${BASE_URL}/products/search?query=${encodeURIComponent(trimmedSearch)}`
      : `${BASE_URL}/products`;

    const debounceTimer = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetch(endpoint, { signal: controller.signal })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        })
        .then(data => {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          if (err.name === "AbortError") {
            return;
          }

          console.error("Error:", err);
          setError("Unable to load products. Make sure the backend is running on port 8080.");
          setLoading(false);
        });
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [search]);

  const addToCart = (productId) => {
    const userId = getLoggedInUserId();

    if (!userId) {
      alert("Please login first to add products to cart.");
      window.location.href = '/login';
      return;
    }

    fetch(`${BASE_URL}/cart/add?userId=${userId}&productId=${productId}&quantity=1`, {
      method: "POST"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add to cart");
        return res.json();
      })
      .then(() => {
        alert("✅ Added to cart successfully!");
      })
      .catch(err => {
        console.error("Error:", err);
        alert("❌ Failed to add to cart. Please try again.");
      });
  };

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      
      {loading && (
        <div className="container text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      )}
      
      {error && (
        <div className="container">
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>⚠️ Error!</strong> {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <ProductList products={products} search={search} addToCart={addToCart} />
      )}
    </>
  );
}

export default Home;
