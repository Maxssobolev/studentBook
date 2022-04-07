const Router = require('express');
const passport = require('passport');
const router = new Router()
const userController = require('../controllers/userController')


router.get('/auth/vkontakte', passport.authenticate('vkontakte'),
    function (req, res) {
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/login',
    session: false
}),
    function (req, res) {
        res.send(req.user);
    });



module.exports = router