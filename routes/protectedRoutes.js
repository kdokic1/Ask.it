const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const validator = require('../middleware/validator');

//signup

router.get("/questions", async (req, res) => {
});

router.post("/addAnswer", async (req, res) => {
    try {
        var userId = res.locals.id;
        const {questionId, description, date} = req.body;

        const newAnswer = await Answer.create({description: description, date: date, UserId: userId, QuestionId: questionId});
    
        res.status(201).json(newAnswer);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});


module.exports = router;