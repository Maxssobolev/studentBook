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
                return res.json({ message: 'User was created', user: userFromDB, token })
            }
            else {
                return res.json({ message: 'User already exist', user: userFromDB, token })
            }
        }
        catch (createError) {
            next(ApiError.internal(createError))
        }
    }


}

module.exports = new UserController()