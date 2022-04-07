const { vKAuthFirstStep } = require('./vk-auth'); // импортируем наш метод


class UserController {
    async auth(req, res) {
        vKAuthFirstStep(req, res)
    }

    async check(req, res) {

    }
}

module.exports = new UserController()