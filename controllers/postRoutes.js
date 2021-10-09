const router = require('express').Router();
const Comment = require('../models/Comment');

router.get('/', (req, res) => {
    res.redirect('/')
});

module.exports = router;