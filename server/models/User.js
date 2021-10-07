const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    first_name: {
        type: Sequelize.TEXT,
    },
    last_name: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isEmail: true,
            notNull: true,
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            min: 5
        }
    }
});

module.exports = User;