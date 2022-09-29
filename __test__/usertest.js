const { MongoClient } = require("mongodb");

import { User, signingUp } from ("../models/userModel");
import {app} from ("../app");



describe("insert user", () => {
  let db;
  let connection;

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    connection.close();
  });

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb+srv://QuizForum:btSdlXz82dAomW3F@cluster0.xafiaul.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connection.db("QuizForum");
  });

  it("should add a new user to DB", async () => {
    const users = db.collection("users");

    const mockUser = {
      _id: "630675e4d515e80c26eb14f2",
      email: "Tester@mail.se",
      password: "password",
    };
    await signingUp(mockUser);

    const insertedUser = await users.findOne({
      _id: "630675e4d515e80c26eb14f2",
    });
    expect(insertedUser).toEqual(mockUser);
  });
});
