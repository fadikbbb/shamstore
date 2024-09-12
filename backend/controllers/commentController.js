const Comment = require("../models/comment");
exports.createComment = async (req, res) => {
  const body = req.body;
  try {
    if (!body.content) {
      return res
        .status(400)
        .send({ status: "fail", message: "content is required" });
    }
    userId = req.user._id;
    body.userId = userId;
    const comment = await Comment.create(body);
    return res.status(200).send({ status: "success", data: comment });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).send({ status: "success", data: comments });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.getCommentById = async (req, res) => {
  const id = req.params.commentId;
  try {
    const comment = await Comment.findById(id);
    if (!comment)
      return res
        .status(404)
        .send({ status: "fail", message: "comment not found" });
    return res.status(200).send({ status: "success", data: comment });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.deleteComment = async (req, res) => {
  const id = req.params.commentId;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment)
      return res
        .status(404)
        .send({ status: "fail", message: "comment not found" });
    if (req.user._id !== comment.userId || req.user.role !== "admin")
      return res.status(401).send({ status: "fail", message: "unauthorized" });
    return res
      .status(200)
      .send({ status: "success", message: "comment deleted" });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.params.userId;

  const body = req.body;
  try {
    if (!body.content) {
      return res
        .status(400)
        .send({ status: "fail", message: "content is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ status: "fail", message: "user not found" });
    }
    if (req.user._id !== comment.userId || req.user.role !== "admin")
      return res.status(401).send({ status: "fail", message: "unauthorized" });
    const updateComment = await Comment.findByIdAndUpdate(id, body);
    if (!comment)
      return res
        .status(404)
        .send({ status: "fail", message: "comment not found" });
    if (req.user._id !== comment.userId || req.user.role !== "admin")
      return res.status(401).send({ status: "fail", message: "unauthorized" });
    return res
      .status(200)
      .send({ status: "success", message: "comment updated" });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};
