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
const { Posts, Subjects, Likes, Users } = require('../models/models');
const { Op } = require('sequelize');
const moment = require('moment');
class HomeworkController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const { title, content, deadline, subjectId } = req.body;
                const hw = yield Posts.create({ title, content, deadline, postType: "homework", subjectId });
                return res.json(hw);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { withOverdueDeadline } = req.query;
            let homeworks;
            if (withOverdueDeadline) {
                homeworks = yield Posts.findAll({
                    where: {
                        postType: 'homework'
                    },
                    include: [{
                            model: Subjects,
                            as: 'subject',
                            attributes: ['id', 'title', 'fullName']
                        }],
                });
            }
            else if (!withOverdueDeadline) {
                homeworks = yield Posts.findAll({
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
                });
            }
            return homeworks ? res.json(homeworks) : res.json([]);
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не задан параметр ID'));
            }
            const homework = yield Posts.findOne({
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
            });
            return homework ? res.json(homework) : res.json([]);
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
                postType: 'homework'
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
module.exports = new HomeworkController();
//# sourceMappingURL=homeworkController.js.map