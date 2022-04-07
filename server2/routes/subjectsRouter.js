const Router = require('express');
const router = new Router()
const subjectsController = require('../controllers/subjectsController');


router.post('/create', subjectsController.create)
router.get('/', subjectsController.getAll)
router.get('/:id', subjectsController.getOne)

module.exports = router