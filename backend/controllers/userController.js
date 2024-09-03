const User = require('../models/user');
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send({ status: "success", count: users.length, data: users });
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message });
    }
}
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) return res.status(404).send({ status: "fail", message: "user not found" })
        return res.status(200).send({ status: "success", data: user })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message })
    }
}
exports.createUser = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.create(body)
        if (!user) return res.status(500).send({ status: "fail", message: "user fields are required" })
        return res.status(200).send({ status: "success",message: "user created",  data: user })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message })
    }
}
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const updateUser = await User.findByIdAndUpdate(id, body)
        if(!updateUser) return res.status(404).send({ status: "fail", message: "user not found" })
        return res.status(200).send({ status: "success", message: "user updated" })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser) return res.status(404).send({ status: "fail", message: "user not found" })
        return res.status(200).send({ status: "success", message: "user deleted" })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message })
    }
}
