const request = require("supertest");
const baseURL = "http://localhost:3030/api/forum";

describe("GET foumposts", () => {
  const newPost = {
    title: "New test title",
    text: "New test text",
    category: "Other",
    
  }
  beforeAll(async () => {
    await request(baseURL).post("/newppost").send(newPost);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/${newPost._id}`);
  });
})