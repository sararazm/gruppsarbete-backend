const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");

const cors = require("cors");
//const path =require('path');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");



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

// docker test

app.get("/", (req, res) => {
  console.log("Docker is ON!");
  res.send("Hello Docker!");
});
