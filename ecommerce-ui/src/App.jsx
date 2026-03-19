import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AddProducts from "./pages/AddProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/cart"
          element={
            <ProtectedUserRoute>
              <Cart />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedUserRoute>
              <MyOrders />
            </ProtectedUserRoute>
          }
        />
        <Route path="/order" element={<Navigate to="/orders" replace />} />
        <Route path="/my-orders" element={<Navigate to="/orders" replace />} />
        <Route path="/my_orders" element={<Navigate to="/orders" replace />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;