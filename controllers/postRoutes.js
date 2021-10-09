const router = require('express').Router();
const Comment = require('../models/Comment');
const Blog_Post = require('../models/Blog_Post');

router.get('/', (req, res) => {
    res.redirect('/')
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Blog_Post.findByPk(req.params.id);
        const post = postData.get({plain: true})
        const commentData = await Comment.findAll({where: {
            post_id: req.params.id
        }});
        const comments = commentData.map((c) => c.get({plain: true}))
        post.comments = comments
        res.json(post)
    } catch (err) {
        
    }
})

module.exports = router;