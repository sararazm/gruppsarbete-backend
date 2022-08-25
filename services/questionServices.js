const Question = require("../models/questionModel");

const createQuestionLogic = (question) => {
  try {
    const newQuestion = new Question({
      ...question,
    });
    newQuestion.save();
    return newQuestion;
  } catch (error) {
    return error;
  }
};

const oneQuestionLogic = (id) => {
  try {
    const oneQuestion = Question.findById(id);
    return oneQuestion;
  } catch (error) {
    return error;
  }
};

const updateQuestionLogic = (id, body) => {
  console.log(id)
  console.log("body:", body)
    try {
    const question = Question.findOneAndUpdate({ _id: id }, { ...body });
    return question;
  } catch (error) {
    return error;
  }
};

const deleteQuestionLogic = (id) => {
  try {
    const question = Question.findByIdAndDelete({ _id: id });
    return question;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createQuestionLogic,

  oneQuestionLogic,
  updateQuestionLogic,
  deleteQuestionLogic
};
