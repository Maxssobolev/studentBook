"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ApiError = require("../error/ApiError");
const { Posts, Likes } = require('../models/models');
const { Op } = require('sequelize');
const moment = require('moment');
class NewsController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, deadline } = req.body;
                const news = yield Posts.create({ title, content, deadline, postType: "news" });
                return res.json(news);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { withOverdueDeadline } = req.query;
            let news;
            if (withOverdueDeadline) {
                news = yield Posts.findAll({
                    where: {
                        postType: 'news'
                    }
                });
            }
            else if (!withOverdueDeadline) {
                news = yield Posts.findAll({
                    where: {
                        postType: 'news',
                        deadline: {
                            [Op.gte]: moment()
                        }
                    }
                });
            }
            return news ? res.json(news) : res.json([]);
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не задан параметр ID'));
            }
            const news = yield Posts.findOne({
                where: {
                    id,
                    postType: 'news'
                }
            });
            return news ? res.json(news) : res.json([]);
        });
    }
    likeHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                если лайка нет - добавляет
                если есть - удаляет
                только в домашке
            */
            const { postId, userId } = req.body;
            const sentData = {
                postId: postId,
                userId: userId,
                postType: 'news'
            };
            try {
                const [like, created] = yield Likes.findOrCreate({ where: sentData, defaults: sentData });
                if (created) {
                    return res.json({ message: 'Like was added', like });
                }
                else {
                    try {
                        yield like.destroy();
                        return res.json({ message: 'Like was deleted' });
                    }
                    catch (deleteError) {
                        next(ApiError.internal(deleteError));
                    }
                }
            }
            catch (createError) {
                next(ApiError.internal(createError));
            }
        });
    }
}
module.exports = new NewsController();
//# sourceMappingURL=newsController.js.map