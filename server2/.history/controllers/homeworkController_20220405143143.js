const ApiError = require("../error/ApiError")
const { Posts } = require('../models/models')
class HomeworkController {
    async create(req, res, next) {
        try {
            const { title, content, deadline, postType, subjectId } = req.body
            const hw = await Posts.create({ title, content, deadline, postType, subjectId })
            return res.json(hw)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const homeworks = await Posts.findAll({
            where: {
                postType: 'homework'
            }
        })
        return res.json(homeworks)
    }

    async getOne(req, res, next) {
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
    }
}

module.exports = new HomeworkController()