"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const sequelize = require('./db');
const PORT = process.env.PORT || 5000;
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const app = express();
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
passport.use(new VKontakteStrategy({
    clientID: process.env.VK_APP_ID,
    clientSecret: process.env.VK_APP_SECRET,
    callbackURL: process.env.VK_CALLBACK_REDIRECT_URL
}, function (accessToken, refreshToken, params, profile, done) {
    return done(null, profile);
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
//# sourceMappingURL=index.js.map