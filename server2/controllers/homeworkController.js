const ApiError = require("../error/ApiError")
const { Posts, Subjects, Likes, Users } = require('../models/models')
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
                include: [
                    {
                        model: Subjects,
                        as: 'subject',
                        attributes: ['id', 'title', 'fullName']
                    },
                    {
                        model: Users,
                        as: 'usersLiked',

                    }
                ],

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
                include: [
                    {
                        model: Subjects,
                        as: 'subject',
                        attributes: ['id', 'title', 'fullName']
                    },
                    {
                        model: Users,
                        as: 'usersLiked',

                        attributes: ['id', 'name', 'avatarImage']
                    }
                ],
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
                id,
                postType: 'homework'
            },
            include: [
                {
                    model: Subjects,
                    as: 'subject',
                    attributes: ['id', 'title', 'fullName']
                },

            ],

        })
        return homework ? res.json(homework) : res.json([])
    }

    async likeHandler(req, res, next) {
        /*
            если лайка нет - добавляет
            если есть - удаляет
            только в домашке
        */
        const { user: { id: userId } } = req
        const { postId } = req.body
        const sentData = {
            postId: postId,
            userId: userId,
            postType: 'homework'
        }

        try {

            const [like, created] = await Likes.findOrCreate({ where: sentData, defaults: sentData })
            if (created) {
                return res.json({ message: 'Like was added', like })
            }
            else {
                try {
                    await like.destroy()
                    return res.json({ message: 'Like was deleted' })
                }
                catch (deleteError) {

                    next(ApiError.internal(deleteError))
                }

            }

        }
        catch (createError) {

            next(ApiError.internal(createError))
        }

    }
}

module.exports = new HomeworkController()