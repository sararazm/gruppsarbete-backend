const express = require("express");
//const Forumpost = require("../models/forumModel");
const {
  createForumPostLogic,
  allForumPostsLogic,
  oneForumPostLogic,
  updateOneForumPostLogic,
  deleteOneForumPostLogic,
} = require("../services/forumServices");
const router = express.Router();

// CREATE a new forumpost
const createForumPost = async (req, res) => {
  const newForumpost = await createForumPostLogic(req.body);

  if (newForumpost._id) {
     res
      .status(200)
      .json({ message: `New post created with title: ${newForumpost.title} and id: ${newForumpost._id} written by: ${newForumpost.writtenBy}` });
  } else {
     res.status(400).json(error);
  }
};
router.post("/newpost", createForumPost);


//GET all forumposts
const allForumPosts = async (req,res) => {
    const forumposts = await allForumPostsLogic();
    
    if(forumposts) {
        res.status(200).json({ forumposts });
    } else {
        res.status(400).json(error);
    }
}
router.get("/", allForumPosts);


// GET one forumpost by ID
const oneForumPost = async (req,res) => {
    const {id} = req.params;

    const forumpost = await oneForumPostLogic(id);

    if(forumpost._id) {
         res.status(200).json({ forumpost});
    
    }else {
         res.status(400).json({ error: "Can not find a forumpost with matching ID"})
    }
}
router.get("/:id", oneForumPost);

// UPDATE one forumpost by ID
const updateForumPost = async (req,res)=> {
    const {id} = req.params;

    const forumpost = await updateOneForumPostLogic(id, req.body);

    if(forumpost._id) {
         res.status(200).json({ message: "Forumpost was successfully updated"})
    } else {
         res.status(400).json({ error: "Could not find a forumpost with matching ID to update"})
    }
}
router.patch("/:id", updateForumPost);

// DELETE one forum post by ID
const deleteForumPost = async (req,res) => {
    const { id } =req.params;
    const forumpost = await deleteOneForumPostLogic(id);

    if(forumpost.id) {
         res.status(201).json({ message: "Forumpost was successfully deleted"})
    } if(!forumpost.id){
         res.status(400).json({ error: "Could not find a forumpost with matching ID to delete"})
    } 
    else {
         res.status(500).json({ error: "Oops something went wrong"})
    }
}
router.delete("/:id", deleteForumPost);

module.exports= {
    createForumPost,
    allForumPosts,
    oneForumPost,
    updateForumPost,
    deleteForumPost,
    router,
};