const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
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
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }]
  },
  { timestamps: true }
);

const showWrittenBy = function(next) {
  this.populate({
    path: "writtenBy",
    select: "username"
  });
  next();
}


module.exports = mongoose.model("Forumpost", forumSchema);
