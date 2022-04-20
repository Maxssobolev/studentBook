const Router = require('express');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()
const homeworkController = require('../controllers/homeworkController');


router.post(
    '/create',
    body('title').exists({ checkFalsy: true }),
    body('content').exists({ checkFalsy: true }),
    body('deadline').exists({ checkFalsy: true }),
    body('subjectId').exists({ checkFalsy: true }),
    authMiddleware(['headman', 'admin']), //check user role
    validateRequestMiddleware,
    homeworkController.create
)
router.post(
    '/like',
    body('postId').exists({ checkFalsy: true }),
    authMiddleware(),
    validateRequestMiddleware,
    homeworkController.likeHandler
)

router.post(
    '/done',
    body('postId').exists({ checkFalsy: true }),
    authMiddleware(),
    validateRequestMiddleware,
    homeworkController.doneHandler
)


router.get('/', authMiddleware(), homeworkController.getAll)
router.get('/:id', authMiddleware(), homeworkController.getOne)

module.exports = router