const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(id) {
    return jwt.sign({ id }, process.env.jwtSecret, {expiresIn: 60 * 60});
}

module.exports = jwtGenerator;