const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

//Create user
const userSignUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signingUp(email, password, username);

    const token = createToken(user._id);
    res.status(200).json({ email, username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all users
const allUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ users });
};

//get one user by id
const oneUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.status(200).json({ user });
};

// update one user
const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!user) {
    return res.status(400).json({
      error: "User with matching id does not exist and can not be updated",
    });
  }

  res.status(200).json(user);
};

// delete one user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      res.status(400).json({ error: "No user with matching id found" });
    }

    res.status(200).json("User successfully deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { userSignUp, allUsers, oneUser, updateUser, deleteUser };
