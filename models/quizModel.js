const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    question: {
        type:String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    incorrectAnswer: {
        type: [],
        required: true,
        minLength: 2,
    },
},
{ timestamps: true}
);

module.exports = mongoose.model("Quiz", quizSchema);        