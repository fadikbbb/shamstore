// routes/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
// Get order items
router.get('/:userId', orderController.getOrder);

// Add item to order
router.post('/add', protect, orderController.addItemToOrder);

// Update item quantity
router.put('/update/:itemId', orderController.updateItemQuantity);

// Remove item from order
router.delete('/remove/:itemId', orderController.removeItemFromOrder);

module.exports = router;
