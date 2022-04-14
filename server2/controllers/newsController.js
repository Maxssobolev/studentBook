const ApiError = require("../error/ApiError")
const { Posts, Likes, Users } = require('../models/models')
const { Op } = require('sequelize')
const sequelize = require('../db');
const moment = require('moment')

class NewsController {
    async create(req, res, next) {
        try {
            const { title, content, deadline } = req.body
            const news = await Posts.create({ title, content, deadline, postType: "news" })
            return res.json(news)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const { withOverdueDeadline } = req.query
        let news;
        if (withOverdueDeadline) {
            news = await Posts.findAll({
                where: {
                    postType: 'news'
                },
                include: [
                    {
                        model: Users,
                        as: 'usersLiked',
                        where: {
                            id: req.user.id,
                        },
                        required: false,
                    }
                ]
            })
        }
        else if (!withOverdueDeadline) {
            news = await Posts.findAll({
                where: {
                    postType: 'news',
                    deadline: {
                        [Op.gte]: moment()
                    },
                },
                include: [
                    {
                        model: Users,
                        as: 'usersLiked',
                        where: {
                            id: req.user.id,
                        },
                        required: false,
                    }
                ]
            })
        }
        return news ? res.json(news) : res.json([])
    }

    async getOne(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
        try {
            const currentPost = await Posts.findOne({
                where: {
                    id,
                    postType: 'news'
                },
                include: [
                    {
                        model: Users,
                        as: 'usersLiked',
                        where: {
                            id: req.user.id,
                        },
                        required: false,
                    }
                ]
            })

            const nextPost = await Posts.findOne({
                where: {
                    createdAt: {
                        [Op.gt]: currentPost.createdAt,
                    },
                    postType: 'news',
                },
                attributes: ['id']
            })
            const prevPost = await Posts.findAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentPost.createdAt,
                    },
                    postType: 'news'
                },
                limit: 1,
                order: [['createdAt', 'DESC']],
                attributes: ['id']
            })

            return res.json({ prevPost: prevPost[0] || null, currentPost, nextPost })
        }
        catch (e) {
            return next(ApiError.badRequest('Такой записи нет'))
        }


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
            postType: 'news'
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

module.exports = new NewsController()