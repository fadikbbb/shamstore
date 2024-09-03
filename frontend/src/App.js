import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./pages/category";
import Home from "./pages/home";
import Products from "./pages/products";
import Product from "./pages/product";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Addproduct from "./pages/dashboard/addproduct";
import Dashboard from "./pages/dashboard/dashboard";
import Editproduct from "./pages/dashboard/editproduct";
import Deleteproduct from "./pages/dashboard/deleteproduct";
import Customer from "./pages/dashboard/customer";
import Cart from "./pages/cart";
import Logout from "./pages/logout";
import { CartProvider } from "./contexts/CartContext"; // Adjust the path as needed
import NotFound from "./pages/NotFound";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/logout", element: <Logout /> },
  { path: "/categories/:id", element: <Categories /> },
  { path: "/products", element: <Products /> },
  { path: "/products/:id", element: <Product /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/addproduct", element: <Addproduct /> },
  { path: "/dashboard/deleteproduct/:id", element: <Deleteproduct /> },
  { path: "/dashboard/editproduct/:id", element: <Editproduct /> },
  { path: "/cart", element: <Cart /> },
  { path: "/dashboard/customer", element: <Customer /> },
  { path: "*", element: <NotFound /> }
]);

function App() {
  return (
    <CartProvider>
      <div className="container m-[auto]">
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

export default App;
