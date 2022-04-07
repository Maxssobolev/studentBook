const Router = require('express');
const router = new Router()
const homeworkController = require('../controllers/homeworkController');


router.post('/create', homeworkController.create)
router.get('/', homeworkController.getAll)
router.get('/:id', homeworkController.getOne)

module.exports = router