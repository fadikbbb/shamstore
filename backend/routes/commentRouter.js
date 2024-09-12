const { Router } = require("express");
const commentRouter = Router();
const commentController = require("../controllers/commentController");
const { protect } = require("../middleware/authmiddleware");
commentRouter.post("/comments", protect, commentController.createComment);
commentRouter.get("/comments", commentController.getAllComments);
commentRouter.get(
  "/comments/:commentId",
  protect,
  commentController.getCommentById
);
commentRouter.delete(
  "/:userId/comments/:commentId",
  protect,
  commentController.deleteComment
);
commentRouter.patch(
  "/:userId/comments/:commentId",
  protect,
  commentController.updateComment
);
module.exports = commentRouter;
