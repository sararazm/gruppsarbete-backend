require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {router: userRoutes} = require("./controllers/userController");
const { router: quizRoutes} = require("./controllers/questionController");
const { router: forumRoutes} = require("./controllers/forumpostController")
const cors = require("cors");

const app = express();
app.use(cors())

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// gets specified routes from routes-folder
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/forum", forumRoutes);


const port =  process.env.PORT || 8080;
//database-connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Server listening on port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
