const Router = require('express');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()
const postController = require('../controllers/postController');


router.post(
    '/create',
    body('title').exists({ checkFalsy: true }),
    body('content').exists(),
    body('deadline').exists({ checkFalsy: true }),
    body('postType').exists({ checkFalsy: true }),
    body('subjectId').exists(),
    authMiddleware(['headman', 'admin']), //check user role
    validateRequestMiddleware,
    postController.create
)
router.post(
    '/like',
    body('postId').exists({ checkFalsy: true }),
    body('postType').exists({ checkFalsy: true }),
    authMiddleware(),
    validateRequestMiddleware,
    postController.likeHandler
)

router.post(
    '/done',
    body('postId').exists({ checkFalsy: true }),
    authMiddleware(),
    validateRequestMiddleware,
    postController.doneHandler
)


router.get('/all', postController.getAll)
router.get('/connect', postController.connect)
router.get('/:id', postController.getOne)



module.exports = router