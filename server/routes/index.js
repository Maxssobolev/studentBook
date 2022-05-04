const Router = require('express');
const router = new Router()

const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const subjectsRouter = require('./subjectsRouter')
const uploadsRouter = require('./uploadsRouter')

router.use('/user', userRouter)
router.use('/posts', postRouter)
router.use('/subjects', subjectsRouter)
router.use('/uploads', uploadsRouter)


module.exports = router