const { Users } = require("../models/models")

class UserController {


    async checkUser(req, res) {
        const { user } = req
        let sentData = {
            name: user.displayName,
            id: user._json.id,
            avatarImage: user.photos[0].value
        }
        const [newUser, created] = await Users.findOrCreate({
            where: { id: sentData.id },
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