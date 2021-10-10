const express = require("express");
const app = express();
const cors = require("cors");
const { requireAuth } = require("./middleware/authorization");
const cookieParser = require('cookie-parser');
const path = require("path");
const PORT = process.env.PORT || 8000;

//associations
const User = require('./models/User');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Like = require('./models/Like');
const Notification = require('./models/Notification');

User.hasMany(Question)
User.hasMany(Answer)
Question.hasMany(Answer)

//process.env.PORT
//process.env.NODE_ENV => production or undefined
 
//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.user(express.static(path.join(__dirname, "client/build")));
}

//ROUTES
app.use("/auth", require("./routes/jwtAuth"));
app.use("/app", requireAuth, require("./routes/protectedRoutes"));
app.use("/", require("./routes/publicRoutes"));

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});