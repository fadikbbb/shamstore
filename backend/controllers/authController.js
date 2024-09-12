const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
exports.register = async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        if (!body.email || !body.firstName || !body.lastName || !body.password || !body.confirmPassword)
            return res.status(400).send({ status: "fail", message: "user fields are required" })
        if (body.password !== body.confirmPassword)
            return res.status(400).send({ status: "fail", message: "passwords do not match" })
        const userExists = await User.findOne({ email: body.email })
        if (userExists)
            return res.status(400).send({ status: "fail", message: "user already exists" })
        const hashPassword = await bcrypt.hash(body.password, 12)
        body.password = hashPassword
        const user = await User.create(body)
        res.status(200).send({ status: "success", message: "user created", data: user })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message })
    }
}
exports.login = async (req, res) => {
    try {
        const body = req.body
        if (!body.email || !body.password)
            return res.status(500)
                .send({ status: "fail", message: "user fields are required" })

        const user = await User.findOne({ email: body.email }).select("+password")
        if (!user)
            return res.status(500)
                .send({ status: "fail", message: "invalid email or password" })

        const isMatch = await bcrypt.compare(body.password, user.password)
        if (!isMatch)
            return res.status(500)
                .send({ status: "fail", message: "invalid email or password" })

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN })

        res.status(200).send({ status: "success", message: "user logged in", data: token })

    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message })
    }
}

exports.forgetPasswordRequest = async (req, res) => {
    try {
        const body = req.body;

        // Validate email presence
        if (!body.email) {
            return res.status(400).send({ status: "fail", message: "Email is required" });
        }

        // Find the user by email
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(400).send({ status: "fail", message: "User not found" });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        // Create a transport object
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        // Define the URL and mail options
        const url = `http://localhost:3000/reset-password/${token}`;
        console.log(url);
        const mailOptions = {
            from: process.env.SMTP_USER,    // corrected field name
            to: body.email,                // corrected field name
            subject: "Reset Password",     // corrected field name
            text: `Click here to reset your password: ${url}` // corrected field name
        };
        // Send email
        await transporter.sendMail(mailOptions);
        // Respond with success
        res.status(200).send({ status: "success", message: "Password reset email sent" });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ status: "fail", message: error.message });
    }
};
exports.forgetPassword = async (req, res) => {
    try {
        const { token } = req.params

        if (!token) {
            res.status(400).send({ status: "fail", message: "Token is required" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(400).send({ status: "fail", message: "Invalid token" });
        }
        const { id } = decoded
        const user = await User.findById(id);
        if (!user) {
            res.status(400).send({ status: "fail", message: "User not found" });
        }
        const { newPassword, confirmPassword } = req.body
        if (!newPassword || !confirmPassword) {
            res.status(400).send({ status: "fail", message: "Password is required" });
        }
        if (newPassword !== confirmPassword) {
            res.status(400).send({ status: "fail", message: "Passwords do not match" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashPassword;
        await user.save();
        res.status(200).send({ status: "success", message: "Password updated successfully" });
    } catch (error) {
    }
}