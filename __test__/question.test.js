const {MongoClient} = require('mongodb');
const {createQuestionLogic } = require("../services/questionServices");

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb+srv://QuizForum:btSdlXz82dAomW3F@cluster0.xafiaul.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("QuizForum");
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const questions = db.collection("questions");

    const mockQuestion = {_id: '630675e4d515e80c26eb14f3', question: 'Q1?', correctAnswer: "correct!", incorrectAnswer: "wroooong"};
    await createQuestionLogic(mockQuestion);

    const insertedQuestion = await questions.findOne({_id: '630675e4d515e80c26eb14f3'});

    
    expect(insertedQuestion).toEqual(mockQuestion);
  });
});