const router = require("express").Router();
const { User, Comment, Blog_Post } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Blog_Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        const posts = postData.map((p) => p.get({ plain: true }))
        res.json(posts)
    } catch (err) {
        if (!req.session.user_id) {
            console.log(req.session.user_id)
        } else (
            res.json(err)
        )
    }
    
    
});

module.exports = router;