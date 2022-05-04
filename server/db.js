const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        timezone: '+03:00', //for writing to database
        dialectOptions: {
            useUTC: false, //for reading from database
            typeCast: function (field, next) { // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            },
        },
    }
)