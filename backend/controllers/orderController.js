const Order = require("../models/order");

exports.makeOrder =async (req, res) => {
  const { productId, quantity } = req.body;
try {
  if (!productId || !quantity) {
    return res
      .status(400)
      .send({ status: "fail", message: "productId and quantity are required" });
  }
  userId = req.user.id;
  const order = { userId, productId, quantity };
  Order.create(order)
    res.status(200).send({ status: "success", message: "order created", data: order });
}catch(error){
      res.status(500).send({ status: "fail", message: err.message });
    };
};
