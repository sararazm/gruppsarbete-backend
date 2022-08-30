const Comment = require("../models/commentsModel");

const createCommenLogic =()=> {
    const {text, writtenBy } = comment;
    try {
        const newComment = new Comment({
            ...comment, 
        })

        if(!text) {
            return "You can not leave text field empty"
        }
        if(!writtenBy){
            return "username missing"
        }

        newComment.save();
        return newComment();
    } catch (error){
        return error;
    }
}
const allCommentsLogic =()=> {
    try {
        const comments = Comments.find({})
        if(!comments) {
            return res.status(400).json({error: "No comments found"})
        }
        return comments;
    } catch(error) {
        return error
    }
};

const oneCommentLogic = (id) => {
    try {
        const oneComment= await Comment.findById(id);
        if(!oneComment) {
            return error;
        }
        return oneComment;
    } catch(error){
        return error;
    }
}

const updateCommentLogic = (id, body)=> {
    try{
        const comment = await Comment.findOneAndUpdate({_id: id}, {...body});
        if(!comment) {
            return error;
        }
        return comment;
    }catch(error){
        return error;
    }
}

const deleteCommentLogic =(id)=> {
    try {
        const comment = Comment.findByIdAndDelete({_id: id});

        if(!comment){
            return res.status(400).json({ error: "No comment with matching ID was found"})
        }
        return comment;
    } catch(error) {
        return error
    }
};

module.exports = {
    createCommenLogic,
    allCommentsLogic,
    oneCommentLogic,
    updateCommentLogic,
    deleteCommentLogic,
};
