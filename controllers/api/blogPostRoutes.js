const router = require("express").Router();
const Blog_Post = require("../../models/Blog_Post");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      user_id: req.session.user_id,
      post: req.body.post,
    };
    const postData = Blog_Post.create(newPost);
    res.status(200).json(postData);
  } catch (err) {}
});

module.exports = router;
