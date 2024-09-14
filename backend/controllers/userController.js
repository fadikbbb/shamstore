const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.send({ status: "success", count: users.length, data: users });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.getUserById = async (req, res) => {
    const {id} = req.params;
  try {
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ status: "fail", message: "user not found" });
    return res.status(200).send({ status: "success", data: user });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.createUser = async (req, res) => {
  try {
    const body = req.body;

    if (!body.email || !body.firstName || !body.lastName || !body.password)
      return res
        .status(500)
        .send({ status: "fail", message: "user fields are required" });

    const userExists = await User.findOne({ email: body.email });
    if (userExists)
      return res
        .status(400)
        .send({ status: "fail", message: "user already exists" });

    const hashPassword = await bcrypt.hash(body.password, 12);
    body.password = hashPassword;
    const user = await User.create(body);
    return res
      .status(200)
      .send({ status: "success", message: "user created", data: user });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateUser = await User.findByIdAndUpdate(id, body);
    if (!updateUser)
      return res
        .status(404)
        .send({ status: "fail", message: "user not found" });
    return res.status(200).send({ status: "success", message: "user updated" });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser)
      return res
        .status(404)
        .send({ status: "fail", message: "user not found" });
    return res.status(200).send({ status: "success", message: "user deleted" });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
