require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/question");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// gets specified routes from routes-folder
app.use("/user", userRoutes);
app.use("/quiz", quizRoutes)


const port = 3030 || process.env.PORT;
//database-connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Server listening on port:", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  console.log("Hello docker!")
  res.send("Hello docker!")
  })