import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbars from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

function Product() {
  const URL = process.env.REACT_APP_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, URL]);

  useEffect(() => {
    if (product) {
      setNewPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const increment = (e) => {
    e.preventDefault();
    if (product) {
      setQuantity((prevQuantity) =>
        prevQuantity >= product.quantity ? product.quantity : prevQuantity + 1
      );
    }
  };

  const decrement = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      // Add item to Redux store
      dispatch(
        addItem({
          image: product.image,
          id: product._id,
          description: product.description,
          title: product.title,
          price: product.price,
          quantity: quantity,
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="../../../Bean Eater@1x-1.0s-200px-200px.svg" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error fetching product: {error.message}
      </p>
    );
  }

  return (
    <div>
      <Navbars />
      <div className="container mx-auto p-6">
        <h1 className="title">Product Details</h1>
        {product && (
          <div
            key={product._id}
            className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden"
          >
            <div className="md:w-1/2">
              <img
                src={product.image}
                className="m-auto max-h-[500px] object-cover"
                alt={product.title}
                onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")} // Fallback image
              />
            </div>
            <div className="md:w-1/2 p-6 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 my-4">
                {product.title}
              </h2>
              <p className="text-gray-400 text-xs mb-4">
                {product.description}
              </p>
              <p className="text-lg mb-4">
                Rating:{" "}
                <span className="text-yellow-500">{product.rate} ★</span>
              </p>
              <div className="flex items-center mb-6">
                <button
                  onClick={decrement}
                  className="bg-cyan-300 text-white border-[1px] border-cyan-300 px-4 py-2 rounded-l"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  max={product.quantity}
                  readOnly
                  className="w-12 bg-white border-t outline-none text-center border-b border-cyan-300 py-2"
                  aria-label="Product quantity"
                />
                <button
                  onClick={increment}
                  className="bg-cyan-300 text-white border-[1px] border-cyan-300 px-4 py-2 rounded-r"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-6">
                ${newPrice.toFixed(2)}
              </p>
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
              >
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="block mt-4 text-center text-cyan-500 hover:underline"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
