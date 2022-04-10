import { NextFunction, Response } from "express";
import { IDecodedUser, IAuthRequest } from "../types/user.type";

const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = (role: string[] | 'all') => (req :IAuthRequest, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer {token}
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded: IDecodedUser = jwt.verify(token, process.env.SECRET_KEY)

        if (role != 'all') {
            if (!role.includes(decoded.role)) {
                return next(ApiError.forbidden(`Ваша роль - ${decoded.role}. Ваших прав не достаточно`))
            }
        }

        req.user = decoded

        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }
};