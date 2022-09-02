const Forumpost = require("../models/forumModel");

const createForumPostLogic = (forumpost) => {
  const { title, text, user} = forumpost;
  
  try {
    const newForumPost = new Forumpost({
     ...forumpost
    });


    if (!title) {
      return "You can not leave the titlefield empty";
    }
    if (!text) {
      return "You can not leave the textfield empty";
    } if(!user){
      return "Someone needs to be the author.."
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
      return "No forumposts found";
    }
   
    return forumposts;
  } catch (error) {
    return error;
  }
};


const oneForumPostLogic = (id) => {
  try {
    const oneForumPost =  Forumpost.findById(id);
    if (!oneForumPost) {
      return  "Forumpost with matching ID does not exist";
    }
    return oneForumPost;
  } catch (error) {
    return error;
  }
};

const updateOneForumPostLogic = async (id, body) => {
  try {
    const forumpost = Forumpost.findByIdAndUpdate(
      { _id: id },
      { ...body }
    );
    if (!id) {
      return  "No forumpost with matching ID was found"
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
      return  "can not find a matching post"
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
