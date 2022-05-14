require('dotenv').config()
const express = require('express')
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const { Subjects } = require('./models/models')
const cors = require('cors');
const router = require('./routes/index')
const app = express()
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path');


passport.use(new VKontakteStrategy({
    clientID: process.env.VK_APP_ID,
    clientSecret: process.env.VK_APP_SECRET,
    callbackURL: process.env.VK_CALLBACK_REDIRECT_URL,

},
    function (accessToken, refreshToken, params, profile, done) {
        return done(null, profile);
    }
));

app.use(cors({
    "origin": [process.env.FRONTEND_URL],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,

}))

app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname + '/static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

const createDefaultRows = async () => {
    let defaultSubject = {
        title: 'default',
    }
    await Subjects.findOrCreate({ where: defaultSubject, defaults: defaultSubject })
}

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await createDefaultRows()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()