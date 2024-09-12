const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: [true, 'first name is required'],
        minLength: [3, 'first name must be at least 3 characters'],
        maxLength: [20, 'first name must be at most 20 characters'],
        trim: true,
        validate: {
            validator: function (value) {
                return value.includes("@") ? false : true;
            },
            message: "First name can not include special char",
        },
    },

    lastName: {
        type: String, required: [true, 'last name is required'],
        minLength: [3, 'last name must be at least 3 characters'],
        maxLength: [20, 'last name must be at most 20 characters']
    },
    DOB: { type: Date },
    email: {
        type: String, required: [true, 'email is required'],
       match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'password must be at least 8 characters'],
        select: false,

    },
    createAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String, enum: ['user', 'admin'],
        default: 'user'
    },
    changepasswordAt: {
        type: Date,
        default: Date.now
    },

})
const User = mongoose.model("User", userSchema);
module.exports = User