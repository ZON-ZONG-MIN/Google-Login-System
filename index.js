const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
// 將passport的內容貼到index.js
const passport = require('passport');
require("./config/passport");
const cookieSession = require("cookie-session");

// Connect MongoDB
mongoose
    .connect(
        process.env.DB_CONNECT, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then(() => {
        console.log("Connect to mongodb atlas.");
    }).catch((err) => {
        console.log(err);
    });

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: [process.env.SECRET],
    })
);

app.use(passport.initialize());
app.use(passport.session());
//If URL is /auth, go to authRoute
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.get("/", (req, res) => {
    res.render("index", { user: req.user });
});

app.listen(8080, () => {
    console.log("Server running on port 8080.");
});
