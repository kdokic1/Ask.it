const express = require("express");
const app = express();
const cors = require("cors");
const { requireAuth } = require("./middleware/authorization");
const cookieParser = require('cookie-parser');


//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//ROUTES

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));
app.get("/pocetna", requireAuth, (req, res) => {
    res.send("evo te na pocetnoj straniciiyyyji");
});

app.get("/", (req, res) => {
    res.send("ovoj moze svako pristupit");
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
});