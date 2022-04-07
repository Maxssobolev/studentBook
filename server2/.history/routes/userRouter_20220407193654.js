const Router = require('express');

const router = new Router()
const userController = require('../controllers/userController')
const { vkAuthFirstStep, vkLoginComplete } = require('./vk-auth');


router.get('/login/vk', (req, res) => vkAuthFirstStep(res));
router.get('/login/vk/complete', vkLoginComplete);



module.exports = router