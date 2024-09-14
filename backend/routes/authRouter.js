const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/forgot-password/request', authController.forgotPasswordRequest);
authRouter.post('/forgot-password/:token', authController.forgotPassword);
// authRouter.post('/update-password',authController.updatePassword);
module.exports = authRouter;