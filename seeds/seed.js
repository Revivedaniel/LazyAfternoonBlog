const sequelize = require('../config/connection');
const Blog_Post = require('../models/Blog_Post')
const Comment = require('../models/Comment');

const postData = require('./postData.json')
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Blog_Posts = await Blog_Post.bulkCreate(postData);
  const Comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
