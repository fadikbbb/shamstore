const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authmiddleware");
const authorization = require("../middleware/authorizeMiddleware");

// Get all orders
router.get("/", protect, authorization("admin"), orderController.getAllOrders);

// Get order by ID (assuming you want to get a specific order, not just items)
router.get(
  "/:orderId",
  protect,
  authorization("admin"),
  orderController.getOrderById
);

// Add item to order
router.post("/add", protect, orderController.addItemToOrder);

// Update item quantity
router.put(
  "/update/:itemId",
  protect,
  authorization("admin"),
  orderController.updateItemQuantity
);

// Update order status
router.patch(
  "/:orderId/status",
  protect,
  authorization("admin"),
  orderController.updateOrderStatus
);

// Remove item from order
router.delete(
  "/remove/:itemId",
  protect,
  authorization("admin"),
  orderController.removeOrder
);

module.exports = router;
