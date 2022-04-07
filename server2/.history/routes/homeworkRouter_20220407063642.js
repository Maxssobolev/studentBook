const Router = require('express');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware')
const router = new Router()
const homeworkController = require('../controllers/homeworkController');


router.post(
    '/create',
    body('title').exists({ checkFalsy: true }).withMessage('Title is required'),
    body('content').exists({ checkFalsy: true }),
    body('deadline').exists({ checkFalsy: true }),
    body('subjectId').exists({ checkFalsy: true }),
    validateRequestMiddleware,
    homeworkController.create
)
router.get('/', homeworkController.getAll)
router.get('/:id', homeworkController.getOne)

module.exports = router