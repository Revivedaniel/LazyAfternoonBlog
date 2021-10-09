const sequelize = require('../config/connection');
const Blog_Post = require('../models/Blog_Post')

const postData = require('./postData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Blog_Posts = await Blog_Post.bulkCreate(postData);

  process.exit(0);
};

seedDatabase();
