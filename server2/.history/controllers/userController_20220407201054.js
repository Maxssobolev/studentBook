

class UserController {


    async checkUser(req, res) {
        const { user } = req
        console.log(user)
    }
}

module.exports = new UserController()