const ApiError = require("../error/ApiError")
const { Posts, Subjects } = require('../models/models')
const { Op } = require('sequelize')
const moment = require('moment')

class HomeworkController {
    async create(req, res, next) {
        try {
            const { title, content, deadline, subjectId } = req.body
            const hw = await Posts.create({ title, content, deadline, postType: "homework", subjectId })
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
                },
                include: [{
                    model: Subjects,
                    as: 'subject',
                    attributes: ['id', 'title', 'fullName']
                }],
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
                include: [{
                    model: Subjects,
                    as: 'subject',
                    attributes: ['id', 'title', 'fullName']
                }],
            })
        }
        return homeworks ? res.json(homeworks) : res.json([])
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

        return homeworks ? res.json(homeworks) : res.json([])
    }
}

module.exports = new HomeworkController()