import React from "react";
import Navbars from "../components/navbar";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/cartSlice"; // Import the removeItem action
import axios from "axios";
import { clearCart } from "../store/cartSlice";
import { useState } from "react";
function Cart() {
  const URL = process.env.REACT_APP_URL;
  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch(); // Initialize dispatch
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Handle buy action
  const handleBuy = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(
        `${URL}orders/add`,
        {
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(clearCart()); // Clear the cart after successful purchase
      alert("Proceeding to checkout!");
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbars />
      <div className="container mx-auto p-6 lg:p-8 border border-gray-200 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Cart Details</h1>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex md:flex-row shadow-lg rounded-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow bg-gray-50"
              >
                <div className="max-w-36 h-full">
                  <img
                    src={item.image}
                    className="w-full h-full sm:h-64 md:h-80 lg:h-96 object-cover"
                    alt={item.title}
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 my-4">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <p className="text-gray-800 font-bold">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-800 font-bold">{`Price: $${
                    item.price
                  } (Total: $${(item.price * item.quantity).toFixed(2)})`}</p>
                  <button
                    onClick={() => handleRemove(item.id)} // Call handleRemove on click
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {/* Display the total price */}
            <div className="text-right text-xl font-bold mt-6">
              Total Price: ${totalPrice.toFixed(2)}
            </div>

            {/* Buy button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleBuy}
                disabled={isLoading}
                className={`${
                  isLoading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
                } text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
              >
                {isLoading ? "Processing..." : "Buy Now"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        ) : (
          <p className="text-center mt-10 text-gray-500 text-lg">
            No items in your cart.
          </p>
        )}
      </div>
      <Footer className="bg-gray-100 border-t border-gray-200 py-4" />
    </div>
  );
}

export default Cart;
