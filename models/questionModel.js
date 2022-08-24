const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    incorrectAnswer: {
      type: [],
      required: true,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
