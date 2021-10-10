const Sequelize = require('sequelize');
const db = require('../config/database');

const Question = db.define('Question', {
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    description: {
        type: Sequelize.TEXT,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {underscored: true});

module.exports = Question;