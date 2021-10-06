const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

//database and models
const db = require("./config/database");
const User = require('./models/User');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Like = require('./models/Like');
const Notification = require('./models/Notification');

//associations
User.hasMany(Question, {as: 'UsersQuestions', foreignKey: 'user_id'});

User.hasMany(Answer, {foreignKey: 'user_id'});
Question.hasMany(Answer, {foreignKey: 'question_id'});

User.hasMany(Like, {foreignKey: 'user_id'});
Question.hasMany(Like, {foreignKey: 'question_id'});

User.hasMany(Notification, {foreignKey: 'user_to_notify'});
User.hasMany(Notification, {foreignKey: 'user_who_fired_event'});
Question.hasMany(Notification, {foreignKey: 'question_id'});

//ROUTES

app.get('/', (req, res) => {
    res.send('Index');
    // Notification.findAll()
    //     .then(users => {
    //         console.log(users);
    //         res.send(200);
    //     })
    //     .catch(err => console.log(err));
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
});