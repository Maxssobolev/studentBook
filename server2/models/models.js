const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
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

const Likes = sequelize.define('likes', {
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

const DoneHomeworks = sequelize.define('donehomeworks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})



const Subjects = sequelize.define('subjects', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
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

Users.belongsToMany(Posts, {
    through: "likes",
    as: "postsLiked",
    foreignKey: "userId",
});
Posts.belongsToMany(Users, {
    through: "likes",
    as: "usersLiked",
    foreignKey: "postId",
});

Users.belongsToMany(Posts, {
    through: "donehomeworks",
    as: "postsDoned",
    foreignKey: "userId",
});
Posts.belongsToMany(Users, {
    through: "donehomeworks",
    as: "usersDoned",
    foreignKey: "postId",
});



module.exports = {
    Users,
    Posts,
    Likes,
    User_donehomeworks,
    Subjects,
    Timetable
}