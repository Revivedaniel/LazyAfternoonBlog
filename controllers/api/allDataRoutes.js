const router = require("express").Router();
const { User, Comment, Blog_Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/posts", async (req, res) => {
  try {
    const postData = await Blog_Post.findAll({});
    res.json(postData);
  } catch (err) {
    res.redirect("/login");
  }
});
router.get("/comments", async (req, res) => {
  try {
    const postData = await Comment.findAll({});
    res.json(postData);
  } catch (err) {
    res.redirect("/login");
  }
});
router.get("/users", async (req, res) => {
  try {
    const postData = await User.findAll({});
    res.json(postData);
  } catch (err) {
    res.redirect("/login");
  }
});

router.post("/seedall", async (req, res) => {
  const sequelize = require("../../config/connection");

  const postData = require("../../seeds/postData.json");
  const commentData = require("../../seeds/commentData.json");
  const userData = require("../../seeds/userData.json");

  const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const Users = await User.bulkCreate(userData);
    const Blog_Posts = await Blog_Post.bulkCreate(postData);
    const Comments = await Comment.bulkCreate(commentData);
  };

  seedDatabase();
  res.send("Seeded")

});

module.exports = router;
