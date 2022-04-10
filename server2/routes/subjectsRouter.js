const Router = require('express');
const router = new Router()
const subjectsController = require('../controllers/subjectsController');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post(
    '/create',
    body('title').exists({ checkFalsy: true }),
    authMiddleware(['headman', 'admin']), //check user role
    validateRequestMiddleware,
    subjectsController.create
)
router.get('/', subjectsController.getAll)
router.get('/:id', subjectsController.getOne)

module.exports = router