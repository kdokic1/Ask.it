const Sequelize = require('sequelize');
const db = require('../config/database');

const Notification = db.define('Notification', {
    seen_by_user: {
        type: Sequelize.BOOLEAN
    },
    event: {
        type: Sequelize.TEXT
    }
    
}, {underscored: true});

module.exports = Notification;