import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbars from "../components/navbar";
import { useParams } from "react-router-dom";
// import { CartContext } from "../contexts/CartContext";
import Footer from "../components/footer";
import axios from "axios";
function Product() {
  const URL = process.env.REACT_APP_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  // const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}products/${id}`);
        setProduct(response.data.data);
        setPrice(response.data.data.price);
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
    setNewPrice(price * quantity);
  }, [quantity, price]);

  const increment = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) =>
      prevQuantity > product.quantity - 1 ? product.quantity : prevQuantity + 1
    );
  };

  const decrement = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (loading) {
    return (
      <img
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        src="../../../Bean Eater@1x-1.0s-200px-200px.svg"
        alt=""
      />
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
              />
            </div>
            <div className="md:w-1/2 p-6 bg-gray-50 ">
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
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  maxLength={product.quantity}
                  readOnly
                  className=" w-12 bg-white border-t outline-none text-center border-b border-cyan-300 py-2"
                />
                <button
                  onClick={increment}
                  className="bg-cyan-300 text-white border-[1px] border-cyan-300 px-4 py-2 rounded-r"
                >
                  +
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-6">
                ${newPrice?.toFixed(2)}
              </p>
              <button className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300">
                cart
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
