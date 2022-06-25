const router = require('express').Router();

const authCheck = (req, res, next) => {
  console.log(req.user);
  //檢查使用者是否有驗證登入過
  if (!req.isAuthenticated()) {
    //沒有-重新導向登入頁面
    res.redirect("/auth/login");
  } else {
     //有
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;