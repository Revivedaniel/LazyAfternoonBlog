const router = require("express").Router();
const { User, Comment, Blog_Post } = require("../models");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.get("/:id", async (req, res) => {
  try {
    //finding blog post
    const postData = await Blog_Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    //cleaning postData
    const post = postData.get({ plain: true });

    //finding comments for blog post
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    //creating new date to format for post
    const date = new Date(post.time_created);
    //Formatting time
    post.time_created = date.toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    //cleaning commentData
    const comments = commentData.map((c) => c.get({ plain: true }));
    //creating new date to format for each comment date
    for (let i = 0; i < comments.length; i++) {
      const element = comments[i];
      const date = new Date(element.time_created);
      element.time_created = date.toLocaleDateString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    }
    //adding comments to post
    post.comments = comments;
    res.render("postpage", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
