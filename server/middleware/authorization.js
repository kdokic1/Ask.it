const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if json web token exists and is verified
    if(token) {
        jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.send("neki error, nema tokena, opet idemo na login page");
            } else {
                console.log("dobila si decoded token :  ----- " + decodedToken);
                next();
            }
        });
    } else {
        res.send("nismo ulogovani, nema tokena");
    }
};

module.exports = { requireAuth };