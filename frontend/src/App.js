// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/category";
import Home from "./pages/home";
import Products from "./pages/products";
import Product from "./pages/product";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Addproduct from "./pages/dashboard/addproduct";
import Dashboard from "./pages/dashboard/dashboard";
import Editproduct from "./pages/dashboard/editproduct";
import Deleteproduct from "./pages/dashboard/deleteproduct";
import Customer from "./pages/dashboard/customer";
import Cart from "./pages/cart";
import Logout from "./pages/auth/logout";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="container m-[auto]">
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} requiredRole="admin" />}
            />
            <Route
              path="/dashboard/addproduct"
              element={<ProtectedRoute element={<Addproduct />} requiredRole="admin" />}
            />
            <Route
              path="/dashboard/deleteproduct/:id"
              element={<ProtectedRoute element={<Deleteproduct />} requiredRole="admin" />}
            />
            <Route
              path="/dashboard/editproduct/:id"
              element={<ProtectedRoute element={<Editproduct />} requiredRole="admin" />}
            />
            <Route
              path="/dashboard/customer"
              element={<ProtectedRoute element={<Customer />} requiredRole="admin" />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
