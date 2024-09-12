const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user id is required']
    },
    content:{
        type: String,
        required: [true, 'content is required']
    },
    //createAt
    
});
const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment