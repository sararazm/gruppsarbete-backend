const dotenv = require("dotenv");

const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../server");
//const db = require("./testdb")
const { createForumpost } = require("../services/V1forumService");

describe("Forumposts", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  describe("Should create a new forumpost", () => {
    let connection;
    let db;

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

    it("should add to forumpost collection", async () => {
      const forumposts = db.collection("testposts");

      const testForumpost = {
        _id: "630675e4d515e80c26eb14g7",
        title: "Test Title 12",
        text: "this is just a jest-test",
        category: "Other",
      };
      await createForumpost(testForumpost);

      const insertedTestPost = await forumposts.findOne({
        _id: "630675e4d515e80c26eb14g7",
      });

      expect(insertedTestPost).toEqual(testForumpost);
    });
  });
});
