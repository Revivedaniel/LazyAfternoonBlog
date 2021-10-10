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

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Blog_Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    if (req.session.user_id == post.user_id) {
      try {
        const updatePost = await Blog_Post.update(req.body, {
          where: { id: req.params.id },
        });
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
