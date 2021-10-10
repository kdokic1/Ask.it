const express = require("express");
const app = express();
const cors = require("cors");
const { requireAuth } = require("./middleware/authorization");
const cookieParser = require('cookie-parser');

//associations
const User = require('./models/User');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Like = require('./models/Like');
const Notification = require('./models/Notification');

User.hasMany(Question)
User.hasMany(Answer)
Question.hasMany(Answer)

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/auth", require("./routes/jwtAuth"));
app.use("/app", requireAuth, require("./routes/protectedRoutes"));
app.use("/", require("./routes/publicRoutes"));

app.listen(5000, () => {
    console.log("server has started on port 5000");
});