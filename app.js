const express = require("express");

const { router: userRoutes } = require("./controllers/userController");
const { router: quizRoutes } = require("./controllers/questionController");
// old const { router: forumRoutes } = require("./controllers/forumpostController");
const v1forumRoutes = require("./controllers/v1forumpostController");
const { router: commentsRoutes } = require("./controllers/commentsController");

const app = express();

app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/forum", v1forumRoutes);
app.use("/api/comments", commentsRoutes);


module.exports = app