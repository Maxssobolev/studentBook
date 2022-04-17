const Router = require('express');
const router = new Router()

const userRouter = require('./userRouter')
const homeworkRouter = require('./homeworkRouter')
const newsRouter = require('./newsRouter')
const subjectsRouter = require('./subjectsRouter')
const uploadsRouter = require('./uploadsRouter')

router.use('/user', userRouter)
router.use('/homeworks', homeworkRouter)
router.use('/news', newsRouter)
router.use('/subjects', subjectsRouter)
router.use('/uploads', uploadsRouter)


module.exports = router