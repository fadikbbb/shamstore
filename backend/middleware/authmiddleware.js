const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.protect = async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res
        .status(401)
        .send({ status: "fail", message: "you are not authorized" });
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .send({ status: "fail", message: "you are not authorized" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .send({ status: "fail", message: "you are not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
