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
  user: {
    type: String
  }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Forumpost", forumSchema);
