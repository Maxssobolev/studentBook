"use strict";
const Router = require('express');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware');
const router = new Router();
const newsController = require('../controllers/newsController');
router.post('/create', body('title').exists({ checkFalsy: true }), body('content').exists({ checkFalsy: true }), body('deadline').exists({ checkFalsy: true }), validateRequestMiddleware, newsController.create);
router.post('/like', body('postId').exists({ checkFalsy: true }), body('userId').exists({ checkFalsy: true }), //userId = vkId
validateRequestMiddleware, newsController.likeHandler);
router.get('/', newsController.getAll);
router.get('/:id', newsController.getOne);
module.exports = router;
//# sourceMappingURL=newsRouter.js.map