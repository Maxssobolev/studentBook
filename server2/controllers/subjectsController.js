const ApiError = require("../error/ApiError")
const { Subjects } = require('../models/models')
class SubjectsController {
    async create(req, res, next) {
        try {
            const { title, fullName } = req.body
            const subjectCreateResponse = await Subjects.create({
                title, fullName
            })

            return res.json(subjectCreateResponse)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
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

    async update(req, res, next) {
        const { title, fullName, id } = req.body
        try {
            const result = await Subjects.update({
                title,
                fullName
            }, {
                where: {
                    id
                }
            })
            return res.json(result)
        }
        catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            const result = await Subjects.destroy({
                where: {
                    id
                }
            })
            return res.json(result)
        }
        catch (e) {
            return next(ApiError.internal(e))
        }
    }
}

module.exports = new SubjectsController()