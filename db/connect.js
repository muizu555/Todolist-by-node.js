const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => console.log("データベースと接続中。。。"))//非同期処理
    .catch((err) => console.log(err));
};


module.exports = connectDB;//他のファイルで使うには毎回必要

