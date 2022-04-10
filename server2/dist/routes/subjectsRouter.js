"use strict";
const Router = require('express');
const router = new Router();
const subjectsController = require('../controllers/subjectsController');
const { body } = require('express-validator');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware');
router.post('/create', body('title').exists({ checkFalsy: true }), validateRequestMiddleware, subjectsController.create);
router.get('/', subjectsController.getAll);
router.get('/:id', subjectsController.getOne);
module.exports = router;
//# sourceMappingURL=subjectsRouter.js.map