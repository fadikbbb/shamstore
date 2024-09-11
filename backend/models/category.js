const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [3, 'name must be at least 3 characters'],
        maxLength: [20, 'name must be at most 20 characters']
    },
    image: {
        type: String,
        required: [true, 'image is required']
        // validate: [validator.isURL, 'invalid image url']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [3, 'description must be at least 3 characters'],
        maxLength: [500, 'description must be at most 20 characters']
    },
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category