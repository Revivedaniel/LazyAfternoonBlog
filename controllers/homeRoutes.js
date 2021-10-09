const Blog_Post = require('../models/Blog_Post');

const router = require('express').Router();
require('dotenv').config();
//this is the root route for the website
router.get('/', async (req, res) => {
  try {
    const postData = await Blog_Post.findAll({
      limit: 50,
      order: [
        ['id', 'DESC']
      ]
    })
    const posts = postData.map((p) => p.get({plain: true}));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//These routes help other routes redirect to /login with the auth middleware
router.get('/login', (req, res) => {
  res.render('login');
});
router.put('/login', (req, res) => {
  res.render('login');
});
router.delete('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
