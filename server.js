const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const { router: userRoutes } = require("./controllers/userController");
const { router: quizRoutes } = require("./controllers/questionController");
const { router: forumRoutes } = require("./controllers/forumpostController");
const v1forumRoutes = require("./controllers/v1forumpostController");
const { router: commentsRoutes } = require("./controllers/commentsController");
const cors = require("cors");
//const path =require('path');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

dotenv.config();
app.use(cors());
//app.use(express.static(path.join(__dirname + 'build')))
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// gets specified routes from routes-folder
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/forum", v1forumRoutes);
app.use("/api/comments", commentsRoutes);

const port = process.env.PORT || 8080;
//database-connection
mongoose
  .connect(process.env.MONGO_URI_CLOUD)
  .then(() => {
    app.listen(port, () => {
      console.log("Server listening on port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
