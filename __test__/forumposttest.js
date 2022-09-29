const Forumpost = require("../models/forumModel")
//const createForumpost = require("../controllers/v1forumpostController");
const createForumPostLogic = require("../services/V1forumService")

describe("Creating forumposts", () => {

    it.only("Should not create a new post if title is not unique", async () => {
        
        Forumpost.findOne = jest.fn().mockReturnValue({
            title: "Test title",
        });

        Forumpost.prototype.save = jest.fn().mockImplementation(() => {});

        await expect(new createForumPostLogic("Test title", "hej hej ett test", "Other")).rejects.toThrowError();
    }

)})
