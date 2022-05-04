const Router = require('express');
const router = new Router()
const uploadsController = require('../controllers/uploadsController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/image', uploadsController.uploadImage);
router.post('/file', uploadsController.uploadFile);




module.exports = router