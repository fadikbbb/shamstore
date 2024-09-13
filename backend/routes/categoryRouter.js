const { Router } = require('express');
const categoryRouter = Router();
const { protect } = require('../middleware/authmiddleware');
const categoryController = require('../controllers/categoryController');
const authorization = require('../middleware/authorizeMiddleware');
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.post('/', protect, authorization("admin"), categoryController.createCategory);
categoryRouter.get('/:id', categoryController.getCategoryByIdWithProducts);
categoryRouter.patch('/:id', protect, authorization("admin"), categoryController.updateCategory);
categoryRouter.delete('/:id', protect, authorization("admin"), categoryController.deleteCategory);
module.exports = categoryRouter