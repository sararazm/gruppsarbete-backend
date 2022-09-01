const mongoose = require("mongoose");
const Forumpost = require("../models/forumModel");

const createForumPostLogic = (forumpost) => {
  const { title, text, writtenBy } = forumpost;

  try {
    const newForumPost = new Forumpost({
      title,
      text,
      writtenBy,
    });
   /* const newForumPost = new Forumpost({
      ...forumpost,
    });*/

    if (!title) {
      return "You can not leave the titlefield empty";
    }
    if (!text) {
      return "You can not leave the textfield empty";
    }

    newForumPost.save();
    return newForumPost;
  } catch (error) {
    return error;
  }
};

const allForumPostsLogic =  () => {
  try {
    const forumposts = Forumpost.find({});
    if (!forumposts) {
      return res.status(400).json({ error: "No forumposts found" });
    }
    if(forumposts){
    aggregate([
      {
        $lookup: {
          from: "Comment", //collection to join
          localField: "_id", //field from input document
          foreignField: "questionId",
          as: "allComments", //output array field
        },
      },
    ])
  }
    return forumposts;
  } catch (error) {
    return error;
  }
};

const oneForumPostLogic = async (id) => {
  try {
    const oneForumPost = await Forumpost.findById(id);
    if (!oneForumPost) {
      return res
        .status(400)
        .json({ error: "Forumpost with matching ID does not exist" });
    }
    return oneForumPost;
  } catch (error) {
    return error;
  }
};

const updateOneForumPostLogic = async (id, body) => {
  try {
    const forumpost = await Forumpost.findByIdAndUpdate(
      { _id: id },
      { ...body }
    );
    if (!id) {
      return res
        .status(400)
        .json({ error: "No forumpost with matching ID was found" });
    }
    if (!forumpost) {
      return error;
    }

    return forumpost;
  } catch (error) {
    return error;
  }
};

const deleteOneForumPostLogic = (id) => {
  try {
    const forumpost = Forumpost.findByIdAndDelete({ _id: id });
    if (!forumpost) {
      return error;
    }
    return forumpost;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createForumPostLogic,
  allForumPostsLogic,
  oneForumPostLogic,
  updateOneForumPostLogic,
  deleteOneForumPostLogic,
};
