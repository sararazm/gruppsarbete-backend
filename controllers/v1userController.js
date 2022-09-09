const express = require("express");
const { getForumpost } = require("../services/V1forumService");
const router = express.Router();
const UserService = require("../services/v1userService");
const jwt = require("jsonwebtoken");



const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
  };
  
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
    const {email, password} =  req.body;
  
    try {
      const user = await User.signingIn(email, password);
  
      //create a JWT based on the user _id
      const token = createToken(user._id)
  
      res.status(200).json({message: `The user ${user.email}, successfully signed in with token: ${token}`});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  router.post("/signin", userSignIn);

  /**
 * @swagger
 * /users:
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
 *                        example: ashdklsaj5656
 *      404:
 *         description: No posts found 
 */
router.get("/", async(req,res)=>{
    const user = await UserService.getUsers();
    if(!UserService.error) {
        res.status(200).send(users)
    } else {
        res.status(404).send({ error: "No users found"})
    }
});


/**
 * @swagger
 * /users/:id:
 *  get:
 *    summary: Retrieve a user by ID
 *    description: Retrieve a User by ID
 *    responses:
 *      200:
 *        description: A user
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
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
 *                        example: ashdklsaj5656
 *      404:
 *         description: No posts found 
 */

router.get("/:id", async (req,res)=> {
    const user = await UserService.getUser(req.params.id);
    if(user){
        res.status(200).send(user)
    } else {
        res.status(404).send({ error: "No user found with matching ID"})
    }
})


/**
 * @swagger
 * /users/:id:
 * 
 * 
 * */
router.patch("/:id", async (req,res)=> {
    const user = await UserService.updateUser(req.params.id, req.body);
    if(user) {
        res.status(200).send(user)
    } else {
        res.status(404).send({ error: "No user found with matching ID" })
    }
})

router.delete("/:id", async (req,res)=> {
    const user = await UserService.deleteUser(req.params.id);
    if(!getForumpost.error) {
        res.status(200).send({error: "Could not delete. No user found with matching ID."})
    }
})

module.exports = router;