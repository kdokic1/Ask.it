const User = require('../models/User');
const Answer = require('../models/Answer');
const Like = require('../models/Like');
const Question = require('../models/Question');
const Notification = require('../models/Notification');

const getNumberOfQuestionAnswers  = async (id) => {
    const numberOfAnswers = await Answer.count({
        where: {
            question_id: id
        }
    });
    return numberOfAnswers;
};

const getNumberOfLikes = async (id) => {
    const numberOfLikes = await Like.count({
        where: {
            question_id: id,
            is_like: true
        }
    });
    return numberOfLikes;
};

const getNumberOfDislikes = async (id) => {
    const numberOfDislikes = await Like.count({
        where: {
            question_id: id,
            is_like: false
        }
    });
    return numberOfDislikes;
};

const getUserEmail = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });

    return user.email
};

const getUserEmailForQuestion = async (questionId) => {
    const question = await Question.findOne({
        where: {
            id: questionId
        }
    });


    const user = await User.findOne({
        where: {
            id: question.UserId
        }
    });

    return user.email;
};

const getUserIdForQuestion = async (questionId) => {
    const question = await Question.findOne({
        where: {
            id: questionId
        }
    });


    const user = await User.findOne({
        where: {
            id: question.UserId
        }
    });

    return user.id;
};

const getQuestionTitle = async (questionId) => {
    const question = await Question.findOne({
        where: {
            id: questionId
        }
    });

    return question.title;
};

const addNotification  = async (userToNotify, userWhoFiredEvent, questionId, event) => {

    const notification = await Notification.create({
        user_to_notify: userToNotify,
        user_who_fired_event: userWhoFiredEvent,
        QuestionId: questionId,
        event: event,
        seen_by_user: false
    });


    return notification;
};

module.exports = {getUserEmail, getNumberOfLikes, getNumberOfDislikes, getNumberOfQuestionAnswers, getUserEmailForQuestion, addNotification, getUserIdForQuestion, getQuestionTitle};