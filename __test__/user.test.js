const {MongoClient} = require('mongodb');

const request = require("supertest")
import mongoose from "mongoose";
const server = require('../server');



const HOST = "mongodb+srv://QuizForum:btSdlXz82dAomW3F@cluster0.xafiaul.mongodb.net/?retryWrites=true&w=majority";
const userId = new mongoose.Types.ObjectId().toString();



describe('Testing with supertest', () => {
  let connection;
  let db;
afterAll(async () => { 
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

beforeAll(async () => {
  connection = await MongoClient.connect(HOST, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});
db = await connection.db("QuizForum");
});



    describe("Given get/", ()=> {
      it("should return status 200", () => {
        container = request(HOST)
        container.get("/")
        .expect(200).
        expect('Allow', /GET/)
      
      })
    })
  
    describe("given GET action for /api/user", ()=> {
      it("should return a list of users", () => {
        container = request(HOST)
        container.get("/api/user").expect("Content-Type", /json/).expect(200)
      })
    })
  })
  

  
  const user = {
    "email": "string",
    "password": "string"
  }


  describe("Given POST action for /api/user/signup", () => {
    it("should create a new user", (done)=> {
      container = request(HOST)
      container
        .post("/api/user/signup")
        .send(user)
        .set('Accept', 'application/json')
        .expect(201, /id/, function(err,res){
          if(res.body.id.toString() < 19 ){
            throw new Error('ID too short');
				}
			})
      .expect(200,/email/)
      .expect(200,/password/)
      .expect("Content-Type", 'application/json/')
      .expect(function(err, res) {
        if(err) returndone(err);

        done()
      })
       
    })
    
  });
  