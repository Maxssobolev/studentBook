const Users = require("../models/models")

class UserController {


    async checkUser(req, res) {
        const { user } = req
        let sentData = {
            name: user.displayName,
            vkId: user._json.id,
            avatarImage: user.photos[0].value
        }
        console.log(sentData)
    }
}

module.exports = new UserController()