import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DashboardNav from "./dashboardNav";
import Navbars from "../../components/navbar";
function Order() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = process.env.REACT_APP_URL;
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${URL}orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedOrders = response.data.orders;

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [URL, token]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${URL}orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the order status in the state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error.response || error);
      setError("Error updating order status. Please try again later.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-teal-50">
        <p className="text-xl text-gray-700 font-semibold">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-teal-50">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-teal-50">
        <p className="text-xl text-gray-700 font-semibold">No orders found.</p>
      </div>
    );
  }

  return (
    <div>
        <Navbars />
    <div className="container">
      <div className="flex md:flex-nowrap flex-wrap ">
        <DashboardNav />
      <div className="space-y-6">
      <h1 className="title">All Orders</h1>
        {orders.map((order) => {
          const orderTotalPrice = order.items.reduce((itemAcc, item) => {
            return itemAcc + item.quantity * item.productId.price;
          }, 0);

          const statusTransitions = {
            pending: "processing",
            processing: "shipped",
            shipped: "delivered",
            delivered: null,
          };

          const nextStatus = statusTransitions[order.status];

          return (
            
            <div
              key={order._id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            >

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Order #{order._id}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong className="font-medium">User:</strong>{" "}
                {order.userId.firstName} ({order.userId.email})
              </p>
              <p className="text-gray-700 mb-2">
                <strong className="font-medium">Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Items:
                </h3>
                <ul className="list-disc ml-6 space-y-3">
                  {order.items.map((item) => (
                    <li key={item.productId._id} className="text-gray-700">
                      <p>
                        <strong className="font-medium">Product:</strong>{" "}
                        {item.productId.title}
                      </p>
                      <p>
                        <strong className="font-medium">Quantity:</strong>{" "}
                        {item.quantity}
                      </p>
                      <p>
                        <strong className="font-medium">Price:</strong> $
                        {item.productId.price.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                {nextStatus ? (
                  <button
                    onClick={() => updateOrderStatus(order._id, nextStatus)}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Mark as {nextStatus}
                  </button>
                ) : (
                  <p className="text-gray-600">Order already delivered.</p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Total Price: ${orderTotalPrice.toFixed(2)}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
    </div>
  );
}

export default Order;
