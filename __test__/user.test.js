const  db = require("./testdb") ;
const { User, signingUp } = require("../models/userModel");
const  userSignUp = require("../controllers/userController")

describe("Signing up users", () => {
    it.only("Should not create a new user if the email is already in use", async () => {
        User.findOne = jest.fn().mockReturnValueOnce({
            email: "testuser@mail.com",
        });

        User.prototype.save = jest.fn().mockImplementation(() => {});

        await expect(signingUp("testuser@mail.com", "testuser")).reject.toThrowError();
    })
})
