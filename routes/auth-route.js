const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
    res.render("login", { user: req.user });
});

router.get("/signup", (req, res) => {
    res.render("signup", { user: req.user });
});

router.post("/signup", (req, res) => {
    console.log(req.body);
    res.send("Thanks for posting");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get(
    "/google", 
    passport.authenticate("google", {
        //獲得使用者的資料
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile");
});

module.exports = router;