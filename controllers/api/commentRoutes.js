const router = require("express").Router();
const Comment = require("../../models/comment");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const newComment = {
      post_id: req.body.postId,
      user_id: req.session.user_id,
      comment: req.body.comment,
    };
    const commentData = await Comment.create(newComment);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
