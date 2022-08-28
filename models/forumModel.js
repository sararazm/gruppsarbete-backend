const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    writtenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
});
module.exports = mongoose.model("Forumpost", forumSchema);