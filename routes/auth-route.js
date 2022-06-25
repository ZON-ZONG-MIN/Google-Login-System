const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

router.get("/login", (req, res) => {
    res.render("login", { user: req.user });
});

router.get("/signup", (req, res) => {
    res.render("signup", { user: req.user });
});

router.post("/signup", async(req, res) => {
    console.log(req.body);
    let { name, email, password } = req.body;
    //check if the data is already in db
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        req.flash("error_msg", "Email has already been registered.");
        return res.redirect("/auth/signup");
    }

    const hash = await bcrypt.hash(password, 10);
    password = hash;
    let newUser = new User({ name, email, password });
    try {
        await newUser.save();
        req.flash("success_msg", "Registration succeeds. You can login now.");
        return res.redirect("/auth/login");
    } catch (err) {
        req.flash("error_msg", err.errors.name.properties.message);
        return res.redirect("/auth/signup");
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.post("/login", 
    //登入失敗的反應
    passport.authenticate("local", { 
        failureRedirect: "/auth/login", 
        failureFlash: "Wrong email or password." 
    }),
    (req, res) => {
        res.redirect("/profile");
    }
);

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