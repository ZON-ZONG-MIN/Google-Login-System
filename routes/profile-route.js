const router = require('express').Router();
const Post = require("../models/post-model");

const authCheck = (req, res, next) => {
  console.log(req.originalUrl);
  //檢查使用者是否有驗證登入過
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    //沒有-重新導向登入頁面
    res.redirect("/auth/login");
  } else {
     //有
    next();
  }
};

router.get("/", authCheck, async (req, res) => {
  let postFound = await Post.find({ author: req.user._id });
  res.render('profile', { user: req.user, posts: postFound });
});

router.get("/post", authCheck, (req, res) => {
  res.render("post", { user: req.user });
});

router.post("/post", authCheck, async (req, res) => {
  let { title, content } = req.body;
  let newPost = new Post({ title, content, author: req.user._id});
  try {
    await newPost.save();
    res.status(200).redirect("/profile");
  } catch (err) {
    req.flash('error_msg', "Both title and content are required.");
    res.redirect("/profile/post");
  }
});

module.exports = router;