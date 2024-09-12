const {Router}= require("express")
const orderRouter=Router();
const orderController=require("../controllers/orderController");
const {protect}=require("../middleware/authmiddleware");
orderRouter.post("/",protect,orderController.createOrder);
orderRouter.get("/",protect,orderController.getAllOrders);
orderRouter.get("/:id",protect,orderController.getOrderById);
orderRouter.delete("/:id",protect,orderController.deleteOrder);