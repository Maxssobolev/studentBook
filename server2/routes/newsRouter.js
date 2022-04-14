const Router = require('express');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()
const newsController = require('../controllers/newsController');


router.post(
    '/create',
    body('title').exists({ checkFalsy: true }),
    body('content').exists({ checkFalsy: true }),
    body('deadline').exists({ checkFalsy: true }),
    authMiddleware(['headman', 'admin']), //check user role
    validateRequestMiddleware,
    newsController.create
)
router.post(
    '/like',
    body('postId').exists({ checkFalsy: true }),
    authMiddleware(), //for all users
    validateRequestMiddleware,
    newsController.likeHandler
)
router.get('/', authMiddleware(), newsController.getAll)
router.get('/:id', authMiddleware(), newsController.getOne)

module.exports = router