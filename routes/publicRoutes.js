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

const getNumberOfQuestionAnswers  = async (id) => {
    const numberOfAnswers = await Answer.count({
        where: {
            question_id: id
        }
    });
    return numberOfAnswers;
}

const getNumberOfLikes = async (id) => {
    const numberOfLikes = await Like.count({
        where: {
            question_id: id,
            is_like: true
        }
    });
    return numberOfLikes;
}

const getNumberOfDislikes = async (id) => {
    const numberOfDislikes = await Like.count({
        where: {
            question_id: id,
            is_like: false
        }
    });
    return numberOfDislikes;
}

const getUserEmail = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });

    return user.email
}


router.get("/questions", async (req, res) => {
    try {
        const result = [];
        const questions = await Question.findAll({
            order: [
                ['date', 'DESC']
            ]
        });

        for(var i = 0; i < questions.length; i++) {
            
            const numberOfAnswers = await getNumberOfQuestionAnswers(questions[i].id);
            const numberOfLikes = await getNumberOfLikes(questions[i].id);
            const numberOfDislikes = await getNumberOfDislikes(questions[i].id);
            const userEmail = await getUserEmail(questions[i].UserId);

            var data = {
                id: questions[i].id,
                userId: questions[i].userId,
                title: questions[i].title,
                description: questions[i].description,
                date: questions[i].date,
                numberOfLikes: numberOfLikes,
                numberOfDislikes: numberOfDislikes,
                numberOfAnswers: numberOfAnswers,
                userEmail: userEmail
            }
    
            result.push(data);
        }

        res.json(result);

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
                id: people[i].id,
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
            const numberOfLikes = await getNumberOfLikes(questions[i].id);

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
        const numberOfLikes = await getNumberOfLikes(req.params.questionId);
        
        res.json(numberOfLikes);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.get("/countDislikes/:questionId", async (req, res) => {
    try {
        const numberOfDislikes = await getNumberOfDislikes(req.params.questionId);
        
        res.json(numberOfDislikes);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});


module.exports = router;