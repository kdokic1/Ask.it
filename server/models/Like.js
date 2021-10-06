const Sequelize = require('sequelize');
const db = require('../config/database');

const Like = db.define('Like', {
    is_like: {
        type: Sequelize.BOOLEAN
    },
    
});

module.exports = Like;