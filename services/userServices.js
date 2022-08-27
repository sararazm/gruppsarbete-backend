const mongoose = require("mongoose");
const User = require("../models/userModel");

// create user logic
const createUserLogic = () => {};


// sign in user logic
const userSignInLogic=()=> {};

// get all users logic
const allUsersLogic = () => {
  try {
    const users = User.find({});

    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }
    return users;
  } catch (error) {
    return error;
  }
};

//get one user logic
const oneUserLogic = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "User with given ID does not exist" });
  }

  try {
    const oneUser = await User.findById(id);

    if (!oneUser) {
      return error;
    }
    return oneUser;
  } catch (error) {
    return error;
  }
};

// update one user logic
const updateUserLogic = (id, body) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "User with given ID does not exist" });
  }

  try {
    const user = User.findOneAndUpdate({ _id: id }, { ...body });

    if (!user) {
      return error;
    }

    return user;
  } catch (error) {
    return error;
  }
};

//delete one user logic
const deleteUserLogic = (id) => {
  try {
    const user = User.findByIdAndDelete({ _id: id });

    if (!user) {
      return error;
    }
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUserLogic,
  userSignInLogic,
  allUsersLogic,
  oneUserLogic,
  updateUserLogic,
  deleteUserLogic,
};
