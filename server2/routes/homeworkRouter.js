const Router = require('express');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware')

const router = new Router()
const homeworkController = require('../controllers/homeworkController');


router.post(
    '/create',
    body('title').exists({ checkFalsy: true }),
    body('content').exists({ checkFalsy: true }),
    body('deadline').exists({ checkFalsy: true }),
    body('subjectId').exists({ checkFalsy: true }),
    validateRequestMiddleware,
    homeworkController.create
)
router.post(
    '/like',
    body('postId').exists({ checkFalsy: true }),
    body('userId').exists({ checkFalsy: true }), //userId = vkId
    validateRequestMiddleware,
    homeworkController.likeHandler
)
router.get('/', homeworkController.getAll)
router.get('/:id', homeworkController.getOne)

module.exports = router