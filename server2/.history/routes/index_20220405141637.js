const Router = require('express');
const router = new Router()

const userRouter = require('./userRouter')
const homeworkRouter = require('./homeworkRouter')
const subjectsRouter = require('./subjectsRouter')

router.use('/user', userRouter)
router.use('/homeworks', homeworkRouter)
router.use('/subjects', subjectsRouter)


module.exports = router