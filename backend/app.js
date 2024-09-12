require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
  } catch (error) {
    return res.stauts(500).send({ status: "fail", message: error.message });
  }
}
connect();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const commentRouter = require("./routes/commentRouter");
// const orderRouter = require('./routes/orderRouter');
app.use("/api/v1/users", commentRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
// app.use("/api/v1/products/order", orderRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
