const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const authorization = require('../middleware/authorizeMiddleware');
const { protect } = require('../middleware/authMiddleware');

userRouter.get('/', protect, authorization("admin"), userController.getAllUsers);
userRouter.post('/', protect, authorization("admin"), userController.createUser);
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/:id', protect, userController.deleteUser);
userRouter.patch('/:id', protect, userController.updateUser);
module.exports = userRouter;