const Router = require('express');

const router = new Router()
const userController = require('../controllers/userController')
const { vKAuthFirstStep, vkLoginComplete } = require('./vk-auth');


router.get('/login/vk', (req, res) => vKAuthFirstStep(res));
router.get('/login/vk/complete', vkLoginComplete);



module.exports = router