const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'category is required']
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category is required']
  },
  image: {
    type: String,
    required: [true, 'image is required']
    // validate: [validator.isURL, 'invalid image url']
  },
  title: {
    type: String,
    required: [true, 'name is required'],
    minLength: [3, 'name must be at least 3 characters'],
    maxLength: [200, 'name must be at most 200 characters'] // corrected maxLength to 200
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    minLength: [3, 'description must be at least 3 characters'],
    maxLength: [500, 'description must be at most 500 characters'] // corrected maxLength to 500
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
    min: [1, 'price must be at least 1'],
    max: [1000, 'price must be at most 1000'] // corrected max value for price
  },
  rate: {
    type: Number,
    min: [1, 'rate must be at least 1'],
    max: [5, 'rate must be at most 5']
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    min: [1, 'quantity must be at least 1'],
    max: [500, 'quantity must be at most 500']
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
