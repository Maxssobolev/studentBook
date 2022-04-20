const ApiError = require("../error/ApiError")
const { Posts, Subjects, Likes, Users, DoneHomeworks } = require('../models/models')
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

    async getAll(req, res, next) {
        const { withOverdueDeadline } = req.query
        let homeworks;
        try {
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
                            where: {
                                id: req.user.id,
                            },
                            required: false,
                        },
                        {
                            model: Users,
                            as: 'usersDoned',
                            where: {
                                id: req.user.id,
                            },
                            required: false,
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
                            where: {
                                id: req.user.id,
                            },
                            required: false,
                        },
                        {
                            model: Users,
                            as: 'usersDoned',
                            where: {
                                id: req.user.id,
                            },
                            required: false,
                        }
                    ],


                })
            }
            return homeworks ? res.json(homeworks) : res.json([])
        }
        catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
        const currentPost = await Posts.findOne({
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
                {
                    model: Users,
                    as: 'usersLiked',
                    where: {
                        id: req.user.id,
                    },
                    required: false,
                },
                {
                    model: Users,
                    as: 'usersDoned',
                    where: {
                        id: req.user.id,
                    },
                    required: false,
                }
            ],

        })
        if (!currentPost) {
            return res.json({ prevPost: null, currentPost: null, nextPost: null })
        }
        const nextPost = await Posts.findOne({
            where: {
                createdAt: {
                    [Op.gt]: currentPost.createdAt,
                },
                postType: 'homework',
            },
            attributes: ['id']
        })
        const prevPost = await Posts.findAll({
            where: {
                createdAt: {
                    [Op.lt]: currentPost.createdAt,
                },
                postType: 'homework'
            },
            limit: 1,
            order: [['createdAt', 'DESC']],
            attributes: ['id']
        })

        return res.json({ prevPost: prevPost[0] || null, currentPost, nextPost })
    }

    async likeHandler(req, res, next) {
        /*
            если лайка нет - добавляет
            если есть - удаляет
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

    async doneHandler(req, res, next) {
        /*
            если отметки нет - добавляет
            если есть - удаляет
            только в домашке
        */
        const { user: { id: userId } } = req
        const { postId } = req.body
        const sentData = {
            postId: postId,
            userId: userId,
        }

        try {

            const [done, created] = await DoneHomeworks.findOrCreate({ where: sentData, defaults: sentData })
            if (created) {
                return res.json({ message: 'Marked as done', done })
            }
            else {
                try {
                    await done.destroy()
                    return res.json({ message: 'Marked was deleted' })
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