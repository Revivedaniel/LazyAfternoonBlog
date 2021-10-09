const router = require('express').Router();
const {User, Comment, Blog_Post} = require('../models')


router.get('/', (req, res) => {
    res.redirect('/')
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Blog_Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });
        const post = postData.get({plain: true})
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });
        const comments = commentData.map((c) => c.get({plain: true}))
        post.comments = comments
        res.json(post)
    } catch (err) {
        
    }
})

module.exports = router;