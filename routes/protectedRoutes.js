const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const validator = require('../middleware/validator');
const User = require('../models/User')

//signup

const getUserEmail = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });

    return user.email
}

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

router.get("/questionAnswers/:questionId", async (req, res) => {
    try {
        var currentUserId = res.locals.id;
        const answers = await Answer.findAll({
            where: {
                question_id: req.params.questionId
            },
            order: [
                ['date', 'DESC']
            ]
        });

        var result = [];

        for(var i = 0; i < answers.length; i++) {

            var currentUsersAnswer = false;
            if(answers[i].UserId === currentUserId) {
                currentUsersAnswer = true;
            }

            const email = await getUserEmail(answers[i].UserId);
            var data = {
                "id": answers[i].id,
                "description": answers[i].description,
                "date": answers[i].date,
                "UserId": answers[i].UserId,
                "QuestionId": answers[i].QuestionId,
                "userEmail": email,
                "currentUsersAnswer": currentUsersAnswer
            }

            result.push(data);
        }
        
        res.json(result);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});


module.exports = router;