// controllers/orderController.js
const Order = require("../models/order");
const Product = require("../models/product"); // Assuming you have a Product model

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .populate("userId");
    res.status(200).send({ status: "success", length: orders.length, orders });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Get order items for a user
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId }).populate(
      "items.productId"
    );
    if (!order) return res.status(404).send({ message: "order not found" });
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};exports.addItemToOrder = async (req, res) => {
  const items = req.body.items;

  // Validate that items is an array and each item has required fields
  if (!Array.isArray(items) || items.some(item => !item.productId || !item.quantity)) {
    return res.status(400).send({ success: false, message: "Invalid data format" });
  }

  const userId = req.user._id;

  try {
    let order = await Order.findOne({ userId });
    if (!order) {
      // Create a new order if one does not exist
      order = new Order({
        userId,
        items,
      });
    } else {
      // Update the existing order
      items.forEach((item) => {
        const itemIndex = order.items.findIndex(
          (orderItem) => orderItem.productId.toString() === item.productId.toString()
        );

        if (itemIndex > -1) {
          // If product already exists in the order, update the quantity
          order.items[itemIndex].quantity += item.quantity;
        } else {
          // If product doesn't exist, add a new product to the order
          order.items.push(item);
        }
      });
    }

    await order.save(); // Save the order to the database

    res.status(200).send({
      success: true,
      message: "Items added to order successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error adding items to order:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    // Validate status value if necessary
    const validStatuses = ["pending", "processing", "shipped", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate("userId");

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update item quantity in order
exports.updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { "items._id": req.params.itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items.productId");
    if (!order)
      return res.status(404).send({ message: "order item not found" });
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Remove item from order
exports.removeOrder = async (req, res) => {
  const { itemId } = req.params;
  try {
    const order = await Order.findById(itemId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Ensure both IDs are of the same type for comparison
    if (!req.user._id.equals(order.userId) && req.user.role !== "admin") {
      return res.status(401).send({ status: "fail", message: "Unauthorized" });
    }

    await Order.findByIdAndDelete(itemId);
    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({ status: "fail", message: "Internal Server Error" });
  }
};
