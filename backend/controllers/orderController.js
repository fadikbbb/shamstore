// controllers/orderController.js
const Order = require('../models/order');
const Product = require('../models/product'); // Assuming you have a Product model

// Get order items for a user
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addItemToOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
  
  try {
    let order = await Order.findOne({ userId });
    
    if (!order) {
      // Create a new order if one does not exist
      order = new Order({
        userId: userId,
        items: [{ productId, quantity }]
      });
    } else {
      // Update the existing order
      const itemIndex = order.items.findIndex(item => item.productId.toString() === productId.toString());
      if (itemIndex > -1) {
        // Item exists, update the quantity
        order.items[itemIndex].quantity += quantity;
      } else {
        // Item does not exist, add a new item
        order.items.push({ productId, quantity });
      }
    }
    
    // Save the order to the database
    await order.save();
    
    res.status(200).json({ success: true, message: 'Item added to order successfully' });
  } catch (error) {
    console.error('Error adding item to order:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Update item quantity in order
exports.updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { 'items._id': req.params.itemId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    ).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'order item not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from order
exports.removeItemFromOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { userId: req.body.userId },
      { $pull: { items: { _id: req.params.itemId } } },
      { new: true }
    ).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
