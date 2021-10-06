const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const User = require('../models/User');

//signup

router.post("/signup", async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        //does user already exist
        const user = await User.findOne({where: {email: email}});
        if (user) {
            return res.status(401).send("User already exists");
        }
    
        //bcrypting password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
    
        //creating new user
        const newUser = await User.create({first_name: firstName, last_name: lastName, email: email, password: bcryptPassword});
    
        //generating jwt
        const token = jwtGenerator(newUser.id);

        res.json({token});
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

//login
router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;

        //checking if user exists
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            return res.status(401).json("Email is incorrect"); //vidjeti da li ovo ispisati ovdje
        }
        //password validation
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(401).json("Password is incorrect");
        }
        //generating token
        const token = jwtGenerator(user.id);
        res.json({token});

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;