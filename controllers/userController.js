const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  oneUserLogic,
  deleteUserLogic,
  allUsersLogic,
  updateUserLogic,
} = require("../services/userServices");
const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *               properties:
 *                 id:
 *                   type: integer
 *               type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       200:
 *         description: Created
 *       requestBody:
 *         required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *               properties:
 *                  id:
 *                    type: integer
 *                    description: The user ID created by MongoDB
 *                    example: 0
 *                  email:
 *                    type: string
 *                    description: The users email
 *                    example: user@mail.com
 *                  password:
 *                    type: string
 *                    description: The users hashed password
 */
//CREATE USER
const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signingUp(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.post("/signup", userSignUp);

// LOGIN USER
const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signingIn(email, password);

    //create a JWT based on the user _id
    const token = createToken(user._id);

    res.status(200).json({
      message: `The user ${user.email}, successfully signed in with token: ${token}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.post("/signin", userSignIn);

/**           ----!!!!!DONE DO NOT TOUCH!!!!----
 * @swagger
 * /user:
 *  get:
 *    summary: Retrieve a list of registered users
 *    description: Retrieve a list of users from mongo collection User
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: The user ID created by MongoDB
 *                      email:
 *                        type: string
 *                        description: The users email
 *                        example: user@mail.com
 *                      password:
 *                        type: string
 *                        description: The users hashed password
 *      404:
 *          description: No posts found
 */

//GET ALL USERS - SWAGGER
const allUsers = async (req, res) => {
  const users = await allUsersLogic();

  if (users) res.status(200).json({ users });
  else {
    return res.status(400).json("No users found");
  }
};
router.get("/", allUsers);

/**      ----!!!!!DONE DO NOT TOUCH!!!!---- Connectar men saknar att hämta ifrån id
 * @swagger
 * /user/:id:
 *  get:
 *    summary: Retrieve a list of registered users
 *    description: Retrieve a list of users from mongo collection User
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the user to retrieve.
 *        schema:
 *          type: integer
 *    responses:
 *      201:
 *        description: A Single User
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: The user ID created by MongoDB
 *                      email:
 *                        type: string
 *                        description: The users email
 *                        example: user@mail.com
 *                      password:
 *                        type: string
 *                        description: The users hashed password
 */
//GET /READ ONE USER BY ID
const oneUser = async (req, res) => {
  const { id } = req.params;

  const user = await oneUserLogic(id);
  if (user._id) {
    return res.status(200).json({ user });
  } else {
    return res
      .status(400)
      .json({ error: "Could not find a user with that ID" });
  }
};
router.get("/:id", oneUser);

// UPDATE ONE USER BY ID
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await updateUserLogic(id, req.body);

    if (id) {
      return res.status(200).json(`User with id: ${user.id} updated`);
    } else {
      return res
        .status(400)
        .json({ error: "Could not find a user with that ID to update" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.patch("/:id", updateUser);

// DELETE ONE USER BY ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await deleteUserLogic(id);

    if (user.id) {
      res.status(201).json("User successfully deleted");
    } else {
      return res
        .status(400)
        .json({ error: "Could not find a user with that ID to delete" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.delete("/:id", deleteUser);

module.exports = {
  userSignUp,
  allUsers,
  oneUser,
  updateUser,
  deleteUser,
  router,
};
