const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");
const { MongoClient } =require("mongodb");

let connection =  MongoClient;
let mongoServer = MongoMemoryServer;



module.exports.connect = async () =>{
    mongoServer = await MongoMemoryServer.create();
    connection = await MongoClient.connect( "mongodb+srv://QuizForum:btSdlXz82dAomW3F@cluster0.xafiaul.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  db = await connection.db("QuizForum");
}

//disconnect and close
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}

// clear db
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
}