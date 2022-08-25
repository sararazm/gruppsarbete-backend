const Question = require("../models/questionModel");
const {
  createQuestionLogic,
  oneQuestionLogic,
  updateQuestionLogic,
  deleteQuestionLogic,
} = require("../services/questionServices");

// create question
const createQuestion = async (req, res) => {
  const newQuestion = await createQuestionLogic(req.body);
  console.log(newQuestion);

  if (newQuestion._id) {
    return res.status(200).json(newQuestion);
  } else {
    return res.status(400).json(newQuestion);
  }
};

// get/read all questions
const allQuestions = async (req, res) => {
  const questions = await Question.find({});

  res.status(200).json({ questions });
};

//get /read one question
const oneQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await oneQuestionLogic(id);
  if (question._id) {
    return res.status(200).json({ question });
  } else {
    return res.status(400).json({ error: "can not find the question" });
  }
};

//update one question
const updateQuestion = async (req, res) => {
  const { id } = req.params;

  
  const question = await updateQuestionLogic(id, req.body)
  if(question._id) {
    return res.status(200).json({question});
  } else {
    return res.status(500).json({error: "could not update question"})
  }
};



// delete one question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

 const question = await deleteQuestionLogic(id)
 if(question._id) {
  return res.status(201).json("Question successfully deleted");
 }else {
  return res.status(500).json({error: "colud not delete question"})
 }
};

module.exports = {
  createQuestion,
  allQuestions,
  oneQuestion,
  updateQuestion,
  deleteQuestion,
};
