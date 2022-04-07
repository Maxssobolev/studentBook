const { Users } = require("../models/models")

class UserController {


    async checkUser(req, res) {
        const { user } = req
        let sentData = {
            name: user.displayName,
            vkId: user._json.id,
            avatarImage: user.photos[0].value
        }
        const [newUser, created] = await Users.findOrCreate({
            where: { vkId: sentData.vkId },
            defaults: sentData
        });
        if (created) {
            res.json({ message: 'User was created', user: newUser })
        }
        else {
            res.json({ message: 'User already exist', user: newUser })
        }
    }
}

module.exports = new UserController()