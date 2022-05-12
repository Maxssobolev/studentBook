const ApiError = require("../error/ApiError")
const { Posts, Subjects, Likes, Users, DoneHomeworks } = require('../models/models')
const { Op } = require('sequelize')
const moment = require('moment')

class PostController {
    includeOptions = (req, postType) => {
        let userId = req?.user?.id || 0
        let options = [{
            model: Users,
            as: 'usersLiked',
            where: {
                id: userId
            },
            required: false,
        }]
        if (postType == 'homework') {
            options.push(...[
                {
                    model: Subjects,
                    as: 'subject',
                    attributes: ['id', 'title', 'fullName']
                },

                {
                    model: Users,
                    as: 'usersDoned',
                    where: {
                        id: userId,
                    },
                    required: false,
                }
            ])
        }

        return options
    }

    async create(req, res, next) {
        try {
            const { title, content, deadline, postType, subjectId = null } = req.body
            const post = await Posts.create({ title, content, deadline, postType, subjectId })
            return res.json(post)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getAll = async (req, res, next) => {
        const { withOverdueDeadline, postType } = req.query
        let post;
        let whereOptions = {
            postType,
            ...(!withOverdueDeadline ? { deadline: { [Op.gte]: moment() } } : {})
        }

        try {
            post = await Posts.findAll({
                where: whereOptions,
                include: this.includeOptions(req, postType),
                order: [['createdAt', 'DESC']],

            })
            return post ? res.json(post) : res.json([])
        }
        catch (e) {
            console.log(e)
            return next(ApiError.internal(e))
        }
    }

    getOne = async (req, res) => {
        const { id } = req.params
        const { postType } = req.query

        const currentPost = await Posts.findOne({
            where: {
                id,
                postType
            },
            include: this.includeOptions(req, postType)

        })
        //если сходу нет такого поста - возвращаем все пустое 
        if (!currentPost) {
            return res.json({ prevPost: null, currentPost: null, nextPost: null })
        }

        const nextPost = await Posts.findOne({
            where: {
                deadline: { [Op.gte]: moment() },
                createdAt: {
                    [Op.gt]: currentPost.createdAt,
                },
                postType,
            },
            attributes: ['id']
        })

        const prevPost = await Posts.findAll({
            where: {
                deadline: { [Op.gte]: moment() },
                createdAt: {
                    [Op.lt]: currentPost.createdAt,
                },
                postType
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
        const { postId, postType } = req.body
        const sentData = {
            postId,
            userId,
            postType
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
            postId,
            userId,
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

module.exports = new PostController()