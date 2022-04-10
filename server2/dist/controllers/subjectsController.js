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
const { Subjects } = require('../models/models');
class SubjectsController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, fullName } = req.body;
                const subjectCreateResponse = yield Subjects.create({
                    title, fullName
                });
                return res.json(subjectCreateResponse);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjects = yield Subjects.findAll();
            return res.json(subjects);
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            if (!id) {
                return next(ApiError.badRequest('Не задан параметр ID'));
            }
        });
    }
}
module.exports = new SubjectsController();
//# sourceMappingURL=subjectsController.js.map