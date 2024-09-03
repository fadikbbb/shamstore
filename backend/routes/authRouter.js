const {Router}=require('express');
const authRouter=Router();
const authController=require('../controllers/authController');
authRouter.post('/register',authController.register);
authRouter.post('/login',authController.login);
authRouter.post('/forget-password',authController.forgetPassword);
// authRouter.post('/update-password',authController.updatePassword);
module.exports=authRouter;