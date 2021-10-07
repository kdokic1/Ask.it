const Sequelize = require('sequelize');
const db = require('../config/database');

const Answer = db.define('Answer', {
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Answer;