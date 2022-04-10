const ApiError = require("../error/ApiError")
const { Posts, Likes } = require('../models/models')
const { Op } = require('sequelize')
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
                }
            })
        }
        else if (!withOverdueDeadline) {
            news = await Posts.findAll({
                where: {
                    postType: 'news',
                    deadline: {
                        [Op.gte]: moment()
                    }
                }
            })
        }
        return news ? res.json(news) : res.json([])
    }

    async getOne(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не задан параметр ID'))
        }
        const news = await Posts.findOne({
            where: {
                id,
                postType: 'news'
            }

        })
        return news ? res.json(news) : res.json([])
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