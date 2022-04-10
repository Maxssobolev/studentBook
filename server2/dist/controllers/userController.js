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
const { Users } = require("../models/models");
const jwt = require('jsonwebtoken');
const ApiError = require("../error/ApiError");
const generateJwt = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '48h' });
};
class UserController {
    checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            let sentData = {
                name: user.displayName,
                id: user._json.id,
                avatarImage: user.photos[0].value
            };
            try {
                const [userFromDB, created] = yield Users.findOrCreate({
                    where: { id: sentData.id },
                    defaults: sentData
                });
                const token = generateJwt(userFromDB.id, userFromDB.role);
                if (created) {
                    return res.json({ message: 'User was created', user: userFromDB, token });
                }
                else {
                    return res.json({ message: 'User already exist', user: userFromDB, token });
                }
            }
            catch (createError) {
                next(ApiError.internal(createError));
            }
        });
    }
}
module.exports = new UserController();
//# sourceMappingURL=userController.js.map