const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forumpost",
    },
    comment: {
        type: String,
        required: true, 
    },
    writtenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);