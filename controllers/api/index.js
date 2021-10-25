const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const allDataRoutes = require("./allDataRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/posts", blogPostRoutes);
router.use("/alldata", allDataRoutes);

module.exports = router;
