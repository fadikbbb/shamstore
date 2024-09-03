const {Router}=require('express');
const userRouter=Router();
const userController=require('../controllers/userController');

userRouter.get('/',userController.getAllUsers);
userRouter.post('/',userController.createUser);
userRouter.get('/:id',userController.getUserById);
userRouter.delete('/:id',userController.deleteUser);
userRouter.patch('/:id',userController.updateUser);
module.exports=userRouter;