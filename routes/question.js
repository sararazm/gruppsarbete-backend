const express = require("express");

const {createQuestion, allQuestions, oneQuestion, updateQuestion, deleteQuestion} = require("../controllers/questionController");

const router = express.Router();

router.post("/newquestion", createQuestion);
router.get("/", allQuestions);
router.get("/:id", oneQuestion);
router.patch("/:id", updateQuestion);
router.delete("/:id", deleteQuestion)

module.exports = router;