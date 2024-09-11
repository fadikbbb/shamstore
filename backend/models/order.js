const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user id is required']
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'product id is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
        min: [1, 'quantity must be at least 1']
    }
});
const Order = mongoose.model("Order",orderSchema);
module.exports = Order