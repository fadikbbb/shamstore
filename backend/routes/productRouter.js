const {Router}=require('express');
const productRouter=Router();
const {query} =require('../middleware/query');
const Product = require('../models/product');
const ProductController=require('../controllers/productController');
const {protect}=require('../middleware/authmiddleware');
const authorization = require('../middleware/authorizeMiddleware');
productRouter.get('/',query(Product),ProductController.getAllProducts);
productRouter.post('/',protect, authorization("admin"),ProductController.createProduct);
productRouter.get('/:id',ProductController.getProductById);
productRouter.delete('/:id',protect, authorization("admin"),ProductController.deleteProduct);
productRouter.patch('/:id',protect, authorization("admin"),ProductController.updateProduct);
module.exports=productRouter