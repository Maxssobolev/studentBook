const Router = require('express');

const router = new Router()
const userController = require('../controllers/userController')

router.get('/registration', userController.registration)
router.get('/login', userController.login)
router.get('/auth', userController.check)

module.exports = router