const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    vkId: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: {
        type: DataTypes.STRING,
        values: [
            'student',
            'headman',
            'admin'
        ],
        defaultValue: 'student',
        allowNull: false
    },
    avatarImage: {
        type: DataTypes.TEXT,
        allowNull: false
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
        allowNull: false
    }

})

const User_donehomeworks = sequelize.define('user_donehomeworks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})



const Subjects = sequelize.define('subjects', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false }
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
        allowNull: false
    },
    weekparity: {
        type: DataTypes.STRING,
        values: [
            '0',
            '1',
            'both'
        ],
        defaultValue: 'both',
        allowNull: false
    },
    start: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classroom: {
        type: DataTypes.STRING,
        allowNull: false
    }
})



Subjects.hasMany(Posts)
Posts.belongsTo(Subjects)

// Users can like more than one Post through the `user_likes` join table
Users.hasMany(Posts, { as: 'like', through: 'user_likes' });

// Posts can be liked by more than one User through the `user_likes` join table
Posts.hasMany(Users, { as: 'like', through: 'user_likes' });


Users.hasMany(User_donehomeworks, { as: 'done', through: 'user_donehomeworks' });

User_donehomeworks.hasMany(Users, { as: 'done', through: 'user_donehomeworks' });




module.exports = {
    Users,
    Posts,
    User_likes,
    User_donehomeworks,
    Subjects,
    Timetable
}