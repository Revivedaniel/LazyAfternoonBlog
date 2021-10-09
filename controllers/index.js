const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/posts', postRoutes);
router.use('/api', apiRoutes);

module.exports = router;
