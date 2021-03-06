const express = require("express");
const app = express();
const cors = require("cors");
const { requireAuth } = require("./middleware/authorization");
const cookieParser = require('cookie-parser');
const path = require("path");
const PORT = process.env.PORT || 5000;

//associations
const User = require('./models/User');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Like = require('./models/Like');
const Notification = require('./models/Notification');

User.hasMany(Question)
User.hasMany(Answer)
Question.hasMany(Answer)
User.hasMany(Like)
Question.hasMany(Like)
User.hasMany(Notification, {foreignKey: 'user_to_notify'});
User.hasMany(Notification, {foreignKey: 'user_who_fired_event'});
Question.hasMany(Notification);

//process.env.PORT
//process.env.NODE_ENV => production or undefined
 
//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES
app.use("/auth", require("./routes/jwtAuth"));
app.use("/app", requireAuth, require("./routes/protectedRoutes"));
app.use("/", require("./routes/publicRoutes"));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});