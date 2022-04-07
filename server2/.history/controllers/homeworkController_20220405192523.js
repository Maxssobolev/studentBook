const ApiError = require("../error/ApiError")
const { Posts, Subjects } = require('../models/models')
const { Op } = require('sequelize')
const moment = require('moment')

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
        const { withOverdueDeadline } = req.query
        let homeworks;
        if (withOverdueDeadline) {
            homeworks = await Posts.findAll({
                where: {
                    postType: 'homework'
                }
            })
        }
        else if (!withOverdueDeadline) {
            homeworks = await Posts.findAll({
                where: {
                    postType: 'homework',
                    deadline: {
                        [Op.gte]: moment()
                    }
                },
                include: ['new']
            })
        }
        return res.json(homeworks)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
        const homework = await Posts.findOne({
            where: {
                id
            },
            include: [{
                model: Subjects,
                as: 'subject',
                attributes: ['id', 'title', 'fullName']
            }],

        })

        return res.json(homework)
    }
}

module.exports = new HomeworkController()