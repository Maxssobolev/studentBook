const ApiError = require("../error/ApiError")
const { Posts } = require('../models/models')
class HomeworkController {
    async create(req, res) {
        const { title, content, deadline, postType, subjectId } = req.body
        const hw = await Posts.create({ title, content, deadline, postType, subjectId }).catch((err) => err)
        return res.json(hw)
    }

    async getAll(req, res) {

    }

    async getOne(req, res, next) {
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
    }
}

module.exports = new HomeworkController()