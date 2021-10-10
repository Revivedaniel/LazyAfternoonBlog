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
            const date = new Date(post.time_created)
            post.time_created = date.toLocaleDateString("en-US", {hour: 'numeric', minute: 'numeric'});
            
        const comments = commentData.map((c) => c.get({plain: true}));
        for (let i = 0; i < comments.length; i++) {
            const element = comments[i];
            const date = new Date(element.time_created)
            element.time_created = date.toLocaleDateString("en-US", {hour: 'numeric', minute: 'numeric'});
            
          }
        post.comments = comments
        res.render('postpage', post)
    } catch (err) {
        
    }
})

module.exports = router;