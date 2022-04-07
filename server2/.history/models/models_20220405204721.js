const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    vkId: { type: DataTypes.STRING, unique: true },
    role: {
        type: DataTypes.STRING,
        values: [
            'student',
            'headman',
            'admin'
        ],
        defaultValue: 'student'
    },
    avatarImage: {
        type: DataTypes.TEXT,
    }
})

const User_likes = sequelize.define('user_likes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    postType: {
        type: DataTypes.STRING,
        values: [
            'homework',
            'news',
        ],
    }

})

const User_donehomeworks = sequelize.define('user_donehomeworks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})



const Subjects = sequelize.define('subjects', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING }
})


const Posts = sequelize.define('posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false },
    postType: {
        type: DataTypes.STRING,
        values: [
            'homework',
            'news',
        ],
        defaultValue: 'news', allowNull: false
    }
})

const Timetable = sequelize.define('timetable', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    weekday: {
        type: DataTypes.STRING,
        values: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ],
    },
    weekparity: {
        type: DataTypes.STRING,
        values: [
            '0',
            '1',
            'both'
        ],
        defaultValue: 'both'
    },
    start: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    link: {
        type: DataTypes.STRING
    },
    classroom: {
        type: DataTypes.STRING
    }
})



Subjects.hasMany(Posts)
Posts.belongsTo(Subjects)


User_likes.belongsTo(Posts)
User_likes.belongsTo(Users)


User_donehomeworks.belongsTo(Posts)
User_donehomeworks.belongsTo(Users)


sequelize.sync({ force: true });

module.exports = {
    Users,
    Posts,
    User_likes,
    User_donehomeworks,
    Subjects,
    Timetable
}