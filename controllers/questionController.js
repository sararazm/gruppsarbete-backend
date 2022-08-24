const Question = require("../models/questionModel");

// create question
const createQuestion = async (req, res) => {
  const { question, correctAnswer, incorrectAnswer } = req.body;

    
  try {
    const newQuestion = new Question({
        question,
        correctAnswer,
        incorrectAnswer
    });
    newQuestion.save();
    

    res.status(200).json({newQuestion})

  } catch (error) {
    res.status(400).json({ error: error.message });
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

  const question = await Question.findById(id);
  res.status(200).json({ question });
};
//update one question
const updateQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!question) {
      return res
        .status(400)
        .json({ error: "No question matching the given id is found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete one question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByIdAndDelete({ _id: id });

    if (!question) {
      res.status(400).json({ error: "No question with matching id was found" });
    }
    res.status(200).json("question was successufully deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createQuestion,
  allQuestions,
  oneQuestion,
  updateQuestion,
  deleteQuestion,
};
