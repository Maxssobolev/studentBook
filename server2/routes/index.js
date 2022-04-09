const Router = require('express');
const router = new Router()

const userRouter = require('./userRouter')
const homeworkRouter = require('./homeworkRouter')
const newsRouter = require('./newsRouter')
const subjectsRouter = require('./subjectsRouter')

router.use('/user', userRouter)
router.use('/homeworks', homeworkRouter)
router.use('/news', newsRouter)
router.use('/subjects', subjectsRouter)


module.exports = router