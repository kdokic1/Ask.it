const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const User = require('../models/User');
const Question = require('../models/Question');
const validator = require('../middleware/validator');

//signup

router.get("/questions", async (req, res) => {
});


module.exports = router;