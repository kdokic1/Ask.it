const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const jwtToken = req.header("token");

    //check if json web token exists and is verified
    if(jwtToken) {
        jwt.verify(jwtToken, process.env.jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.send("token is not valid");
            } else {
                res.locals.id = decodedToken.id;
                next();
            }
        });
    } else {
        res.send("user is not logged in");
    }
};

module.exports = { requireAuth };