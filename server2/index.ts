require('dotenv').config()
const express = require('express')
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const sequelize = require('./src/db')
const PORT = process.env.PORT || 5000
const models = require('./src/models/models')
const cors = require('cors');
const router = require('./src/routes/index')
const app = express()
const fileUpload = require('express-fileupload')
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware')
const path = require('path')

passport.use(new VKontakteStrategy({
    clientID: process.env.VK_APP_ID,
    clientSecret: process.env.VK_APP_SECRET,
    callbackURL: process.env.VK_CALLBACK_REDIRECT_URL
},
    function (accessToken: any, refreshToken: any, params: any, profile: any, done: any) {
        return done(null, profile);
    }
));

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()