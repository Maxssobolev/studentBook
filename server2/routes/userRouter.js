const Router = require('express');
const passport = require('passport');
const router = new Router()
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/get', authMiddleware(), userController.getUser);

router.get('/auth/vk', passport.authenticate('vkontakte'), () => { });

router.get('/auth/vk/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/login',
    session: false
}), userController.checkUser);



module.exports = router