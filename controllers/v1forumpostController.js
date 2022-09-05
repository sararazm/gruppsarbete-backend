const express = require("express");
const ForumService = require("../services/V1forumService");
//const { getAllComentsByPost} = require("../services/commentsService");

const router = express.Router();

// CREATE a new forumpost
router.post("/newpost", async (req,res)=> {
const forumpost = await ForumService.createForumpost(req.body);
if(!forumpost.error){
  res.status(200).send(forumpost)
} else {
  res.status(401).send({ error: "Bad input"})
}

});

/**
 * @swagger
 * /forum:
 *  get:
 *    summary: Retrieve a list of forumposts
 *    description: Retrieve a list of forumposts from mongo collection Forum
 *    responses:
 *      200:
 *        description: A list of forumposts
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
 *                        description: The forumpost ID created by MongoDB
 *                      titel:
 *                        type: string
 *                        description: Title of the forumpost
 *                        example: This is a title
 *                      text:
 *                        type: string
 *                        description: The text of the post
 *                        example: The text of the post 
 *      404:
 *          description: No posts found    
 */
// GET all forumposts
router.get("/", async (req,res)=> {
    const forumposts = await ForumService.getForumposts();
    if (forumposts.length >= 1){
        res.status(200).send(forumposts)
    } else {
        res.status(404).send({ error: "No posts found"})
    }
});

// GET one post by id
router.get("/:id", async (req, res)=> {
    const forumpost = await ForumService.getForumpost(req.params.id);
    if(forumpost) {
        res.status(200).send(forumpost)
    } else {
        res.status(404).send({ error: "No post found"})
    } 
});

// UPDATE one post
router.patch("/:id", async (req,res)=> {
    const forumpost = await ForumService.updateForumpost(req.params.id, req.body);
    if(forumpost){
        res.status(200).send(forumpost)
    } else {
        res.status(404).send({ error: "No post found with matching ID"})
    }
});


//DELETE one post 
router.delete("/:id", async (req,res)=> {
    const forumpost = await ForumService.deleteForumpost(req.params.id);
    if(!forumpost.error) {
        res.status(204).send();
    } else {
      res.status(404).send({ error: "No post found with matching ID" });
  }
})

module.exports = router;