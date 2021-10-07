const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const User = require('../models/User');
const validator = require('../middleware/validator');
const cookieParser = require('cookie-parser');


router.use(cookieParser());
//signup

router.post("/signup", validator, async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        let error = { email: '', password: ''};
        //does user already exist
        const user = await User.findOne({where: {email: email}});
        if (user) {
            error['email'] = 'User already exists.';
            return res.status(401).send({errors: error});
        }
    
        //bcrypting password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
    
        //creating new user
        const newUser = await User.create({first_name: firstName, last_name: lastName, email: email, password: bcryptPassword});
    
        //generating jwt
        const token = jwtGenerator(newUser.id);

        res.cookie('jwt', token, { httpOnly:true});
        res.status(201).json({ user: newUser.id, token: token});
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

//login
router.post("/login", validator, async(req, res) => {
    try {
        const {email, password} = req.body;
        let error = { email: '', password: ''};
        //checking if user exists
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            error['email'] = "Sorry, we can't find an account with this email address. Please try again or create a new account.";
            return res.status(401).json({errors: error});

        }
        //password validation
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            error['password'] = 'Password is incorrect.';
            return res.status(401).json({errors: error});
        }


        //generating token
        const token = jwtGenerator(user.id);
        
        res.cookie('jwt', token, { httpOnly:true});
        res.status(201).json({ user: user.id});

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/logout", async(req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    //res.redirect('/')
    res.send("---LOGOUT---")
});

module.exports = router;