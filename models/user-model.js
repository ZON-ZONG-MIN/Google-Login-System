const mongoose = require("mongoose");
// 存放登入需要的資訊
const userSchema = new mongoose.Schema({
    // 從google獲得的資訊
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255,
    },
    goolgeID: {
        type: String,
    },
    date: {
        type:Date,
        default: Date.now,
    },
    thumbnail: {
        type: String,
    },
    // local login
    email: {
        type: String,
    },
    password: {
        type: String,
        minlength: 1024,
    },
});

module.exports = mongoose.model("User", userSchema);