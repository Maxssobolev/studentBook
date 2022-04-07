const { buildQueryString, callApi } = require('./helpers'); // импортируем наших помощников.
const scopes = ['email']; // рамки того, что мы будем запрашивать

// создаем url, который перенаправит нас на вк авторизацию

exports.vKAuthFirstStep = (res) => {

    const url = `https://oauth.vk.com/authorize${buildQueryString([

        { client_id: process.env.VK_APP_ID },

        { redirect_uri: 'http://localhost:3000/login/vk/complete' },

        { response_type: 'code' },

        { scope: scopes.join('+') },

        { state: '{}' },

    ])}`;

    res.redirect(url);

};