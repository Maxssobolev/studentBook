const { Users } = require("../models/models")
const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError")

const generateJwt = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.SECRET_KEY,
        { expiresIn: '48h' }
    )
}

class UserController {
    async getUser(req, res, next) {
        const { user: { id } } = req
        try {
            const user = await Users.findOne({ where: { id } })
            return res.json(user)
        }
        catch (e) {
            console.log(e)
            next(ApiError.badRequest(e))
        }
    }

    async checkUser(req, res, next) {
        const { user } = req
        let sentData = {
            name: user.displayName,
            id: user._json.id,
            avatarImage: user.photos[0].value
        }
        try {
            const [userFromDB, created] = await Users.findOrCreate({
                where: { id: sentData.id },
                defaults: sentData
            });
            const token = generateJwt(userFromDB.id, userFromDB.role)

            if (created) {
                res.cookie('token', token)
                res.cookie('user', userFromDB)
                return res.redirect(`${process.env.FRONTEND_URL}/lk?token=${token}}&logged=true`,)
            }
            else {
                res.cookie('token', token)
                res.cookie('user', userFromDB)
                return res.redirect(`${process.env.FRONTEND_URL}/lk?token=${token}&logged=true`)
            }
        }
        catch (createError) {
            next(ApiError.internal(createError))
        }
    }


}

module.exports = new UserController()