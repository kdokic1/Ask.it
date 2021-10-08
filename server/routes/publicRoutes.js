const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const User = require('../models/User');
const Question = require('../models/Question');
const validator = require('../middleware/validator');
const Answer = require('../models/Answer');
const sortJsonArray = require('sort-json-array');
const Like = require('../models/Like');

//signup

router.get("/questions", async (req, res) => {
    try {

        const questions = await Question.findAll({
            order: [
                ['date', 'DESC']
            ]
        });
        res.json(questions);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/topThreePeople", async (req, res) => {
    try {

        const people = await User.findAll();
        var topThreePeople = [];

        for(var i = 0; i < people.length; i++) {
            const numberOfAnswers = await Answer.count({
                where: {
                    user_id: people[i].id
                }
            });

            var data = {
                firstName: people[i].first_name,
                lastName: people[i].last_name,
                email: people[i].email,
                numberOfAnswers: numberOfAnswers
            }
    
            topThreePeople.push(data);
        }
        sortJsonArray(topThreePeople, 'numberOfAnswers', 'des')
        var result = topThreePeople.slice(0, 3);
        
        res.json(result);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/topThreeQuestions", async (req, res) => {
    try {

        const questions = await Question.findAll();
        var topThreeQuestions = [];

        for(var i = 0; i < questions.length; i++) {
            const numberOfLikes = await Like.count({
                where: {
                    question_id: questions[i].id,
                    is_like: true
                }
            });

            var data = {
                id: questions[i].id,
                userId: questions[i].user_id,
                title: questions[i].title,
                description: questions[i].description,
                date: questions[i].date,
                numberOfLikes: numberOfLikes
            }
    
            topThreeQuestions.push(data);
        }
        sortJsonArray(topThreeQuestions, 'numberOfLikes', 'des')
        var result = topThreeQuestions.slice(0, 3);
        
        res.json(result);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/questionAnswers/:questionId", async (req, res) => {
    try {
        const answers = await Answer.findAll({
            where: {
                question_id: req.params.questionId
            },
            order: [
                ['date', 'DESC']
            ]
        });
        
        res.json(answers);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/countLikes/:questionId", async (req, res) => {
    try {
        const numberOfLikes = await Like.count({
            where: {
                question_id: req.params.questionId,
                is_like: true
            }
        });
        
        res.json(numberOfLikes);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/countDislikes/:questionId", async (req, res) => {
    try {
        const numberOfDislikes = await Like.count({
            where: {
                question_id: req.params.questionId,
                is_like: false
            }
        });
        
        res.json(numberOfDislikes);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});


module.exports = router;