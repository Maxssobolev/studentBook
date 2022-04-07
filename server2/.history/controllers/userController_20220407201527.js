import { Users } from "../models/models"

class UserController {


    async checkUser(req, res) {
        const { user } = req
        let sentData = {
            name: user.displayName,
            vkId: user.__json.id,
            avatarImage: user.photos[0].value
        }
        console.log(sentData)
    }
}

module.exports = new UserController()