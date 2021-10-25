const router = require("express").Router();
const { User, Comment, Blog_Post, Role } = require("../../models");
const withAuth = require("../../utils/auth");
const adminTask = require("../../utils/adminTask");

router.get("/posts", adminTask, async (req, res) => {
  try {
    const postData = await Blog_Post.findAll({});
    res.json(postData);
  } catch (err) {
    res.redirect("/login");
  }
});
router.get("/comments", adminTask, async (req, res) => {
  try {
    const postData = await Comment.findAll({});
    res.json(postData);
  } catch (err) {
    res.redirect("/login");
  }
});
router.get("/users", adminTask, async (req, res) => {
  try {
    const postData = await User.findAll({});
    res.json(postData);
  } catch (err) {
    res.redirect("/login");
  }
});

router.post("/seedall", adminTask, async (req, res) => {
  const sequelize = require("../../config/connection");

  const postData = require("../../seeds/postData.json");
  const commentData = require("../../seeds/commentData.json");
  const userData = require("../../seeds/userData.json");
  const roleData = require("../../seeds/roleData.json");

  const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const Roles = await Role.bulkCreate(roleData);
    const Users = await User.bulkCreate(userData);
    const Blog_Posts = await Blog_Post.bulkCreate(postData);
    const Comments = await Comment.bulkCreate(commentData);
  };

  seedDatabase();
  res.send("Seeded")

});

module.exports = router;
