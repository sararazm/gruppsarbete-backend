const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    forumposts: {
      type: [],
      default: '',
    },
    quizpoints: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

// Static method to sign up user
userSchema.statics.signingUp = async function (email, password, username) {
  //if the user leaves either email, username or password empty we throw an Error
  if (!email || !password || !username) {
    throw Error("You can not leave any fields empty");
  }
      /*
         we check to see if the username and/or email  already exists by using the method findOne
        If the email/username is already registered we throw an Error
      */
  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw Error("The email is already registered");
  }
   if (usernameExists){
    throw Error("The username is already taken")
   }

    // we take the password and salt it for 10 rounds and save it in the variable called hashed
  const salted = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salted);

  // if all goes well, we return the user
   const user = await this.create({ email, username, password: hashed });
  return user;
};

module.exports = mongoose.model("User", userSchema);
