const express = require("express");

const {userSignUp, allUsers, oneUser, updateUser, deleteUser} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userSignUp);
router.get("/", allUsers)
router.get("/:id", oneUser)
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;