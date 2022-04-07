const ApiError = require("../error/ApiError")
const { Subjects } = require('../models/models')
class SubjectsController {
    async create(req, res) {
        const { title, fullName } = req.body
        const subjectCreateResponse = await Subjects.create({
            title, fullName
        }).catch((err) => err)

        return res.json(subjectCreateResponse)
    }

    async getAll(req, res) {
        const subjects = await Subjects.findAll()
        return res.json(subjects)
    }

    async getOne(req, res, next) {
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
    }
}

module.exports = new SubjectsController()