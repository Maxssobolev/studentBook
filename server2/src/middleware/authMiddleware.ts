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
            return res.status(401).json({ redirect: `${process.env.FRONTEND_URL}/lk` })
        }
        const decoded: IDecodedUser = jwt.verify(token, process.env.SECRET_KEY)

        if (role) {
            if (!role.includes(decoded.role)) {
                return next(ApiError.forbidden(`Ваша роль - ${decoded.role}. Ваших прав не достаточно`))
            }
        }

        req.user = decoded

        next()
    } catch (e) {
        //сюда мы попадаем, если есть проблемы с токеном
        //предполагаемая причина - истек срок дейсвтия | нет токена => отправляем пользователя на повторную авторизацию, удаляя куки

        //на фронте будем проверять каждый раз это поле в мидлевэаре
        return res.status(401).json({ redirect: `${process.env.FRONTEND_URL}/lk` })
    }
};