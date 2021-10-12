const jwt = require('jsonwebtoken');
require('dotenv').config();

const deleteAnswer = async (id, answers, setAnswers) => {
    setAnswers(answers.filter(ans => ans.id !== id));
    await fetch(`/app/answer/${id}`, {
        method: 'DELETE',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

const addAnswer = async (questionId, newAnswerDescription, setNewAnswerDescription) => {
    var data = {
        questionId: questionId,
        description: newAnswerDescription,
        date: new Date().toLocaleString()
    };

    const response = await fetch('/app/addAnswer', {
        method: 'POST',
        headers: {
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newAns = await response.json();
    setNewAnswerDescription('');
    return newAns;
};

const getAnswers = async (isAuthenticated ,questionId, setAnswers) => {
    var path = "questionAnswers";
    if(isAuthenticated) path = "app/questionAnswers";
    const response = await fetch(`/${path}/${questionId}`, {
        method: "GET",
        headers: { 
            token: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
    });

    if(response.ok){
        const fetchedAnswers = await response.json();
        setAnswers(fetchedAnswers);
    }
};

module.exports = {deleteAnswer, addAnswer, getAnswers};