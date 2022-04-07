const Router = require('express');
const router = new Router()

const userRouter = require('./userRouter')
const homeworkRouter = require('./homeworkRouter')

router.use('/user', userRouter)
router.use('/homeworks', homeworkRouter)


module.exports = router